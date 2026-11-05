#!/usr/bin/env python3
"""Download handlers from hub.splitscreen.me, keeping ONLY version-verified ones.

A handler is admitted only if, for the exact version downloaded:
  1. the package's own meta.verified is true (verification is per package/version),
  2. the package belongs to that handler and its handlerVersion is the version downloaded,
  3. the downloaded handler.js is identical (ignoring line endings) to the verified
     package's jsContent.

Writes downloads/handlers/<id>-v<version>.js (plus asset folders) and
downloads/verified-manifest.json (with sha256 of each admitted file). run.sh only
runs Hub handlers listed in that manifest with a matching hash.

Usage: python3 -I tools/fetch_verified.py [--limit N] [--id HANDLER_ID ...]
"""
import argparse
import hashlib
import io
import json
import os
import sys
import urllib.request
import zipfile

HUB = 'https://hub.splitscreen.me'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'downloads')


# Name the tool, so the Hub's maintainers can see who is asking (and reach us).
UA = 'nucleus-handler-testbench (+https://github.com/Snailedlt/nucleuscoop-handler-testbench)'


def get(url, binary=False):
    with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': UA}), timeout=120) as r:
        data = r.read()
    return data if binary else json.loads(data)


def norm(text):
    return text.replace('﻿', '').replace('\r\n', '\n').strip()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--limit', type=int, default=150, help='most-downloaded N handlers (default 150)')
    ap.add_argument('--id', action='append', default=[], help='specific handler id(s) instead of the top N')
    args = ap.parse_args()

    listing = get(f'{HUB}/api/v1/allhandlers')['Handlers']
    if args.id:
        handlers = [h for h in listing if h['_id'] in set(args.id)]
        missing = set(args.id) - {h['_id'] for h in handlers}
        for m in sorted(missing):
            print(f'REJECT {m}: not in the public listing')
    else:
        handlers = sorted(listing, key=lambda h: -h.get('downloadCount', 0))[: args.limit]

    os.makedirs(os.path.join(OUT, 'handlers'), exist_ok=True)
    manifest_path = os.path.join(OUT, 'verified-manifest.json')
    manifest = {e['file']: e for e in json.load(open(manifest_path))} if os.path.exists(manifest_path) else {}
    # Only the handlers asked for this time end up in the manifest. A version already admitted earlier
    # (downloads/ is kept between CI runs) is reused without asking the Hub again: a version never changes.
    current = {}
    admitted = rejected = reused = 0

    for h in handlers:
        hid, version, package = h['_id'], h['currentVersion'], h['currentPackage']
        name = f'{hid}-v{version}.js'

        cached = manifest.get(name)
        if cached and os.path.exists(os.path.join(OUT, 'handlers', name)):
            with open(os.path.join(OUT, 'handlers', name), 'rb') as f:
                if hashlib.sha256(f.read()).hexdigest() == cached['sha256']:
                    current[name] = cached
                    reused += 1
                    continue

        def reject(reason):
            nonlocal rejected
            rejected += 1
            print(f'REJECT {hid} v{version} ({h.get("title")}): {reason}')

        try:
            pkgs = get(f'{HUB}/api/v1/package/{package}').get('packages') or []
        except Exception as e:  # noqa: BLE001
            reject(f'package lookup failed: {e}')
            continue
        meta = pkgs[0].get('meta', {}) if pkgs else {}
        if meta.get('verified') is not True:
            reject(f'package {package} is not verified (meta.verified={meta.get("verified")})')
            continue
        if meta.get('handlerId') != hid or meta.get('handlerVersion') != version:
            reject(f'package {package} is for {meta.get("handlerId")} v{meta.get("handlerVersion")}')
            continue

        url = f'{HUB}/cdn/storage/packages/{package}/original/handler-{hid}-v{version}.nc'
        try:
            z = zipfile.ZipFile(io.BytesIO(get(url, binary=True)))
        except Exception as e:  # noqa: BLE001
            reject(f'download failed: {e}')
            continue
        js_names = [n for n in z.namelist() if n.lower() == 'handler.js'] or [n for n in z.namelist() if n.lower().endswith('.js') and '/' not in n]
        if not js_names:
            reject('package has no handler.js')
            continue
        js = z.read(js_names[0])
        if norm(js.decode('utf-8', 'replace')) != norm(meta.get('jsContent') or ''):
            reject('downloaded handler.js differs from the verified package content')
            continue

        dest = os.path.join(OUT, 'handlers', name)
        with open(dest, 'wb') as f:
            f.write(js)
        # Asset folder, extracted safely next to the handler (for inspection; the harness doesn't need it).
        asset_root = os.path.join(OUT, 'handlers', f'{hid}-v{version}')
        for n in z.namelist():
            if n.endswith('/') or n == js_names[0]:
                continue
            target = os.path.realpath(os.path.join(asset_root, *[p for p in n.split('/') if p not in ('', '.', '..')]))
            if not target.startswith(os.path.realpath(asset_root) + os.sep):
                continue
            os.makedirs(os.path.dirname(target), exist_ok=True)
            with open(target, 'wb') as f:
                f.write(z.read(n))
        current[name] = {
            'file': name, 'handlerId': hid, 'version': version, 'package': package, 'title': h.get('title'),
            'sha256': hashlib.sha256(js).hexdigest(),
        }
        admitted += 1
        print(f'OK     {hid} v{version} ({h.get("title")})')

    if not args.id:
        # Older versions are no longer current: drop their files.
        for stale in set(manifest) - set(current):
            try:
                os.remove(os.path.join(OUT, 'handlers', stale))
            except FileNotFoundError:
                pass
    else:
        current = {**manifest, **current}
    with open(manifest_path, 'w') as f:
        json.dump(sorted(current.values(), key=lambda e: e['file']), f, indent=1)
    print(f'\n{admitted} downloaded, {reused} reused (already had that version), {rejected} rejected. Manifest: {manifest_path}')
    return 0


if __name__ == '__main__':
    sys.exit(main())

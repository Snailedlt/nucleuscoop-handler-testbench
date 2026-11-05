# version 3.0 (reads the FNV Data folder directly instead of relying on the NVMP server log)

# Determine and assemble the Data directory path, throw in the Nucleus script, prepare array for mods.
$FNV = Get-ItemProperty -Path "HKLM:\SOFTWARE\WOW6432Node\Bethesda Softworks\falloutnv" -Name "installed path" | Select-Object -ExpandProperty "installed path"
$dataDirectory = $FNV + 'Data'
$nucleusScript = '..\NVMP.js'
$arrayModList = @()

# Read the Data directory for the names of mod plugins.
Get-ChildItem -Path $dataDirectory -Name -Include *.esm,*.esp |
    ForEach-Object { 
        $modName = $_
        if ($arrayModList -notcontains $modName) {
            $arrayModList += $modName
        }
    }

# Prepare the mod list to be written to the Nucleus script.
$stringModList = $arrayModList -join ','
$gameStartArgs = "Game.StartArguments = `"localhost 27015 22380 null null \`"{0}\`"`";" -f $stringModList


# Write mod list to files.
(Get-Content $nucleusScript) -replace '^Game\.StartArguments.+$', $gameStartArgs | Set-Content $nucleusScript
$arrayModList | Out-File -FilePath .\modlist.txt
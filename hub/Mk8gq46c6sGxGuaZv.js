Hub.Handler.Version = 6; // Released at https://hub.splitscreen.me/ on Wed Aug 12 2026 00:54:07 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "Mk8gq46c6sGxGuaZv";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["fmod.dll"];
Game.DirExclusions = ["saves", "619820", "settings", "steam_settings", "ngalaxye_settings"];
Game.DirSymlinkExclusions = ["logs", "res"];
Game.FileSymlinkExclusions = ["Galaxy.dll", "steam_api64.dll", "steam_appid.txt", "HWR2.exe.log", "SDL2.dll", "SDL2.ini", "SDL2.log"];
Game.FileSymlinkCopyInstead = ["controls_default.cfg", "fmod.dll", "fmodstudio.dll", "HWR2.exe.cfg", "libde265.dll", "ozz_animation_r.dll", "ozz_base_r.dll", "TinyTIFF.dll"];
Game.BackupFolders = ["saves", "619820"];
Game.UseNemirtingasGalaxyEmu = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SymlinkExe = false;
Game.ExecutableName = "HWR2.exe";
Game.SteamID = "619820";
Game.GUID = "Heroes of Hammerwatch II";
Game.GameName = "Heroes of Hammerwatch II";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Heroes of Hammerwatch II";
Game.HasDynamicWindowTitle = true;
Game.FakeFocus = true;
Game.FakeFocusInterval = 10000;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.SDL2Enabled = true;
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.Description =
  "IMPORTANT: Before using this run your main game, change the resolution and set it to windowed. Create a public lobby in one instance and join in the others using the server list. You can access your saves per instance via Nucleus UI, after the first launch click on the wrench icon-open backup folder, you can even copy your main saves to there.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\HWR2.exe.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "v_resolution", Nucleus.SearchType.StartsWith) + "|v_resolution " + Context.Width + "x" + Context.Height,
    Context.FindLineNumberInTextFile(txtPath, "v_fullscreen", Nucleus.SearchType.StartsWith) + "|v_fullscreen 0",
    Context.FindLineNumberInTextFile(txtPath, "v_forced_aspect_ratio", Nucleus.SearchType.StartsWith) + "|v_forced_aspect_ratio 0.000000"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\DLC.txt";
  var lines = ["4805300=Heroes of Hammerwatch II - Celestial Ruins"];
  Context.WriteTextFile(dlc, lines);

  Context.PatchFileFindPattern(
    System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "HWR2.exe"),
    System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "HWR2.exe"),
    "40 53 48 83 EC 70 48 8B 05 E3 EC 4F 00 48 33 C4",
    "B0 01 C3 90 90 90 48 8B 05 E3 EC 4F 00 48 33 C4",
    true
  );
};
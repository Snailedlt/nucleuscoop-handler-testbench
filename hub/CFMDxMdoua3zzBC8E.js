Hub.Handler.Version = 6; // Released at https://hub.splitscreen.me/ on Tue Jan 21 2025 00:41:02 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "CFMDxMdoua3zzBC8E";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["res"];
Game.DirExclusions = ["saves", "677120", "settings", "ngalaxye_settings"];
Game.DirSymlinkExclusions = ["logs", "res"];
Game.FileSymlinkExclusions = ["Galaxy.dll", "steam_api.dll", "HWR.exe.log", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = ["controls_default.cfg", "fmod.dll", "fmodstudio.dll", "HWR.exe.cfg", "libde265.dll", "SDL2.dll"];
Game.BackupFolders = ["saves", "677120"];
Game.UseNemirtingasGalaxyEmu = true;
Game.UseGoldberg = true;
Game.GoldbergNoWarning = true;
Game.HandlerInterval = 100;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SymlinkExe = false;
Game.ExecutableName = "HWR.exe";
Game.SteamID = "677120";
Game.GUID = "Heroes of Hammerwatch";
Game.GameName = "Heroes of Hammerwatch";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Heroes of Hammerwatch";
Game.HasDynamicWindowTitle = true;
Game.SendFakeFocusMsg = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_4.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.Description =
  "Create a public lobby in one instance and join in the others using server list, use a different character per instance. If you launch one instance with keyboard wait until an instance loses its borders before opening the next one, this way they will resize correctly. You can access your saves per instance via Nucleus UI, after the first launch click on the wrench icon-open backup folder, you can even copy your main saves to there.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\HWR.exe.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "v_resolution", Nucleus.SearchType.StartsWith) + "|v_resolution " + Context.Width + "x" + Context.Height,
    Context.FindLineNumberInTextFile(txtPath, "v_fullscreen", Nucleus.SearchType.StartsWith) + "|v_fullscreen 0",
    Context.FindLineNumberInTextFile(txtPath, "v_forced_aspect_ratio", Nucleus.SearchType.StartsWith) + "|v_forced_aspect_ratio 0.000000"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\677120");
  System.IO.Directory.CreateDirectory(filePath);

  if (Context.HasKeyboardPlayer == true) {
    Game.PromptBetweenInstances = true;
    Game.PauseBetweenStarts = 40;
    Game.PreventWindowDeactivation = true;
    Game.KeyboardPlayerSkipPreventWindowDeactivate = true;
  } else {
    Game.FakeFocus = true;
    Game.FakeFocusInterval = 5000;
    Game.SetForegroundWindowElsewhere = true;
  }

  var idg = Context.PlayerID + 6;

  var jsonPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ngalaxye_settings\\NemirtingasGalaxyEmu.json";
  var params = [
    "{",
    '  "api_version": "1.139.2.0",',
    '  "enable_overlay": false,',
    '  "galaxyid": 14549624462898294' + idg + ",",
    '  "language": ' + '"' + Context.GogLang + '",',
    '  "productid": 2143654691,',
    '  "username": ' + '"' + Context.Nickname + '"',
    "}"
  ];
  Context.WriteTextFile(jsonPath, params);
};
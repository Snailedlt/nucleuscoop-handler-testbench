Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Tue Jan 21 2025 00:42:58 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "HJsrhgndqovhoT83m";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["fmod.dll"];
Game.DirExclusions = ["saves", "1538970", "settings", "ngalaxye_settings"];
Game.DirSymlinkExclusions = ["logs", "res"];
Game.FileSymlinkExclusions = ["Galaxy.dll", "steam_api64.dll", "steam_appid.txt", "HW2.exe.log", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = ["controls_default.cfg", "fmod.dll", "fmodstudio.dll", "HW2.exe.cfg", "libde265.dll", "SDL2.dll"];
Game.BackupFolders = ["saves", "1538970"];
Game.UseNemirtingasGalaxyEmu = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SymlinkExe = false;
Game.ExecutableName = "HW2.exe";
Game.SteamID = "1538970";
Game.GUID = "Hammerwatch II";
Game.GameName = "Hammerwatch II";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Hammerwatch II";
Game.HasDynamicWindowTitle = true;
Game.SendFakeFocusMsg = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_4.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.Description =
  "Create a public lobby in one instance and join in the others using the server list. If you launch one instance with keyboard wait until an instance loses its borders before opening the next one, this way they will resize correctly. You can access your saves per instance via Nucleus UI, after the first launch click on the wrench icon-open backup folder, you can even copy your main saves to there.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\HW2.exe.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "v_resolution", Nucleus.SearchType.StartsWith) + "|v_resolution " + Context.Width + "x" + Context.Height,
    Context.FindLineNumberInTextFile(txtPath, "v_fullscreen", Nucleus.SearchType.StartsWith) + "|v_fullscreen 0",
    Context.FindLineNumberInTextFile(txtPath, "v_forced_aspect_ratio", Nucleus.SearchType.StartsWith) + "|v_forced_aspect_ratio 0.000000"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  Context.PatchFileFindPattern(
    System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "HW2.exe"),
    System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "HW2.exe"),
    "C3 CC CC CC CC 40 53 48 81 EC 80",
    "C3 CC CC CC CC B8 01 00 00 00 C3",
    true
  );

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

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\1538970");
  System.IO.Directory.CreateDirectory(filePath);
};
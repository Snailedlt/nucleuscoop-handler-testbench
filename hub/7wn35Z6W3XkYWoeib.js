Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Mon Apr 04 2022 09:29:14 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "7wn35Z6W3XkYWoeib";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["Galaxy64.dll"];
Game.KillMutex = ["Hog Mutex"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "Galaxy64.dll", "steam_appid.txt", "dinput8.dll", "xinput1_3.dll", "xinput1_4.dll", "xinput9_1_0.dll"];
Game.FileSymlinkCopyInstead = ["GalaxyPeer64.dll", "amd_ags_x64.dll", "fmod_event_net64.dll", "fmod_event64.dll", "fmodex64.dll"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "ShadowWarrior2.exe";
Game.SteamID = "324800";
Game.GUID = "Shadow Warrior 2";
Game.GameName = "Shadow Warrior 2";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.UseGoldberg = true;
Game.UseNemirtingasGalaxyEmu = true;
Game.HideTaskbar = false;
Game.StartArguments = "-novideos";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Shadow Warrior 2";
Game.SendFakeFocusMsg = true;
Game.HookFocus = false;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.SupportsKeyboard = true;
Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_4.dll", "xinput9_1_0.dll"];
Game.UserProfileSavePath = "Saved Games\\Flying Wild Hog\\Shadow Warrior 2\\profiles";
Game.Description =
  "Get past the prologue in all instances then start a public multiplayer game in one instance and join in the others. Reduce in-game graphics settings per instance to improve performance. You can access each instance save folder via Nucleus, after the first launch click game options/open user profile save path in the UI. You can even copy your main save to all instances saves folders there.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var id = Context.PlayerID + 8;
  if (System.IO.File.Exists(Context.NucleusUserRoot + "\\Saved Games\\Flying Wild Hog\\Shadow Warrior 2\\profiles\\steam_7656119902312543" + id + "\\config.cfg")) {
    var txtPath = Context.NucleusUserRoot + "\\Saved Games\\Flying Wild Hog\\Shadow Warrior 2\\profiles\\steam_7656119902312543" + id + "\\config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "r_fullscreen", Nucleus.SearchType.StartsWith) + '|r_fullscreen "0"',
      Context.FindLineNumberInTextFile(txtPath, "r_fullscreen_aspect", Nucleus.SearchType.StartsWith) + '|r_fullscreen_aspect "0"',
      Context.FindLineNumberInTextFile(txtPath, "r_fullscreen_modes", Nucleus.SearchType.StartsWith) + '|r_fullscreen_modes "' + Context.Width + "x" + Context.Height + '"',
      Context.FindLineNumberInTextFile(txtPath, "w_game_height", Nucleus.SearchType.StartsWith) + '|w_game_height "' + Context.Height + '"',
      Context.FindLineNumberInTextFile(txtPath, "w_game_width", Nucleus.SearchType.StartsWith) + '|w_game_width "' + Context.Width + '"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  } else {
    var filePath = (Context.filePath = Context.NucleusUserRoot + "\\Saved Games\\Flying Wild Hog\\Shadow Warrior 2\\profiles\\steam_7656119902312543" + id + "");
    System.IO.Directory.CreateDirectory(filePath);

    var cfg = Context.NucleusUserRoot + "\\Saved Games\\Flying Wild Hog\\Shadow Warrior 2\\profiles\\steam_7656119902312543" + id + "\\config.cfg";
    var lines = ['r_fullscreen "0"', 'w_game_height "' + Context.Height + '"', 'w_game_width "' + Context.Width + '"'];
    Context.WriteTextFile(cfg, lines);
  }

  var idg = Context.PlayerID + 6;
  if (System.IO.File.Exists(Context.NucleusUserRoot + "\\Saved Games\\Flying Wild Hog\\Shadow Warrior 2\\profiles\\galaxy_14549624462898294" + idg + "\\config.cfg")) {
    var txtPath = Context.NucleusUserRoot + "\\Saved Games\\Flying Wild Hog\\Shadow Warrior 2\\profiles\\galaxy_14549624462898294" + idg + "\\config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "r_fullscreen", Nucleus.SearchType.StartsWith) + '|r_fullscreen "0"',
      Context.FindLineNumberInTextFile(txtPath, "r_fullscreen_aspect", Nucleus.SearchType.StartsWith) + '|r_fullscreen_aspect "0"',
      Context.FindLineNumberInTextFile(txtPath, "r_fullscreen_modes", Nucleus.SearchType.StartsWith) + '|r_fullscreen_modes "' + Context.Width + "x" + Context.Height + '"',
      Context.FindLineNumberInTextFile(txtPath, "w_game_height", Nucleus.SearchType.StartsWith) + '|w_game_height "' + Context.Height + '"',
      Context.FindLineNumberInTextFile(txtPath, "w_game_width", Nucleus.SearchType.StartsWith) + '|w_game_width "' + Context.Width + '"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  } else {
    var filePath = (Context.filePath = Context.NucleusUserRoot + "\\Saved Games\\Flying Wild Hog\\Shadow Warrior 2\\profiles\\galaxy_14549624462898294" + idg + "");
    System.IO.Directory.CreateDirectory(filePath);

    var cfg = Context.NucleusUserRoot + "\\Saved Games\\Flying Wild Hog\\Shadow Warrior 2\\profiles\\galaxy_14549624462898294" + idg + "\\config.cfg";
    var lines = ['r_fullscreen "0"', 'w_game_height "' + Context.Height + '"', 'w_game_width "' + Context.Width + '"'];
    Context.WriteTextFile(cfg, lines);
  }

  var jsonPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ngalaxye_settings\\NemirtingasGalaxyEmu.json";
  var params = [
    "{",
    '  "api_version": "1.95.0.0",',
    '  "enable_overlay": false,',
    '  "galaxyid": 14549624462898294' + idg + ",",
    '  "language": ' + '"' + Context.GogLang + '",',
    '  "productid": 1434021265,',
    '  "username": ' + '"' + Context.Nickname + '"',
    "}"
  ];
  Context.WriteTextFile(jsonPath, params);

  if (Context.HasKeyboardPlayer == true) {
    Game.FakeFocus = false;
  } else {
    Game.FakeFocus = true;
    Game.FakeFocusInterval = 40000;
    Game.SetForegroundWindowElsewhere = true;
  }

  if (!System.IO.File.Exists(Context.OrigRootFolder + "\\steam_api64.dll")) {
    Game.UseGoldberg = false;
  } else {
  }
};
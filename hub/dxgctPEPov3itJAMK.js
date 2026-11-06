Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Mon Apr 11 2022 13:53:31 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "dxgctPEPov3itJAMK";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["MD", "engine_x86_rwdi.dll"];
Game.KillMutex = ["ChromeEngine4CoJ2Mutex"];
Game.DirSymlinkExclusions = ["MD\\out\\Settings", "MD\\Data\\Menu\\Movies"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "local_save.txt", "xinput1_3.dll", "Intro_720p.wmv"];
Game.FileSymlinkCopyInstead = ["EngineConsoleSettings.dat", "Audio.scr", "Video.scr"];
Game.GameName = "Call of Juarez: The Cartel";
Game.HandlerInterval = 100;
Game.SymlinkGame = true;
Game.SymlinkExe = false;
Game.ExecutableName = "CoJ_TheCartel.exe";
Game.SteamID = "33420";
Game.GUID = "Call of Juarez The Cartel";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.StartArguments = "-uplay_steam_mode -nosplash";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Call of Juarez: The Cartel";
Game.FakeFocus = true;
Game.FakeFocusInterval = 7000;
Game.SendFakeFocusMsg = true;
Game.KeyboardPlayerSkipFakeFocus = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.SupportsKeyboard = true;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.UserProfileConfigPath = "Documents\\Call of Juarez - The Cartel\\out\\Settings";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\33420\\remote";
Game.Description =
  "IMPORTANT: Run your main game, change some graphics settings and close it before launching this. Only working with the latest Steam version that was available before it was removed. For gamepad instances enable the gamepad controls in the game options-controls and select ok so you can move with them in-game, for the keyboard/m instance make sure the kb controls are enabled there too and click ok, alt-tab to the kb instance to control it if you can not move. To start a co-op campaign select a stage in the campaign menu and once in-game press start/escape and start a public co-op game, in the other instances make sure you select a different character for the same campaign level, once in-game press start/escape and start a public co-op campaign too, you will join the player hosting.";
Game.PauseBetweenStarts = 30;

//ProtoInput:

Game.SupportsMultipleKeyboardsAndMice = false;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = true;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = false;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  /*var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\MD\\out\\Settings\\Video.scr"; 
	
	var resLine = Context.FindLineNumberInTextFile(savePath, "Resolution", Nucleus.SearchType.StartsWith);
	Context.ReplacePartialLinesInTextFile(savePath, [
	resLine + "|" + "\\(([^\\)]+)\\)" + "|(" + Context.Width + "," + Context.Height + ")"
	]);

	var fsLine = Context.FindLineNumberInTextFile(savePath, "Fullscreen", Nucleus.SearchType.StartsWith);
	Context.RemoveLineInTextFile(savePath,fsLine);*/

  var savePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\Video.scr";

  var resLine = Context.FindLineNumberInTextFile(savePath, "Resolution", Nucleus.SearchType.StartsWith);
  Context.ReplacePartialLinesInTextFile(savePath, [resLine + "|" + "\\(([^\\)]+)\\)" + "|(" + Context.Width + "," + Context.Height + ")"]);

  var fsLine = Context.FindLineNumberInTextFile(savePath, "Fullscreen", Nucleus.SearchType.StartsWith);
  Context.RemoveLineInTextFile(savePath, fsLine);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient010",
    "SteamGameServer010",
    "SteamGameServerStats001",
    "SteamUser016",
    "SteamFriends009",
    "SteamUtils005",
    "SteamMatchMaking008",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION010",
    "STEAMAPPS_INTERFACE_VERSION004",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION004",
    "STEAMHTTP_INTERFACE_VERSION001",
    "SteamMasterServerUpdater001"
  ];
  Context.WriteTextFile(interfaces, lines);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\DLC.txt";
  var lines = ["33436=Call of Juarez: The Cartel - Preorder Pack 2", "33435=Call of Juarez: The Cartel - Preorder Pack 1", "33428=Call of Juarez: The Cartel - Preorder DLC"];
  Context.WriteTextFile(dlc, lines);

  if (Context.IsKeyboardPlayer) {
    Game.ProtoInput.RegisterRawInputHook = false;
    Game.ProtoInput.GetRawInputDataHook = false;
    Game.ProtoInput.MessageFilterHook = false;
    Game.ProtoInput.GetCursorPosHook = false;
    Game.ProtoInput.SetCursorPosHook = false;
    Game.ProtoInput.ClipCursorHook = false;
    Game.ProtoInput.RawInputFilter = false;
    Game.ProtoInput.MouseMoveFilter = false;
    Game.ProtoInput.MouseActivateFilter = false;
    Game.ProtoInput.WindowActivateFilter = false;
    Game.ProtoInput.WindowActvateAppFilter = false;
    Game.ProtoInput.MouseWheelFilter = false;
    Game.ProtoInput.MouseButtonFilter = false;
    Game.ProtoInput.KeyboardButtonFilter = false;
  } else {
    Game.ProtoInput.RegisterRawInputHook = true;
    Game.ProtoInput.GetRawInputDataHook = true;
    Game.ProtoInput.MessageFilterHook = true;
    Game.ProtoInput.GetCursorPosHook = true;
    Game.ProtoInput.SetCursorPosHook = true;
    Game.ProtoInput.ClipCursorHook = true;
    Game.ProtoInput.RawInputFilter = true;
    Game.ProtoInput.MouseMoveFilter = false;
    Game.ProtoInput.MouseActivateFilter = true;
    Game.ProtoInput.WindowActivateFilter = true;
    Game.ProtoInput.WindowActvateAppFilter = true;
    Game.ProtoInput.MouseWheelFilter = true;
    Game.ProtoInput.MouseButtonFilter = true;
    Game.ProtoInput.KeyboardButtonFilter = false;
  }

  if (Context.HasKeyboardPlayer == true) {
    Game.SetForegroundWindowElsewhere = false;
  } else {
    Game.SetForegroundWindowElsewhere = true;
  }
};
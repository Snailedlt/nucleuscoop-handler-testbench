Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Fri May 31 2024 07:21:13 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "sWHLuetSf4tjbMFqb";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["AvP_GDF.dll"];
Game.KillMutex = ["AvP"];
Game.DirSymlinkExclusions = ["FMV"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "local_save.txt", "fox.bik", "rebellion.bik", "sega.bik", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["AvP_GDF.dll", "binkw32.dll"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.GameName = "Aliens vs. Predator 2010";
Game.ExecutableName = "AvP_DX11.exe"; //AvP.exe
Game.SteamID = "10680";
Game.GUID = "Aliens vs Predator";
Game.MaxPlayers = 18;
Game.MaxPlayersOneMonitor = 16;
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.StartArguments = "-subwindow";
Game.SupportsPositioning = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "AvP";
Game.FakeFocus = true;
Game.FakeFocusInterval = 9000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.HideCursor = true;
Game.UserProfileSavePath = "AppData\\Local\\AliensVsPredator";
Game.UserProfileConfigPath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\10680\\remote";
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileConfigPathNoCopy = true;
Game.Description =
  "On first Nucleus launch use the keyboard to enable the gamepad in each instace in options-control so the menus are controllable with the gamepads, select your custom resolution in the video settings too, alt-tab between instances to use keyboard, after all that exit via the menu and launch again via Nucleus or use ctrl+r to reset the windows. Create a multiplayer game in one instance and join in the others. Click on the species selection screen with the mouse if you can not change them with gamepad.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenStarts = 20;

//ProtoInput:

Game.SupportsMultipleKeyboardsAndMice = false;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = false;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = false;
Game.LockInputToggleKey = 0x23;

Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.GamePlayBeforeGameSetup = true;

Game.Play = function() {
  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient009",
    "SteamGameServer010",
    "SteamGameServerStats001",
    "SteamUser013",
    "SteamFriends005",
    "SteamUtils005",
    "SteamMatchMaking008",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION007",
    "STEAMAPPS_INTERFACE_VERSION003",
    "SteamNetworking003",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION002",
    "SteamMasterServerUpdater001"
  ];
  Context.WriteTextFile(interfaces, lines);

  if (Context.NumControllers < 5) {
    //>

    Game.ProtoInput.XinputHook = false;
    Game.ProtoInput.UseOpenXinput = false;
    Game.XInputPlusDll = ["xinput1_3.dll"];
  } else {
    Game.ProtoInput.XinputHook = true;
    Game.ProtoInput.UseOpenXinput = true;
  }
};
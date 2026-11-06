Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Sun Feb 26 2023 10:44:43 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "qaP5whmvbmiXc34LW";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["binkw32.dll"];
Game.KillMutex = ["__F.E.A.R. 3__single_instance_mutex", "D1MxDs21100", "D1MxDs21100"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_interfaces.txt", "steam_appid.txt", "local_save.txt", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["options.cfg"];
Game.RenameNotKillMutex = false;
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "F.E.A.R. 3.exe";
Game.SteamID = "21100";
Game.GUID = "FEAR3";
Game.GameName = "F.E.A.R.3";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.StartArguments = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "F.E.A.R.3";
Game.HookFocus = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Roaming\\Day 1 Studios\\FEAR3";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\21100";
Game.Description =
  "IMPORTANT: Set your default game to windowed first. Create a lobby in the first instance and join in the others before starting the game. If you use keyboards and mice after the instances open press the END key to lock the input for all instances to have their own cursor. Press the END key again to unlock the input. You can also use CTRL+Q to close Nucleus and all its instances. You can access each instance save in the app, after the first launch click game options/open user profile save path in the UI.";
Game.PauseBetweenStarts = 30;

Game.SupportsMultipleKeyboardsAndMice = true;

Game.HookSetCursorPos = true;
Game.HookGetCursorPos = true;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = true;
Game.HookGetKeyboardState = false;
Game.HookFilterRawInput = true;
Game.HookFilterMouseMessages = false;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = false;

Game.SendNormalMouseInput = true;
Game.SendNormalKeyboardInput = true;
Game.SendScrollWheel = true;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = true;
Game.HookReRegisterRawInputMouse = true;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;
Game.LockInputAtStart = false;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
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
    "STEAMUSERSTATS_INTERFACE_VERSION009",
    "STEAMAPPS_INTERFACE_VERSION004",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION004",
    "SteamMasterServerUpdater001"
  ];
  Context.WriteTextFile(interfaces, lines);
};
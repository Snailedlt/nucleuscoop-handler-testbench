Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Wed Jul 15 2020 22:08:50 GMT+0000 (UTC).
Hub.Handler.Id = "qCSNgcfvSbi2qg8ns";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["p4dn.dll"];
Game.DirSymlinkExclusions = ["Binaries\\Win32"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "sanctumgame-win32-shipping.exe";
Game.SteamID = "210770";
Game.GUID = "Sanctum 2";
Game.GameName = "Sanctum 2";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "Binaries\\Win32";
Game.LauncherTitle = "";
Game.SupportsPositioning = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Sanctum Game (32-bit, DX9)";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.UseAlpha8CustomDll = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.FakeFocus = false;
Game.HookFocus = true;
Game.UseDirectX9Wrapper = true;
Game.UserProfileSavePath = "Documents\\My Games\\Sanctum2\\Binaries\\Win32\\210770\\local";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "You can only join the other players until one completes the introduction level. Select yes to save in all instances title screen on first Nucleus run. Press the END key in your keyboard to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances. You can access each instance save in the app, after the first launch click game options/open user profile save path in the UI.";
Game.PauseBetweenStarts = 30;

Game.SupportsMultipleKeyboardsAndMice = true;

Game.HookSetCursorPos = true;
Game.HookGetCursorPos = true;
Game.HookGetKeyState = true;
Game.HookGetAsyncKeyState = true;
Game.HookGetKeyboardState = true;
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
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;
Game.LockInputAtStart = true;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  if (Context.IsKeyboardPlayer) {
    Context.StartArguments = "-Fullscreen -AlwaysFocus -nosplash -nomoviestartup" + " -ResX= " + Context.Width + " -ResY= " + Context.Height;

    Context.Hook.BlockMouseEvents = "False";
    Context.Hook.BlockKeyboardEvents = "False";
    Context.Hook.BlockInputEvents = "False";
    Context.Hook.ForceFocus = "False";
  } else {
    Context.StartArguments = "-Fullscreen -AlwaysFocus -nosplash -nomoviestartup" + " -ResX= " + Context.Width + " -ResY= " + Context.Height;

    Context.Hook.BlockMouseEvents = "True";
    Context.Hook.BlockKeyboardEvents = "True";
    Context.Hook.BlockInputEvents = "True";
    Context.Hook.ForceFocus = "True";
  }
  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\binaries\\win32\\steam_interfaces.txt";
  var lines = [
    "SteamClient012",
    "SteamGameServer011",
    "SteamGameServerStats001",
    "SteamUser016",
    "SteamFriends013",
    "SteamUtils005",
    "SteamMatchMaking009",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION011",
    "STEAMAPPS_INTERFACE_VERSION005",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION010",
    "STEAMSCREENSHOTS_INTERFACE_VERSION002",
    "STEAMHTTP_INTERFACE_VERSION002",
    "STEAMUNIFIEDMESSAGES_INTERFACE_VERSION001"
  ];

  Context.WriteTextFile(interfaces, lines);
};
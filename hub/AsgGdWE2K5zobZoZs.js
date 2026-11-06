Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Fri Dec 25 2020 20:06:23 GMT+0000 (UTC).
Hub.Handler.Id = "AsgGdWE2K5zobZoZs";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["DeploymentRoot"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "dinput8.dll", "XInput9_1_0.dll"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "VD_BHIKKHUNI.exe";
Game.SteamID = "550080";
Game.GUID = "Valkyrie Drive";
Game.GameName = "VALKYRIE DRIVE -BHIKKHUNI-";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "DeploymentRoot";
Game.LauncherTitle = "";
Game.LauncherExe = "start.bat";
Game.LauncherExeIgnoreFileCheck = true;
Game.HideTaskbar = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "VALKYRIE DRIVE -BHIKKHUNI-";
Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["XInput9_1_0.dll"];
Game.FakeFocus = true;
Game.HookFocus = true;
Game.RefreshWindowAfterStart = true;
Game.KeepSymLinkOnExit = false;
Game.Description =
  "Set your main game first to windowed or borderless windowed and in the resolution you want. Use different saveslots per instance. In Online mode create a room and join in the other instances. Press the END key in your keyboard to unlock the input and the main cursor when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances.";
Game.PauseBetweenStarts = 30;

Game.SupportsMultipleKeyboardsAndMice = true;

Game.HookSetCursorPos = true;
Game.HookGetCursorPos = true;
Game.HookGetKeyState = true;
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
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;
Game.LockInputAtStart = true;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\start.bat";
  var lines = ["start DeploymentRoot\\VD_BHIKKHUNI.exe"];

  Context.WriteTextFile(Bat, lines);
};
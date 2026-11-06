Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Tue Dec 22 2020 12:59:39 GMT+0000 (UTC).
Hub.Handler.Id = "DBkdHdjPbEokzcjBG";
Hub.Maintainer.Name = "slothy87";
Hub.Maintainer.Id = "Z7E8HmzMRDb77WRsi";

Game.DirSymlinkExclusions = ["EngineBinaries\\ThirdParty\\Steamworks\\Steamv142\\Win32", "DeadRussia\\Binaries\\Win32"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_api64.dll", "steam_appid.txt"];
Game.GameName = "Dead Motherland";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "DeadRussia-Win32-Shipping.exe";
Game.SteamID = "1211640 ";
Game.GUID = "Dead Motherland";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "DeadRussia\\Binaries\\Win32";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.UseNucleusEnvironment = true;
Game.LauncherTitle = "";
Game.FakeFocus = true;
Game.HookFocus = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "DeadRussia";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.UserProfileSavePath = "AppData\\Local\\DeadRussia\\Saved\\SaveGames";
Game.UserprofileSavePathNoCopy = true;
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.PromptBetweenInstances = true;
Game.Description =
  "Use the mouse cursor to navigate the start menu. Start a lobby in the first instance before launching the second instance and join from the in-game menu. Press the END key in your keyboard to unlock the input and main cursor when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances.";
Game.PauseBetweenStarts = 30;

Game.SupportsMultipleKeyboardsAndMice = true;

Game.HookSetCursorPos = true;
Game.HookGetCursorPos = true;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = false;
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
Game.DrawFakeMouseCursor = true;
Game.LockInputAtStart = true;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  var Args = (Context.Args = " -WindowedFullscreen " + " -AlwaysFocus " + " -nosplash " + " -ResX= " + Context.Width + " -ResY= " + Context.Height);

  Context.StartArguments = Args;
};
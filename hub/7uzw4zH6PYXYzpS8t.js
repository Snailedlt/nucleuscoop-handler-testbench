Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Sat Sep 19 2020 16:11:14 GMT+0000 (UTC).
Hub.Handler.Id = "7uzw4zH6PYXYzpS8t";
Hub.Maintainer.Name = "Snailedlt";
Hub.Maintainer.Id = "SE7kdQcCoCbgkzDeH";

Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv132\\Win64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "winmm.dll"];
Game.NeedsSteamEmulation = true;
Game.UseGoldberg = true;
Game.UseSteamStubDRMPatcher = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "GoatOfDuty-Win64-Shipping.exe";
Game.SteamID = "555000";
Game.GUID = "Goat Of Duty";
Game.GameName = "Goat Of Duty";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.BinariesFolder = "GoatOfDuty\\Binaries\\Win64";
Game.LauncherTitle = "";
Game.SupportsPositioning = true;
Game.ForceFinishOnPlay = true;
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Goat of Duty";
Game.Hook.DInputForceDisable = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.FakeFocus = true;
Game.FakeFocusSendActivate = false;
Game.HookFocus = true;
Game.SetForegroundWindowElsewhere = true;
Game.PreventGameFocus = true;
Game.SetWindowHookStart = true;
Game.Description =
  "Run at least once normally (outside of Nucleus) before you start it through NucleusCoop. Press the END key on your keyboard to unlock the input when you finish playing.. and Click ctrl+d(close game instances) or ctrl+q(close Nucleus). You might also need to make custom resolutions in your AMD/Nvidia settings";
Game.PauseBetweenStarts = 25;
Game.UseNucleusEnvironment = true;
Game.UserProfileConfigPath = "AppData\\Local\\GoatOfDuty\\Saved\\Config";
Game.UserProfileSavePath = "AppData\\Local\\GoatOfDuty\\Saved\\SaveGames";

Game.SupportsMultipleKeyboardsAndMice = true;

Game.HookSetCursorPos = true;
Game.HookGetCursorPos = true;
Game.HookGetKeyState = true;
Game.HookGetAsyncKeyState = true;
Game.HookGetKeyboardState = true;
Game.HookFilterRawInput = true;
Game.HookFilterMouseMessages = true;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = true;

Game.SendNormalMouseInput = true;
Game.SendNormalKeyboardInput = true;
Game.SendScrollWheel = true;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = true;
Game.HookReRegisterRawInputMouse = true;
Game.HookReRegisterRawInputKeyboard = true;
Game.DrawFakeMouseCursor = true;
Game.LockInputAtStart = true;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  var Args = (Context.Args = " -windowed " + " -nosplash " + " -ResX= " + Context.Width + " -ResY= " + Context.Height);

  Context.StartArguments = Args;
};
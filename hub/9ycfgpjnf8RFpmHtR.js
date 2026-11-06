Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Tue Mar 10 2020 08:26:14 GMT+0000 (UTC).
Hub.Handler.Id = "9ycfgpjnf8RFpmHtR";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.KillMutex = ["UnrealEngine3_3"];
Game.DirSymlinkExclusions = ["Binaries"];
Game.FileSymlinkExclusions = ["steam_appid.txt"];
Game.GameName = "Damnation";
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "damngame.exe";
Game.SteamID = "12790";
Game.GUID = "Damnation";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.BinariesFolder = "Binaries";
Game.NeedsSteamEmulation = false;
Game.CreateSteamAppIdByExe = true;
Game.LauncherTitle = "";
Game.SupportsPositioning = true;
Game.ForceFinishOnPlay = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Damnation";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.FakeFocus = true;
Game.HookFocus = true;
Game.SetForegroundWindowElsewhere = true;
Game.PauseBetweenStarts = 35;
Game.SetWindowHookStart = true;
Game.ResetWindows = true;
Game.UserProfileSavePath = "Documents\\My Games\\Damnation\\DamnGame\\SaveData";
Game.Description =
  "Create and Join LAN games. If you use keyboards and mice after all join the same game press the END key to lock the input for all instances to have their own cursor. Press the END key again to unlock the input.";

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
Game.DrawFakeMouseCursor = false;
Game.LockInputAtStart = false;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  var Args = (Context.Args = " -windowed " + " -nosplash " + "-nostartupmovies" + " -steam " + " -ResX= " + Context.Width + " -ResY= " + Context.Height);

  Context.StartArguments = Args;
};

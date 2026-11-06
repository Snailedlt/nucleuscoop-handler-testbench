Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sat Jun 13 2020 00:53:47 GMT+0000 (UTC).
Hub.Handler.Id = "YytjQmPsvm5dQWzpi";
Hub.Maintainer.Name = "LineOf7s";
Hub.Maintainer.Id = "zYddaTLp6ucHDooMz";

Game.KillMutex = ["WorldInConflict_Duplicate_App_Detection"];
Game.NeedsSteamEmulation = false;
Game.UseNucleusEnvironment = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "wic.exe";
Game.SteamID = "21910";
Game.GUID = "World In Conflict";
Game.GameName = "World in Conflict: Complete Edition";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.BinariesFolder = "";
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "World in Conflict";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.FakeFocus = true;
Game.HookFocus = true;
Game.UserProfileConfigPath = "Documents\\World in Conflict";
Game.UserProfileSavePath = "Documents\\World in Conflict\\Savegames";
Game.Description =
  "Connect the instances via LAN, script made for latest GOG version of the game. Don't click on anything until all instances position and resize correctly. Press the END key in your keyboard to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances.";
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
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = true;
Game.LockInputAtStart = true;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.Documents) + "\\World in Conflict\\Game Options.txt";
  var dict = ["17|myWidth " + Context.Width, "18|myHeight " + Context.Height, "35|myFullscreenFlag 0"];
  Context.ReplaceLinesInTextFile(txtPath, dict);
};
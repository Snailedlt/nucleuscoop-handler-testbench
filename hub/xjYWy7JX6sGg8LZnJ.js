Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Fri Apr 24 2020 03:54:21 GMT+0000 (UTC).
Hub.Handler.Id = "xjYWy7JX6sGg8LZnJ";
Hub.Maintainer.Name = "The Shnazberry";
Hub.Maintainer.Id = "sBteBrsSMrrE7gMjj";

Game.DirSymlinkExclusions = ["config"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt"];
Game.FileSymlinkCopyInstead = ["config\\duskworld.ini"];
Game.GameName = "Duskworld";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.SupportsKeyboard = false;
Game.ExecutableName = "Duskworld.exe";
Game.GUID = "Duskworld";
Game.MaxPlayers = 12;
Game.MaxPlayersOneMonitor = 6;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = false;
Game.SupportsPositioning = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Dusk";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.FakeFocus = true;
Game.HookFocus = true;
Game.ResetWindows = true;
Game.Description =
  "Start up the game, go through the prompts as normal. Set up a character if you like. When ready to play, have 1 person host, make sure to check IP/LAN game. To connect to the host, open the console (tilde) and enter 'connect localhost'";
Game.PauseBetweenStarts = 20;
Game.PromptBetweenInstances = true;

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

Game.SendNormalMouseInput = true;
Game.SendNormalKeyboardInput = true;
Game.SendScrollWheel = true;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.DrawFakeMouseCursor = false;
Game.LockInputAtStart = true;
Game.LockInputToggleKey = 0x23;

Game.HookReRegisterRawInput = true;
Game.HookReRegisterRawInputMouse = true;
Game.HookReRegisterRawInputKeyboard = false;
Game.HookMouseVisibility = true;

Game.Play = function() {
  var Args = (Context.Args = " -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height);
  Context.StartArguments = Args;

  var config = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\config\\duskworld.ini";
  var dict = ["72|fullscreen = 0"];
  Context.ReplaceLinesInTextFile(config, dict);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\David Szymanski\\Dusk", "Screenmanager Is Fullscreen mode_h3981298716", 3, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\David Szymanski\\Dusk", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\David Szymanski\\Dusk", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);
};
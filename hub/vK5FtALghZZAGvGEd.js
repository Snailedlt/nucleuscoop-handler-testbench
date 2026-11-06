Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Apr 25 2022 11:16:34 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "vK5FtALghZZAGvGEd";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["Content"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["Deadburg.exe.config", "Steamworks.NET.xml"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Deadburg.exe";
Game.SteamID = "671640";
Game.GUID = "Deadburg";
Game.GameName = "Deadburg";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Dead burg";
Game.WindowStyleValues = ["~0xC00000", "~0x40000", "~0x20000000", "~0x20000", "~0x80000", "0x40000000"];
Game.ExtWindowStyleValues = ["~0x00000001", "~0x00000200", "~0x00020000"];
//Game.EnableWindows = true;
Game.FakeFocus = true;
Game.FakeFocusInterval = 10000;
Game.SendFakeFocusMsg = true;
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "Documents\\SavedGames\\Deadburg";
Game.Description =
  "IMPORTANT: Make sure you host and start a multiplayer game in the first instance before opening the next one for the instances to resize correctly. Lower graphics settings in the game display settings per instance and apply to improve performance but do not disable the fullscreen option, alt-tab to the Nucleus app window if you get uneven fps in-game. Do not click on an instance when the game is on the title screen or the gamepad will not get assigned by the game. To avoid stretching make sure each instance is focused before Nucleus resizes it. Do not use CTRL+T in-game or the instances will resize again on their own. Set your monitor scale lower or to 100% if you get resizing issues even after following these notes.";
Game.PromptBetweenInstances = true;
Game.PauseBetweenProcessGrab = 1;
Game.PauseBetweenStarts = 35;

//USS deprecated options:

Game.HookSetCursorPos = true;
Game.HookGetCursorPos = true;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = false;
Game.HookGetKeyboardState = false;
Game.HookFilterRawInput = false;
Game.HookFilterMouseMessages = false;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = false;
Game.InjectHookXinput = false;

Game.SendNormalMouseInput = false;
Game.SendNormalKeyboardInput = false;
Game.SendScrollWheel = false;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;
Game.GamePlayBeforeGameSetup = true;

Game.Play = function() {
  if (Context.HasKeyboardPlayer == true) {
  } else {
    Game.SupportsMultipleKeyboardsAndMice = true;
    Game.HookSetCursorPos = true;
    Game.HookGetCursorPos = true;
  }
};
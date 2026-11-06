Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Aug 02 2021 23:25:54 GMT+0000 (UTC).
Hub.Handler.Id = "iCu8b9gyG5cAHdGzT";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["Operation Tango_Data"];
Game.DirSymlinkExclusions = ["Operation Tango_Data\\Plugins\\x86_64"];
Game.FileSymlinkExclusions = ["steam_appid.txt"];
Game.GameName = "Operation: Tango";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "Operation Tango.exe";
Game.CreateSteamAppIdByExe = true;
Game.SteamID = "1335790";
Game.GUID = "Operation Tango";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 2;
Game.UseGoldberg = false;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Operation Tango";
Game.FakeFocus = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput1_4.dll", "xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.BlockRawInput = false;
Game.UserProfileSavePath = "AppData\\LocalLow\\Clever-Plays\\Operation Tango";
Game.Description =
  "Controllers only. Create a room in the first instance then join in the other by writing the code that shows in the first, click or alt-tab to an instance to write on it. Using a different monitor per player is recommended for this game. Reduce graphics settings in your main game to improve performance.";
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 30;

Game.SupportsMultipleKeyboardsAndMice = false;

Game.HookSetCursorPos = true;
Game.HookGetCursorPos = true;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = false;
Game.HookGetKeyboardState = false;
Game.HookFilterRawInput = false;
Game.HookFilterMouseMessages = true;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = false;

Game.SendNormalMouseInput = true;
Game.SendNormalKeyboardInput = false;
Game.SendScrollWheel = false;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;
Game.LockInputAtStart = false;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  var Args = (Context.Args = " -screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height);

  Context.StartArguments = Args;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Clever-Plays\\Operation Tango", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Clever-Plays\\Operation Tango", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Clever-Plays\\Operation Tango", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Clever-Plays\\Operation Tango", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Clever-Plays\\Operation Tango", "Setting_FullScreen_h3938212147", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Clever-Plays\\Operation Tango", "Setting_ResolutionHeight_h849408733", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Clever-Plays\\Operation Tango", "Setting_ResolutionWidth_h41022500", Context.Width, Nucleus.RegType.DWord);

  if (Context.HasKeyboardPlayer == true) {
  } else {
    Game.SupportsMultipleKeyboardsAndMice = true;
  }
};
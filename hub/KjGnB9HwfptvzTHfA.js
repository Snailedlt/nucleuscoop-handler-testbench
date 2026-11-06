Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sat Jul 31 2021 02:22:53 GMT+0000 (UTC).
Hub.Handler.Id = "KjGnB9HwfptvzTHfA";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["Castle Story_Data"];
Game.DirSymlinkExclusions = [
  //"Castle Story_Data\\Plugins",
  "Info\\UserSettings"
];
Game.FileSymlinkExclusions = ["steam_appid.txt"];
Game.FileSymlinkCopyInstead = ["Current.json", "Default.json"];
Game.GameName = "Castle Story";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Castle Story.exe";
Game.SteamID = "227860";
Game.GUID = "Castle Story";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseGoldberg = false;
Game.CreateSteamAppIdByExe = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Castle Story";
Game.FakeFocus = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.BlockRawInput = false;
Game.Description =
  "Multiple keyboards and mice only as the game lacks native gamepad support. Create a multiplayer lobby in one instance and you can join in the others via LAN. Press the END key to unlock the input. You can use CTRL+Q to close Nucleus and all its instances.";
Game.PauseBetweenProcessGrab = 5;
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
  var Args = (Context.Args = " -screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height);

  Context.StartArguments = Args;

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Info\\UserSettings\\Current.json";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, '    "pauseOnFocusLost"', Nucleus.SearchType.StartsWith) + '|    "pauseOnFocusLost": false,',
    Context.FindLineNumberInTextFile(txtPath, '    "fullscreen"', Nucleus.SearchType.StartsWith) + '|    "fullscreen": false,',
    Context.FindLineNumberInTextFile(txtPath, '    "screenResolutionX"', Nucleus.SearchType.StartsWith) + '|    "screenResolutionX": ' + Context.Width + ",",
    Context.FindLineNumberInTextFile(txtPath, '    "screenResolutionY"', Nucleus.SearchType.StartsWith) + '|    "screenResolutionY": ' + Context.Height + ","
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Sauropod Studio\\Castle Story", "FullScreen_h3418622618", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Sauropod Studio\\Castle Story", "Screenmanager Is Fullscreen mode_h3981298716", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Sauropod Studio\\Castle Story", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Sauropod Studio\\Castle Story", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);
};
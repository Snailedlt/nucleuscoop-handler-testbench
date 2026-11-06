Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Mon Apr 03 2023 03:12:56 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "GXCwjSrmvJJqt3nzp";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

Game.ExecutableContext = ["build.exe"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "xinput1_3.dll", "DN3DLauncher.exe"];
Game.FileSymlinkCopyInstead = ["duke3d.cfg", "duke3d-local.cfg"];
Game.ExecutableName = "duke3d.exe";
Game.LauncherExe = "DN3DLauncher.exe";
Game.LauncherExeIgnoreFileCheck = true;
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.SteamID = "225140";
Game.BinariesFolder = "bin";
Game.GUID = "Duke Nukem 3D ME";
Game.GameName = "Duke Nukem 3D: Megaton Edition";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.LauncherTitle = "";
Game.HideTaskbar = true;
Game.DontRemoveBorders = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Duke Nukem 3D Atomic Edition 1.4.9 STABLE";
Game.HasDynamicWindowTitle = true;
Game.FakeFocus = true;
Game.FakeFocusInterval = 40000;
Game.SendFakeFocusMsg = true;
Game.FakeFocusSendActivateIgnoreKB = true;
Game.HookFocus = true;
Game.NotTopMost = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Description =
  "Quickly select the desired episode in the launcher for each instance as it pops up. Players can host and join via the normal multiplayer menu. After all instances have opened, resized, and repositioned press the END key to lock input. Press the END key again to unlock the input. You can also use CTRL+Q to close Nucleus and all its instances.";
Game.PauseBetweenContextAndLaunch = 10;
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 25;

Game.SupportsMultipleKeyboardsAndMice = true;

Game.HookSetCursorPos = true;
Game.HookGetCursorPos = true;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = false;
Game.HookGetKeyboardState = false;
Game.HookFilterRawInput = true;
Game.HookFilterMouseMessages = true;
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
Game.DrawFakeMouseCursorForControllers = false;
Game.UpdateFakeMouseWithInternalInput = false;
Game.LockInputAtStart = false;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\DN3DLauncher.exe");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "DN3DLauncher.exe");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\gameroot\\duke3d-local.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "ScreenMode =", Nucleus.SearchType.StartsWith) + "|ScreenMode = 0",
    Context.FindLineNumberInTextFile(txtPath, "ScreenWidth =", Nucleus.SearchType.StartsWith) + "|ScreenWidth = " + Context.Width,
    Context.FindLineNumberInTextFile(txtPath, "ScreenHeight =", Nucleus.SearchType.StartsWith) + "|ScreenHeight = " + Context.Height,
    Context.FindLineNumberInTextFile(txtPath, "GLTextureMode =", Nucleus.SearchType.StartsWith) + "|GLTextureMode = 2",
    Context.FindLineNumberInTextFile(txtPath, "VerticalSync =", Nucleus.SearchType.StartsWith) + "|VerticalSync = 0"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\gameroot\\duke3d.cfg";
  if (Context.PlayerID > 0) {
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "MusicToggle =", Nucleus.SearchType.StartsWith) + "|MusicToggle = 0",
      Context.FindLineNumberInTextFile(txtPath, "VoiceToggle =", Nucleus.SearchType.StartsWith) + "|VoiceToggle = 1",
      Context.FindLineNumberInTextFile(txtPath, "AmbienceToggle =", Nucleus.SearchType.StartsWith) + "|AmbienceToggle = 1"
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  if (Context.IsKeyboardPlayer) {
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "UseJoystick =", Nucleus.SearchType.StartsWith) + "|UseJoystick = 0",
      Context.FindLineNumberInTextFile(txtPath, "UseMouse =", Nucleus.SearchType.StartsWith) + "|UseMouse = 1",
      Context.FindLineNumberInTextFile(txtPath, "Inventory =", Nucleus.SearchType.StartsWith) + '|Inventory = "F"',
      Context.FindLineNumberInTextFile(txtPath, "Quick_Kick =", Nucleus.SearchType.StartsWith) + '|Quick_Kick = "Q"'
    ];
  } else {
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "UseJoystick =", Nucleus.SearchType.StartsWith) + "|UseJoystick = 1",
      Context.FindLineNumberInTextFile(txtPath, "UseMouse =", Nucleus.SearchType.StartsWith) + "|UseMouse = 0"
    ];
  }
  Context.ReplaceLinesInTextFile(txtPath, dict);
};
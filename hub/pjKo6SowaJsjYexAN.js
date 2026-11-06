Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Mon Jul 26 2021 06:41:47 GMT+0000 (UTC).
Hub.Handler.Id = "pjKo6SowaJsjYexAN";
Hub.Maintainer.Name = "Genjuro_Kibagami";
Hub.Maintainer.Id = "6s2Fuz9unXTtH453m";

Game.ExecutableContext = ["bink2w32.dll"];
Game.DirSymlinkExclusions = ["videos"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "xinput1_3.dll", "Gearbox_logo.bk2"];
Game.FileSymlinkCopyInstead = ["DUKE3D.CFG"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = true;
Game.UseGoldberg = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "duke3d.exe";
Game.SteamID = "434050";
Game.GUID = "Duke Nukem 3D";
Game.GameName = "Duke Nukem 3D: 20th Anniversary World Tour";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Duke3D : Build 1435846";
Game.HasDynamicWindowTitle = true;
Game.FakeFocus = true;
Game.FakeFocusInterval = 40000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.UseAlpha8CustomDll = true;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput9_1_0.dll"];
Game.UserProfileSavePath = "AppData\\Local\\Gearbox\\DukeNukem";
Game.Description =
  "Set your main game to windowed before running this. Players can connect via the normal multiplayer menu. If you use keyboards and mice after the instances open press the END key to lock the input for all instances to have their own cursor. Press the END key again to unlock the input. You can also use CTRL+Q to close Nucleus and all its instances. Navigate the menus using the keyboard in kb/m instances. You can access your saves per instance after the script first launch, click game options/open user profile save path in Nucleus UI.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenStarts = 25;

Game.SupportsMultipleKeyboardsAndMice = true;

Game.HookSetCursorPos = true;
Game.HookGetCursorPos = true;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = false;
Game.HookGetKeyboardState = false;
Game.HookFilterRawInput = false;
Game.HookFilterMouseMessages = false;
Game.HookUseLegacyInput = true;
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
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\DUKE3D.CFG";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "ScreenMode =", Nucleus.SearchType.StartsWith) + "|ScreenMode = 1",
    Context.FindLineNumberInTextFile(txtPath, "ScreenWidth =", Nucleus.SearchType.StartsWith) + "|ScreenWidth = " + Context.Width,
    Context.FindLineNumberInTextFile(txtPath, "ScreenHeight =", Nucleus.SearchType.StartsWith) + "|ScreenHeight = " + Context.Height
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);
};
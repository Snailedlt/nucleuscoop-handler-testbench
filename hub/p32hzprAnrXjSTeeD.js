Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Mon May 18 2020 21:33:34 GMT+0000 (UTC).
Hub.Handler.Id = "p32hzprAnrXjSTeeD";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["BINARIES\\WIN32"];
Game.FileSymlinkExclusions = ["HUNTED.exe"];
Game.FileSymlinkCopyInstead = ["P4DFTRE.DLL"];
Game.ExecutableContext = ["APEX_RELEASE.DLL"];
Game.RenameAndOrMoveFiles = ["BINARIES\\WIN32\\P4DFTRE.DLL|BINARIES\\WIN32\\HUNTED.exe"];
Game.NeedsSteamEmulation = false;
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "hunted.exe";
Game.SteamID = "22450";
Game.GUID = "Hunted";
Game.GameName = "Hunted: The Demon's Forge";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 4;
Game.SupportsPositioning = true;
Game.ForceFinishOnPlay = true;
Game.BinariesFolder = "BINARIES\\WIN32";
Game.HideTaskbar = false;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Hunted";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.FakeFocus = true;
Game.HookFocus = true;
Game.UserProfileConfigPath = "Documents\\My Games\\Hunted\\DFGame\\Config";
Game.UserProfileSavePath = "Documents\\My Games\\Hunted\\DFGame\\SaveData";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "Create a multiplayer LAN game and the other instance can join. Press the END key in your keyboard to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances. You can access each instance save in the app, after the first launch click game options/open user profile save path in the UI.";
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
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;
Game.LockInputAtStart = true;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  var Args = (Context.Args = " -windowed " + " -AlwaysFocus " + " -nosplash " + " -ResX= " + Context.Width + " -ResY= " + Context.Height);

  Context.StartArguments = Args;

  var savePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\DFEngine.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("URL", "Name", Context.Nickname),
    new Nucleus.IniSaveInfo("SystemSettings", "Fullscreen", "False"),
    new Nucleus.IniSaveInfo("SystemSettings", "ResX", Context.Width),
    new Nucleus.IniSaveInfo("SystemSettings", "ResY", Context.Height),
    new Nucleus.IniSaveInfo("Engine.Engine", "bPauseOnLossOfFocus", "FALSE")
  ]);

  var savePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\DFGame.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("DefaultPlayer", "Name", Context.Nickname)]);
};
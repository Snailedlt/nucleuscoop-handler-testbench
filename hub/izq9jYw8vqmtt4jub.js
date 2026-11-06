Hub.Handler.Version = 5; // Released at https://hub.splitscreen.me/ on Wed Aug 12 2026 09:01:59 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "izq9jYw8vqmtt4jub";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Manual/Current Settings", "Yes", "No"];
Game.AddOption("Disable music for all instances but the first one?", '"Manual/Current Settings" will not touch the instances current settings.', "Mus", answers1);

Game.ExecutableContext = ["Barotrauma.dll"];
Game.DirSymlinkCopyInstead = ["Mods"];
Game.DirSymlinkCopyInsteadIncludeSubFolders = true;
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "local_save.txt"];
Game.FileSymlinkCopyInstead = ["config_player.xml"];

//		[Game Info]
Game.ExecutableName = "Barotrauma.exe";
Game.SteamID = "602960";
Game.GUID = "Barotrauma";
Game.GameName = "Barotrauma";
Game.MaxPlayersOneMonitor = 4;
Game.MaxPlayers = 16;

//		[File System]
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.KeepSymLinkOnExit = false;
Game.CreateSteamAppIdByExe = true;
Game.UseNucleusEnvironment = true;
Game.UserProfileSavePath = "AppData\\Local\\Daedalic Entertainment GmbH\\Barotrauma";
Game.UserProfileConfigPath = "AppData\\Roaming\\GSE Saves\\602960";
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileConfigPathNoCopy = true;

//		[Hooks]
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Barotrauma";
Game.SetWindowHookStart = true;

//		[Input lines]
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.CustomDllEnabled = false;

//		[Handler]
Game.HandlerInterval = 100;
Game.PauseBetweenStarts = 25;
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenProcessGrab = 5;

//		[Launch Parameters]

Game.StartArguments = "-skipintro";
Game.Description =
  "Multiple keyboards/mice only as the game lacks native gamepad support. Edit the UI scale inside the game options. Host a server in one instance and join in the others through the server browser. After all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own working cursor, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. Workshop mods should work (tested only submarines), you must enable them in the game options for ALL players.";

//		[Multiple Keyboards/Mice lines]

//USS deprecated options:

Game.HookSetCursorPos = false;
Game.HookGetCursorPos = false;
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

//ProtoInput:

Game.SupportsMultipleKeyboardsAndMice = true;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = true;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = true;
Game.LockInputToggleKey = 0x23;

Game.ProtoInput.RenameHandlesHook = false;
Game.ProtoInput.RenameHandles = [];
Game.ProtoInput.RenameNamedPipes = [];

Game.ProtoInput.RegisterRawInputHook = true;
Game.ProtoInput.GetRawInputDataHook = true;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = true;
Game.ProtoInput.SetCursorPosHook = true;
Game.ProtoInput.GetKeyStateHook = true;
Game.ProtoInput.GetAsyncKeyStateHook = true;
Game.ProtoInput.GetKeyboardStateHook = true;
Game.ProtoInput.CursorVisibilityHook = true;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = true;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;
Game.ProtoInput.DontShowCursorWhenImageUpdated = true;

Game.ProtoInput.RawInputFilter = true;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = true;
Game.ProtoInput.WindowActivateFilter = true;
Game.ProtoInput.WindowActvateAppFilter = true;
Game.ProtoInput.MouseWheelFilter = true;
Game.ProtoInput.MouseButtonFilter = true;
Game.ProtoInput.KeyboardButtonFilter = true;

Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseOpenXinput = false;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;

Game.ProtoInput.EnableFocusMessageLoop = true;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 1000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008, 0x02a3, 0x02a1]; // Blocks WM_KILLFOCUS, WM_MOUSEHOVER and WM_MOUSELEAVE.

Game.Play = function() {
  /* This will edit the game config files to let the game start with the right settings.
   It will also start a PowerShell script to make the workshop mods (tested only submarines) work with Goldberg.*/

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\config_player.xml";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "  pauseonfocuslost", Nucleus.SearchType.StartsWith) + '|  pauseonfocuslost="false"',
    Context.FindLineNumberInTextFile(txtPath, "  crossplaychoice", Nucleus.SearchType.StartsWith) + '|  crossplaychoice="Disabled"',
    Context.FindLineNumberInTextFile(txtPath, "    width", Nucleus.SearchType.StartsWith) + '|    width="' + Context.Width + '"',
    Context.FindLineNumberInTextFile(txtPath, "    height", Nucleus.SearchType.StartsWith) + '|    height="' + Context.Height + '"',
    Context.FindLineNumberInTextFile(txtPath, "    displaymode", Nucleus.SearchType.StartsWith) + '|    displaymode="Windowed"',
    Context.FindLineNumberInTextFile(txtPath, "    muteonfocuslost", Nucleus.SearchType.StartsWith) + '|    muteonfocuslost="false"',
    Context.FindLineNumberInTextFile(txtPath, "    name=", Nucleus.SearchType.StartsWith) + '|    name="' + Context.Nickname + '"'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var SW = Context.GetFolder(Nucleus.Folder.InstancedGameFolder);

  Context.CopyFolder(Context.ScriptFolder + "\\steam_settings", SW + "\\steam_settings");

  var savePath = (Context.SavePath = SW + "\\steam_api64.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "steam_api64.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = SW + "\\steam_settings\\configs.user.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("user::general", "account_name", Context.Nickname),
    new Nucleus.IniSaveInfo("user::general", "account_steamid", Context.PlayerSteamID),
    new Nucleus.IniSaveInfo("user::general", "language", Context.SteamLang)
  ]);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ModConverter.ps1");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "ModConverter.ps1");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\start.bat");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "start.bat");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\start.bat"], false, 0, false, false);

  var mus = Context.Options["Mus"];

  if (mus == "Yes") {
    if (Context.PlayerID > 0) {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\config_player.xml";
      var dict = [Context.FindLineNumberInTextFile(txtPath, "    musicvolume", Nucleus.SearchType.StartsWith) + '|    musicvolume="0"'];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }
  }

  if (mus == "No") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\config_player.xml";
    var dict = [Context.FindLineNumberInTextFile(txtPath, "    musicvolume", Nucleus.SearchType.StartsWith) + '|    musicvolume="0.5"'];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
};
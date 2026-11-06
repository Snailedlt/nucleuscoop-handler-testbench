Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Wed May 01 2024 06:53:59 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "4nPTYAvoGaJRYxdhv";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

//var answers1 = ["No", "Yes"];
//Game.AddOption("Do you want to use NFSOR to play online?", "Disables LAN play.", "Online", answers1);

Game.FileSymlinkExclusions = [
  "dinput8.dll",
  "NFSOR.asi",
  "NFSU_XtendedInput.asi",
  "NFSU_XtendedInput.ini",
  "NFSU2ExtraOptions.asi",
  "NFSU2ExtraOptionsSettings.ini",
  "NFSUnderground2.WidescreenFix.asi",
  "NFSUnderground2.WidescreenFix.dat",
  "NFSUnderground2.WidescreenFix.ini"
];
Game.FileSymlinkCopyInstead = ["server.cfg", "server.dll"];
//Game.DirExclusions = ["scripts"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "SPEED2.exe";
Game.GUID = "Need for Speed Underground 2";
Game.GameName = "Need for Speed: Underground 2";
Game.MaxPlayers = 6;
Game.MaxPlayersOneMonitor = 6;
Game.SupportsPositioning = true;
Game.HookFocus = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "NFS Underground 2";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Local\\NFS Underground 2";
Game.Description =
  'Wait until all instances have resized and respositioned. Profiles are stored in your default user folder, you can load existing profiles if you like. Select or create a profile for each player, make sure each player is logged in as a different profile. All items are unlocked so each player can customize to their liking. "Host" a LAN server with each instance, using the keyboard and mouse to type a name for each player, make sure each player has a different name. This will put you all into the same LAN server. Once all players on in the server and can see the lobby, host a game with one player and join with the rest. Supports mods but use mods at your own risk in case they break LAN support or cause crashes.';
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 15;

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

Game.SendNormalMouseInput = false;
Game.SendNormalKeyboardInput = false;
Game.SendScrollWheel = false;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.ProtoInput.RenameHandlesHook = false;
Game.ProtoInput.RenameHandles = [];
Game.ProtoInput.RenameNamedPipes = [];

Game.ProtoInput.RegisterRawInputHook = false;
Game.ProtoInput.GetRawInputDataHook = false;
Game.ProtoInput.MessageFilterHook = false;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = false;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;
Game.ProtoInput.DontShowCursorWhenImageUpdated = false;

Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.WindowActvateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = false;
Game.ProtoInput.MouseButtonFilter = false;
Game.ProtoInput.KeyboardButtonFilter = false;

Game.ProtoInput.SendMouseWheelMessages = false;
Game.ProtoInput.SendMouseButtonMessages = false;
Game.ProtoInput.SendMouseMovementMessages = false;
Game.ProtoInput.SendKeyboardButtonMessages = false;
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;

Game.ProtoInput.EnableFocusMessageLoop = true;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 1000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.BlockedMessages = [0x0008];

Game.Play = function() {
  System.IO.Directory.CreateDirectory(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts");

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dinput8.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dinput8.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  /*var online = Context.Options["Online"];

  if (online == "Yes") {
	var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSOR.asi");
	var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "NFSOR.asi");
	System.IO.File.Copy(savePkgOrigin, savePath, true);

	var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dinput8.dll");
	var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dinput8o.dll");
	System.IO.File.Copy(savePkgOrigin, savePath, true);
  }*/

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSU2ExtraOptions.asi");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "NFSU2ExtraOptions.asi");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSU2ExtraOptionsSettings.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "NFSU2ExtraOptionsSettings.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSUnderground2.WidescreenFix.asi");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "NFSUnderground2.WidescreenFix.asi");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSUnderground2.WidescreenFix.dat");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "NFSUnderground2.WidescreenFix.dat");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSUnderground2.WidescreenFix.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "NFSUnderground2.WidescreenFix.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSU_XtendedInput.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "NFSU_XtendedInput.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSU_XtendedInput.asi");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "NFSU_XtendedInput.asi");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSUnderground2.WidescreenFix.ini";

  Context.ModifySaveFile(cfgPath, cfgPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("MAIN", "ResX ", " " + Context.Width), new Nucleus.IniSaveInfo("MAIN", "ResY ", " " + Context.Height)]);

  var servPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\server.cfg";
  Context.ModifySaveFile(servPath, servPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("SERVER", "PORT", "990" + Context.PlayerID)]);

  var exPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSU2ExtraOptionsSettings.ini";

  if (Context.PlayerID > 0) {
    Context.ModifySaveFile(exPath, exPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Misc", "EnableMusic ", " 0")]);
  } else {
    Context.ModifySaveFile(exPath, exPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Misc", "EnableMusic ", " 1")]);
  }
};
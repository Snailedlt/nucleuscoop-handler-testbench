Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Thu May 09 2024 09:12:00 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "FGcjwhrtdrLaqeiKR";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

var answers1 = ["Yes", "No"];
Game.AddOption("Skip intro?", "Skipping intro may break certain mods.", "Skipintro", answers1);
var answers2 = ["dgVoodoo 2", "DxWrapper"];
Game.AddOption(
  "Which graphics wrapper do you want to use?",
  "DgVoodoo 2 supports higher render resolution, but if you experience crashing try DxWrapper. DxWrapper does not support custom resolutions and after changing resolutions in game you will have to press CTRL+R to refresh windows.",
  "GfxWrap",
  answers2
);

Game.FileSymlinkExclusions = ["data.cfg", "D3DImm.dll", "DDraw.dll", "dgVoodooCpl.exe", "dgVoodoo.conf", "dinput.dll", "dxwrapper.dll", "dxwrapper.ini"];
Game.FileSymlinkCopyInstead = ["base.x-e", "settings.cfg"];
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "amrts.exe";
Game.SteamID = "694500";
Game.GUID = "Army Men RTS";
Game.GameName = "Army Men RTS";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.HookInit = true;
Game.HookFocus = true;
Game.PreventWindowDeactivation = true;
Game.HideTaskbar = true;
Game.SetWindowHookStart = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Army Men RTS";
Game.Hook.DInputForceDisable = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.Description =
  "Once all instances have resized and respositioned, press END to lock input to restrict mouse and keyboards to their respective instances. Players must manually select a resolution in settings to set the aspect ratio in each instance, if using dgVoodoo 2 the in game resolution does not affect render resolution, only the aspect ratio. If you want to use custom aspect ratios you must add a custom resolution below 1280x1024 in your GPU control panel so that you can select it in game. For example: if you want to support vertical splitscreen on a 16:9 monitor you need to add an 8:9 resolution such as 640x720 (Unfortunately this does not support 32:9 resolutions). Host a multiplayer game with one instance and join with the rest. You can press END again to unlock input. While input is unlocked you can press CTRL+Q to close Nucleus and all of its instances. If instances are not launching properly try running Nucleus as administrator.";
Game.PauseBetweenStarts = 10;

//USS deprecated options:

Game.SupportsMultipleKeyboardsAndMice = false;
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

//ProtoInput:

Game.SupportsMultipleKeyboardsAndMice = true;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = true;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = false;
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
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = false;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;

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

Game.ProtoInput.EnableFocusMessageLoop = false;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.BlockedMessages = [0x0008];

Game.Play = function() {
  var userPath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\user");
  System.IO.Directory.CreateDirectory(userPath);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\user\\data.cfg");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "data.cfg");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  if (Context.PlayerID > 0) {
    Context.PatchFile(
      System.IO.Path.Combine(Context.RootFolder, "user\\data.cfg"),
      System.IO.Path.Combine(Context.RootFolder, "user\\data.cfg"),
      [0x63, 0x02, 0x00, 0x00, 0x00, 0x3f],
      [0x63, 0x02, 0x00, 0x00, 0x00, 0x00]
    );
  }

  Context.PatchFile(
    System.IO.Path.Combine(Context.RootFolder, "user\\data.cfg"),
    System.IO.Path.Combine(Context.RootFolder, "user\\data.cfg"),
    [0x50, 0x6c, 0x61, 0x79, 0x65, 0x72, 0x31],
    [0x50, 0x6c, 0x61, 0x79, 0x65, 0x72, 0x30 + (Context.PlayerID + 1)]
  );

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dinput.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dinput.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var wrap = Context.Options["GfxWrap"];

  if (wrap == "dgVoodoo 2") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dgVoodoo.conf");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dgVoodoo.conf");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\DDraw.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "DDrawDG.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\D3DImm.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "D3DImm.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var confPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dgVoodoo.conf";
    var dict = ["198|Resolution                          = h:" + Context.Width + ", v:" + Context.Height];
    Context.ReplaceLinesInTextFile(confPath, dict);
  }

  if (wrap == "DxWrapper") {
    /*var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\settings.cfg";
	if (Context.AspectRatioDecimal < 1.6) {
	  var dict = ["18|  CurrMode(11);"];
	} else {
	  var dict = ["18|  CurrMode(17);"];
	}
	Context.ReplaceLinesInTextFile(cfgPath, dict);*/

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dxwrapper.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dxwrapper.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dxwrapper.ini");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dxwrapper.ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ddraw.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "ddrawDX.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var skipintro = Context.Options["Skipintro"];

  if (skipintro == "Yes") {
    Context.PatchFile(
      System.IO.Path.Combine(Context.RootFolder, "base.x-e"),
      System.IO.Path.Combine(Context.RootFolder, "base.x-e"),
      [0x6e, 0x2e, 0x62, 0x69, 0x6b, 0x38],
      [0x6e, 0x2e, 0x62, 0x61, 0x6b, 0x38]
    );
  }
};
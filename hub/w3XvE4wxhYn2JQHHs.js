Hub.Handler.Version = 7; // Released at https://hub.splitscreen.me/ on Sun Apr 17 2022 10:04:08 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "w3XvE4wxhYn2JQHHs";
Hub.Maintainer.Name = "Perserveruz";
Hub.Maintainer.Id = "nFAYvHKj75jAFRAgt";

var answers = ["Yes", "No"];
Game.AddOption("Enable music only in the first instance?", "", "Mus", answers);
Game.FileSymlinkCopyInstead = ["config.wtf"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.KeepSymLinkOnExit = true;
Game.ExecutableName = "wow.exe";
Game.GUID = "World of Warcraft";
Game.GameName = "World of Warcraft";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "World of Warcraft";
Game.FakeFocus = true;
Game.HookFocus = false;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.DontRemoveBorders = true;
Game.DontResize = false;
Game.PauseBetweenProcessGrab = 30;
Game.Description =
  "This handler is for WoW vanilla version 1.12 and 1.16. Launch the desired number of instances. Once they have finished positioning and resizing, press the end key to lock input. For custom resolutions i.e. (1920x540), you will first need to add them in your graphic control panel. Enjoy!";

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
Game.LockInputAtStart = false;
Game.LockInputToggleKey = 0x23;

Game.SupportsMultipleKeyboardsAndMice = true;
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;
Game.ProtoInput.UseOpenXinput = false;

Game.ProtoInput.InjectStartup = true;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;
Game.ProtoInput.ExtendFakeCursorBounds = true;
Game.ProtoInput.RegisterRawInputHook = false;
Game.ProtoInput.GetRawInputDataHook = false;
Game.ProtoInput.MessageFilterHook = false;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = false;
Game.ProtoInput.DrawFakeCursor = true;
Game.ProtoInput.RawInputFilter = true;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.WindowActvateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = true;
Game.ProtoInput.MouseButtonFilter = true;
Game.ProtoInput.KeyboardButtonFilter = true;
Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;

Game.ProtoInput.EnableFocusMessageLoop = false;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008, 0x0006];
Game.ProtoInput.RenameHandlesHook = false;
Game.ProtoInput.RenameHandles = [];
Game.ProtoInput.RenameNamedPipes = [];

Game.Play = function() {
  var Args = (Context.Args = " -windowed ");
  Context.StartArguments = Args;

  if (!System.IO.Directory.Exists(Context.GetFolder(Nucleus.Folder.Documents) + "\\My Mods\\SpecialK\\Global")) {
    var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Mods\\SpecialK\\Global");
    System.IO.Directory.CreateDirectory(filePath);
  }

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\WTF\\config.wtf";
  var dict = [Context.FindLineNumberInTextFile(txtPath, "SET gxResolution", Nucleus.SearchType.StartsWith) + '|SET gxResolution "' + Context.Width + "x" + Context.Height + '"'];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var Mus = Context.Options["Mus"];
  if (Mus == "Yes") {
    if (Context.PlayerID == 0) {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\WTF\\config.wtf";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("MUSIC", "SET MusicVolume 1", "")]);
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("", "SET gxWindow 1", "")]);
    } else {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\WTF\\config.wtf";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("MUSIC", "SET MusicVolume 0", "")]);
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("", "SET gxWindow 1", "")]);
    }
  }
  if (Mus == "No") {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\WTF\\config.wtf";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("MUSIC", "SET MusicVolume 1", "")]);
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("", "SET gxWindow 1", "")]);
  }
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "SpecialK32.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "d3d9.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.Documents) + "\\My Mods\\SpecialK\\Global\\osd.ini")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Mods\\SpecialK\\Global\\osd.ini");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "osd.ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  } else {
    var txtPath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Mods\\SpecialK\\Global\\osd.ini";
    Context.ReplaceLinesInTextFile(txtPath, [Context.FindLineNumberInTextFile(txtPath, "Duration=", Nucleus.SearchType.StartsWith) + "|Duration=0.0"], "utf-8");
  }

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.ini";
  Context.ReplaceLinesInTextFile(
    txtPath,
    [
      Context.FindLineNumberInTextFile(txtPath, "OverrideRes=", Nucleus.SearchType.StartsWith) + "|OverrideRes=" + Context.Width + "x" + Context.Height + "",
      Context.FindLineNumberInTextFile(txtPath, "MinRes=", Nucleus.SearchType.StartsWith) + "|MinRes=" + Context.Width + "x" + Context.Height + "",
      Context.FindLineNumberInTextFile(txtPath, "MaxRes=", Nucleus.SearchType.StartsWith) + "|MaxRes=" + Context.Width + "x" + Context.Height + ""
    ],
    "utf-8"
  );

  Game.ProtoInput.OnInputLocked = function() {
    if (Context.HasKeyboardPlayer) {
      for (var i = 0; i < PlayerList.Count; i++) {
        var player = PlayerList[i];

        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);

        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);
      }
    }
  };
  Game.ProtoInput.OnInputUnlocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);

      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);
    }
  };
};
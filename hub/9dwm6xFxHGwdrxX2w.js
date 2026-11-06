Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sat May 27 2023 22:35:45 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "9dwm6xFxHGwdrxX2w";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes", "Only first instance"];
Game.AddOption(
  "Launch all instances under your Steam account?",
  "You won't be able to battle nor connect to the other instances if you use this option but you can make progress in single player in all instances this way (use a different save slot per instance) to unlock Steam achievements, then you can use the same save for all instances without this option for mp battles and trading, read the handler notes for how to move saves. Disable Steam Input for this game in Steam for controllers to work correctly.",
  "Steam",
  answers1
);

Game.ExecutableContext = ["cg.dll"];
Game.DirSymlinkExclusions = ["app_digister", "settings"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "winmm.dll", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["cg.dll", "cgGL.dll", "freetype.dll", "sdkencryptedappticket64.dll"];
Game.GameName = "Digimon Story Cyber Sleuth: Complete Edition";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Digimon Story CS.exe";
Game.SteamID = "1042550";
Game.GUID = "Digimon Story Cyber Sleuth Complete Edition";
Game.BinariesFolder = "app_digister";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Digimon Story Cyber Sleuth Complete Edition";
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.UserProfileSavePath = "AppData\\Local\\BANDAI NAMCO Entertainment\\Digimon Story Cyber Sleuth Complete Edition\\Saved\\SaveGames";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "IMPORTANT: Launch this with Steam opened. Go to the DigiLab to play mp battles, in the network battle panel select custom battle, create a room in one instance and join in the others using search room. You can access each instance save folder via Nucleus, after the first launch click game options/open user profile save path in the UI, you can even use your main game save in all instances if you copy its files between folders, make sure your main game is in windowed if you do that. If you use multiple keyboards/mice press the END key once to lock the input to restrict them correctly. Alt-tab to the Nucleus app window to balance fps.";
Game.KeepSymLinkOnExit = true;
Game.PauseBetweenProcessGrab = 3;
Game.PauseBetweenStarts = 25;

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

//ProtoInput:

Game.SupportsMultipleKeyboardsAndMice = true;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
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
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.SetWindowPosHook = false;
Game.ProtoInput.SetWindowStyleHook = false;

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
Game.ProtoInput.SendMouseMovementMessages = false;
Game.ProtoInput.SendKeyboardButtonMessages = true;
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.UseOpenXinput = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;
Game.ProtoInput.MultipleProtoControllers = false;

Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 8000;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; //Blocks WM_KILLFOCUS.

Game.Play = function() {
  var steam = Context.Options["Steam"];

  if (steam == "Yes") {
    var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "steam_api64.dll");
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\app_digister\\steam_api64.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (steam == "Only first instance") {
    if (Context.PlayerID == 0) {
      var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "steam_api64.dll");
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\app_digister\\steam_api64.dll");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }
  }

  if (steam == "No") {
  }
};
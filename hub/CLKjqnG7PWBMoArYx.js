Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Sat Nov 06 2021 08:43:24 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "CLKjqnG7PWBMoArYx";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["resources"];
Game.DirSymlinkCopyInstead = ["save"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "wayward.log"];
Game.FileSymlinkCopyInstead = [
  "chrome_100_percent.pak",
  "chrome_200_percent.pak",
  "d3dcompiler_47.dll",
  "discord-rpc.dll",
  "ffmpeg.dll",
  "greenworks-win64.node",
  "icudtl.dat",
  "launch_options.json",
  "libEGL.dll",
  "libGLESv2.dll",
  "resources.pak",
  "snapshot_blob.bin",
  "v8_context_snapshot.bin",
  "vk_swiftshader.dll",
  "vk_swiftshader_icd.json",
  "vulkan-1.dll",
  "wayward-napi-win-x64.node"
];
Game.DirSymlinkCopyInsteadIncludeSubFolders = true;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.GameName = "Wayward";
Game.SteamID = "379210";
Game.GUID = "Wayward";
Game.ExecutableName = "wayward.exe";
Game.MaxPlayersOneMonitor = 32;
Game.MaxPlayers = 32;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Wayward";
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.Description =
  "Disable Fullscreen in your main game before launching via Nucleus. Multiple keyboards/mice only as the game lacks native gamepad support. After all the instances have launched, resized and positioned correctly, press the END key to lock the input for all instances to have their own cursor. You need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input whe you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. Start an open multiplayer game in one instance and join in the others by writing localhost in the join field. Your saves per instance will save inside Nucleus content folder so be careful about deleting the Wayward Nucleus folder there.";
Game.KeepSymLinkOnExit = true;
Game.PauseBetweenProcessGrab = 5;
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
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = true;

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
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\launch_options.json";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, '	"fullscreen":', Nucleus.SearchType.StartsWith) + '|	"fullscreen": false,',
    Context.FindLineNumberInTextFile(txtPath, '	"maximized":', Nucleus.SearchType.StartsWith) + '|	"maximized": false,',
    Context.FindLineNumberInTextFile(txtPath, '	"width":', Nucleus.SearchType.StartsWith) + '|	"width": ' + Context.Width + ",",
    Context.FindLineNumberInTextFile(txtPath, '	"height":', Nucleus.SearchType.StartsWith) + '|	"height": ' + Context.Height + ",",
    Context.FindLineNumberInTextFile(txtPath, '	"borderless":', Nucleus.SearchType.StartsWith) + '|	"borderless": false,'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);
};
Hub.Handler.Version = 8; // Released at https://hub.splitscreen.me/ on Thu Dec 12 2024 18:25:50 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "CDH8YagisETM3ypeo";
Hub.Maintainer.Name = "PoundlandBacon";
Hub.Maintainer.Id = "AdiAjSyfZPMvu3a4M";

var answers1 = ["Yes", "No"];
Game.AddOption("Vsync", "", "vsync", answers1);
var answers2 = ["No", "Yes"];
Game.AddOption("Dynamic resolution", "", "dres", answers2);
var answers3 = ["60", "30"];
Game.AddOption("Dynamic resolution target fps", "", "drest", answers3);
Game.Description =
  "For multiple mice and keys press END to lock the input when both instances are at the main menu, then click the mouse button for each instance and wait a few seconds and the cursors should appear.";
Game.KillMutex = ["TITLE-39291D0A-900F-4c8d-B051-E0EDF94517A6CATA"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_api.dll", "steam_appid.txt"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.PlayerSteamIDs = ["76561199023125438", "76561199023125439", "76561199023125440", "76561199023125441"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "generationzero_f.exe";
Game.SteamID = "704270";
Game.GUID = "Generation Zero";
Game.GameName = "Generation Zero";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.StartArguments = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Generation Zero";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.PauseBetweenStarts = 30;
Game.SetForegroundWindowElsewhere = true;
Game.ToggleUnfocusOnInputsLock = true;

Game.SupportsMultipleKeyboardsAndMice = true;

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
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.InjectHookXinput = false;

Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.InjectStartup = true;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;
Game.ProtoInput.RegisterRawInputHook = true;
Game.ProtoInput.GetRawInputDataHook = true;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = true;
Game.ProtoInput.SetCursorPosHook = true;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = true;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = true;
Game.ProtoInput.RawInputFilter = true;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = true;
Game.ProtoInput.WindowActvateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = true;
Game.ProtoInput.MouseButtonFilter = true;
Game.ProtoInput.KeyboardButtonFilter = true;
Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;
Game.ProtoInput.EnableFocusMessageLoop = false;
// Game.ProtoInput.FocusLoopIntervalMilliseconds = 10;
// Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
// Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
// Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
// Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
// Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.BlockedMessages = [0x0008, 0x0006];
Game.ProtoInput.RenameHandlesHook = false;
Game.ProtoInput.RenameHandles = [];
Game.ProtoInput.RenameNamedPipes = [];
Game.LockInputAtStart = false;

Game.ProtoInput.OnInputLocked = function() {
  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];
    ProtoInput.DisableMessageBlock(player.ProtoInputInstanceHandle, 0x0006);
    ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, true, true, true);
    System.Threading.Thread.Sleep(1000);
    ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
    ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
    ProtoInput.EnableMessageBlock(player.ProtoInputInstanceHandle, 0x0006);
    ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
  }
};
Game.ProtoInput.OnInputUnlocked = function() {
  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
  }
};

Game.Play = function() {
  if (Context.PlayerID == 0) {
    var steamidnum = "76561199023125438";
  }
  if (Context.PlayerID == 1) {
    var steamidnum = "76561199023125439";
  }
  if (Context.PlayerID == 2) {
    var steamidnum = "76561199023125440";
  }
  if (Context.PlayerID == 3) {
    var steamidnum = "76561199023125441";
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.Documents) + "\\Avalanche Studios\\GenerationZero\\Saves\\delivery_public\\settings\\" + steamidnum + "\\settings.json")) {
    var filePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\Avalanche Studios\\GenerationZero\\Saves\\delivery_public\\settings\\" + steamidnum;
    System.IO.Directory.CreateDirectory(filePath);
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "settings.json");
    var savePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\Avalanche Studios\\GenerationZero\\Saves\\delivery_public\\settings\\" + steamidnum + "\\settings.json";
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var vsync = Context.Options["vsync"];
  if (vsync == "No") {
    var vsyncset = 0;
  } else {
    var vsyncset = 1;
  }
  var dres = Context.Options["dres"];
  if (dres == "No") {
    var dresset = 0;
  } else {
    var dresset = 1;
  }
  var drest = Context.Options["drest"];
  var txtPath = Context.GetFolder(Nucleus.Folder.Documents) + "\\Avalanche Studios\\GenerationZero\\Saves\\delivery_public\\settings\\" + steamidnum + "\\settings.json";
  Context.ReplaceLinesInTextFile(txtPath, [
    Context.FindLineNumberInTextFile(txtPath, '    "DisplayFullscreen"', Nucleus.SearchType.StartsWith) + '|    "DisplayFullscreen": 0,',
    Context.FindLineNumberInTextFile(txtPath, '    "DisplayWidth"', Nucleus.SearchType.StartsWith) + '|    "DisplayWidth": ' + Context.Width + ",",
    Context.FindLineNumberInTextFile(txtPath, '    "DisplayHeight"', Nucleus.SearchType.StartsWith) + '|    "DisplayHeight": ' + Context.Height + ",",
    Context.FindLineNumberInTextFile(txtPath, '    "DisplayVSync"', Nucleus.SearchType.StartsWith) + '|    "DisplayVSync": ' + vsyncset + ",",
    Context.FindLineNumberInTextFile(txtPath, '    "DisplayDynamicResolution"', Nucleus.SearchType.StartsWith) + '|    "DisplayDynamicResolution": ' + dresset + ",",
    Context.FindLineNumberInTextFile(txtPath, '    "DisplayDynamicResolutionFPS"', Nucleus.SearchType.StartsWith) + '|    "DisplayDynamicResolutionFPS": ' + drest + ","
  ]);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\DLC.txt";
  var lines = [
    "2955520=Generation Zero® - Heavy Weapons Pack",
    "2689180=Generation Zero® - Reinforced Flakmoped Pack",
    "2591100=Generation Zero® - Advanced Intelligence Cosmetics Pack",
    "2473770=Generation Zero® - Companion Accessories Pack",
    "2334430=Generation Zero® - Tactical Equipment Pack 2",
    "2200740=Generation Zero® - Eastern European Weapons Pack",
    "2144761=Generation Zero® - Motorbikes Pack",
    "2144760=Generation Zero® - Camo Weapon Skins Pack",
    "2009530=Generation Zero® - Tactical Equipment Pack",
    "1850670=Generation Zero® - Base Support Pack",
    "1771050=Generation Zero® - Resistance Weapons Pack",
    "1610720=Generation Zero® - Base Defense Pack",
    "1610690=Generation Zero® - US Weapons Pack 2",
    "1580920=Generation Zero® - Soviet Weapons Pack",
    "1450340=Generation Zero® - US Weapons Pack",
    "1301740=Generation Zero® - FNIX Rising",
    "1252740=Generation Zero® - Apparel Crafting",
    "1173930=Generation Zero® - Rivals & Experimental Weapons",
    "1157550=Generation Zero® - Alpine Unrest",
    "1103830=Generation Zero® - Bikes",
    "1099600=Generation Zero® - Blockbuster Vanity Pack",
    "1062420=Generation Zero® - Schweet Vanity Pack",
    "1062400=Generation Zero® - Tubular Vanity Pack",
    "974380=Generation Zero® - Pre-Purchase Content"
  ];
  Context.WriteTextFile(dlc, lines);
};
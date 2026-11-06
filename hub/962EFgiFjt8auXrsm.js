Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Tue Nov 23 2021 23:25:52 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "962EFgiFjt8auXrsm";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv146\\Win64", "EDFWB\\Binaries\\Win64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "xinput1_3.dll"];
Game.GameName = "EARTH DEFENSE FORCE: WORLD BROTHERS";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "EDFWB-Win64-Shipping.exe";
Game.CreateSteamAppIdByExe = true;
Game.SteamID = "1497950";
Game.GUID = "Earth Defense Force World Brothers";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "EDFWB\\Binaries\\Win64";
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "EARTH DEFENSE FORCE: WORLD BROTHERS";
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.UserProfileConfigPath = "AppData\\Local\\EDFWB\\Saved\\Config\\WindowsNoEditor";
Game.UserProfileSavePath = "AppData\\Local\\EDFWB\\Savedata";
Game.Description =
  "They removed split-screen in the PC port unlike in other EDF games, luckily Nucleus exists. Complete or skip the tutorial in all instances, then go to the online play option, create a public room in one instance and join in the others. If you use keyboards and mice after all the instances have launched, resized and positioned correctly, press the END key to lock the input for all instances to have their own cursor. You need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input whe you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. You can access each instance saves in the app, after the first launch click game options/open user profile save path in the UI.";
Game.PauseBetweenProcessGrab = 7;
Game.PauseBetweenStarts = 30;

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
Game.ProtoInput.CursorVisibilityHook = true;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = true;
Game.ProtoInput.FindWindowHook = false;
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
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseOpenXinput = false;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;

Game.ProtoInput.EnableFocusMessageLoop = true;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 10000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS

Game.Play = function() {
  Context.StartArguments = "-windowed -AlwaysFocus -nosplash" + " -ResX=" + Context.Width + " -ResY=" + Context.Height;

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv146\\Win64\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv146\\Win64\\steam_settings\\DLC.txt";
  var lines = [
    "1596670=EARTH DEFENSE FORCE: WORLD BROTHERS - Additional Mission Pack: Another ResCUBE",
    "1596667=EARTH DEFENSE FORCE: WORLD BROTHERS - Cosmonaut:" + '"We' + "'ll Take the Planet As Is" + '"!',
    "1596666=EARTH DEFENSE FORCE: WORLD BROTHERS - Colonist:" + '"We' + "'ll Help, If It Means Saving the Planet" + '"!?',
    '1596665=EARTH DEFENSE FORCE: WORLD BROTHERS - The Legendary Mr. Y, Reborn as "Mecha Yuki" After His Acid Incident!?',
    "1596664=EARTH DEFENSE FORCE: WORLD BROTHERS - Hostess ILI from Dream Club, Giving the EDF a Try!?",
    "1596663=EARTH DEFENSE FORCE: WORLD BROTHERS - Hostess Mian from Dream Club, Giving the EDF a Try!?",
    "1596662=EARTH DEFENSE FORCE: WORLD BROTHERS - Hostess Setsu from Dream Club, Giving the EDF a Try!?",
    '1596661=EARTH DEFENSE FORCE: WORLD BROTHERS - Saki, the Crazed Little Sister Swordswoman from "OneeChanbara"',
    '1596660=EARTH DEFENSE FORCE: WORLD BROTHERS - Aya, the Calm Big Sister Swordswoman from "OneeChanbara"',
    "1596655=EARTH DEFENSE FORCE: WORLD BROTHERS - Infantry (EDF3), Storm 1 Colors & Special Gear",
    "1596654=EARTH DEFENSE FORCE: WORLD BROTHERS - Prowl Rider (EDF: IR), KR Prototype & Special Gear",
    "1596653=EARTH DEFENSE FORCE: WORLD BROTHERS - Ranger (EDF4), Omega Team Colors & Special Gear",
    "1596652=EARTH DEFENSE FORCE: WORLD BROTHERS - Wing Diver (EDF5), Spriggan Colors & Special Gear",
    "1596651=EARTH DEFENSE FORCE: WORLD BROTHERS - Fencer (EDF5), Grim Reaper Colors & Special Gear",
    "1596650=EARTH DEFENSE FORCE: WORLD BROTHERS - Ranger (EDF5), Sergeant Colors & Special Gear",
    "1530273=EARTH DEFENSE FORCE: WORLD BROTHERS - Additional Character: Riho Futaba, Merry Santa Costume",
    "1530272=EARTH DEFENSE FORCE: WORLD BROTHERS - Additional Character: Riho Futaba, Cool Summer Outfit",
    "1530271=EARTH DEFENSE FORCE: WORLD BROTHERS - Additional Character: Riho Futaba, Classic Hostess Costume",
    "1530270=EARTH DEFENSE FORCE: WORLD BROTHERS - Additional Character: Riho Futaba, Original Blue Swimsuit"
  ];
  Context.WriteTextFile(dlc, lines);

  if (Context.AspectRatioDecimal > 1.8) {
    Context.BackupFile(Context.NucleusUserRoot + "\\AppData\\Local\\EDFWB\\Saved\\Config\\WindowsNoEditor\\Engine.ini", true);

    var ini = Context.NucleusUserRoot + "\\AppData\\Local\\EDFWB\\Saved\\Config\\WindowsNoEditor\\Engine.ini";
    Context.ModifySaveFile(ini, ini, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.LocalPlayer", "AspectRatioAxisConstraint", "AspectRatio_MaintainYFOV")]);
  } else if (Context.AspectRatioDecimal < 1.2) {
    var ini = Context.NucleusUserRoot + "\\AppData\\Local\\EDFWB\\Saved\\Config\\WindowsNoEditor\\Engine.ini";
    Context.ModifySaveFile(ini, ini, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.LocalPlayer", "AspectRatioAxisConstraint", "AspectRatio_MaintainXFOV")]);
  } else {
    var ini = Context.NucleusUserRoot + "\\AppData\\Local\\EDFWB\\Saved\\Config\\WindowsNoEditor\\Engine.ini";
    Context.ModifySaveFile(ini, ini, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.LocalPlayer", "AspectRatioAxisConstraint", "AspectRatio_MaintainXFOV")]);
  }
};
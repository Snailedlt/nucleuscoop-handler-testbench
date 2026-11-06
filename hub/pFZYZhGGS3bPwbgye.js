Hub.Handler.Version = 6; // Released at https://hub.splitscreen.me/ on Thu Oct 21 2021 07:22:42 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "pFZYZhGGS3bPwbgye";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Gamepad_FaceButton_Bottom", "Gamepad_FaceButton_Left", "Gamepad_FaceButton_Right", "Gamepad_FaceButton_Top", "F"];
var answers2 = ["Yes", "No"];
var answers3 = ["No", "1", "2", "3", "4"];
Game.AddOption("Map interact to a gamepad button.", "The interact function is not mappable to any controller button in-game.", "Inter", answers1);
Game.AddOption("Invert Y camera axis?", "Inverts the right stick Y axis default movement.", "Invert", answers2);
Game.AddOption("Unmap the Priest class meele button?", "Select the instance you'll use the Priest in to unmap this action.", "Priest", answers3);

Game.DirSymlinkExclusions = [
  "Dark\\Binaries\\Win64",
  "Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv130\\Win64",
  "Dark\\Config",
  "Dark\\Content",
  "Dark\\Saved\\Config\\WindowsNoEditor",
  "Dark\\Content\\Movies",
  "Engine\\Config"
];
Game.FileSymlinkExclusions = [
  "steam_api64.dll",
  "steam_appid.txt",
  "local_save.txt",
  //"LoadingScreen.mp4",
  //"LoadingScreen.uasset",
  //"Startup.mp4",
  //"Startup.uasset",
  "Audio_TONY_StateTrigger.uasset"
];
Game.FileSymlinkCopyInstead = [
  "DefaultInput.ini",
  "DefaultEngine.ini",
  "GameUserSettings.ini",
  "BaseEngine.ini",
  "Engine.ini",
  "Dark.uproject",
  "B_ConstructObjective_BoatChain.uasset",
  "B_ConstructObjective_CopterRadio.uasset",
  "B_ConstructObjective_DoorChain.uasset",
  "B_ConstructObjective_DoorChain_Single.uasset",
  "B_ConstructObjective_Tires.uasset",
  "B_ConstructObjective_TruckFuel.uasset",
  "B_ConstructObjective_TruckKeys.uasset",
  "B_ConstructObjective_TruckKeys_Part.uasset",
  "B_RepairBoat.uasset",
  "B_RepairHelicopter.uasset",
  "B_RepairTruck.uasset",
  "CameraShake_CthulhuRockThrow.uasset",
  "ECharacterAbility.uasset",
  "LightBoxTrig_Bathroom_Blueprint.uasset",
  "muzzleFlash_smoke001_ADD.uasset",
  "ReplicatedHintBox.uasset",
  "GlobalShaderCache-PCD3D_SM4.bin",
  "GlobalShaderCache-PCD3D_SM5.bin"
];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Dark-Win64-Shipping.exe";
Game.SteamID = "275060";
Game.GUID = "Alone in the Dark Illumination";
Game.GameName = "Alone in the Dark: Illumination";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "Dark\\Binaries\\Win64";
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Alone in the Dark: Illumination";
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.CustomDllEnabled = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput9_1_0.dll"];
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\275060";
Game.Description =
  "IMPORTANT: Use the main mouse cursor to navigate the menus. Host a multiplayer lobby in one instance and the others can join, click refresh if you do not see the lobby. If you alt-tab and lose focus just wait a few seconds and you will be able to control your character again. If you use keyboards and mice after all the instances have launched, resized and positioned correctly, press the END key to lock the input for all instances to have their own cursor. You need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input whe you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. If you want the instances to resize correctly you need to create custom resolutions in your AMD/Nvidia/Intel panel (For example: 960x1080, 960x540, 1920x540 etc.) so the game can see and use them. The interact function is not mappable to any gamepad button in-game unless you edit an .ini file, Nucleus edits this .ini automatically, select the button to map to this function in the Nucleus UI option. If you already made that .ini edit in your main files select F in the UI option. You can remap your gamepad buttons in the game input settings if you want to change the default gamepad mappings. Reduce graphic settings like textures and shadows to improve performance. The Priest gun bashing crashes the game, this is a bug with latest version of the game, unmap this action using the UI option if you use the Priest. In vertical split-screen the skills menu gets cut so set your skills before selecting the process in Nucleus process picker window, the instances will resize correctly at the end.";
Game.KeepSymLinkOnExit = true;
Game.PromptBetweenInstances = false;
Game.PauseBetweenStarts = 35;

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
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.SetWindowPosHook = true;

Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = true;
Game.ProtoInput.WindowActivateFilter = true;
Game.ProtoInput.WindowActvateAppFilter = true;
Game.ProtoInput.MouseWheelFilter = true;
Game.ProtoInput.MouseButtonFilter = false;
Game.ProtoInput.KeyboardButtonFilter = false;

Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.UseOpenXinput = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;

Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 20000;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008, 0x0007, 0x0086]; // Blocks WM_KILLFOCUS WM_SETFOCUS WM_NCACTIVATE.

Game.Play = function() {
  var Args = (Context.Args = " -WindowedFullscreen " + " -AlwaysFocus " + " -NOSCREENMESSAGES " + " -ResX= " + Context.Width + " -ResY= " + Context.Height);
  Context.StartArguments = Args;

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dark\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini");
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("/Script/Dark.DarkUserSettings", "bUseDesktopResolutionForFullscreen", "False"),
    new Nucleus.IniSaveInfo("/Script/Dark.DarkUserSettings", "FullscreenMode", 1)
  ]);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Config\\BaseEngine.ini");
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.Engine", "bPauseOnLossOfFocus", "false")]);

  if (Context.AspectRatioDecimal > 1.8) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Config\\BaseEngine.ini");
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.LocalPlayer", "AspectRatioAxisConstraint", "AspectRatio_MaintainYFOV")]);
  } else if (Context.AspectRatioDecimal < 1.2) {
    Game.ProtoInput.SetWindowPosHook = false;
    Game.PromptBetweenInstances = true;
    Game.ForceProcessPick = true;
    Game.SetWindowHook = true;
    Game.PauseBetweenProcessGrab = 7;

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Config\\BaseEngine.ini");
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.LocalPlayer", "AspectRatioAxisConstraint", "AspectRatio_MaintainXFOV")]);
  } else {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Config\\BaseEngine.ini");
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.LocalPlayer", "AspectRatioAxisConstraint", "AspectRatio_MaintainXFOV")]);
  }

  if (Context.IsKeyboardPlayer) {
    Game.KeepSymLinkOnExit = false;

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dark\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="MoveForward",bIsAxis=True,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="MoveForward",bIsAxis=True,AxisScale=1.000000,BoundKey=W)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="MoveBackward",bIsAxis=True,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="MoveBackward",bIsAxis=True,AxisScale=1.000000,BoundKey=S)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="MoveLeft",bIsAxis=True,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="MoveLeft",bIsAxis=True,AxisScale=1.000000,BoundKey=A)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="MoveRight",bIsAxis=True,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="MoveRight",bIsAxis=True,AxisScale=1.000000,BoundKey=D)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="Sprint",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="Sprint",bIsAxis=False,AxisScale=1.000000,BoundKey=LeftShift)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="Jump",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="Jump",bIsAxis=False,AxisScale=1.000000,BoundKey=SpaceBar)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="Reload",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="Reload",bIsAxis=False,AxisScale=1.000000,BoundKey=R)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="Fire",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="Fire",bIsAxis=False,AxisScale=1.000000,BoundKey=LeftMouseButton)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="Aim",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="Aim",bIsAxis=False,AxisScale=1.000000,BoundKey=RightMouseButton)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="AltFire",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="AltFire",bIsAxis=False,AxisScale=1.000000,BoundKey=E)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="Bash",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="Bash",bIsAxis=False,AxisScale=1.000000,BoundKey=Q)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="SwitchToNextInventory",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="SwitchToNextInventory",bIsAxis=False,AxisScale=1.000000,BoundKey=MouseScrollUp)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="SwitchToPreviousIventory",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="SwitchToPreviousIventory",bIsAxis=False,AxisScale=1.000000,BoundKey=MouseScrollDown)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="DropCarriedObject",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="DropCarriedObject",bIsAxis=False,AxisScale=1.000000,BoundKey=G)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="ActivateAbilityZero",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="ActivateAbilityZero",bIsAxis=False,AxisScale=1.000000,BoundKey=One)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="ActivateAbilityOne",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="ActivateAbilityOne",bIsAxis=False,AxisScale=1.000000,BoundKey=Two)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="ActivateAbilityTwo",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="ActivateAbilityTwo",bIsAxis=False,AxisScale=1.000000,BoundKey=Three)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="ActivateAbilityThree",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="ActivateAbilityThree",bIsAxis=False,AxisScale=1.000000,BoundKey=Four)'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  } else {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dark\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini");
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Dark.DarkUserSettings", "AimSensitivity", "2.900000")]);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dark\\Content\\Audio_TONY_StateTrigger.uasset")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dark\\Content\\Audio_TONY_StateTrigger.uasset");
    var savePkgOrigin = System.IO.Path.Combine(Context.OrigRootFolder, "Dark\\Content\\Audio_TONY_StateTrigger.uasset");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dark\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="MoveForward",bIsAxis=True,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="MoveForward",bIsAxis=True,AxisScale=1.000000,BoundKey=Gamepad_LeftStick_Up)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="MoveBackward",bIsAxis=True,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="MoveBackward",bIsAxis=True,AxisScale=1.000000,BoundKey=Gamepad_LeftStick_Down)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="MoveLeft",bIsAxis=True,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="MoveLeft",bIsAxis=True,AxisScale=1.000000,BoundKey=Gamepad_LeftStick_Left)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="MoveRight",bIsAxis=True,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="MoveRight",bIsAxis=True,AxisScale=1.000000,BoundKey=Gamepad_LeftStick_Right)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="Sprint",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="Sprint",bIsAxis=False,AxisScale=1.000000,BoundKey=Gamepad_FaceButton_Left)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="Jump",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="Jump",bIsAxis=False,AxisScale=1.000000,BoundKey=Gamepad_LeftThumbstick)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="Reload",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="Reload",bIsAxis=False,AxisScale=1.000000,BoundKey=Gamepad_FaceButton_Right)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="Fire",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="Fire",bIsAxis=False,AxisScale=1.000000,BoundKey=Gamepad_RightTrigger)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="Aim",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="Aim",bIsAxis=False,AxisScale=1.000000,BoundKey=Gamepad_LeftTrigger)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="AltFire",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="AltFire",bIsAxis=False,AxisScale=1.000000,BoundKey=Gamepad_RightShoulder)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="Bash",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="Bash",bIsAxis=False,AxisScale=1.000000,BoundKey=Gamepad_FaceButton_Top)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="SwitchToNextInventory",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="SwitchToNextInventory",bIsAxis=False,AxisScale=1.000000,BoundKey=Gamepad_RightThumbstick)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="SwitchToPreviousIventory",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="SwitchToPreviousIventory",bIsAxis=False,AxisScale=1.000000,BoundKey=Gamepad_LeftShoulder)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="DropCarriedObject",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="DropCarriedObject",bIsAxis=False,AxisScale=1.000000,BoundKey=Gamepad_Special_Left)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="ActivateAbilityZero",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="ActivateAbilityZero",bIsAxis=False,AxisScale=1.000000,BoundKey=Gamepad_DPad_Down)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="ActivateAbilityOne",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="ActivateAbilityOne",bIsAxis=False,AxisScale=1.000000,BoundKey=Gamepad_DPad_Up)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="ActivateAbilityTwo",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="ActivateAbilityTwo",bIsAxis=False,AxisScale=1.000000,BoundKey=Gamepad_DPad_Left)',
      Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="ActivateAbilityThree",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
        '|InputBinds=(ActionName="ActivateAbilityThree",bIsAxis=False,AxisScale=1.000000,BoundKey=Gamepad_DPad_Right)'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  } else {
  }

  var inter = "Inter";
  var invert = Context.Options["Invert"];
  var priest = Context.Options["Priest"];

  if (Context.IsKeyboardPlayer) {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dark\\Config\\DefaultInput.ini";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, '+ActionMappings=(ActionName="Interact",Key=F,bShift=False,bCtrl=False,bAlt=False,bCmd=False)', Nucleus.SearchType.StartsWith) +
        '|+ActionMappings=(ActionName="Interact",Key=F,bShift=False,bCtrl=False,bAlt=False,bCmd=False)'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  } else {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dark\\Config\\DefaultInput.ini";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, '+ActionMappings=(ActionName="Interact",Key=F,bShift=False,bCtrl=False,bAlt=False,bCmd=False)', Nucleus.SearchType.StartsWith) +
        '|+ActionMappings=(ActionName="Interact",Key=' +
        Context.Options[inter] +
        ",bShift=False,bCtrl=False,bAlt=False,bCmd=False)"
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  if (invert == "Yes") {
    if (Context.IsKeyboardPlayer) {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dark\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini");
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Dark.DarkUserSettings", "bInvertY", "False")]);
    } else {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dark\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini");
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Dark.DarkUserSettings", "bInvertY", "True")]);
    }
  }

  if (invert == "No") {
    if (Context.IsKeyboardPlayer) {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dark\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini");
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Dark.DarkUserSettings", "bInvertY", "True")]);
    } else {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dark\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini");
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Dark.DarkUserSettings", "bInvertY", "False")]);
    }
  }

  if (priest == "No") {
  }

  if (priest == "1") {
    if (Context.PlayerID == 0) {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dark\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="Bash",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
          '|InputBinds=(ActionName="Bash",bIsAxis=False,AxisScale=1.000000,BoundKey=)'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }
  }
  if (priest == "2") {
    if (Context.PlayerID == 1) {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dark\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="Bash",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
          '|InputBinds=(ActionName="Bash",bIsAxis=False,AxisScale=1.000000,BoundKey=)'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }
  }
  if (priest == "3") {
    if (Context.PlayerID == 2) {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dark\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="Bash",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
          '|InputBinds=(ActionName="Bash",bIsAxis=False,AxisScale=1.000000,BoundKey=)'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }
  }
  if (priest == "4") {
    if (Context.PlayerID == 3) {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dark\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, 'InputBinds=(ActionName="Bash",bIsAxis=False,AxisScale=1.000000,BoundKey=', Nucleus.SearchType.StartsWith) +
          '|InputBinds=(ActionName="Bash",bIsAxis=False,AxisScale=1.000000,BoundKey=)'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };

  Game.ProtoInput.OnInputUnlocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 20000, true, true, false, false, false);
    }
  };
};
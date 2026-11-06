Hub.Handler.Version = 15; // Released at https://hub.splitscreen.me/ on Wed Mar 05 2025 10:01:54 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "HJtQAkDh9nyRd6z6J";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["bin", "bin64", "mods", "cached_mods"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_api64.dll", "steam_appid.txt", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["dontstarve_dedicated_server_nullrenderer.exe", "dontstarve_dedicated_server_nullrenderer_x64.exe", "dedicated_server_mods_setup.lua", "modsettings.lua"];
Game.GameName = "Don't Starve Together";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "dontstarve_steam_x64.exe";
Game.SteamID = "322330";
Game.GUID = "Don't Starve Together";
Game.MaxPlayers = 6;
Game.MaxPlayersOneMonitor = 6;
Game.BinariesFolder = "bin64";
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Don't Starve Together";
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "Documents\\Klei\\DoNotStarveTogether";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "In all instances press on the play button and select play offline, in one instance select host game and create a local only game, the others can join using browse games. If you use keyboards/mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own working cursor, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenProcessGrab = 2;
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
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
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
  var id = Context.PlayerID;
  var savePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\Klei\\DoNotStarveTogether\\106285971" + id + "\\client.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("MISC", "controller_popup", "false"),
    //new Nucleus.IniSaveInfo("MISC", "vibration", "true"),
    new Nucleus.IniSaveInfo("GRAPHICS", "windowed_width", Context.Width),
    new Nucleus.IniSaveInfo("GRAPHICS", "windowed_height", Context.Height),
    new Nucleus.IniSaveInfo("GRAPHICS", "window_x", Context.PosX),
    new Nucleus.IniSaveInfo("GRAPHICS", "window_y", Context.PosY),
    new Nucleus.IniSaveInfo("GRAPHICS", "fullscreen", "false")
  ]);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin64\\steam_settings\\mods");
  System.IO.Directory.CreateDirectory(filePath);

  var nolay = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin64\\steam_settings\\disable_overlay.txt";
  var lines = [""];
  Context.WriteTextFile(nolay, lines);

  /*var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin64\\steam_settings\\DLC.txt";
        var lines = [
        "3373370=Don't Starve Together: Starter Pack 2025",
        "3373360=Don't Starve Together: Merrymaker Survivors Chest, Part IV",
        "3155070=Don't Starve Together: Complete Roseate Chest",
        "2769680=Don't Starve Together: Merrymaker Survivors Chest, Part III",
        "2711510=Don't Starve Together: Starter Pack 2024",
        "2377640=Don't Starve Together: Blooming Verdant Chest",
        "2241030=Don't Starve Together: Starter Pack 2023",
        "2236180=Don't Starve Together: Snowfallen Survivors Chest, Part III",
        "2170671=Don't Starve Together: Gothic Belongings Chest, Part II",
        "2170670=Don't Starve Together: Fantasmical Chest, Part II",
        "2132800=Don't Starve Together: Moonbound Survivors Chest",
        "2058281=Don't Starve Together: Swashbuckler Survivors Chest",
        "2058280=Don't Starve Together: Inventor's Excursion Chest",
        "2007370=Don't Starve Together: Midsummer Cawnival Chest",
        "1899050=Don't Starve Together: Gothic Belongings Chest",
        "1874370=Don't Starve Together: Fantasmical Chest",
        "1836630=Don't Starve Together: Merrymaker Survivors Chest, Part II",
        "1710241=Don't Starve Together: Wanda Deluxe Chest",
        "1710240=Don't Starve Together: Starter Pack 2021",
        "1698560=Don't Starve Together: Fresh Verdant Chest",
        "1694780=Don't Starve Together: Seaside Chest",
        "1612410=Don't Starve Together: Cottage Cache Chest",
        "1558300=Don't Starve Together: Latecomers' Victorian Chest",
        "1522880=Don't Starve Together: Victorian Antiques Chest",
        "1485060=Don't Starve Together: Snowfallen Survivors Chest, Part II",
        "1447360=Don't Starve Together: Hallowed Nights Survivors Chest, Part III",
        "1338540=Don't Starve Together: Walter Deluxe Wardrobe",
        "1289760=Don't Starve Together: Spring Cleaning Bundle",
        "1272440=Don't Starve Together: Starter Pack 2020",
        "1230830=Don't Starve Together: Bounteous Bundle",
        "1205501=Don't Starve Together: Merrymaker Belongings Chest",
        "1205500=Don't Starve Together: Merrymaker Survivors Chest",
        "1172860=Don't Starve Together: Starter Pack 2019",
        "1167510=Don't Starve Together: Hallowed Nights Survivors Chest, Part II",
        "1167330=Don't Starve Together: Wurt Deluxe Chest",
        "1084430=Don't Starve Together: Wormwood Deluxe Chest",
        "1051700=Don't Starve Together: Wortox Deluxe Chest",
        "987340=Don't Starve Together: Snowfallen Survivors Chest",
        "981702=Don't Starve Together: Forge Armor Chest",
        "981701=Don't Starve Together: Forge Weapons Chest",
        "981700=Don't Starve Together: All Survivors Gladiator Chest",
        "974740=Don't Starve Together: All Survivors Magmatic Chest",
        "962960=Don't Starve Together: Hallowed Nights Belongings Chest",
        "840770=Don't Starve Together: Hallowed Nights Survivors Chest",
        "840760=Don't Starve Together: Original Survivors Victorian Chest",
        "840750=Don't Starve Together: Victorian Belongings Chest",
        "798750=Don't Starve Together: Original Verdant Chest",
        "798740=Don't Starve Together: Beating Heart Chest",
        ];
        Context.WriteTextFile(dlc, lines);*/

  if (Context.NumControllers < 5) {
    //><

    Game.ProtoInput.XinputHook = false;
    Game.ProtoInput.UseOpenXinput = false;
  } else {
    System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin64\\xinput1_3.dll");

    Game.ProtoInput.XinputHook = true;
    Game.ProtoInput.UseOpenXinput = true;
  }
};
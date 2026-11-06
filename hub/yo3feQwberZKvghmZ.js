Hub.Handler.Version = 17; // Released at https://hub.splitscreen.me/ on Mon Jul 07 2025 11:26:21 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "yo3feQwberZKvghmZ";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["engine_x64_rwdi.dll", "DW"];
Game.KillMutex = ["ChromeEngine4DIMutex"];
Game.DirExclusions = ["settings", "steam_settings", "nepice_settings"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "EOSSDK-Win64-Shipping.dll", "steam_appid.txt", "local_save.txt", "winmm.dll"];
Game.FileSymlinkCopyInstead = ["dinput8.dll"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.GoldbergNoWarning = true;
Game.UseNemirtingasEpicEmu = false;
Game.SteamlessPatch = ["false", "--quiet --keepbind", "3500"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "DyingLightGame.exe";
Game.SteamID = "239140";
Game.GUID = "Dying Light";
Game.GameName = "Dying Light";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Dying Light";
Game.SendFakeFocusMsg = true;
Game.FakeFocus = true;
Game.FakeFocusInterval = 8000;
Game.HookFocus = false;
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput1_4.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\GSE Saves\\239140\\remote";
Game.DocumentsConfigPath = "DyingLight\\out\\settings";
Game.UserProfileSavePathNoCopy = true;
Game.DocumentsConfigPathNoCopy = false;
Game.Description =
  "Before using this run your main game and change some graphics settings in order to create the neccessary configuration files. All players must have completed the tutorial in order to unlock multiplayer. When multiplayer is unlocked for all, open the pause menu in-game, set network mode to public and select the player you wanna join in the matchmaking browser. If you use keyboards/mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input, you need to left click to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked.";
Game.PauseBetweenProcessGrab = 5;
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
  Context.StartArguments = "-nologos";

  var savePath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\video.scr";

  var resLine = Context.FindLineNumberInTextFile(savePath, "Resolution", Nucleus.SearchType.StartsWith);
  Context.ReplacePartialLinesInTextFile(savePath, [resLine + "|" + "\\(([^\\)]+)\\)" + "|(" + Context.Width + "," + Context.Height + ")"]);

  var fsLine = Context.FindLineNumberInTextFile(savePath, "Fullscreen", Nucleus.SearchType.StartsWith);
  Context.RemoveLineInTextFile(savePath, fsLine);

  var RO = Context.GetFolder(Nucleus.Folder.InstancedGameFolder);

  var eosEmuDestination = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\EOSSDK-Win64-Shipping.dll";
  var eosEmuSource = System.IO.Path.Combine(Game.Folder, "EOSSDK-Win64-Shipping.dll");
  System.IO.File.Copy(eosEmuSource, eosEmuDestination, true);

  Context.CopyFolder(Context.ScriptFolder + "\\nepice_settings", RO + "\\nepice_settings");

  var id = 18 + Context.PlayerID;
  var pd = 4 + Context.PlayerID;

  var txtPath = RO + "\\nepice_settings\\NemirtingasEpicEmu.json";
  var dict = [
    //Context.FindLineNumberInTextFile(txtPath, '      "EpicId":', Nucleus.SearchType.StartsWith) + '|      "EpicId": "831ec62c44424917a0fb315de2b5dc'+id+'",',
    Context.FindLineNumberInTextFile(txtPath, '      "Language":', Nucleus.SearchType.StartsWith) + '|      "Language": "' + Context.EpicLang + '",',
    //Context.FindLineNumberInTextFile(txtPath, '      "ProductUserId":', Nucleus.SearchType.StartsWith) + '|      "ProductUserId": "4e93fc9a0afba653e68be0c1e74cdac'+pd+'",',
    Context.FindLineNumberInTextFile(txtPath, '      "UserName":', Nucleus.SearchType.StartsWith) + '|      "UserName": "' + Context.Nickname + '"'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  if (Context.IsKeyboardPlayer) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dinput8.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dinput8.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (System.IO.Directory.Exists(Context.OrigRootFolder + "\\.egstore")) {
    Game.UseGoldberg = false;

    Context.StartArguments =
      "-AUTH_LOGIN=unused -AUTH_PASSWORD=bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb -AUTH_TYPE=exchangecode -epicapp=CrabTest -epicenv=Prod -EpicPortal -epiclocale=" +
      Context.EpicLang +
      " -epicusername=" +
      Context.Nickname +
      " -epicuserid=0000000000000000000000000player" +
      Context.PLayerID;
  } else {
    Context.CopyFolder(Context.ScriptFolder + "\\steam_settings", RO + "\\steam_settings");

    var savePath = (Context.SavePath = RO + "\\steam_api64.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "steam_api64.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = RO + "\\steam_settings\\configs.user.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("user::general", "account_name", Context.Nickname),
      new Nucleus.IniSaveInfo("user::general", "account_steamid", Context.PlayerSteamID),
      new Nucleus.IniSaveInfo("user::general", "language", Context.SteamLang)
    ]);

    var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\DLC.txt";
    var lines = [
      "302100=Dying Light - Be the Zombie",
      "302101=Dying Light - Cuisine & Cargo",
      "302102=Dying Light - Punk Queen Weapon Pack",
      "302103=Dying Light - Buzz Killer Weapon Pack",
      "325710=Dying Light - Night Club Weapon Pack",
      "325711=Dying Light - The Lacerator Weapon Pack",
      "325712=Dying Light - The Constable Weapon Pack",
      "325713=Dying Light - Wrench Kiss Weapon Pack",
      "325714=Dying Light - Ninja Outfit",
      "325715=Dying Light - Urban Explorer Outfit",
      "325716=Dying Light - Special Agent Outfit",
      "325717=Dying Light - Techland Outfit",
      "325720=Dying Light - Alienware Outfit",
      "325721=Dying Light - Nvidia Outfit",
      "325722=Dying Light - Razer Outfit",
      "325723=Dying Light - The Bozak Horde",
      "325724=Dying Light - The Following",
      "335810=Dying Light Season Pass",
      "347090=Dying Light Ultimate Survivor Bundle",
      "412920=Dying Light - Custom Maps",
      "415360=Dying Light: Razer Nabu Outfit",
      "415370=Dying Light - Custom Maps 2",
      "435110=Dying Light: Outfit and Livery 1",
      "435111=Dying Light- Crash Test Skin Pack",
      "436080=Dying Light- Harran Ranger Bundle",
      "436081=Dying Light- Gun Psycho Bundle",
      "436082=Dying Light- Volatile Hunter Bundle",
      "436083=Dying Light: CD-Action Anniversary Pack",
      "675860=Dying Light - Harran Military Rifle",
      "748340=Dying Light - White Death Bundle",
      "748341=Dying Light - Vintage Gunslinger Bundle",
      "1112520=Dying Light - Rais Elite Bundle",
      "1112521=Dying Light - Godfather Bundle",
      "1174580=Dying Light - Harran Inmate Bundle",
      "1174581=Dying Light - Left 4 Dead 2 Weapon Pack",
      "1177880=Dying Light - Retrowave Bundle",
      "1184350=Dying Light - SHU Warrior Bundle",
      "1184351=Dying Light - Chivalry Weapon Pack",
      "1241570=Dying Light - 5th Anniversary Bundle",
      "1272090=Dying Light - Unturned Weapon Pack",
      "1300710=Dying Light - Hellraid",
      "1354960=Dying Light - Volkan Combat Armor Bundle",
      "1454750=Dying Light - L4D2 Bill & Gnome Chompski Pack",
      "1468290=Dying Light - Classified Operation Bundle",
      "1498210=Dying Light - Viking: Raider of Harran Bundle",
      "1524890=Dying Light - Ox Warrior Bundle",
      "1543420=Dying Light - Harran Tactical Unit Bundle",
      "1599030=Dying Light - Rust Weapon Pack",
      "1647900=Dying Light - Savvy Gamer Bundle",
      "1702060=Dying Light - Astronaut Bundle",
      "1762700=Dying Light - Van Crane Bundle",
      "1822810=Dying Light - Snow Ops Bundle",
      "1935540=Dying Light - Dieselpunk Bundle",
      "2971370=Dying Light - Standard To Enhanced Upgrade",
      "2971380=Dying Light - Standard To Definitive Upgrade",
      "3454290=Dying Light - 10th Anniversary Bundle"
    ];
    Context.WriteTextFile(dlc, lines);
  }
};
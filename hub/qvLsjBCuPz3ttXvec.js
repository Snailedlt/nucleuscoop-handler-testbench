Hub.Handler.Version = 9; // Released at https://hub.splitscreen.me/ on Thu Feb 05 2026 07:14:26 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "qvLsjBCuPz3ttXvec";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["binkw64.dll"];
Game.DirSymlinkExclusions = ["en_us\\client\\bin\\pc"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "EOSSDK-Win64-Shipping.dll", "steam_appid.txt", "steamlog.txt", "local_save.txt", "dinput8.dll", "xinput9_1_0.dll"];
Game.HandlerInterval = 100;
Game.GameName = "World War Z";
Game.GUID = "World War Z";
Game.SteamID = "699130";
Game.ExecutableNames = ["wwzRetail.exe", "wwzRetailEgs.exe"];
//Game.ExecutableName = "wwzRetail.exe";
Game.BinariesFolder = "en_us\\client\\bin\\pc";
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.GoldbergNoWarning = true;
Game.UseNemirtingasEpicEmu = false;
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "WWZ";
Game.HasDynamicWindowTitle = true;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Local\\Saber\\WWZ\\client\\storage";
Game.UserProfileConfigPath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\699130";
Game.UserProfileSavePathNoCopy = false;
Game.UserProfileConfigPathNoCopy = true;
Game.Description =
  "IMPORTANT: Set your main game to windowed before launching this. To connect the instances start a regular campaign offline game in the first instance, once you are in-game start an offline game in the others in the same map and the instances will auto connect. This works fully offline so the game will not connect to the online servers, on first run if you accept the first EULA and reject the second it will not attempt to connect to the online servers and the main menu will start faster. Reduce graphics settings to improve performance, make sure FidelityFX is set to off. If you use keyboards/mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input, you need to left click to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked.";
Game.PauseBetweenProcessGrab = 2;
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
Game.ProtoInput.GetCursorPosHook = true;
Game.ProtoInput.SetCursorPosHook = true;
Game.ProtoInput.GetKeyStateHook = true;
Game.ProtoInput.GetAsyncKeyStateHook = true;
Game.ProtoInput.GetKeyboardStateHook = true;
Game.ProtoInput.CursorVisibilityHook = true;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;
Game.ProtoInput.DontShowCursorWhenImageUpdated = false;
Game.ProtoInput.SetWindowPosHook = false;
Game.ProtoInput.SetWindowStyleHook = true;

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
Game.ProtoInput.FocusLoopIntervalMilliseconds = 5000;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; //Blocks WM_KILLFOCUS.

Game.Play = function() {
  if (Context.IsKeyboardPlayer) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\en_us\\client\\bin\\pc\\dinput8.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dinput8.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var steamDLL = Context.OrigRootFolder + "\\en_us\\client\\bin\\pc\\steam_api64.dll";

  if (!System.IO.File.Exists(steamDLL)) {
    Game.PauseBetweenProcessGrab = 20;

    Context.StartArguments =
      " -AUTH_LOGIN=unused -AUTH_PASSWORD=cdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcd -AUTH_TYPE=exchangecode -epicapp=WorldWarZAftermath -epicenv=Prod -EpicPortal -epiclocale=" +
      Context.EpicLang +
      " -epicusername=" +
      Context.Nickname +
      " -epicuserid=831ec62c44424917a0fb315de2b5dc1" +
      Context.PlayerID +
      " -epicsandboxid=wombat";

    var BN = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\en_us\\client\\bin\\pc";

    var savePath = (Context.SavePath = BN + "\\EOSSDK-Win64-Shipping.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "EOSSDK-Win64-Shipping.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    Context.CopyFolder(Context.ScriptFolder + "\\nepice_settings", BN + "\\nepice_settings");

    var jsonPath = BN + "\\nepice_settings\\NemirtingasEpicEmu.json";
    var dict = [
      Context.FindLineNumberInTextFile(jsonPath, '      "EpicId":', Nucleus.SearchType.StartsWith) + '|      "EpicId": "831ec62c44424917a0fb315de2b5dc1' + Context.PlayerID + '",',
      Context.FindLineNumberInTextFile(jsonPath, '      "Language":', Nucleus.SearchType.StartsWith) + '|      "Language": "' + Context.EpicLang + '",',
      Context.FindLineNumberInTextFile(jsonPath, '      "UserName":', Nucleus.SearchType.StartsWith) + '|      "UserName": "' + Context.Nickname + '"'
    ];
    Context.ReplaceLinesInTextFile(jsonPath, dict);
  } else {
    var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\en_us\\client\\bin\\pc\\steam_settings");
    System.IO.Directory.CreateDirectory(filePath);

    var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\en_us\\client\\bin\\pc\\steam_settings\\DLC.txt";
    var lines = [
      "4057370=World War Z x The Walking Dead",
      "3930040=World War Z: Raging Phoenix Skin Pack",
      "3930030=World War Z: Vibrant Halloween Skin Pack",
      "3699430=World War Z: Chibi Izzy Skin Pack",
      "3699420=World War Z - Chibi Kimiko Skin Pack",
      "3245130=World War Z: Vegas Skin Pack",
      "3245120=World War Z: Sin City Apocalypse Episode",
      "3100200=World War Z: Aftermath - Golden Bloom Weapon Skins Pack",
      "2962180=World War Z: Aftermath - Desert Defenders Weapons Pack",
      "2614660=World War Z: Aftermath - Pre-Apocalypse Character Skins Pack",
      "2614650=World War Z: Aftermath - Valley of the Zeke Episode",
      "2540380=World War Z: Aftermath - Burning Skulls Weapons Skin Pack",
      "2475060=World War Z: Aftermath - Victory Lap Weapons Skin Pack",
      "2313390=World War Z: Aftermath - The Rat Packs Weapon Skins Bundle",
      "2243210=World War Z: Aftermath Upgrade",
      "2226070=World War Z: Aftermath - Deadly Vice Weapons Skin Pack",
      "2170270=World War Z: Aftermath - Raven Weapons Skin Pack",
      "1708020=World War Z: Aftermath - Zeke Hunter Weapons Pack",
      "1640650=World War Z: Aftermath - Explorer Weapons Pack"
    ];
    Context.WriteTextFile(dlc, lines);
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 25, true, true, false, false, false);

      //Wait a bit to make sure the message is sent

      System.Threading.Thread.Sleep(200);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };

  Game.ProtoInput.OnInputUnlocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 8000, true, true, false, false, false);
    }
  };
};
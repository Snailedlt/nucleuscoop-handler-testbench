Hub.Handler.Version = 5; // Released at https://hub.splitscreen.me/ on Mon Jun 02 2025 14:25:18 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "ryiLnXRBbWWhoAx7E";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
var answers2 = ["No", "Yes"];
var answers3 = ["No", "Yes"];
Game.AddOption(
  "Custom resolutions fix?",
  "Makes custom resolutions visible to the game to fix stretching in split-screen. Lower your monitor scale % or set it to 100% if the game is not seeing them.",
  "AR",
  answers1
);
Game.AddOption("Launch fix?", "ONLY try if the instances are not opening with the default option.", "Stubb", answers2);
Game.AddOption("Disable the Sekiro Multiplayer mod?", "If you select yes the instances will not load the mp mod.", "SOM", answers3);

Game.ExecutableContext = ["Data1.bdt"];
Game.KillMutex = ["SekiroMutex"];
Game.FileSymlinkExclusions = [
  "steam_api64.dll",
  "steam_appid.txt",
  "steam_interfaces.txt",
  "steamclient_loader.exe",
  "steamclient.dll",
  "steamclient64.dll",
  "ColdClientLoader.ini",
  "winmm.dll",
  "dinput8.dll",
  "xinput1_3.dll"
];
Game.FileSymlinkCopyInstead = [
  "amd_ags_x64.dll",
  "bink2w64.dll",
  "Data1.bhd",
  "Data2.bhd",
  "Data3.bhd",
  "Data4.bhd",
  "Data5.bhd",
  "fmod_event_net64.dll",
  "fmod_event64.dll",
  "fmodex64.dll",
  "oo2core_6_win64.dll",
  "pack.dat"
];
Game.HandlerInterval = 100;
Game.GameName = "Sekiro: Shadows Die Twice";
Game.ExecutableName = "sekiro.exe";
Game.GUID = "Sekiro Shadows Die Twice";
Game.SteamID = "814380";
Game.UseGoldberg = true;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.MaxPlayers = 6;
Game.MaxPlayersOneMonitor = 6;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Sekiro";
Game.HookFocus = false;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\Sekiro";
Game.Description =
  "IMPORTANT: This handler uses the Sekiro Online multiplayer mod v2.05 by LukeYui. Let all instances load to the title screen before pressing any inputs. Get pass the tutorial/first boss in all instances then press F1 in your keyboard and enable the online items, then one player (host) can use the Cursed Emblem item in the menu to create a co-op session. To co-op the host has to use the golderg overlay (Shift+Tab) to invite other players. For invasion, other players can use the Vengeful Spirit item, no invite needed. If the host player dies it will need to create a new session and invite again. If you use keyboards/mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own cursor, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. If you want to fix stretching in split-screen you need to create custom resolutions in your AMD/Nvidia/Intel panel (for example for a 1920x1080 monitor add resolutions like: 960x1080, 960x540, 1920x540 etc.) so the game can see and use them, this is also required for kb/m instances to work correctly. Rest at an idol before summoning other players for better results, restart the instances and run the handler again if the in-game enemies freeze. Alt-tab to the Nucleus app window to improve fps, reduce in-game graphics settings to improve performance.";
Game.KeepSymLinkOnExit = false;
Game.PromptBetweenInstances = false;
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenProcessGrab = 15;
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
Game.ProtoInput.GetRawInputDataHook = false;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = true;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = true;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;
Game.ProtoInput.DontShowCursorWhenImageUpdated = true;

Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.WindowActvateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = false;
Game.ProtoInput.MouseButtonFilter = false;
Game.ProtoInput.KeyboardButtonFilter = false;

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
Game.ProtoInput.BlockedMessages = [0x0008]; //Blocks WM_KILLFOCUS.

Game.Play = function() {
  var path = Context.NucleusUserRoot + "\\AppData\\Roaming\\Sekiro\\GraphicsConfig.xml";
  Context.ChangeXmlNodeInnerTextValue(path, "//ScreenMode", "WINDOW");
  Context.ChangeXmlNodeInnerTextValue(path, "//Auto-detectBestRenderingSettings", "OFF");

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_api64.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "steam_api64.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\load_dlls");
  System.IO.Directory.CreateDirectory(filePath);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\load_dlls\\steamclient64.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "steamclient64.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  /*var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
        var lines = [
        "SteamClient012",
        "SteamGameServer011",
        "SteamGameServerStats001",
        "SteamUser016",
        "SteamFriends013",
        "SteamUtils005",
        "SteamMatchMaking009",
        "SteamMatchMakingServers002",
        "STEAMUSERSTATS_INTERFACE_VERSION011",
        "STEAMAPPS_INTERFACE_VERSION005",
        "SteamNetworking005",
        "STEAMREMOTESTORAGE_INTERFACE_VERSION010",
        "STEAMSCREENSHOTS_INTERFACE_VERSION002",
        "STEAMHTTP_INTERFACE_VERSION002",
        "STEAMUNIFIEDMESSAGES_INTERFACE_VERSION001",
        ];
        Context.WriteTextFile(interfaces, lines);*/

  var nolan = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\disable_lan_only.txt";
  var lines = [""];
  Context.WriteTextFile(nolan, lines);

  var ainvite = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\auto_accept_invite.txt";
  var lines = [""];
  Context.WriteTextFile(ainvite, lines);

  var dwar = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\disable_overlay_warning_any.txt";
  var lines = [""];
  Context.WriteTextFile(dwar, lines);

  var token = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\gc_token.txt";
  var lines = [""];
  Context.WriteTextFile(token, lines);

  var nticket = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\new_app_ticket.txt";
  var lines = [""];
  Context.WriteTextFile(nticket, lines);

  var ar = Context.Options["AR"];
  var stubb = Context.Options["Stubb"];
  var som = Context.Options["SOM"];

  if (stubb == "Yes") {
    var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steamless.bat";
    var lines = [
      '"' + Context.NucleusFolder + '\\utils\\Steamless\\Steamless.CLI.exe" --quiet --keepbind ' + '"' + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + '\\sekiro.exe"',
      'move /y "sekiro.exe.unpacked.exe" "sekiro.exe"'
    ];
    Context.WriteTextFile(Bat, lines);

    Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steamless.bat"], false, 1);

    Context.Wait(8000);
  }

  if (stubb == "No") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\StubDRM64.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "StubDRM64.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\winmm.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "winmm.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dlllist.txt");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dlllist.txt");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (ar == "Yes") {
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "sekiro.exe"),
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "sekiro.exe"),
      "03 00 00 80 07",
      Context.Width,
      4,
      true
    );

    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "sekiro.exe"),
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "sekiro.exe"),
      "38 04 00 00 00 08",
      Context.Height,
      1,
      true
    );

    //Context.PatchFileFindPattern(System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), 'sekiro.exe'), System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), 'sekiro.exe'),"74 47 47 8B 94 C7 1C 02 00 00","EB 47 47 8B 94 C7 1C 02 00 00",true); //Removes black bars but triggers the co-op mod anti-cheat.

    var path = Context.NucleusUserRoot + "\\AppData\\Roaming\\Sekiro\\GraphicsConfig.xml";
    Context.ChangeXmlNodeInnerTextValue(path, "//ScreenMode", "WINDOW");
    Context.ChangeXmlNodeInnerTextValue(path, "//Resolution-WindowScreenWidth", Context.Width);
    Context.ChangeXmlNodeInnerTextValue(path, "//Resolution-WindowScreenHeight", Context.Height);
    Context.ChangeXmlNodeInnerTextValue(path, "//Auto-detectBestRenderingSettings", "OFF");
  }

  if (ar == "No") {
    if (Player.Owner.IsFullscreen()) {
      var path = Context.NucleusUserRoot + "\\AppData\\Roaming\\Sekiro\\GraphicsConfig.xml";
      Context.ChangeXmlNodeInnerTextValue(path, "//ScreenMode", "WINDOW");
      Context.ChangeXmlNodeInnerTextValue(path, "//Resolution-WindowScreenWidth", Context.Width);
      Context.ChangeXmlNodeInnerTextValue(path, "//Resolution-WindowScreenHeight", Context.Height);
      Context.ChangeXmlNodeInnerTextValue(path, "//Auto-detectBestRenderingSettings", "OFF");
    } else {
    }
  }

  if (som == "No") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dinput8.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dinput8.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
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
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);

      //Avoid the mouse move filter unless absolutely necessary as it can massively affect performance if the game gets primary input from mouse move messages.
      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);

      //ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, false);
    }
  };

  Game.ProtoInput.OnInputUnlocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);

      //ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, true);
    }
  };
};
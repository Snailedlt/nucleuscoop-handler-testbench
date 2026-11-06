Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Sun Sep 28 2025 02:32:05 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "Tmr87YYXSuZogbmtn";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("Disable Proto Input hooks?", "Fully disables keyboards/mice support. ONLY select yes if you are experiencing crashes and are only using gamepads.", "Hooks", answers1);

Game.ExecutableContext = ["bink2w64.dll"];
Game.DirSymlinkExclusions = ["bin"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "SDL2.dll", "SDL2.ini", "SDL2.log", "xinput1_3.dll", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = [
  "steam_api64.dll",
  "Galaxy64.dll",
  "amd_ags_x64.dll",
  "bink2w64.dll",
  "CChromaEditorLibrary64.dll",
  "ChromaAppInfo.xml",
  "discord_game_sdk.dll",
  "libHttpClient.Win32.dll",
  "nvngx_dlss.dll",
  "Osiris.dll",
  "PartyWin.dll",
  "PlayFabCore.Win32.dll",
  "PlayFabServices.Win32.dll"
];
Game.GameName = "Baldur's Gate 3";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableNames = ["bg3_dx11.exe", "bg3.exe"];
//Game.ExecutableName = "bg3_dx11.exe";
Game.SteamID = "1086940";
Game.CreateSteamAppIdByExe = true;
Game.GUID = "Baldurs Gate 3";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "bin";
Game.UseNucleusEnvironment = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Baldur's Gate 3 (1920x1080) - (DX11) - (x64) - (3 WT)";
Game.HasDynamicWindowTitle = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.SDL2Enabled = true;
Game.PlayersPerInstance = 2;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Local\\Larian Studios\\Baldur's Gate 3";
Game.Description =
  "Connect the instances via the native LAN. The game already has native split-screen but for 2 players max, with this you can play up to 4 in only 2 instances of the game, drag 2 gamepad icons to each instance in Nucleus UI. If you use keyboards/mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own cursor, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked.";
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

Game.ProtoInput.RegisterRawInputHook = false;
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

Game.ProtoInput.EnableFocusMessageLoop = true;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 5000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS.

Game.Play = function() {
  var txtPath = Context.NucleusUserRoot + "\\AppData\\Local\\Larian Studios\\Baldur's Gate 3\\graphicSettings.lsx";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, '                    <attribute id="MapKey" type="FixedString" value="FakeFullscreenEnabled"/>', Nucleus.SearchType.StartsWith) +
      2 +
      '|                    <attribute id="Value" type="int32" value="0"/>',
    Context.FindLineNumberInTextFile(txtPath, '                    <attribute id="MapKey" type="FixedString" value="ScreenHeight"/>', Nucleus.SearchType.StartsWith) +
      2 +
      '|                    <attribute id="Value" type="int32" value="' +
      Context.Heigh +
      '"/>',
    Context.FindLineNumberInTextFile(txtPath, '                    <attribute id="MapKey" type="FixedString" value="ScreenWidth"/>', Nucleus.SearchType.StartsWith) +
      2 +
      '|                    <attribute id="Value" type="int32" value="' +
      Context.Width +
      '"/>'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var hooks = Context.Options["Hooks"];

  if (hooks == "Yes") {
    Game.ProtoInput.InjectRuntime_EasyHookMethod = false;
    Game.FakeFocus = true;
    Game.FakeFocusInterval = 8000;
    Game.SendFakeFocusMsg = true;
    Game.HookFocus = true;
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];
      if (player.IsController) {
      } else {
        //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
        //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);
      }
    }
  };

  Game.ProtoInput.OnInputUnlocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);
    }
  };
};
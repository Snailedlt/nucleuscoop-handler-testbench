Hub.Handler.Version = 12; // Released at https://hub.splitscreen.me/ on Thu Jan 02 2025 23:46:14 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "LT3wMdrR7gPrKgfzb";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["Content"];
Game.DirSymlinkExclusions = ["Mods\\Coop Cursor", "Mods\\Lenient Window Resize"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "Stardew Valley.exe", "StardewModdingAPI.exe", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = ["config.json", "Coop Cursor.dll", "Coop Cursor.pdb", "Lenient Window Resize.dll", "Lenient Window Resize.pdb"];
Game.NeedsSteamEmulation = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Stardew Valley.exe";
Game.SteamID = "413150";
Game.CreateSteamAppIdByExe = true;
Game.GUID = "Stardew Valley";
Game.GameName = "Stardew Valley";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "conhost";
Game.HideTaskbar = false;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Stardew Valley";
Game.HasDynamicWindowTitle = true;
Game.RefreshWindowAfterStart = false;
Game.ResetWindows = true;
Game.SetWindowHook = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Roaming\\StardewValley";
Game.UserProfileSavePath = "AppData\\Roaming\\StardewValley\\Saves";
Game.Description =
  "IMPORTANT: Intended for Multiple monitors only, one player per instance, the game already has 4 player native split-screen. To start a co-op game select co-op, host a new farm and select the number of starting cabins you want (this equals the number of players), the other instances then select join LAN game, leave the field blank, press ok and join. If you have SMAPI installed for mods in your main files the handler will automatically launch the SMAPI exe even if you added the game to Nucleus by selecting the vanilla exe so do not rename any exes, installing the Co-op cursor mod by DeLiXx is recommended to fix the known issue of all instances sharing the same cursor, multiple controllers and keyboards/mice will only work with this mod now too: https://www.nexusmods.com/stardewvalley/mods/12269?tab=files. If you use keyboards and mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own working cursor and keyboard, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked.";
Game.ForceProcessPick = false;
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
Game.SupportsKeyboard = false;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = false;
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
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.AutoHideTaskbar = false;
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
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;
Game.ProtoInput.MultipleProtoControllers = true;

Game.ProtoInput.EnableFocusMessageLoop = true;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 1;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS

Game.Play = function() {
  var path = Context.NucleusUserRoot + "\\AppData\\Roaming\\StardewValley\\startup_preferences";
  Context.ChangeXmlNodeInnerTextValue(path, "//skipWindowPreparation", "true");
  Context.ChangeXmlNodeInnerTextValue(path, "//windowMode", "1");
  Context.ChangeXmlNodeInnerTextValue(path, "//windowedBorderlessFullscreen", "false");
  Context.ChangeXmlNodeInnerTextValue(path, "//fullscreen", "false");
  Context.ChangeXmlNodeInnerTextValue(path, "//gamepadControls", "true");
  Context.ChangeXmlNodeInnerTextValue(path, "//hardwareCursor", "false");
  Context.ChangeXmlNodeInnerTextValue(path, "//fullscreenResolutionX", Context.Width);
  Context.ChangeXmlNodeInnerTextValue(path, "//fullscreenResolutionY", Context.Height);
  Context.ChangeXmlNodeInnerTextValue(path, "//preferredResolutionX", Context.Width);
  Context.ChangeXmlNodeInnerTextValue(path, "//preferredResolutionY", Context.Height);
  Context.ChangeXmlNodeInnerTextValue(path, "//pauseWhenOutOfFocus", "false");

  if (Player.Owner.IsFullscreen()) {
    var path = Context.NucleusUserRoot + "\\AppData\\Roaming\\StardewValley\\startup_preferences";
    Context.ChangeXmlNodeInnerTextValue(path, "//skipWindowPreparation", "false");
    Context.ChangeXmlNodeInnerTextValue(path, "//windowMode", "1");
    Context.ChangeXmlNodeInnerTextValue(path, "//windowedBorderlessFullscreen", "true");
    Context.ChangeXmlNodeInnerTextValue(path, "//fullscreen", "false");
  }

  if (Context.IsKeyboardPlayer) {
    var path = Context.NucleusUserRoot + "\\AppData\\Roaming\\StardewValley\\startup_preferences";
    Context.ChangeXmlNodeInnerTextValue(path, "//gamepadControls", "false");
    Context.ChangeXmlNodeInnerTextValue(path, "//hardwareCursor", "false");
  }

  if (System.IO.File.Exists(Context.OrigRootFolder + "\\StardewModdingAPI.exe")) {
    Game.PauseBetweenProcessGrab = 18;

    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "StardewModdingAPI.exe"), System.IO.Path.Combine(Context.RootFolder, "Stardew Valley.exe"), true);

    if (System.IO.File.Exists(Context.OrigRootFolder + "\\Mods\\Coop Cursor\\config.json")) {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Mods\\Coop Cursor\\config.json";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, '  "enabled":', Nucleus.SearchType.StartsWith) + '|  "enabled": true,',
        Context.FindLineNumberInTextFile(txtPath, '  "keyboardPlayer":', Nucleus.SearchType.StartsWith) + '|  "keyboardPlayer": false'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      if (Context.IsKeyboardPlayer) {
        var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Mods\\Coop Cursor\\config.json";
        var dict = [
          Context.FindLineNumberInTextFile(txtPath, '  "enabled":', Nucleus.SearchType.StartsWith) + '|  "enabled": true,',
          Context.FindLineNumberInTextFile(txtPath, '  "keyboardPlayer":', Nucleus.SearchType.StartsWith) + '|  "keyboardPlayer": true'
        ];
        Context.ReplaceLinesInTextFile(txtPath, dict);
      }
    }
  } else {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "Stardew Valley.exe"), System.IO.Path.Combine(Context.RootFolder, "Stardew Valley.exe"), true);
  }

  var numPlayers = 0;

  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];

    if (player.IsXInput && player.ScreenIndex !== -1) {
      numPlayers++;
    }
    player.ProtoController1 = Context.GamepadId;
    player.ProtoController2 = Context.GamepadId;
    player.ProtoController3 = Context.GamepadId;
    player.ProtoController4 = Context.GamepadId;
    player.ProtoController5 = Context.GamepadId;
    player.ProtoController6 = Context.GamepadId;
    player.ProtoController7 = Context.GamepadId;
    player.ProtoController8 = Context.GamepadId;
    player.ProtoController9 = Context.GamepadId;
    player.ProtoController10 = Context.GamepadId;
    player.ProtoController11 = Context.GamepadId;
    player.ProtoController12 = Context.GamepadId;
    player.ProtoController13 = Context.GamepadId;
    player.ProtoController14 = Context.GamepadId;
    player.ProtoController15 = Context.GamepadId;
    player.ProtoController16 = Context.GamepadId;
  }
};
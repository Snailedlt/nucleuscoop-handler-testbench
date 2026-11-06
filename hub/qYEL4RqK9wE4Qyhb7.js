Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Sat Nov 21 2020 07:20:52 GMT+0000 (UTC).
Hub.Handler.Id = "qYEL4RqK9wE4Qyhb7";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("Disable Pillarboxing/Letterboxing?", "Removes the blackbars in splitscreen, matches aspect ratio to window res.", "Pillar", answers1);

Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "Ubi_sphere_HD_5994_6sec.ogv", "Outland.exe"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Outland.exe";
Game.SteamID = "305050";
Game.GUID = "Outland";
Game.GameName = "Outland";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.StartArguments = "";
Game.HideTaskbar = true;
Game.NotTopMost = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Outland";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_4.dll", "xinput9_1_0.dll"];
Game.PreventWindowDeactivation = false;
Game.HookFocus = true;
Game.SetWindowHookStart = true;
Game.ResetWindows = true;
Game.WindowStyleValues = ["~0xC00000", "~0x40000", "~0x20000000", "~0x20000", "~0x80000", "0x40000000"];
Game.ExtWindowStyleValues = ["~0x00000001", "~0x00000200", "~0x00020000"];
Game.UserProfileConfigPath = "AppData\\Roaming\\Housemarque\\Outland";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\305050\\remote";
Game.Description =
  "So the instances launch and resize correctly make sure to run your main game at least one time first and change some graphic settings. Connect the instances via the Online Co-op option. If you use multiple monitors or play in vertical splitscreen and you notice any gaps or bars after the instances have positioned go to the game settings and change the resolution to match your monitor res or window size. You need to add custom resolutions in your AMD/Nvidia/Intel panel (For example: 960x1080, 1920x540, 960x540 etc.) for the game to see them. If you use keyboards and mice after the instances open press the END key to lock the input for all instances to have their own keyboard input. Press the END key again to unlock the input. You can also use CTRL+Q to close Nucleus and all its instances. You can access each instance save in the app, after the first launch click game options/open user profile save path in the UI.";
Game.PromptBetweenInstances = false;
Game.PauseBetweenStarts = 30;

Game.SupportsMultipleKeyboardsAndMice = true;

Game.HookSetCursorPos = false;
Game.HookGetCursorPos = false;
Game.HookGetKeyState = true;
Game.HookGetAsyncKeyState = false;
Game.HookGetKeyboardState = false;
Game.HookFilterRawInput = true;
Game.HookFilterMouseMessages = false;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = false;

Game.SendNormalMouseInput = false;
Game.SendNormalKeyboardInput = true;
Game.SendScrollWheel = false;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;
Game.LockInputAtStart = false;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\settings.cfg";
  var dict = ["1|main loc 132, 42 size " + Context.Width + " x " + Context.Height, "3|fullscreen false"];

  Context.ReplaceLinesInTextFile(txtPath, dict);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient016",
    "SteamGameServer012",
    "SteamGameServerStats001",
    "SteamUser017",
    "SteamFriends014",
    "SteamUtils007",
    "SteamMatchMaking009",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION011",
    "STEAMAPPS_INTERFACE_VERSION006",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION012",
    "STEAMSCREENSHOTS_INTERFACE_VERSION002",
    "STEAMHTTP_INTERFACE_VERSION002",
    "STEAMUNIFIEDMESSAGES_INTERFACE_VERSION001",
    "STEAMUGC_INTERFACE_VERSION003",
    "STEAMAPPLIST_INTERFACE_VERSION001",
    "STEAMMUSIC_INTERFACE_VERSION001",
    "STEAMMUSICREMOTE_INTERFACE_VERSION001",
    "STEAMHTMLSURFACE_INTERFACE_VERSION_002",
    "STEAMCONTROLLER_INTERFACE_VERSION"
  ];

  Context.WriteTextFile(interfaces, lines);

  var pillar = Context.Options["Pillar"];

  if (pillar == "Yes") {
    if (Context.AspectRatioDecimal > 1.8) {
      //remove pillar boxing
      Context.PatchFile(
        System.IO.Path.Combine(Context.RootInstallFolder, "Outland.exe"),
        System.IO.Path.Combine(Context.RootFolder, "Outland.exe"),
        [0xd8, 0x39, 0x8e, 0xe3, 0x3f],
        [0xd8, 0x39, 0x8e, 0x63, 0x40]
      );

      Context.PatchFile(
        System.IO.Path.Combine(Context.RootFolder, "Outland.exe"),
        System.IO.Path.Combine(Context.RootFolder, "Outland.exe"),
        [0x51, 0xc7, 0x04, 0x24, 0x39, 0x8e, 0xe3, 0x3f],
        [0x51, 0xc7, 0x04, 0x24, 0x39, 0x8e, 0x63, 0x40]
      );
    } else if (Context.AspectRatioDecimal < 1.2) {
      Context.PatchFile(
        System.IO.Path.Combine(Context.RootInstallFolder, "Outland.exe"),
        System.IO.Path.Combine(Context.RootFolder, "Outland.exe"),
        [0xd8, 0x39, 0x8e, 0xe3, 0x3f],
        [0xd8, 0x39, 0x8e, 0x63, 0x3f]
      );

      Context.PatchFile(
        System.IO.Path.Combine(Context.RootFolder, "Outland.exe"),
        System.IO.Path.Combine(Context.RootFolder, "Outland.exe"),
        [0x51, 0xc7, 0x04, 0x24, 0x39, 0x8e, 0xe3, 0x3f],
        [0x51, 0xc7, 0x04, 0x24, 0x39, 0x8e, 0x63, 0x3f]
      );
    } else {
      System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "Outland.exe"), System.IO.Path.Combine(Context.RootFolder, "Outland.exe"), true);
    }
  }

  if (pillar == "No") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "Outland.exe"), System.IO.Path.Combine(Context.RootFolder, "Outland.exe"), true);
  }
};
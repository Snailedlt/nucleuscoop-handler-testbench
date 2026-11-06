Hub.Handler.Version = 5; // Released at https://hub.splitscreen.me/ on Thu Sep 28 2023 04:19:14 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "hqwffgmFCJHmWEjPt";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
var answers2 = ["No", "Yes"];
Game.AddOption(
  "Use Flawless Widescreen?",
  "Only select yes if you want to fix the stretching in split-screen and use custom resolutions. Read the handler notes to learn how to use it.",
  "FW",
  answers1
);
Game.AddOption(
  "Xbox One gamepads x360ce fix?",
  "ONLY use if your Xbox One gamepads are not recognized in the main game. Map your gamepads fully in the x360ce window that will open then close it.",
  "Onefix",
  answers2
);

Game.ExecutableContext = ["binkw32.dll"];
Game.KillMutex = ["DeadRising2", "ThreadPoolEvent0", "ThreadPoolEvent1", "ThreadPoolEvent2", "ThreadPoolEvent3"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "local_save.txt", "d3d9.dll", "xinput1_3.dll"];
Game.RenameNotKillMutex = true;
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "deadrising2.exe";
Game.SteamID = "45740";
Game.GUID = "Dead Rising 2";
Game.GameName = "Dead Rising 2";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "DeadRising II";
Game.HasDynamicWindowTitle = true;
Game.UseDirectX9Wrapper = true;
Game.HookFocus = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\45740\\remote";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "Start a game in one instance and join in the other using play online. If you use keyboards and mice after the instances open press the END key once to lock the input for all instances to have their own cursor. Press the END key again to unlock the input. You can also use CTRL+Q to close Nucleus and all its instances. Enable Flawless Widescreen in the Nucleus UI options if you want to fix the stretching in vertical or horizontal splitscreen. If you use the FWS option you will get a message saying it can't find the Flawless Widescreen module, click ok and FWS will open, in the list of modules select the Dead Rising 2 one, once it is installed close FWS and the instances will open. Once the last instance opens FWS will open again and the patches to fix the stretching should apply automatically, if they don't apply automatically after FWS opens the second time just select the new instances modules that Nucleus created in the FWS UI and they should enable. Use CTRL+T if the Nucleus instances get in the way. You can also adjust the hud/menus size in settings/configuration/display detection in the FWS window.";
Game.PauseBetweenStarts = 30;
Game.GamePlayBeforeGameSetup = true;

Game.SupportsMultipleKeyboardsAndMice = true;

Game.HookSetCursorPos = true;
Game.HookGetCursorPos = true;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = false;
Game.HookGetKeyboardState = false;
Game.HookFilterRawInput = true;
Game.HookFilterMouseMessages = false;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = false;

Game.SendNormalMouseInput = true;
Game.SendNormalKeyboardInput = true;
Game.SendScrollWheel = true;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = true;
Game.HookReRegisterRawInputMouse = true;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;
Game.LockInputAtStart = false;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient015",
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
    "STEAMCONTROLLER_INTERFACE_VERSION",
    "STEAMUGC_INTERFACE_VERSION002",
    "STEAMAPPLIST_INTERFACE_VERSION001",
    "STEAMMUSIC_INTERFACE_VERSION001",
    "STEAMMUSICREMOTE_INTERFACE_VERSION001"
  ];
  Context.WriteTextFile(interfaces, lines);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\DLC.txt";
  var lines = [
    "353053=Dead Rising 2 - Sports Fan Skills Pack",
    "353052=Dead Rising 2 - Soldier of Fortune Pack",
    "353051=Dead Rising 2 - Psychopath Skills Pack",
    "353050=Dead Rising 2 - Ninja Skills Pack"
  ];
  Context.WriteTextFile(dlc, lines);

  if (Context.HasKeyboardPlayer == true) {
    Game.PreventWindowDeactivation = true;
  } else {
    //Game.FakeFocus = true;
    //Game.FakeFocusInterval = 5000;
    Game.SendFakeFocusMsg = true;
    Game.SetForegroundWindowElsewhere = true;
    //Game.SupportsMultipleKeyboardsAndMice = false;
  }

  var fw = Context.Options["FW"];
  var fix = Context.Options["Onefix"];

  if (fw == "Yes") {
    Game.FlawlessWidescreen = "DeadRising2";
    Game.FlawlessWidescreenOverrideDisplay = true;

    Context.BackupFile(Context.NucleusFolder + "\\utils\\FlawlessWidescreen\\x64\\settings.xml", true);

    if (Context.PlayerID == 0) {
      var txtPath = Context.NucleusFolder + "\\utils\\FlawlessWidescreen\\x64\\settings.xml";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "		<CustomSettings Enabled=", Nucleus.SearchType.StartsWith) +
          '|		<CustomSettings Enabled="true" Width="' +
          Context.Width +
          '" Height="' +
          Context.Height +
          '" DisplaysX="1" DisplaysY="1" HUDWidth="' +
          Context.Width +
          '" HUDHeight="' +
          Context.Height +
          '" HUDX="' +
          Context.Width +
          '" HUDY="0"/> '
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }
  }

  if (fw == "No") {
  }

  if (fix == "Yes") {
    Game.UseX360ce = true;
    Game.XboxOneControllerFix = true;
  }

  if (fix == "No") {
    Game.UseX360ce = false;
    Game.XboxOneControllerFix = false;
    Game.XInputPlusDll = ["xinput1_3.dll"];
  }
};
Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Wed Dec 30 2020 07:19:52 GMT+0000 (UTC).
Hub.Handler.Id = "EPzy3CC4EAhFFkXsh";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
var answers2 = ["No", "Yes"];
var answers3 = ["Default", "Enable", "Disable"];
Game.AddOption("Patch 60 FPS?", "The game is locked to 30 fps, this patches 60 fps in all Nucleus instances only.", "FPS", answers1);
Game.AddOption("Use Flawless Widescreen?", "Select yes if you want to fix the stretching and use custom resolutions.", "FW", answers2);
Game.AddOption("Enable experimental Xinput Reroute?", "Launch, then close Nucleus and open it again for Reroute support to enable.", "Reroute", answers3);

Game.ExecutableContext = ["PhysXDevice.dll"];
Game.KillMutex = ["SkyDrift"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "d3d9.dll", "d3d9.ini", "dinput8.dll", "xinput1_3.dll", "SkyDrift.exe"];
Game.KillMutexType = "Section";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "SkyDrift.exe";
Game.SteamID = "91100";
Game.GUID = "SkyDrift";
Game.GameName = "SkyDrift";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.BinariesFolder = "";
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.SupportsPositioning = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "SkyDrift";
Game.HasDynamicWindowTitle = true;
Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.UseAlpha8CustomDll = true;
Game.ResetWindows = true;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\91100\\remote";
Game.Description =
  "If your gamepads are not working go to the game options, controls and select your input device there. Alt-tab to an instance to use the keyboard. Enable Flawless Widescreen in the Nucleus UI options if you want to fix the stretching in horizontal or vertical splitscreen. If you use the FWS option on first run you will get a message saying it can't find the Flawless Widescreen module, click ok and FWS will open, in the list of modules select the Skydrift one, once it is installed close FWS and the instances will open. Once the last instance opens FWS will open again and the patches to fix the stretching should apply automatically, if they don't apply automatically after FWS opens the second time just select the new instances modules that Nucleus created in the FWS UI and they should enable. Use CTRL+T if the Nucleus instances get in the way. You can also adjust the hud/menus size in settings/configuration/display detection in the FWS window. The Xinput Reroute UI option reroutes directinput back to xinput to track more than 4 gamepads on xinput at once allowing to play with more than 4 xinput gamepads. Xbox one gamepads do not work with focus when using reroute because of the driver background input issue.";
Game.PauseBetweenStarts = 30;
Game.GamePlayBeforeGameSetup = true;

Game.Play = function() {
  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient010",
    "SteamGameServer010",
    "SteamGameServerStats001",
    "SteamUser016",
    "SteamFriends009",
    "SteamUtils005",
    "SteamMatchMaking008",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION010",
    "STEAMAPPS_INTERFACE_VERSION004",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION004",
    "STEAMHTTP_INTERFACE_VERSION001",
    "SteamMasterServerUpdater001"
  ];

  Context.WriteTextFile(interfaces, lines);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\DLC.txt";
  var lines = ["91106=Skydrift Gladiator Multiplayer Pack", "91104=Skydrift Extreme Fighters Premium Airplane Pack"];

  Context.WriteTextFile(dlc, lines);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "d3d9.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "d3d9.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  Context.Hook.BlockMouseEvents = "False";
  Context.Hook.BlockKeyboardEvents = "False";
  Context.Hook.BlockInputEvents = "False";
  Context.Hook.ForceFocus = "True";

  var fps = Context.Options["FPS"];
  var fw = Context.Options["FW"];
  var reroute = Context.Options["Reroute"];

  if (fps == "Yes") {
    //patch 60fps.
    Context.PatchFile(System.IO.Path.Combine(Context.RootInstallFolder, "SkyDrift.exe"), System.IO.Path.Combine(Context.RootFolder, "SkyDrift.exe"), [0xfe, 0x21, 0x0f], [0xfe, 0x11, 0x0f]);

    Context.PatchFile(
      System.IO.Path.Combine(Context.RootFolder, "SkyDrift.exe"),
      System.IO.Path.Combine(Context.RootFolder, "SkyDrift.exe"),
      [0xe0, 0xfe, 0x40, 0xc3, 0xcc, 0xcc, 0xcc, 0xcc, 0xcc, 0xcc, 0xcc, 0xcc],
      [0xe0, 0xfe, 0x40, 0xc3, 0xe8, 0x06, 0x00, 0x00, 0x00, 0x01, 0xc0, 0xc3]
    );

    Context.PatchFile(
      System.IO.Path.Combine(Context.RootFolder, "SkyDrift.exe"),
      System.IO.Path.Combine(Context.RootFolder, "SkyDrift.exe"),
      [0xfe, 0xff, 0x81, 0x4e, 0x04, 0x00, 0x01, 0x00, 0x00, 0x5f, 0x5e, 0x5d, 0x5b, 0xc3, 0xcc, 0xcc, 0xcc, 0xcc, 0xcc, 0xcc, 0xcc, 0xcc, 0xcc, 0xcc],
      [0xfe, 0xff, 0x81, 0x4e, 0x04, 0x00, 0x01, 0x00, 0x00, 0x5f, 0x5e, 0x5d, 0x5b, 0xc3, 0xb8, 0x3c, 0x00, 0x00, 0x00, 0x89, 0x46, 0x14, 0xeb, 0x0e]
    );

    Context.PatchFile(
      System.IO.Path.Combine(Context.RootFolder, "SkyDrift.exe"),
      System.IO.Path.Combine(Context.RootFolder, "SkyDrift.exe"),
      [0x56, 0x8b, 0xf1, 0x8b, 0x46, 0x14, 0xdb, 0x46, 0x14],
      [0x56, 0x8b, 0xf1, 0xeb, 0xe9, 0x90, 0xdb, 0x46, 0x14]
    );

    Context.PatchFile(System.IO.Path.Combine(Context.RootFolder, "SkyDrift.exe"), System.IO.Path.Combine(Context.RootFolder, "SkyDrift.exe"), [0x2f, 0xc1, 0x72, 0x76], [0x2f, 0xc1, 0x90, 0x90]);

    Context.PatchFile(System.IO.Path.Combine(Context.RootFolder, "SkyDrift.exe"), System.IO.Path.Combine(Context.RootFolder, "SkyDrift.exe"), [0x69, 0xe8, 0xbd], [0x69, 0xe8, 0xb2]);
  }

  if (fps == "No") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "SkyDrift.exe"), System.IO.Path.Combine(Context.RootFolder, "SkyDrift.exe"), true);
  }

  if (fw == "Yes") {
    Game.FlawlessWidescreen = "Skydrift";
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

  if (reroute == "Default") {
  }

  if (reroute == "Enable") {
    var NucleusRoot = System.IO.Path.Combine(Game.Folder, "..", "..");
    var cfgFilePath = NucleusRoot + "\\scripts\\SkyDrift.js";

    var route = Context.FindLineNumberInTextFile(cfgFilePath, "Game.Hook.XInputReroute", Nucleus.SearchType.StartsWith);
    var dinputb = Context.FindLineNumberInTextFile(cfgFilePath, "Game.UseDInputBlocker", Nucleus.SearchType.StartsWith);

    Context.ReplaceLinesInTextFile(cfgFilePath, [route + "|Game.Hook.XInputReroute = true; ", dinputb + "|Game.UseDInputBlocker = false; "]);
  }
  if (reroute == "Disable") {
    var NucleusRoot = System.IO.Path.Combine(Game.Folder, "..", "..");
    var cfgFilePath = NucleusRoot + "\\scripts\\SkyDrift.js";

    var route = Context.FindLineNumberInTextFile(cfgFilePath, "Game.Hook.XInputReroute", Nucleus.SearchType.StartsWith);
    var dinputb = Context.FindLineNumberInTextFile(cfgFilePath, "Game.UseDInputBlocker", Nucleus.SearchType.StartsWith);

    Context.ReplaceLinesInTextFile(cfgFilePath, [route + "|Game.Hook.XInputReroute = false; ", dinputb + "|Game.UseDInputBlocker = true; "]);
  }
};
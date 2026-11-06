Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Jun 13 2022 04:37:54 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "Be66w8Cfvc3d3RXdT";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["OuterWilds_Data"];
Game.DirSymlinkExclusions = ["OuterWilds_Data\\Plugins\\x86_64"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = [
  "0Harmony.dll",
  "Assembly-CSharp.dll",
  "OWML.Abstractions.dll",
  "OWML.Common.dll",
  "OWML.Config.json",
  "OWML.DefaultConfig.json",
  "OWML.Logging.dll",
  "OWML.Manifest.json",
  "OWML.ModHelper.Assets.dll",
  "OWML.ModHelper.dll",
  "OWML.ModHelper.Events.dll",
  "OWML.ModHelper.Input.dll",
  "OWML.ModHelper.Interaction.dll",
  "OWML.ModHelper.Menus.dll",
  "OWML.ModLoader.dll",
  "OWML.Utils.dll"
];
Game.GameName = "Outer Wilds";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "OuterWilds.exe";
Game.SteamID = "753640";
Game.GUID = "Outer Wilds";
Game.CreateSteamAppIdByExe = true;
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseGoldberg = false;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Outer Wilds";
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_4.dll", "xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.BlockRawInput = false;
Game.UserProfileSavePath = "AppData\\LocalLow\\Mobius Digital\\Outer Wilds";
Game.Description =
  "IMPORTANT: Requires the latest Outer Wilds Quantum Space Buddies Multiplayer Co-op mod to be installed in your game files. Create and select a different in-game profile per instance. On first run set all instances to windowed in the game graphics settings and select the correct custom resolution and aspect ratio otherwise the instances will resize again on their own (if you have a 1920x1080 monitor for example select 1920x540 res in all for 2 players horizontal split-screen or 960x1080 for vertical). You need to create custom resolutions in your AMD/Nvidia/Intel panel (for example: 960x540, 1920x540 etc.) so the game can see and use them, set the correct custom res in-game for the instances to resize correctly. To connect the instances start a multiplayer game in one instance by selecting open to multiplayer and join in the others via the connect to multiplayer option, write local host and click connect, use your mouse cursor to do this. The game can be demanding so reduce in-game graphics settings per profile to improve performance, alt-tab to the Nucleus window to improve fps. Tested with latest legit Steam version only, gamepads only. Make sure the Quantum Space Buddies Multiplayer mod is installed in AppData\\Roaming\\OuterWildsModManager\\OWML\\Mods\\Raicuparta.QuantumSpaceBuddies.";
Game.KeepSymLinkOnExit = false;
Game.PromptBetweenInstances = true;
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 35;

Game.Play = function() {
  var Args = (Context.Args = " -screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height);

  Context.StartArguments = Args;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Mobius Digital\\Outer Wilds", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Mobius Digital\\Outer Wilds", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Mobius Digital\\Outer Wilds", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Mobius Digital\\Outer Wilds", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);

  var jsonPath = Context.NucleusUserRoot + "\\AppData\\Roaming\\OuterWildsModManager\\OWML\\Mods\\Raicuparta.QuantumSpaceBuddies\\debugsettings.json";
  var params = [
    "{",
    '  "useKcpTransport": true,',
    '  "dumpWorldObjects": false,',
    '  "instanceIdInLogs": false,',
    '  "hookDebugLogs": false,',
    '  "avoidTimeSync": false,',
    '  "debugMode": false,',
    '  "drawGui": false,',
    '  "drawLines": false,',
    '  "drawLabels": false,',
    '  "drawQuantumVisibilityObjects": false,',
    '  "skipTitleScreen": false,',
    '  "greySkybox": false,',
    '  "drawGhostAI": false',
    "}"
  ];
  Context.WriteTextFile(jsonPath, params);
};
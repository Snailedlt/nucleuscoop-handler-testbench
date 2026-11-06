Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Tue Dec 29 2020 08:06:32 GMT+0000 (UTC).
Hub.Handler.Id = "JyjkZdPxGGgDrk2QS";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("Use Flawless Widescreen?", "Select yes if you want to fix the letterboxing/pillarboxing.", "FW", answers1);

Game.ExecutableContext = ["binkw32.dll"];
Game.KillMutex = ["UnrealEngine3_SHIPPING_6"];
Game.DirSymlinkExclusions = ["Binaries\\Win32"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SupportsKeyboard = true;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "SpecOpsTheLine.exe";
Game.SteamID = "50300";
Game.GUID = "Spec Ops The Line";
Game.GameName = "Spec Ops: The Line";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.BinariesFolder = "Binaries\\Win32";
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Spec Ops: The Line";
Game.HasDynamicWindowTitle = true;
Game.UseDirectX9Wrapper = true;
Game.Hook.DInputForceDisable = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.FakeFocus = true;
Game.HookFocus = false;
Game.UserProfileSavePath = "Documents\\My Games\\SpecOps-TheLine\\SRGame\\SaveData";
Game.Description =
  "Select the flawless widescreen option in the UI if you want to remove the black borders in vertical and horizontal splitscreen. If you use the FWS option on first run you will get a message saying it can't find the Flawless Widescreen module, click ok and FWS will open, in the list of modules select the SpecOpsTheLine one, once it is installed close FWS and the instances will open. Once the last instance opens FWS will open again and the patches to remove the blackbars should apply automatically, if they don't apply automatically after FWS opens the second time just select the new instances modules that Nucleus created in the FWS UI and they should enable. Use CTRL+T if the Nucleus instances get in the way. You can also adjust the hud/menus size in settings/configuration/display detection in the FWS window.";
Game.PauseBetweenStarts = 30;
Game.GamePlayBeforeGameSetup = true;

Game.Play = function() {
  if (Context.IsKeyboardPlayer) {
    Context.StartArguments = "-Fullscreen -AlwaysFocus -nosplash -nostartupmovies -NoController" + " -ResX= " + Context.Width + " -ResY= " + Context.Height;
  } else {
    Context.StartArguments = "-Fullscreen -AlwaysFocus -nosplash -nostartupmovies -nomouse" + " -ResX= " + Context.Width + " -ResY= " + Context.Height;
  }

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win32\\steam_interfaces.txt";
  var lines = [
    "SteamClient011",
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
    "STEAMSCREENSHOTS_INTERFACE_VERSION001",
    "STEAMHTTP_INTERFACE_VERSION001",
    "SteamMasterServerUpdater001"
  ];

  Context.WriteTextFile(interfaces, lines);

  var fw = Context.Options["FW"];

  if (fw == "Yes") {
    Game.FlawlessWidescreen = "SpecOpsTheLine";
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
};
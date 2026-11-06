Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Fri Jan 08 2021 11:52:22 GMT+0000 (UTC).
Hub.Handler.Id = "8jnvL2TMYQGeKzRrC";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
Game.AddOption("Disable Pillarboxing/Letterboxing?", "Removes the black bars in splitscreen.", "Pillar", answers1);

Game.DirSymlinkExclusions = ["bin"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_api64.dll", "steam_appid.txt", "steam_interfaces.txt", "SecretPonchosD3D11.exe", "fmod_event.dll", "fmodex.dll", "iggy_w32.dll"];
Game.FileSymlinkCopyInstead = ["options.txt"];
Game.DeleteOnClose = ["steam_api.dll"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.UseNucleusEnvironment = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "SecretPonchosD3D11.exe";
Game.SteamID = "265750";
Game.GUID = "Secret Ponchos";
Game.GameName = "Secret Ponchos";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.BinariesFolder = "bin";
Game.LauncherTitle = "";
Game.LauncherExe = "SecretPonchosD3D11.exe";
Game.LauncherExeIgnoreFileCheck = true;
Game.SupportsPositioning = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Secret Ponchos (D3D11)";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.FakeFocus = true;
Game.RefreshWindowAfterStart = true;
Game.UseForceBindIP = true;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\265750\\remote";
Game.Description =
  "IMPORTANT: Make sure your Secret Ponchos .exe and dlls are inside your main game files bin folder, they should be there by default in the steam version. One player hosts (recommend private matches for most customization), and use invite players to invite everyone else. You can use the cursor to accept the invite. If you get uneven fps in the instances try alt tabbing to the nucleuscoop app window when using multiple gamepads only, the game windows will still remain on top.";
Game.GamePlayBeforeGameSetup = true;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\options.txt";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, '"fullscreen":', Nucleus.SearchType.StartsWith) + '|"fullscreen": false,',
    Context.FindLineNumberInTextFile(txtPath, '"hasMultiplayerHelpBeenDisplayed":', Nucleus.SearchType.StartsWith) + '|"hasMultiplayerHelpBeenDisplayed": true,',
    Context.FindLineNumberInTextFile(txtPath, '"hasPregameHelpBeenDisplayed":', Nucleus.SearchType.StartsWith) + '|"hasPregameHelpBeenDisplayed": true,',
    Context.FindLineNumberInTextFile(txtPath, '"windowLeft":', Nucleus.SearchType.StartsWith) + '|"windowLeft": 0,',
    Context.FindLineNumberInTextFile(txtPath, '"windowRight":', Nucleus.SearchType.StartsWith) + '|"windowRight": ' + Context.Width + ",",
    Context.FindLineNumberInTextFile(txtPath, '"windowTop":', Nucleus.SearchType.StartsWith) + '|"windowTop": 0,',
    Context.FindLineNumberInTextFile(txtPath, '"windowBottom":', Nucleus.SearchType.StartsWith) + '|"windowBottom": ' + Context.Height + ","
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "fmod_event.dll"), System.IO.Path.Combine(Context.RootFolder, "fmod_event.dll"), true);

  System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "fmodex.dll"), System.IO.Path.Combine(Context.RootFolder, "fmodex.dll"), true);

  System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "iggy_w32.dll"), System.IO.Path.Combine(Context.RootFolder, "iggy_w32.dll"), true);

  var NucleusRoot = System.IO.Path.Combine(Game.Folder, "..", "..");
  System.IO.File.Copy(NucleusRoot + "\\utils\\XInputPlus\\x86\\xinput1_3.dl_", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput9_1_0.dll");
  System.IO.File.Copy(NucleusRoot + "\\utils\\XInputPlus\\XInputPlus.ini", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini");

  if (!System.IO.File.Exists(Context.OrigRootFolder + "\\steam_api.dll")) {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "steam_api.dll"), System.IO.Path.Combine(Context.OrigRootFolder, "steam_api.dll"), true);
  } else {
  }

  if (Player.IsKeyboardPlayer) {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "0"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "0"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
    ]);
  } else {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", Context.PlayerID + 1),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", Context.PlayerID + 1),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", Context.PlayerID + 1),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", Context.PlayerID + 1)
    ]);
  }

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient017",
    "SteamGameServer012",
    "SteamGameServerStats001",
    "SteamUser018",
    "SteamFriends015",
    "SteamUtils007",
    "SteamMatchMaking009",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION011",
    "STEAMAPPS_INTERFACE_VERSION007",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION013",
    "STEAMSCREENSHOTS_INTERFACE_VERSION002",
    "STEAMHTTP_INTERFACE_VERSION002",
    "STEAMUNIFIEDMESSAGES_INTERFACE_VERSION001",
    "STEAMUGC_INTERFACE_VERSION007",
    "STEAMAPPLIST_INTERFACE_VERSION001",
    "STEAMMUSIC_INTERFACE_VERSION001",
    "STEAMMUSICREMOTE_INTERFACE_VERSION001",
    "STEAMHTMLSURFACE_INTERFACE_VERSION_003",
    "STEAMINVENTORY_INTERFACE_V001",
    "SteamController003",
    "STEAMVIDEO_INTERFACE_V001"
  ];
  Context.WriteTextFile(interfaces, lines);

  var pillar = Context.Options["Pillar"];

  if (pillar == "Yes") {
    //remove pillar boxing
    Context.PatchFileFindAll(
      System.IO.Path.Combine(Context.RootInstallFolder, "SecretPonchosD3D11.exe"),
      System.IO.Path.Combine(Context.RootFolder, "SecretPonchosD3D11.exe"),
      [0x39, 0x8e, 0xe3, 0x3f],
      Context.ConvertToBytes(Context.AspectRatioDecimal)
    );
  }

  if (pillar == "No") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "SecretPonchosD3D11.exe"), System.IO.Path.Combine(Context.RootFolder, "SecretPonchosD3D11.exe"), true);
  }
};
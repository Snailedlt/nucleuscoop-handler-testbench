Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Thu Feb 13 2020 07:44:58 GMT+0000 (UTC).
Hub.Handler.Id = "qxHHhrBCPX3pEHMTd";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["binaries\\win32", "DamageGame\\Config"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt"];
Game.FileSymlinkCopyInstead = ["DamageEngine.ini", "DamageSystemSettings.ini"];
Game.GameName = "Teenage Mutant Ninja Turtles: Out of the Shadows";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "tmnt-oots.exe";
Game.SteamID = "228560";
Game.GUID = "TMNT Out of the Shadows";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "binaries\\win32";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.StartArguments = "-windowed -AlwaysFocus -nomoviestartup -nosplash";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Teenage Mutant Ninja Turtles(32-bit, DX9)";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.HookFocus = true;
Game.SetWindowHookStart = true;
Game.Description =
  "If windows resize or don't mantain custom resolution after pressing start in the title screen delete the OptionSaveData.bin inside the saves folder in your original game files. Select a different saveslot ingame per instance and use the load game option to load a different save slot. ";
Game.PauseBetweenStarts = 20;

Game.Play = function() {
  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\DamageGame\\Config\\DamageEngine.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Engine.Engine", "bPauseOnLossOfFocus", false),
    new Nucleus.IniSaveInfo("Engine.Engine", "bPauseLostFocusWindowed", false),
    new Nucleus.IniSaveInfo("Engine.Engine", "bMuteAudioWhenNotInFocus", false)
  ]);

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\DamageGame\\Config\\DamageSystemSettings.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("SystemSettings", "ResX", Context.Width),
    new Nucleus.IniSaveInfo("SystemSettings", "ResY", Context.Height),
    new Nucleus.IniSaveInfo("SystemSettings", "Fullscreen", false)
  ]);

  var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\binaries\\win32\\steam_interfaces.txt";
  var lines = [
    "SteamClient012",
    "SteamClient012",
    "SteamClient012",
    "SteamGameServer011",
    "SteamGameServer011",
    "SteamGameServer011",
    "SteamGameServerStats001",
    "SteamGameServerStats001",
    "SteamGameServerStats001",
    "SteamUser016",
    "SteamUser016",
    "SteamUser016",
    "SteamFriends011",
    "SteamFriends011",
    "SteamFriends011",
    "SteamUtils005",
    "SteamUtils005",
    "SteamUtils005",
    "STEAMUSERSTATS_INTERFACE_VERSION010",
    "STEAMAPPS_INTERFACE_VERSION005",
    "SteamNetworking005",
    "SteamNetworking005",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION006",
    "STEAMSCREENSHOTS_INTERFACE_VERSION001",
    "STEAMHTTP_INTERFACE_VERSION001",
    "STEAMUNIFIEDMESSAGES_INTERFACE_VERSION001"
  ];

  Context.WriteTextFile(autoExec, lines);
};

Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Sun Dec 06 2020 21:48:52 GMT+0000 (UTC).
Hub.Handler.Id = "nAGkzeSX4ot2eaFHy";
Hub.Maintainer.Name = "Perserveruz";
Hub.Maintainer.Id = "nFAYvHKj75jAFRAgt";

Game.KillMutex = ["Insane2"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt"];
Game.PartialMutexSearch = true;
Game.HandlerInterval = 100;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseNucleusEnvironment = true;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "i2.exe";
Game.SteamID = "35320";
Game.GUID = "Insane2";
Game.GameName = "Insane2";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.BinariesFolder = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Insane2 Steam release build 60 (41cde98) (Mar 17 2012 06:15:59)";
Game.HasDynamicWindowTitle = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.FakeFocus = true;
Game.HookFocus = false;
Game.UserProfileConfigPath = "Documents\\My Games\\insane2";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\35320\\remote";
Game.Description =
  "Create a multiplayer server in one instance and change to join in the multiplayer option to connect to the server in the other instances. The game already has native splitscreen for 2 players max but with this you can play 4+. Each instance has its own save, you can access these saves in the app, after the first launch click game options/open user profile save path in the UI.";
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\user_config.cfg";
  var dict = ['138|seta r_fullscreen "0"', '140|seta r_height "' + Context.Height + '"', '146|seta r_width "' + Context.Width + '"'];

  Context.ReplaceLinesInTextFile(txtPath, dict);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_api.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "steam_api.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  if (Context.PlayerID == 0) {
    var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\user_config.cfg";
    var dict = ['151|seta s_musicVolume "0.75"'];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  } else {
    var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\user_config.cfg";
    var dict = ['151|seta s_musicVolume "0.00"'];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
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
    "SteamMasterServerUpdater001"
  ];

  Context.WriteTextFile(interfaces, lines);

  /*   if (Context.NumControllers < 5) { 
		 
	Game.Hook.XInputReroute = false;  
	 
	} 
	 
	else { 
		 
	Game.Hook.CustomDllEnabled= true;
        Game.Hook.UseAlpha8CustomDll = true;
	 
	} */
};
Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Fri Aug 11 2023 01:51:41 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "yL2B8iqBA9ohpfzPJ";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["oriDE_Data"];
Game.DirSymlinkExclusions = ["ClientModules", "oriDE_Data\\Managed", "oriDE_Data\\Mono", "oriDE_Data\\output", "oriDE_Data\\Plugins", "oriDE_Data\\xInput", "Server\\Logs", "Server\\ServerModules"];
Game.DirSymlinkCopyInstead = ["oriDE_Data\\Managed", "oriDE_Data\\Plugins", "oriDE_Data\\Resources"];
Game.FileSymlinkExclusions = ["dinput8.dll", "xinput1_3.dll", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = [
  "MPSettings.json",
  "steam_api.dll",
  "SteamworksNative.dll",
  "mono.dll",
  "WWDedicatedServer.dll",
  "WWDedicatedServer.exe",
  "WWDedicatedServer.runtimeconfig.json",
  "ORIDEServerModule.dll",
  "ORIDEClientModule.dll",
  "moonDebug.txt",
  "guids.txt",
  "output_log.txt"
];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "oriDE.exe";
Game.CreateSteamAppIdByExe = true;
Game.SteamID = "387290";
Game.GUID = "Ori and the Blind Forest Definitive Edition";
Game.GameName = "Ori and the Blind Forest: Definitive Edition";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Ori And The Blind Forest: Definitive Edition";
Game.DPIHandling = Nucleus.DPIHandling.InvScaled;
Game.FakeFocus = true;
Game.FakeFocusInterval = 1000;
Game.SendFakeFocusMsg = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput1_4.dll", "xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = false;
Game.UserProfileSavePath = "AppData\\Local\\Ori and the Blind Forest DE";
Game.Description =
  "IMPORTANT: Requires the WW_Launcher by zheka: https://github.com/zheka-100500/WW_Launcher. Download and open the Launcher then click on the mods tab, select Ori and the Blind Forest and install the mp mod, run your main game after that at least once. Before running this go to the Launcher servers tab and run the Ori server, write the number of players and the port to start it, also write the command ignoreip so that the instances can connect and the es command if you want entities to sync. After all of that do not close the server window and launch this handler, click connect in the top left corner and start a game in all instances after the prologue and tutorial, make sure the ip and your port match the server's (e.g. 127.0.0.1, port 7777). If you get a crash error message in one of the instances after connecting do not click ok on it and you can keep playing. Alt-Tab to an instance and press P in your keyboard if one of the players becomes invisible but be careful as this could crash the game. Use the command cc in the server and edit the MPSettings.json in the instances folders inside Nucleus content folder if you want to use a custom player color, the color applies after you connect the instance to the server. Delete the instances folders if you update the mp mod or tne server files. Each instance has its own saves that are copies of your original ones, so your original saves will not be overwritten. You can access these saves in the app, after the first launch click game options/open user profile save path in the UI. If you use xbox one/series gamepads do not click or alt-tab on an instance during gameplay or you will lose focus, if you did, exit to the main menu and load a game again.";
Game.KeepSymLinkOnExit = true;
Game.PauseBetweenStarts = 20;

Game.Play = function() {
  var Args = (Context.Args = " -screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height);

  Context.StartArguments = Args;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Microsoft Studios\\Ori And The Blind Forest: Definitive Edition", "Screenmanager Is Fullscreen mode_h3981298716", 3, Nucleus.RegType.DWord);
  Context.EditRegKey(
    "HKEY_CURRENT_USER",
    "SOFTWARE\\Microsoft Studios\\Ori And The Blind Forest: Definitive Edition",
    "Screenmanager Resolution Height_h2627697771",
    Context.Height,
    Nucleus.RegType.DWord
  );
  Context.EditRegKey(
    "HKEY_CURRENT_USER",
    "SOFTWARE\\Microsoft Studios\\Ori And The Blind Forest: Definitive Edition",
    "Screenmanager Resolution Width_h182942802",
    Context.Width,
    Nucleus.RegType.DWord
  );

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\MPSettings.json";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, '    "NickName"', Nucleus.SearchType.StartsWith) + '|    "NickName": "' + Context.Nickname + '",'
    //Context.FindLineNumberInTextFile(txtPath, '    "IP"', Nucleus.SearchType.StartsWith) + '|    "IP": "127.0.0.1"',
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);
};
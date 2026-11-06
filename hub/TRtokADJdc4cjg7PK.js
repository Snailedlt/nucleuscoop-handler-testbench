Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Wed Dec 02 2020 00:43:05 GMT+0000 (UTC).
Hub.Handler.Id = "TRtokADJdc4cjg7PK";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["NewGundamBreaker.map"];
Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv141\\Win64", "NewGundamBreaker\\Binaries\\Win64", "EasyAntiCheat"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "xinput1_3.dll", "denuvo64.dll", "winmm.dll", "EasyAntiCheat_x64.dll"];
Game.GameName = "New Gundam Breaker";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "NewGundamBreaker.exe";
Game.SteamID = "738530";
Game.GUID = "New Gundam Breaker";
Game.MaxPlayers = 6;
Game.MaxPlayersOneMonitor = 6;
Game.BinariesFolder = "NewGundamBreaker\\Binaries\\Win64";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.UseNucleusEnvironment = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "NewGundamBreaker";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.FakeFocus = true;
Game.HookFocus = true;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.SetForegroundWindowElsewhere = false;
Game.UserProfileSavePath = "AppData\\Local\\NewGundamBreaker\\Saved\\SaveGames";
Game.Description =
  "The minimum number of players required to start a multiplayer game is 3 in a team game vs bots. You can access each instance save from the app, after the first launch click game options/open user profile save path in the UI. If you get uneven fps in the instances try alt tabbing to the NucleusCo-op app window when using multiple gamepads only, the game windows will remain on top. You can also try forcing vsync via your graphics panel or reducing graphic settings in-game to improve performance.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var Args = (Context.Args = " -WindowedFullscreen " + " -AlwaysFocus " + " -nosplash " + " -ResX= " + Context.Width + " -ResY= " + Context.Height);

  Context.StartArguments = Args;

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\NewGundamBreaker\\Binaries\\Win64\\denuvo64.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "denuvo64.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\NewGundamBreaker\\Binaries\\Win64\\winmm.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "winmm.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\EasyAntiCheat\\EasyAntiCheat_x64.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "EasyAntiCheat_x64.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  /* var pillar = Context.Options["Pillar"];
    
	if (pillar == "Yes") { 
		
        //remove pillar boxing
        Context.PatchFile(System.IO.Path.Combine(Context.RootInstallFolder, "NewGundamBreaker.exe"),
        System.IO.Path.Combine(Context.RootFolder, "NewGundamBreaker\\Binaries\\win64\\NewGundamBreaker.exe"), 
        [ 0x00, 0xF6, 0x41, 0x83, 0x06, 0x9D],
        [ 0x00, 0xF6, 0x41, 0x83, 0x00, 0x9D]);		
	}	

	if (pillar == "No") { 

        System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "NewGundamBreaker.exe"),
        System.IO.Path.Combine(Context.RootFolder, "NewGundamBreaker\\Binaries\\win64\\NewGundamBreaker.exe"),
        true);		
	}*/
};
Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Tue Aug 27 2024 18:35:15 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "G53THuRLcNZCPGCcY";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["Content"];
Game.DirSymlinkExclusions = ["Mods"];
Game.DirSymlinkCopyInstead = ["HATDependencies\\FEZRepacker.Core", "HATDependencies\\MonoMod", "Mods"];
Game.FileSymlinkExclusions = ["FEZ.exe", "MONOMODDED_FEZ.exe", "steam_appid.txt"];
Game.FileSymlinkCopyInstead = ["FezMultiplayerMod.ini", "gamecontrollerdb.txt", "steam_api.dll"];
Game.GameName = "FEZ";
Game.ExecutableName = "FEZ.exe";
Game.GUID = "FEZ";
Game.SteamID = "224760";
Game.CreateSteamAppIdByExe = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = false;
Game.MaxPlayers = 5;
Game.MaxPlayersOneMonitor = 5;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "FEZ";
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.KeyboardPlayerSkipFakeFocus = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_4.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileConfigPath = "AppData\\Roaming\\FEZ";
Game.Description =
  "Requires the Fez Multiplayer Mod to be installed in your main game files: https://github.com/FEZModding/FezMultiplayerMod. After that run the MONOMODDED_FEZ.exe at least once before using this. The instances will connect automatically if you installed the mp mod correctly. Alt-tab or click on to the keyboard instance to control it. Each instance has its own saves that are copies of your original ones, you can access the saves in the app, after the first launch click game options/open user profile config path in the UI.";
Game.PauseBetweenStarts = 20;

Game.Play = function() {
  System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "MONOMODDED_FEZ.exe"), System.IO.Path.Combine(Context.RootFolder, "FEZ.exe"), true);

  var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\Settings";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "	screenMode", Nucleus.SearchType.StartsWith) + '|	screenMode "Windowed"',
    Context.FindLineNumberInTextFile(txtPath, "	width", Nucleus.SearchType.StartsWith) + "|	width " + Context.Width,
    Context.FindLineNumberInTextFile(txtPath, "	height", Nucleus.SearchType.StartsWith) + "|	height " + Context.Height,
    Context.FindLineNumberInTextFile(txtPath, "	highDPI", Nucleus.SearchType.StartsWith) + "|	highDPI false",
    Context.FindLineNumberInTextFile(txtPath, "	pauseOnLostFocus", Nucleus.SearchType.StartsWith) + "|	pauseOnLostFocus false"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var modPath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\FezMultiplayerMod.ini");
  Context.ModifySaveFile(modPath, modPath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Settings", "overduetimeout", "200000000"),
    new Nucleus.IniSaveInfo("Settings", "myPlayerName", Context.Nickname)
  ]);
};
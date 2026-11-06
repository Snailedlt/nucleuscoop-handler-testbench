Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sat Jul 17 2021 05:45:49 GMT+0000 (UTC).
Hub.Handler.Id = "97gpFh85ztPqJN7ir";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
Game.AddOption("Patch Exe?", "ONLY select yes if you have the legit game in Steam.", "Patch", answers1);

Game.KillMutex = ["Sniper Elite Nazi Zombie Army 2"];
Game.DirSymlinkExclusions = ["bin"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_interfaces.txt", "steam_appid.txt", "local_save.txt", "xinput1_3.dll", "NZA2.exe"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergLobbyConnect = true;
Game.GoldbergNoLocalSave = true;
Game.CreateSteamAppIdByExe = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "NZA2.exe";
Game.SteamID = "247910";
Game.GUID = "Sniper Elite Nazi Zombie Army 2";
Game.GameName = "Sniper Elite: Nazi Zombie Army 2";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "splashscreen";
Game.BinariesFolder = "bin";
Game.HideTaskbar = false;
Game.StartArguments = "-subwindow";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Sniper Elite Nazi Zombie Army 2";
Game.FakeFocus = true;
Game.KeyboardPlayerSkipFakeFocus = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.UserProfileConfigPath = "AppData\\Local\\Sniper Elite Nazi Zombie Army 2";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\247910\\remote";
Game.Description =
  "Open your main game and change some graphics settings before launching this or the instances will not resize correctly. To connect the players create a private co-op game in the first instance then start the next instance. You can access each instance saves in the app, after the first launch click game options/open user profile save path in the UI. If you get uneven fps in the instances try alt tabbing to the nucleuscoop app window when using multiple gamepads only, the game windows will still remain on top.";
Game.PauseBetweenContextAndLaunch = 10;
Game.PauseBetweenStarts = 30;

Game.SupportsMultipleKeyboardsAndMice = false;

Game.HookSetCursorPos = true;
Game.HookGetCursorPos = true;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = false;
Game.HookGetKeyboardState = false;
Game.HookFilterRawInput = false;
Game.HookFilterMouseMessages = false;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = false;

Game.SendNormalMouseInput = false;
Game.SendNormalKeyboardInput = false;
Game.SendScrollWheel = false;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;
Game.LockInputAtStart = false;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  Context.BackupFile(Context.NucleusUserRoot + "\\AppData\\Local\\Sniper Elite Nazi Zombie Army 2\\Settings.ini", true);

  var VideoConfig = Context.NucleusUserRoot + "\\AppData\\Local\\Sniper Elite Nazi Zombie Army 2\\Settings.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Display Settings", "Resolution_Width", Context.Width),
    new Nucleus.IniSaveInfo("Display Settings", "Resolution_Height", Context.Height)
  ]);

  var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\Settings.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Display Settings", "Resolution_Width", Context.Width),
    new Nucleus.IniSaveInfo("Display Settings", "Resolution_Height", Context.Height)
  ]);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient012",
    "SteamGameServer011",
    "SteamGameServerStats001",
    "SteamUser016",
    "SteamFriends011",
    "SteamUtils005",
    "SteamMatchMaking009",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION010",
    "STEAMAPPS_INTERFACE_VERSION005",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION006",
    "STEAMSCREENSHOTS_INTERFACE_VERSION001",
    "STEAMHTTP_INTERFACE_VERSION001"
  ];
  Context.WriteTextFile(interfaces, lines);

  if (Context.HasKeyboardPlayer == true) {
  } else {
    Game.SetForegroundWindowElsewhere = true;
    Game.SupportsMultipleKeyboardsAndMice = true;
  }

  var patch = Context.Options["Patch"];

  if (patch == "Yes") {
    Game.KillProcessesOnClose = ["SENZA2 Patcher"];

    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "NZA2.exe"), System.IO.Path.Combine(Context.RootFolder, "bin\\NZA2.exe"), true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\SENZA2 Patcher.exe");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "SENZA2 Patcher.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\LumaCEG.ini");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "LumaCEG.ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\SENZA2 Patcher.exe"], false, 1);

    var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\close.bat";
    var lines = ["timeout /t 8 /nobreak", 'taskkill -im "SENZA2 Patcher.exe"'];
    Context.WriteTextFile(Bat, lines);

    Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\close.bat"], false, 1);
  }

  if (patch == "No") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "NZA2.exe"), System.IO.Path.Combine(Context.RootFolder, "bin\\NZA2.exe"), true);
  }
};
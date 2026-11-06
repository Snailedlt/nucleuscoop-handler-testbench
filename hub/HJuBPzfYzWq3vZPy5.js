Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Tue Jul 27 2021 20:15:09 GMT+0000 (UTC).
Hub.Handler.Id = "HJuBPzfYzWq3vZPy5";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.KillMutex = ["Sniper Elite V2 Remastered", "Sniper Elite V2 RemasteredSingleInstanceMutex"];
Game.DirSymlinkExclusions = ["bin", "FMV"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "Galaxy64.dll", "rebellion.ivf", "xinput1_3.dll"];
Game.UseNucleusEnvironment = false;
Game.UseGoldberg = true;
Game.CreateSteamAppIdByExe = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "SEV2_Remastered.exe";
Game.SteamID = "728740";
Game.GUID = "Sniper Elite V2 Remastered";
Game.GameName = "Sniper Elite V2 Remastered";
Game.MaxPlayers = 12;
Game.MaxPlayersOneMonitor = 12;
Game.LauncherTitle = "splashscreen";
Game.BinariesFolder = "bin";
Game.HideTaskbar = false;
Game.StartArguments = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Sniper Elite V2 Remastered";
Game.FakeFocus = true;
Game.ResetWindows = true;
Game.SupportsKeyboard = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.UserProfileConfigPath = "AppData\\Local\\Sniper Elite V2 Remastered";
Game.UserProfileSavePath = "AppData\\Local\\Sniper Elite V2 Remastered\\PC_ProfileSaves";
Game.Description =
  "Select Co-op, create a game via quick play and the other instance join using quick play too. Lauch with Steam open if you have the steam version of the game. You can access each instance save folder via Nucleus, after the first launch click game options/open user profile save path in the UI. If you get uneven fps in the instances try alt tabbing to the nucleuscoop app window, the game windows will still remain on top.";
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
Game.GamePlayBeforeGameSetup = true;

Game.Play = function() {
  var VideoConfig = Context.NucleusUserRoot + "\\AppData\\Local\\Sniper Elite V2 Remastered\\Settings.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Display Settings", "Resolution_Width", Context.Width),
    new Nucleus.IniSaveInfo("Display Settings", "Resolution_Height", Context.Height),
    new Nucleus.IniSaveInfo("Display Settings", "DisplayMode", "2")
  ]);

  var id = Context.PlayerID + 6;

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Galaxy64.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Galaxy64.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\ngalaxye_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\ngalaxye_settings\\NemirtingasGalaxyEmu.json");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "NemirtingasGalaxyEmu.json");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\ngalaxye_settings\\NemirtingasGalaxyEmu.json";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, '  "galaxyid":', Nucleus.SearchType.StartsWith) + '|  "galaxyid": 14549624462898294' + id + ",",
    Context.FindLineNumberInTextFile(txtPath, '  "username":', Nucleus.SearchType.StartsWith) + '|  "username": "' + Context.Nickname + '"'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  if (Context.HasKeyboardPlayer == true) {
  } else {
    Game.SetForegroundWindowElsewhere = true;
    Game.SupportsMultipleKeyboardsAndMice = true;
  }

  if (!System.IO.File.Exists(Context.OrigRootFolder + "\\steam_api64.dll")) {
    Game.UseGoldberg = false;
  } else {
  }
};
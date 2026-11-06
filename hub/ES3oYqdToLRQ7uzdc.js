Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Tue Jun 22 2021 07:16:01 GMT+0000 (UTC).
Hub.Handler.Id = "ES3oYqdToLRQ7uzdc";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
Game.AddOption("Low FPS fix?", "Uses some launch arguments to improve fps.", "Fix", answers1);

Game.ExecutableContext = ["gamex86.dll"];
Game.KillMutex = ["Brink"];
Game.DirSymlinkExclusions = ["base\\video\\assets"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "local_save.txt", "xinput1_3.dll", "pubdevlegal_splash.bik"];
Game.FileSymlinkCopyInstead = ["binkw32.dll", "gamescriptx86.dll", "gamex86.dll", "gdf.dll"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "brink.exe";
Game.SteamID = "22350";
Game.GUID = "BRINK";
Game.GameName = "BRINK";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Brink";
Game.FakeFocus = true;
Game.FakeFocusInterval = 40000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.UseAlpha8CustomDll = true;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\22350\\local";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\22350\\remote";
Game.UserProfileConfigPathNoCopy = true;
Game.UserProfileSavePathNoCopy = true;
Game.PlayerSteamIDs = ["76561198346250897", "76561198131394153", "76561198011792067", "76561198043762785"];
Game.Description =
  "IMPORTANT: Launch all the instances you will use and create a character in each one, then close Nucleus, the aspect ratio and resolution will adjust automatically to the window size on second Nucleus run if you did that. Start a public campaign or multiplayer game in one instance and join in the others via free play-search. If you use keyboards and mice after the instances open press the END key to lock the input for all instances to have their own cursor. Press the END key again to unlock the input. You can also use CTRL+Q to close Nucleus and all its instances. You can access your saves and config file per instance after the script first launch, click game options/open user profile save/config path in the Nucleus UI. Add custom resolutions in your AMD/Nvidia/Intel panel (For example: 960x1080, 960x540, 1920x540 etc.) so the game can see and use them.";
Game.PauseBetweenStarts = 30;

Game.SupportsMultipleKeyboardsAndMice = true;

Game.HookSetCursorPos = true;
Game.HookGetCursorPos = true;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = false;
Game.HookGetKeyboardState = false;
Game.HookFilterRawInput = true;
Game.HookFilterMouseMessages = false;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = false;

Game.SendNormalMouseInput = true;
Game.SendNormalKeyboardInput = true;
Game.SendScrollWheel = true;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;
Game.DrawFakeMouseCursorForControllers = false;
Game.UpdateFakeMouseWithInternalInput = false;
Game.LockInputAtStart = false;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  var filePath = (Context.filePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\base");
  System.IO.Directory.CreateDirectory(filePath);

  if (System.IO.File.Exists(Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\base\\brinkconfig.cfg")) {
    var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\base\\brinkconfig.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta s_enable_voice", Nucleus.SearchType.StartsWith) + '|seta s_enable_voice "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta s_enable_mic", Nucleus.SearchType.StartsWith) + '|seta s_enable_mic "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_mode", Nucleus.SearchType.StartsWith) + '|seta r_mode "-1"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_fullscreen", Nucleus.SearchType.StartsWith) + '|seta r_fullscreen "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_customWidth", Nucleus.SearchType.StartsWith) + '|seta r_customWidth "' + Context.Width + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_customHeight", Nucleus.SearchType.StartsWith) + '|seta r_customHeight "' + Context.Height + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_aspectRatio", Nucleus.SearchType.StartsWith) + '|seta r_aspectRatio "-1"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_customAspectRatioH", Nucleus.SearchType.StartsWith) + '|seta r_customAspectRatioH "16"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_customAspectRatioV", Nucleus.SearchType.StartsWith) + '|seta r_customAspectRatioV "10"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    if (Context.AspectRatioDecimal > 1.8) {
      var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\base\\brinkconfig.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta r_customAspectRatioH", Nucleus.SearchType.StartsWith) + '|seta r_customAspectRatioH "32"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_customAspectRatioV", Nucleus.SearchType.StartsWith) + '|seta r_customAspectRatioV "9"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    } else if (Context.AspectRatioDecimal < 1.2) {
      var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\base\\brinkconfig.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta r_customAspectRatioH", Nucleus.SearchType.StartsWith) + '|seta r_customAspectRatioH "8"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_customAspectRatioV", Nucleus.SearchType.StartsWith) + '|seta r_customAspectRatioV "9"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    } else {
      var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\base\\brinkconfig.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta r_customAspectRatioH", Nucleus.SearchType.StartsWith) + '|seta r_customAspectRatioH "16"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_customAspectRatioV", Nucleus.SearchType.StartsWith) + '|seta r_customAspectRatioV "9"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }
  } else {
    var savePath = (Context.SavePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\base\\brinkconfig.cfg");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "brinkconfig.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
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
    "STEAMUSERSTATS_INTERFACE_VERSION009",
    "STEAMAPPS_INTERFACE_VERSION004",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION004",
    "SteamMasterServerUpdater001"
  ];
  Context.WriteTextFile(interfaces, lines);

  if (Context.HasKeyboardPlayer !== true) {
    Game.SupportsMultipleKeyboardsAndMice = false;
  }

  var fix = Context.Options["Fix"];

  if (fix == "Yes") {
    if (Context.IsKeyboardPlayer) {
      Context.StartArguments = "+com_allowconsole 1 r_useThreadedRenderer 2 r_usePortals 1 r_useOptimizedShadows 1";

      var autoexec = (Context.filePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\base\\autoexec.cfg");
      var lines = [""];
      Context.WriteTextFile(autoexec, lines);
    } else {
      Context.StartArguments = "+com_allowconsole 1 +set g_EnablePCControllerInput 1 +set exec autoexec.cfg r_useThreadedRenderer 2 r_usePortals 1 r_useOptimizedShadows 1";

      var savePath = (Context.SavePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\base\\autoexec.cfg");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "autoexec.cfg");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }
  }

  if (fix == "No") {
    if (Context.IsKeyboardPlayer) {
      Context.StartArguments = "+com_allowconsole 1";

      var autoexec = (Context.filePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\base\\autoexec.cfg");
      var lines = [""];
      Context.WriteTextFile(autoexec, lines);
    } else {
      Context.StartArguments = "+com_allowconsole 1 +set g_EnablePCControllerInput 1 +set exec autoexec.cfg";

      var savePath = (Context.SavePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\base\\autoexec.cfg");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "autoexec.cfg");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }
  }
};
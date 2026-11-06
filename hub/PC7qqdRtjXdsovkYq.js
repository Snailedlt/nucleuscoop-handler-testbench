Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Thu May 25 2023 07:59:38 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "PC7qqdRtjXdsovkYq";
Hub.Maintainer.Name = "Rogueboy_x";
Hub.Maintainer.Id = "6ANro7s2YXiuE2DyZ";

Game.ExecutableContext = ["target", "ACAH_GDF.dll"];
Game.KillMutex = ["Ace Combat: Assault Horizon"];
Game.DirSymlinkExclusions = ["settings"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "local_save.txt", "d3d9.dll", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["ACAH_GDF.dll", "Ace Combat_AH.exe.cfg", "datapack.bin", "default_input.ini"];
Game.GameName = "Ace Combat Assault Horizon";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Ace Combat_AH.exe";
Game.SteamID = "228400";
Game.GUID = "Ace Combat Assault Horizon";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.SetTopMostAtEnd = true;
Game.DontRemoveBorders = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Ace Combat: Assault Horizon";
//Game.UseDirectX9Wrapper = true;
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.SetWindowHook = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\228400\\remote";
Game.DocumentsConfigPath = "NAMCO\\ACAH";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "IMPORTANT: Requires latest Steam version that was available without GFWL. Host a multiplayer game in one instance (like co-op missions) and join in the others. For the instances to resize correctly you need to add custom resolutions in your AMD/Nvidia/Intel panel (for example for a 1920x1080 monitor add resolutions like: 960x1080, 960x600, 1920x600 etc.) so the game can see and use them (the game does not see below 600 res). Gamepads only.";
Game.PauseBetweenProcessGrab = 3;
Game.PauseBetweenStarts = 25;

//ProtoInput:

Game.SupportsMultipleKeyboardsAndMice = false;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = false;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = false;
Game.LockInputToggleKey = 0x23;
Game.ToggleUnfocusOnInputsLock = false;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.GetCursorPosHook = true;
Game.ProtoInput.SetCursorPosHook = true;

Game.Play = function() {
  var screenreswidth = Context.Width;
  if (Context.Height < 600) {
    var screenresheight = 600;
  } else {
    var screenresheight = Context.Height;
  }

  if (screenreswidth == 1280 && screenresheight == 360) {
    //720p horizontal

    if (System.IO.File.Exists(Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\gfx_settings.ini")) {
      var path = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\gfx_settings.ini";
      var dict = [
        Context.FindLineNumberInTextFile(path, "fullscreen_init =", Nucleus.SearchType.Contains) + "|fullscreen_init = true",
        Context.FindLineNumberInTextFile(path, "aspect_ratio =", Nucleus.SearchType.Contains) + "|aspect_ratio = auto",
        Context.FindLineNumberInTextFile(path, "fake_fullscreen =", Nucleus.SearchType.Contains) + "|fake_fullscreen = true"
      ];
      Context.ReplaceLinesInTextFile(path, dict);
    } else {
      var filePath = (Context.filePath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath);
      System.IO.Directory.CreateDirectory(filePath);

      var ini = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\gfx_settings.ini";
      var lines = [
        "# --- Display Settings ---",
        "display_resolution = " + Context.Width + "x" + Context.Height,
        "display_resolution_windowed = " + Context.Width + "x" + Context.Height,
        "refresh_rate = 60",
        "fullscreen_init = true",
        "aspect_ratio = auto",
        "antialias = 1",
        "vsync = true",
        " ",
        "# --- Debug Settings ---",
        "fake_fullscreen = true"
      ];
      Context.WriteTextFile(ini, lines);
    }
  } else if (screenreswidth == 640 && screenresheight == 720) {
    //720p vertical

    if (System.IO.File.Exists(Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\gfx_settings.ini")) {
      var path = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\gfx_settings.ini";
      var dict = [
        Context.FindLineNumberInTextFile(path, "fullscreen_init =", Nucleus.SearchType.Contains) + "|fullscreen_init = true",
        Context.FindLineNumberInTextFile(path, "aspect_ratio =", Nucleus.SearchType.Contains) + "|aspect_ratio = auto",
        Context.FindLineNumberInTextFile(path, "fake_fullscreen =", Nucleus.SearchType.Contains) + "|fake_fullscreen = true"
      ];
      Context.ReplaceLinesInTextFile(path, dict);
    } else {
      var filePath = (Context.filePath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath);
      System.IO.Directory.CreateDirectory(filePath);

      var ini = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\gfx_settings.ini";
      var lines = [
        "# --- Display Settings ---",
        "display_resolution = " + Context.Width + "x" + Context.Height,
        "display_resolution_windowed = " + Context.Width + "x" + Context.Height,
        "refresh_rate = 60",
        "fullscreen_init = true",
        "aspect_ratio = auto",
        "antialias = 1",
        "vsync = true",
        " ",
        "# --- Debug Settings ---",
        "fake_fullscreen = true"
      ];
      Context.WriteTextFile(ini, lines);
    }
  } else if (screenreswidth == 640 && screenresheight == 360) {
    //720p 1/4

    if (System.IO.File.Exists(Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\gfx_settings.ini")) {
      var path = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\gfx_settings.ini";
      var dict = [
        Context.FindLineNumberInTextFile(path, "fullscreen_init =", Nucleus.SearchType.Contains) + "|fullscreen_init = true",
        Context.FindLineNumberInTextFile(path, "aspect_ratio =", Nucleus.SearchType.Contains) + "|aspect_ratio = auto",
        Context.FindLineNumberInTextFile(path, "fake_fullscreen =", Nucleus.SearchType.Contains) + "|fake_fullscreen = true"
      ];
      Context.ReplaceLinesInTextFile(path, dict);
    } else {
      var filePath = (Context.filePath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath);
      System.IO.Directory.CreateDirectory(filePath);

      var ini = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\gfx_settings.ini";
      var lines = [
        "# --- Display Settings ---",
        "display_resolution = " + Context.Width + "x" + Context.Height,
        "display_resolution_windowed = " + Context.Width + "x" + Context.Height,
        "refresh_rate = 60",
        "fullscreen_init = true",
        "aspect_ratio = auto",
        "antialias = 1",
        "vsync = true",
        " ",
        "# --- Debug Settings ---",
        "fake_fullscreen = true"
      ];
      Context.WriteTextFile(ini, lines);
    }
  } else {
    if (System.IO.File.Exists(Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\gfx_settings.ini")) {
      var path = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\gfx_settings.ini";
      var dict = [
        Context.FindLineNumberInTextFile(path, "display_resolution =", Nucleus.SearchType.Contains) + "|display_resolution = " + Context.Width + "x" + screenresheight,
        Context.FindLineNumberInTextFile(path, "display_resolution_windowed =", Nucleus.SearchType.Contains) + "|display_resolution_windowed = " + Context.Width + "x" + screenresheight,
        Context.FindLineNumberInTextFile(path, "fullscreen_init =", Nucleus.SearchType.Contains) + "|fullscreen_init = true",
        Context.FindLineNumberInTextFile(path, "aspect_ratio =", Nucleus.SearchType.Contains) + "|aspect_ratio = auto",
        Context.FindLineNumberInTextFile(path, "fake_fullscreen =", Nucleus.SearchType.Contains) + "|fake_fullscreen = true"
      ];
      Context.ReplaceLinesInTextFile(path, dict);
    } else {
      var filePath = (Context.filePath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath);
      System.IO.Directory.CreateDirectory(filePath);

      var ini = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\gfx_settings.ini";
      var lines = [
        "# --- Display Settings ---",
        "display_resolution = " + Context.Width + "x" + screenresheight,
        "display_resolution_windowed = " + Context.Width + "x" + screenresheight,
        "refresh_rate = 60",
        "fullscreen_init = true",
        "aspect_ratio = auto",
        "antialias = 1",
        "vsync = true",
        " ",
        "# --- Debug Settings ---",
        "fake_fullscreen = true"
      ];
      Context.WriteTextFile(ini, lines);
    }
  }

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient012",
    "SteamGameServer011",
    "SteamGameServerStats001",
    "SteamUser017",
    "SteamFriends014",
    "SteamUtils006",
    "SteamMatchMaking009",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION011",
    "STEAMAPPS_INTERFACE_VERSION006",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION012",
    "STEAMSCREENSHOTS_INTERFACE_VERSION002",
    "STEAMHTTP_INTERFACE_VERSION002",
    "STEAMUNIFIEDMESSAGES_INTERFACE_VERSION001",
    "STEAMUGC_INTERFACE_VERSION001",
    "STEAMCONTROLLER_INTERFACE_VERSION"
  ];
  Context.WriteTextFile(interfaces, lines);
};
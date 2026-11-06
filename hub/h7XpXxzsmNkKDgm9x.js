Hub.Handler.Version = 5; // Released at https://hub.splitscreen.me/ on Mon May 24 2021 19:43:27 GMT+0000 (UTC).
Hub.Handler.Id = "h7XpXxzsmNkKDgm9x";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("2 players per intance?", "If yes only launch two horizontal or vertical instances. Gamepads only.", "Native", answers1);

Game.KillMutex = ["onyx"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "winmm.dll", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = [
  "config.ini",
  "engine.ini",
  "base_item_init.oaf",
  //"data_archive.oaf",
  "data_archive_2.oaf",
  "data_localized_es.oaf",
  //"data_localized_vo_en.oaf",
  "engine.oaf",
  "world_graph.oaf"
];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.UseSteamStubDRMPatcher = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.HardlinkGame = true;
Game.ExecutableName = "dungeon siege iii.exe";
Game.SteamID = "39160";
Game.GUID = "Dungeon Siege III";
Game.GameName = "Dungeon Siege III";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Dungeon Siege III";
Game.FakeFocus = true;
Game.FakeFocusInterval = 40000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.UserProfileSavePath = "Documents\\My Games\\Dungeon Siege III\\save";
Game.UserProfileConfigPath = "Documents\\My Games\\Dungeon Siege III";
Game.Description =
  "Your game and Nucleus need to be in the same drive for this to work but do not place Nucleus inside the game files. If you use keyboards and mice press the END key to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances. This game already has local co-op for 2 players max but with this script you can play with 4 and each player gets his own screen. To connect the instances press start in-game, select multiplayer and create a public game, then the other instances select find game in the title screen. If you want to play with 3 or 4 players in only two instances of the game for better performance select yes in the Nucleus 2 players per instance UI option.";
Game.PauseBetweenStarts = 30;

Game.SupportsMultipleKeyboardsAndMice = true;

Game.HookSetCursorPos = true;
Game.HookGetCursorPos = true;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = false;
Game.HookGetKeyboardState = false;
Game.HookFilterRawInput = true;
Game.HookFilterMouseMessages = true;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = false;

Game.SendNormalMouseInput = true;
Game.SendNormalKeyboardInput = true;
Game.SendScrollWheel = true;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = true;
Game.HookReRegisterRawInputMouse = true;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;
Game.LockInputAtStart = true;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  var savePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Games\\Dungeon Siege III\\user.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Engine.Render", "full_screen", 0),
    new Nucleus.IniSaveInfo("Engine.Render", "window_width", Context.Width),
    new Nucleus.IniSaveInfo("Engine.Render", "window_height", Context.Height),
    new Nucleus.IniSaveInfo("Engine.Render", "support_aspect_ratio_4_3", true),
    new Nucleus.IniSaveInfo("Engine.Render", "support_aspect_ratio_16_10", true),
    new Nucleus.IniSaveInfo("Engine.Render", "support_aspect_ratio_custom", true)
  ]);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\config.ini");
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Engine.Render", "full_screen", 0),
    new Nucleus.IniSaveInfo("Engine.Render", "support_aspect_ratio_4_3", true),
    new Nucleus.IniSaveInfo("Engine.Render", "support_aspect_ratio_16_10", true),
    new Nucleus.IniSaveInfo("Engine.Render", "support_aspect_ratio_custom", true)
  ]);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\engine.ini");
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Engine.Render", "full_screen", 0),
    new Nucleus.IniSaveInfo("Engine.Render", "window_width", Context.Width),
    new Nucleus.IniSaveInfo("Engine.Render", "window_height", Context.Height),
    new Nucleus.IniSaveInfo("Engine.Render", "support_aspect_ratio_4_3", true),
    new Nucleus.IniSaveInfo("Engine.Render", "support_aspect_ratio_16_10", true),
    new Nucleus.IniSaveInfo("Engine.Render", "support_aspect_ratio_custom", true)
  ]);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient010",
    "SteamGameServer010",
    "SteamGameServerStats001",
    "SteamUser014",
    "SteamFriends008",
    "SteamUtils005",
    "SteamMatchMaking008",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION009",
    "STEAMAPPS_INTERFACE_VERSION004",
    "SteamNetworking004",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION004",
    "SteamMasterServerUpdater001"
  ];

  Context.WriteTextFile(interfaces, lines);

  if (Context.HasKeyboardPlayer !== true) {
    Game.SupportsMultipleKeyboardsAndMice = false;
    Game.SetForegroundWindowElsewhere = true;
  }

  var native = Context.Options["Native"];

  if (native == "Yes") {
    if (Context.PlayerID == 0) {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "1"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "2"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
      ]);
    }
    if (Context.PlayerID == 1) {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "3"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "4"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
      ]);
    }
  }

  if (native == "No") {
  }
};
Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Thu May 09 2024 08:46:09 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "s73LnTeyESybC7gPz";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

Game.ExecutableContext = ["res"];
Game.DirSymlinkExclusions = ["ngalaxye_settings"];
Game.DirExclusions = ["saves"];
Game.FileSymlinkExclusions = ["Galaxy.dll", "steam_api.dll", "SSBD.exe.cfg", "xinput1_4.dll"];
Game.KeepSymLinkOnExit = true;
Game.UseNemirtingasGalaxyEmu = true;
Game.HandlerInterval = 100;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SymlinkExe = false;
Game.ExecutableName = "SSBD.exe";
Game.LauncherExeIgnoreFileCheck = true;
Game.SteamID = "272620";
Game.GUID = "Serious Sam's Bogus Detour";
Game.GameName = "Serious Sam's Bogus Detour";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Serious Sam's Bogus Detour";
Game.HasDynamicWindowTitle = true;
Game.SupportsKeyboard = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_4.dll"];
Game.Hook.CustomDllEnabled = false;
Game.Description =
  "Wait until setup is completed and create a public lobby in one instance and join in the others using server list. If you launch one instance with keyboard wait until an instance loses its borders before opening the next one, this way they will resize correctly. Your saves per instance are inside Nucleus content folder in the game instances folders, so be careful about not deleting them, you can also copy your main saves there.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\SSBD.exe.cfg";
  var lines = [
    "v_resolution " + Context.Width + "x" + Context.Height,
    "v_fullscreen 0",
    "v_vsync false",
    "v_forced_aspect_ratio 0.000000",
    "v_fps_limit 0",
    "r_hdr true",
    "r_light_decal_proj true",
    "r_shadows 2",
    "snd_volume_music 1.000000",
    "r_draw_glow true",
    "r_draw_decals true",
    "r_draw_xray true",
    "r_draw_outlines true",
    "g_vfx_quality 2",
    "e_debris_limit 350",
    "g_adv_foliage true",
    "rg_brightness 0.000000",
    "rg_gamma 2.200000",
    "rg_contrast 1.000000",
    "rg_crt_curve 0.000000"
  ];
  Context.WriteTextFile(cfgPath, lines);

  if (Context.PlayerID > 0) {
    var dict = [Context.FindLineNumberInTextFile(cfgPath, "snd_volume_music", Nucleus.SearchType.StartsWith) + "|snd_volume_music 0.000000"];
  } else {
    var dict = [Context.FindLineNumberInTextFile(cfgPath, "snd_volume_music", Nucleus.SearchType.StartsWith) + "|snd_volume_music 1.000000"];
  }
  Context.ReplaceLinesInTextFile(cfgPath, dict);

  if (Context.HasKeyboardPlayer == true) {
    Game.PromptBetweenInstances = true;
    Game.PauseBetweenStarts = 40;
    Game.PreventWindowDeactivation = true;
    Game.KeyboardPlayerSkipPreventWindowDeactivate = true;
  } else {
    Game.FakeFocus = true;
    Game.SetForegroundWindowElsewhere = true;
  }

  var idg = Context.PlayerID + 6;

  var jsonPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ngalaxye_settings\\NemirtingasGalaxyEmu.json";
  var params = [
    "{",
    '  "api_version": "1.100.2.0",',
    '  "enable_overlay": false,',
    '  "galaxyid": 14549624462898294' + idg + ",",
    '  "language": ' + '"' + Context.GogLang + '",',
    '  "productid": 2104387650,',
    '  "username": ' + '"' + Context.Nickname + '"',
    "}"
  ];
  Context.WriteTextFile(jsonPath, params);

  if (System.IO.File.Exists(Context.OrigRootFolder + "\\steam_api.dll")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_api.dll");
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder + "\\utils\\GoldbergEmu\\steam_api.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
};
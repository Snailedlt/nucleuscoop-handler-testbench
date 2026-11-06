Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Thu Dec 18 2025 06:04:12 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "jNgXvTxSqEurYysqK";
Hub.Maintainer.Name = "Confusion";
Hub.Maintainer.Id = "SPeJygEPunCgxcL6a";

Game.ExecutableContext = ["SRB2P-main.pk3"];
Game.FileSymlinkExclusions = ["dinput8.dll", "xinput1_3.dll", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = [
  "SRB2Pconfig.cfg",
  "SRB2P-maps.wad",
  "srb2.pk3",
  "SRB2P-chars.wad",
  "SRB2P-graphics.pk3",
  "SRB2P-music.pk3",
  "SRB2P-patch.pk3",
  "SRB2P-sounds.pk3",
  "zones.pk3",
  "SDL2.dll",
  "SDL2_mixer_ext.dll",
  "gamedata.dat",
  "latest-log.txt",
  "models.dat",
  "music.dta",
  "patch.pk3",
  "player.dta",
  "srb2.exe"
];
Game.NeedsSteamEmulation = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "SRB2Persona.exe";
Game.GUID = "Sonic Robo Blast 2 Persona";
Game.GameName = "Sonic Robo Blast 2 Persona";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.NotTopMost = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "SRB2P v1.3.6";
Game.HasDynamicWindowTitle = true;
Game.WindowStyleValues = ["~0xC00000", "~0x40000", "~0x20000000", "~0x20000", "~0x80000", "0x40000000"];
Game.ExtWindowStyleValues = ["~0x00000001", "~0x00000200", "~0x00020000"];
Game.HookFocus = false;
Game.ResetWindows = true;
Game.SetWindowHook = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.SDL2Enabled = true;
//Game.XInputPlusDll = ["xinput1_3.dll", "xinput1_4.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.Description =
  "IMPORTANT: Host a quickplay game in one instance and join in the others by writing localhost in the specify ipv4 address field, alt-tab between instances to use the keyboard.You can use cutscene mode(Ctrl + M) when entering battles to have fullscreen. Close instances through each individual instances to save settings and changes.";
Game.KeepSymLinkOnExit = true;
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\SRB2Pconfig.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "playmusicifunfocused", Nucleus.SearchType.StartsWith) + '|playmusicifunfocused "Yes" ',
    Context.FindLineNumberInTextFile(txtPath, "playsoundsifunfocused", Nucleus.SearchType.StartsWith) + '|playsoundsifunfocused "Yes" ',
    //Context.FindLineNumberInTextFile(txtPath, "scr_height_w", Nucleus.SearchType.StartsWith) + '|scr_height_w "' + Context.Height + '" ',
    //Context.FindLineNumberInTextFile(txtPath, "scr_width_w", Nucleus.SearchType.StartsWith) + '|scr_width_w "' + Context.Width + '" ',
    Context.FindLineNumberInTextFile(txtPath, "renderer", Nucleus.SearchType.StartsWith) + '|renderer "Software"',
    Context.FindLineNumberInTextFile(txtPath, "fullscreen", Nucleus.SearchType.StartsWith) + '|fullscreen "No" ',
    Context.FindLineNumberInTextFile(txtPath, "use_gamepad2", Nucleus.SearchType.StartsWith) + '|use_gamepad2 "0"',
    Context.FindLineNumberInTextFile(txtPath, "use_gamepad2", Nucleus.SearchType.StartsWith) + 1 + '|use_gamepad "' + Context.GamepadId + '"',
    Context.FindLineNumberInTextFile(txtPath, 'use_mouse "On"', Nucleus.SearchType.StartsWith) + '|use_mouse "Off" ',
    Context.FindLineNumberInTextFile(txtPath, "pauseifunfocused", Nucleus.SearchType.StartsWith) + '|pauseifunfocused "No" ',
    Context.FindLineNumberInTextFile(txtPath, "showfocuslost", Nucleus.SearchType.StartsWith) + '|showfocuslost "No" '
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  if (Player.IsKeyboardPlayer) {
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "use_gamepad2", Nucleus.SearchType.StartsWith) + 1 + '|use_gamepad "0"',
      Context.FindLineNumberInTextFile(txtPath, 'use_mouse "Off"', Nucleus.SearchType.StartsWith) + '|use_mouse "On" '
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
};
Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Mon Sep 08 2025 20:00:55 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "P7JafGDKCXvCwe9bj";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["srb2.pk3"];
Game.FileSymlinkExclusions = ["dinput8.dll", "xinput1_3.dll", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = [
  "config.cfg",
  "gamedata.dat",
  "latest-log.txt",
  "models.dat",
  "music.dta",
  "patch.pk3",
  "player.dta",
  "srb2.pk3",
  "srb2sav1.ssg",
  "zones.pk3",
  "SDL2.dll",
  "SDL2_mixer_ext.dll"
];
Game.NeedsSteamEmulation = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "srb2win.exe";
Game.GUID = "Sonic Robo Blast 2";
Game.GameName = "Sonic Robo Blast 2";
Game.MaxPlayers = 32;
Game.MaxPlayersOneMonitor = 32;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.NotTopMost = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "SRB2";
Game.HasDynamicWindowTitle = true;
Game.WindowStyleValues = ["~0xC00000", "~0x40000", "~0x20000000", "~0x20000", "~0x80000", "0x40000000"];
Game.ExtWindowStyleValues = ["~0x00000001", "~0x00000200", "~0x00020000"];
Game.HookFocus = true;
Game.ResetWindows = true;
Game.SetWindowHook = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.SDL2Enabled = true;
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.Description =
  "IMPORTANT: Host a multiplayer LAN game in one instance and join in the others by writing localhost in the specify ipv4 address field, alt-tab between instances to use the keyboard. The game already has native split-screen for 2 players max but with this handler you can play with 4+.";
Game.KeepSymLinkOnExit = true;
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\config.cfg";
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

  System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "SDL2.dll"), System.IO.Path.Combine(Context.RootFolder, "SDL2.dll"), true);
};
Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Mon Sep 08 2025 19:59:46 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "sd3KNZa4dhh6BeXcG";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers = ["Yes", "No"];
Game.AddOption("Mute music for all instances but the first?", "Helps with music overlapping.", "MUSIC", answers);
var skip = ["No", "Yes"];
Game.AddOption("Skip intro?", "This skips the new game intro cutscene with Peach and some of the initial dialogues. This is only relevant if starting a new game.", "INTRO", skip);
var preset = ["Current Settings", "Yes"];
Game.AddOption(
  "Load a custom controller preset?",
  "This conveniently sets up a controller config for you before you start. \nThe option 'Current Settings' keeps the last used controller mappings.\nThis maps keyboard controls to the arrow keys and 'ZXC' for N64's 'ZBA'.",
  "CONF",
  preset
);
var moves = ["No", "Yes"];
Game.AddOption("Are you using the extended moveset patch?", "This moves the camera switch button to the right shoulder button (:R1) \ninstead of the the right trigger (:R2).", "EXMOVE", moves);
var invert = ["No", "Yes"];
Game.AddOption("Invert camera when using the bettercam patch?", "The camera will move right when the right stick is pushed right and down when the stick is moved up.", "INVERT", invert);

Game.DirSymlinkExclusions = ["palettes", "lang"];
Game.DirSymlinkCopyInstead = ["palettes", "lang"];
Game.FileSymlinkExclusions = ["SDL2.dll", "SDL2.ini", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = ["coop.map", "discord_game_sdk.dll"];
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SymlinkExe = false;
Game.ExecutableName = "sm64coopdx.exe";
Game.GUID = "sm64coopdx";
Game.GameName = "Super Mario 64 PC Port Co-op DX";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Super Mario 64 Coop Deluxe";
Game.HasDynamicWindowTitle = true;
Game.HookFocus = false;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.SDL2Enabled = true;
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileConfigPath = "AppData\\Roaming\\sm64coopdx";
Game.Description =
  "IMPORTANT: This is for the native PC port Co-op DX version, not emulated: https://sm64coopdx.com/. All settings only need to be applied once. Connect the instances by hosting a direct connect game in one instance and joining in the others. Change your character skin in the player options in the main menu. Supports extra features like Render96 assets, better camera and extended moveset.";
Game.PromptBetweenInstances = false;
Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenStarts = 20;

Game.Play = function() {
  var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\sm64config.txt";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "fullscreen", Nucleus.SearchType.StartsWith) + "|fullscreen false",
    Context.FindLineNumberInTextFile(txtPath, "window_x", Nucleus.SearchType.StartsWith) + "|window_x " + Context.PosX,
    Context.FindLineNumberInTextFile(txtPath, "window_y", Nucleus.SearchType.StartsWith) + "|window_y " + Context.PosY,
    Context.FindLineNumberInTextFile(txtPath, "window_w", Nucleus.SearchType.StartsWith) + "|window_w " + Context.Width,
    Context.FindLineNumberInTextFile(txtPath, "window_h", Nucleus.SearchType.StartsWith) + "|window_h " + Context.Height,
    Context.FindLineNumberInTextFile(txtPath, "mute_focus_loss", Nucleus.SearchType.StartsWith) + "|mute_focus_loss false",
    Context.FindLineNumberInTextFile(txtPath, "gamepad_number", Nucleus.SearchType.StartsWith) + "|gamepad_number " + Context.ConvertToString(Context.GamepadId - 1),
    Context.FindLineNumberInTextFile(txtPath, "disable_gamepads", Nucleus.SearchType.StartsWith) + "|disable_gamepads false",
    Context.FindLineNumberInTextFile(txtPath, "coop_player_name", Nucleus.SearchType.StartsWith) + "|coop_player_name " + Context.Nickname,
    Context.FindLineNumberInTextFile(txtPath, "coop_join_ip", Nucleus.SearchType.StartsWith) + "|coop_join_ip 127.0.0.1",
    Context.FindLineNumberInTextFile(txtPath, "coop_network_system", Nucleus.SearchType.StartsWith) + "|coop_network_system 0",
    Context.FindLineNumberInTextFile(txtPath, "coop_nametags", Nucleus.SearchType.StartsWith) + "|coop_nametags true",
    Context.FindLineNumberInTextFile(txtPath, "skip_intro", Nucleus.SearchType.StartsWith) + "|skip_intro false"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var music = Context.Options["MUSIC"];

  if (music == "Yes") {
    if (Context.PlayerID > 0) {
      var dict = [Context.FindLineNumberInTextFile(txtPath, "music_volume", Nucleus.SearchType.StartsWith) + "|music_volume 0"];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }
  }

  var KeyaLine = Context.FindLineNumberInTextFile(txtPath, "key_a", Nucleus.SearchType.Contains);
  var keyStick = Context.FindLineNumberInTextFile(txtPath, "key_stickup", Nucleus.SearchType.Contains);

  var conf = Context.Options["CONF"];

  if (conf == "Yes") {
    var lines = [
      KeyaLine + "|key_a 1001 ffff 002e",
      KeyaLine + 1 + "|key_b 1000 ffff 002d",
      KeyaLine + 2 + "|key_start 1006 ffff 0039",
      KeyaLine + 3 + "|key_l 1009 ffff 0010",
      KeyaLine + 4 + "|key_r 100a ffff 0020",
      KeyaLine + 5 + "|key_z 101a 101b 002c",
      KeyaLine + 6 + "|key_cup 100b ffff 0021",
      KeyaLine + 7 + "|key_cdown 100c ffff 002f",
      KeyaLine + 8 + "|key_cleft 100d ffff 001e",
      KeyaLine + 9 + "|key_cright 100e ffff 001f",
      keyStick + "|key_stickup 0148 ffff ffff",
      keyStick + 1 + "|key_stickdown 0150 ffff ffff",
      keyStick + 2 + "|key_stickleft 014b ffff ffff",
      keyStick + 3 + "|key_stickright 014d ffff ffff"
    ];
    Context.ReplaceLinesInTextFile(txtPath, lines);
  }

  var intro = Context.Options["INTRO"];

  if (intro == "Yes") {
    var dict = [Context.FindLineNumberInTextFile(txtPath, "skip_intro", Nucleus.SearchType.StartsWith) + "|skip_intro true"];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  var camR1 = Context.Options["EXMOVE"];

  if (camR1 == "Yes") {
    var dict = [Context.FindLineNumberInTextFile(txtPath, "key_dright", Nucleus.SearchType.StartsWith) + "|key_dright 100a ffff ffff"];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  var camSwitch = Context.Options["INVERT"];

  if (camSwitch == "Yes") {
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "bettercam_invertx", Nucleus.SearchType.StartsWith) + "|bettercam_invertx true",
      Context.FindLineNumberInTextFile(txtPath, "bettercam_inverty", Nucleus.SearchType.StartsWith) + "|bettercam_inverty true"
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
};
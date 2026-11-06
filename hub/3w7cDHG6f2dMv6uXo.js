Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Thu Mar 17 2022 00:57:53 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "3w7cDHG6f2dMv6uXo";
Hub.Maintainer.Name = "Zense";
Hub.Maintainer.Id = "xsaAXYeKK9Y22x9MZ";

var preset = ["Current Settings", "Yes"];
Game.AddOption(
  "Load a custom controller preset?",
  "This conveniently sets up a controller config for you before you start. \nThe option 'Current Settings' keeps the last used controller mappings.\nThis maps keyboard controls to the arrow keys and 'ZXC' for N64's 'ZBA'.",
  "CONF",
  preset
);
var skip = ["No", "Yes"];
Game.AddOption("Skip intro?", "This skips the new game intro cutscene with Peach and some of the \ninitial dialogues. This is only relevant if starting a new game.", "INTRO", skip);
var moves = ["No", "Yes"];
Game.AddOption("Are you using the extended moveset patch?", "This moves the camera switch button to the right shoulder button (:R1) \ninstead of the the right trigger (:R2).", "EXMOVE", moves);
var invert = ["No", "Yes"];
Game.AddOption("Invert camera when using the bettercam patch?", "The camera will move right when the right stick is pushed right and\ndown when the stick is moved up.", "INVERT", invert);

Game.FileSymlinkExclusions = ["xinput1_4.dll"];
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SymlinkExe = false;
Game.SupportsKeyboard = true;
Game.ExecutableName = "sm64.us.f3dex2e.exe";
Game.GUID = "Super Mario 64 PC Port";
Game.GameName = "Super Mario 64 PC Port";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Super Mario 64";
Game.HasDynamicWindowTitle = true;
Game.DPIHandling = true;
Game.FakeFocus = true;
Game.FakeFocusInterval = 8000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = true;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.XInputPlusDll = ["xinput1_4.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Roaming\\sm64ex-coop";
Game.Description =
  "IMPORTANT: All settings only need to be applied once. This is the native PC port, not emulated. Only 2 player co-op at the moment. Supports extra features like Render96 assets, better camera and extended moveset. The mod is still work in progress but the game is completable. Press A or B on the initial discord error message screen to continue. Player 2 has to press 'enter' to finally connect and focus might need to be on player2's window. In latest versions the game is coded to only receive input from the last connected gamepad so to restrict the gamepad xinput you have to use a workaround: for 2 players turn off the second connected gamepad before the first instance opens, after the first instance opens it should be controllable with the first gamepad, next turn on the second connected gamepad and open the second instance using the Nucleus prompt and the second gamepad should control the second instance.";
Game.PromptBetweenInstances = true;
Game.PauseBetweenContextAndLaunch = 8;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\sm64config.txt";

  var musLine = Context.FindLineNumberInTextFile(txtPath, "music_volume", Nucleus.SearchType.Contains);
  var SkipLine = Context.FindLineNumberInTextFile(txtPath, "skip_intro", Nucleus.SearchType.Contains);
  var localIP = Context.FindLineNumberInTextFile(txtPath, "coop_join_ip", Nucleus.SearchType.Contains);
  var KeyaLine = Context.FindLineNumberInTextFile(txtPath, "key_a", Nucleus.SearchType.Contains);
  var netSys = Context.FindLineNumberInTextFile(txtPath, "coop_network_system", Nucleus.SearchType.Contains);
  var keyStick = Context.FindLineNumberInTextFile(txtPath, "key_stickup", Nucleus.SearchType.Contains);
  var keyChat = Context.FindLineNumberInTextFile(txtPath, "key_chat", Nucleus.SearchType.Contains);
  var invCam = Context.FindLineNumberInTextFile(txtPath, "bettercam_invertx", Nucleus.SearchType.Contains);

  var dict = [SkipLine + "|skip_intro false", localIP + "|coop_join_ip " + Context.LocalIP, netSys + "|coop_network_system 1", keyChat + "|key_chat ffff ffff ffff"];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  if (Context.PlayerID > 0) {
    var musLine = Context.FindLineNumberInTextFile(txtPath, "music_volume", Nucleus.SearchType.Contains);

    var dict = [musLine + "|music_volume 0"];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

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
    var SkipIn = [SkipLine + "|skip_intro true"];
    Context.ReplaceLinesInTextFile(txtPath, SkipIn);
  }

  var camR1 = Context.Options["EXMOVE"];

  if (camR1 == "Yes") {
    var dpadright = Context.FindLineNumberInTextFile(txtPath, "key_dpadright", Nucleus.SearchType.Contains);
    var unbindR2 = [dpadright + "|key_dpadright 100a ffff ffff"];
    Context.ReplaceLinesInTextFile(txtPath, unbindR2);
  }

  var camSwitch = Context.Options["INVERT"];

  if (camSwitch == "Yes") {
    var inversion = [invCam + "|bettercam_invertx true", invCam + 1 + "|bettercam_inverty true"];
    Context.ReplaceLinesInTextFile(txtPath, inversion);
  }
};
Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Tue May 28 2024 08:39:19 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "i6oHNZmhKJ2i3iTy9";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("Keep aspect ratio?", "Maintains the game window default aspect ratio to avoid stretching in split-screen.", "Ratio", answers1);

Game.ExecutableContext = ["LINKDATA"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "xinput1_3.dll", "OPPW4.exe"];
Game.FileSymlinkCopyInstead = ["steam_api.dll", "steam_api64.dll"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergExperimentalSteamClient = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "OPPW4.exe";
Game.SteamID = "1089090";
Game.GUID = "ONE PIECE PIRATE WARRIORS 4";
Game.GameName = "ONE PIECE: PIRATE WARRIORS 4";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "OPPW4";
Game.FakeFocus = true;
Game.FakeFocusInterval = 8000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = false;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = false;
Game.UserProfileSavePath = "AppData\\Local\\BANDAI NAMCO Entertainment\\One Piece Pirate Warriors 4\\Saved\\SaveGames";
Game.Description =
  "CLOSE Steam completely before running this. The game already has native split-screen co-op for 2 players max but with this handler you can play up to 4 in missions that allow 4 players. To connect the instances select system-login in the main menu to enable the online play, then choose a mission, press Y and select recruit in one instance, once you are in the lobby after selecting a character the other instances can join by pressing Y too and selecting join. You can access each instance save in the app, after the first launch click game options/open user profile save path in the UI. You can even copy your main save to all instances there. Make sure all instances are in windowed and reduce in-game graphic settings to improve performance. Working with latest legit Steam version only.";
Game.PauseBetweenStarts = 35;

Game.Play = function() {
  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\controller");
  System.IO.Directory.CreateDirectory(filePath);

  var gamepad = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\controller\\menucontrols.txt";
  var lines = [
    "_PAD_UP_=DUP",
    "_PAD_DOWN_=DDOWN",
    "_PAD_LEFT_=DLEFT",
    "_PAD_RIGHT_=DRIGHT",
    "_PAD_START_=START",
    "_PAD_BACK_=BACK",
    "_PAD_A_=A",
    "_PAD_B_=B",
    "_PAD_X_=X",
    "_PAD_Y_=Y",
    "_PAD_LB_=LBUMPER",
    "_PAD_LT_=DLTRIGGER",
    "_PAD_LBT_=LSTICK",
    "_PAD_RB_=RBUMPER",
    "_PAD_RT_=DRTRIGGER",
    "_PAD_RBT_=RSTICK",
    "_AN_STICK_L_=LJOY=joystick_move",
    "_AN_STICK_R_=RJOY=joystick_move"
  ];

  Context.WriteTextFile(gamepad, lines);

  if (Context.PlayerID == 0) {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "OPPW4.exe"), System.IO.Path.Combine(Context.RootFolder, "OPPW4.exe"), true);
  }

  if (Context.PlayerID == 1) {
    //patch window class OPPW4_WW 4F 50 50 57 34 5F 57 57
    Context.PatchFile(
      System.IO.Path.Combine(Context.RootInstallFolder, "OPPW4.exe"),
      System.IO.Path.Combine(Context.RootFolder, "OPPW4.exe"),
      [0x4f, 0x50, 0x50, 0x57, 0x34, 0x5f, 0x57, 0x57],
      [0x4f, 0x50, 0x50, 0x57, 0x35, 0x5f, 0x57, 0x57]
    );
  }

  if (Context.PlayerID == 2) {
    Context.PatchFile(
      System.IO.Path.Combine(Context.RootInstallFolder, "OPPW4.exe"),
      System.IO.Path.Combine(Context.RootFolder, "OPPW4.exe"),
      [0x4f, 0x50, 0x50, 0x57, 0x34, 0x5f, 0x57, 0x57],
      [0x4f, 0x50, 0x50, 0x57, 0x36, 0x5f, 0x57, 0x57]
    );
  }

  if (Context.PlayerID == 3) {
    Context.PatchFile(
      System.IO.Path.Combine(Context.RootInstallFolder, "OPPW4.exe"),
      System.IO.Path.Combine(Context.RootFolder, "OPPW4.exe"),
      [0x4f, 0x50, 0x50, 0x57, 0x34, 0x5f, 0x57, 0x57],
      [0x4f, 0x50, 0x50, 0x57, 0x37, 0x5f, 0x57, 0x57]
    );
  }

  if (Context.PlayerID == 4) {
    Context.PatchFile(
      System.IO.Path.Combine(Context.RootInstallFolder, "OPPW4.exe"),
      System.IO.Path.Combine(Context.RootFolder, "OPPW4.exe"),
      [0x4f, 0x50, 0x50, 0x57, 0x34, 0x5f, 0x57, 0x57],
      [0x4f, 0x50, 0x50, 0x57, 0x38, 0x5f, 0x57, 0x57]
    );
  }

  var ratio = Context.Options["Ratio"];

  if (ratio == "Yes") {
    Game.KeepMonitorAspectRatio = true;
    Game.IgnoreWindowBorderCheck = true;
    Context.HideDesktop();
    Context.HideTaskBar();
  }

  if (ratio == "No") {
    Game.SetTopMostAtEnd = true;
  }
};
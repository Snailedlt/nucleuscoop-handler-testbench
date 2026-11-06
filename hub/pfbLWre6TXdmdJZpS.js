Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Nov 18 2024 11:51:49 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "pfbLWre6TXdmdJZpS";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

var answers1 = ["HD", "Classic"];
Game.AddOption("Control Scheme", "Select input setup for gamepad players.", "Control", answers1);

Game.ExecutableContext = ["mus_cave.ogg"];
Game.FileSymlinkCopyInstead = ["steam_api.dll", "steam_appid.txt", "gamepad.cfg", "keys.cfg", "options.ini", "settings.cfg", "stats.txt"];
Game.KeepSymLinkOnExit = true;
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.GameName = "Spelunky Classic";
Game.GUID = "Spelunky Classic";
Game.ExecutableName = "SpelunkySD.exe";
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 4;
Game.MaxPlayers = 4;
Game.KeepAspectRatio = true;
Game.SetWindowHookStart = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Spelunky SD";
Game.HasDynamicWindowTitle = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileConfigPath = "AppData\\Local\\SpelunkySD";
Game.UserProfileConfigPathNoCopy = true;
Game.Description =
  'Requires the mod "SpelunkySD", you can download it here: https://yellowafterlife.itch.io/spelunky-sd \n\nClose steam before using this handler or else it will use Spacewar on your account. Make sure to run SpelunkySD.exe at least once before using this handler. If the instances resize incorrectly and do not lose borders make sure your monitor scale is set to 100% in Windows settings.\n\nAlt-tab between instances and navigate the menus using the keyboard. Host a direct game with the first instance and join with the others before starting the server. I recommend you lower input delay to 33ms.\n\nOnce the game has started, alt-tab to the keyboard instance if you have one to give them control.\n\nCheck the SpelunkySD README.txt to see how to change characters and colors in-game.';
Game.PromptBetweenInstances = false;
Game.PauseBetweenStarts = 20;

Game.Play = function() {
  var optPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\options.ini";
  Context.ModifySaveFile(optPath, optPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Windows", "SleepMargin", "10")]);

  var filePath = (Context.SavePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath);
  System.IO.Directory.CreateDirectory(filePath);

  var control = Context.Options["Control"];

  var KBlines = ["[button]"];

  var CLlines = [
    "[button]",
    'Buy|Enter="gp1b5"',
    'Run="gp1b7"',
    'Bomb="gp1b8"',
    'Down="gp1y"',
    'Up="-gp1y"',
    'Left="-gp1x"',
    'Pause="gp1b10"',
    'Jump="gp1b2"',
    'Right="gp1x"',
    'Action="gp1b1"',
    'Rope="gp1b6"',
    'Item="gp1b3"'
  ];

  var HDlines = [
    "[button]",
    'Buy|Enter="gp1b5"',
    'Run="gp1b6"',
    'Bomb="gp1b2"',
    'Down="gp1y"',
    'Up="-gp1y"',
    'Left="-gp1x"',
    'Pause="gp1b10"',
    'Jump="gp1b1"',
    'Right="gp1x"',
    'Action="gp1b3"',
    'Rope="gp1b4"',
    'Item="gp1b7"'
  ];

  var ctrlCfg = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\controls.ini";
  if (Context.IsKeyboardPlayer == true) {
    Context.WriteTextFile(ctrlCfg, KBlines);
  } else {
    if (control == "Classic") {
      Context.WriteTextFile(ctrlCfg, CLlines);
    } else {
      Context.WriteTextFile(ctrlCfg, HDlines);
    }
  }

  var gameCfg = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\spelunky.ini";
  var lines = ["[audio]", 'music="1"', 'sounds="1"', "[screen]", 'full="0"'];
  if (Context.PlayerID > 0) {
    var lines = ["[audio]", 'music="0"', 'sounds="0"', "[screen]", 'full="0"'];
  }
  Context.WriteTextFile(gameCfg, lines);

  var setCfg = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\settings.ini";
  var lines = ["[player]", 'alias="' + Context.Nickname + '"'];
  Context.WriteTextFile(setCfg, lines);
};
Hub.Handler.Version = 5; // Released at https://hub.splitscreen.me/ on Sat Aug 13 2022 19:31:28 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "vbLcyw3hLFRBGBwCt";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
var answers2 = ["Yes", "No"];
Game.AddOption("Will you use the game's native splitscreen?", "If yes launch only two instances, you need 3 or 4 gamepads.", "Native", answers1);
Game.AddOption("Use native LAN?", "Launches all instances using your Steam Account, connect the instances via the game LAN option, read the handler notes before using.", "LAN", answers2);

Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "winmm.dll"];
Game.FileSymlinkCopyInstead = ["portal_knights.cfg"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "portal_knights_x64.exe";
Game.SteamID = "374040";
Game.GUID = "Portal Knights";
Game.GameName = "Portal Knights";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Portal Knights";
Game.FakeFocus = true;
Game.FakeFocusInterval = 8000;
Game.SendFakeFocusMsg = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_4.dll"];
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\374040\\remote";
Game.Description =
  "This handler is designed for 2 players per instance using the game's native splitscreen, so you can play with 4 players in only two instances of the game for better performance, the first two gamepads will control the first instance and the other two gamepads the second, press start in the character selection screen to add a local player in each instance, if you only want to have one player per instance select No in the UI option. With the native LAN UI option this handler will launch all instances under your Steam account, you can unlock Steam achievements using this option, to connect the instances select LAN/Wifi only in the network settings before starting your world then join in the other instances, use a different character per instance, create them before launching via Nucleus. If you select no in the native LAN UI option the handler will use goldberg emulator instead.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\portal_knights.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, '		"windowType":', Nucleus.SearchType.StartsWith) + '|		"windowType": "Default",',
    Context.FindLineNumberInTextFile(txtPath, '		"windowSizeX":', Nucleus.SearchType.StartsWith) + '|		"windowSizeX": ' + Context.Width + ",",
    Context.FindLineNumberInTextFile(txtPath, '		"windowSizeY":', Nucleus.SearchType.StartsWith) + '|		"windowSizeY": ' + Context.Height + ","
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var native = Context.Options["Native"];
  var lan = Context.Options["LAN"];

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

  if (lan == "Yes") {
    Game.UseNucleusEnvironment = false;

    var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "steam_api64.dll");
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_api64.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (lan == "No") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\winmm.dll");
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\Steam Stub DRM Patcher\\x64\\winmm.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
};
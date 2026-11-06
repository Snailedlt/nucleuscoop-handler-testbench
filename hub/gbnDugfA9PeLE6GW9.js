Hub.Handler.Version = 7; // Released at https://hub.splitscreen.me/ on Sun Jun 27 2021 08:35:21 GMT+0000 (UTC).
Hub.Handler.Id = "gbnDugfA9PeLE6GW9";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
var answers2 = ["No", "Yes"];
Game.AddOption("Unlock FPS?", "FPS is capped at 30 by default, select yes to unlock FPS. Use Vsync to limit.", "FPS", answers1);
Game.AddOption("Use Flawless Widescreen?", "Read the script notes before using.", "FW", answers2);

Game.KillMutex = [
  "DeadRising2",
  "ThreadPoolEvent0",
  "ThreadPoolEvent1",
  "ThreadPoolEvent2",
  "ThreadPoolEvent3",
  "ThreadPoolEvent4",
  "ThreadPoolEvent5",
  "ThreadPoolEvent6",
  "ThreadPoolEvent7",
  "ThreadPoolEvent8",
  "ThreadPoolEvent9",
  "ThreadPoolEvent:",
  "ThreadPoolEvent;",
  "ThreadPoolEvent<",
  "ThreadPoolEvent=",
  "ThreadPoolEvent>",
  "ThreadPoolEvent?",
  "ThreadPoolEvent@",
  "ThreadPoolEventA",
  "ThreadPoolEventB",
  "ThreadPoolEventC",
  "ThreadPoolEventD",
  "ThreadPoolEventE",
  "ThreadPoolEventF",
  "ThreadPoolEventG",
  "ThreadPoolEventH",
  "ThreadPoolEventI",
  "ThreadPoolEventJ",
  "ThreadPoolEventK"
];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "user.ini"];
Game.RenameNotKillMutex = true;
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "deadrising3.exe";
Game.SteamID = "265550";
Game.GUID = "Dead Rising 3";
Game.GameName = "Dead Rising 3";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "DeadRising 3";
Game.HasDynamicWindowTitle = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "Documents\\My Games\\Dead Rising 3";
Game.UserProfileSavePath = "Documents\\My Games\\Dead Rising 3\\saves\\x64_build";
Game.Description =
  "If you have this game on Steam run this with Steam opened. You can connect the instances in story mode when both are at the autoshop. Use the Flawless Widescreen option in the UI if you want to remove blackbars, change the FOV and fix the hud/menus. If you use the FWS option you will get a message saying it can't find the Flawless Widescreen module on first run, click ok and FWS will open, in the list of modules select the DeadRising3 one, once it is installed close FWS and the instances will open. Once the last instance opens FWS will open again and the patches should apply automatically, if they don't apply automatically after FWS opens the second time just select the new instances modules that Nucleus created in the FWS UI and they should enable. Use CTRL+T if Nucleus instances get in the way. You can also adjust some values in settings/configuration/display detection in the FWS window.";
Game.PauseBetweenStarts = 40;
Game.GamePlayBeforeGameSetup = true;

Game.Play = function() {
  var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\rendersettings.ini";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "ScreenWidth", Nucleus.SearchType.StartsWith) + "|ScreenWidth = " + Context.Width,
    Context.FindLineNumberInTextFile(txtPath, "ScreenHeight", Nucleus.SearchType.StartsWith) + "|ScreenHeight = " + Context.Height,
    Context.FindLineNumberInTextFile(txtPath, "WindowWidth", Nucleus.SearchType.StartsWith) + "|WindowWidth = " + Context.Width,
    Context.FindLineNumberInTextFile(txtPath, "WindowHeight", Nucleus.SearchType.StartsWith) + "|WindowHeight = " + Context.Height,
    Context.FindLineNumberInTextFile(txtPath, "FullScreen", Nucleus.SearchType.StartsWith) + "|FullScreen = false"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\DLC.txt";
  var lines = ["274110=Dead Rising 3 DLC1", "274111=Dead Rising 3 DLC2", "278140=Dead Rising 3 DLC4", "274112=Dead Rising 3 DLC3"];
  Context.WriteTextFile(dlc, lines);

  var fps = Context.Options["FPS"];
  var fw = Context.Options["FW"];

  if (fps == "Yes") {
    var userini = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\user.ini";
    var lines2 = ["gmpcr_unlock_frame_rate = True"];
    Context.WriteTextFile(userini, lines2);
  }

  if (fps == "No") {
  }

  if (fw == "Yes") {
    Game.FlawlessWidescreen = "DeadRising3";
    Game.FlawlessWidescreenOverrideDisplay = true;
  }

  if (fw == "No") {
  }
};
Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Thu Dec 30 2021 23:31:57 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "ygx9qjMtMTSYEpnc8";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
Game.AddOption("Use Stretching Fix by Rose?", "Fixes Stretching in horizontal UW instances, read the script notes.", "Fix", answers1);

Game.ExecutableContext = ["fmod_eventL.dll"];
Game.KillMutex = [
  "Type:Mutant|MX-VS-ATV_33d79c30-db02-11df-937b-0800200c9a66",
  "Type:Event|BackgroundCachePausedEvent",
  "Type:Event|CacheThreadEvent",
  "Type:Event|DatabaseThreadEvent",
  "Type:Event|FMODQueueProcessEvent",
  "Type:Event|ForestSystemEnd",
  "Type:Event|ForestSystemKill",
  "Type:Event|ForestSystemStart",
  "Type:Event|Kill0",
  "Type:Event|Kill1",
  "Type:Event|LoadingThreadEarlyOutEvent",
  "Type:Event|LoadingThreadEvent",
  "Type:Event|ModelGroupEnd0",
  "Type:Event|ModelGroupEnd1",
  "Type:Event|ModelGroupEnd2",
  "Type:Event|ModelGroupKill0",
  "Type:Event|ModelGroupKill1",
  "Type:Event|ModelGroupKill2",
  "Type:Event|ModelGroupStartEvent0",
  "Type:Event|ModelGroupStartEvent1",
  "Type:Event|ModelGroupStartEvent2",
  "Type:Event|MXUISavedGameManager::EndEvent",
  "Type:Event|MXUISavedGameManager::EndEventDone",
  "Type:Event|Sleep0",
  "Type:Event|Sleep1",
  "Type:Event|Wake0",
  "Type:Event|Wake1"
];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "local_save.txt", "xinput1_3.dll", "mxreflexuw32x9.exe"];
Game.FileSymlinkCopyInstead = ["graphics.cfg", "MXSettings.exe"];
Game.RenameNotKillMutex = true;
Game.GameName = "MX vs. ATV Reflex";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "MXReflex.exe";
Game.SteamID = "55140";
Game.GUID = "MX vs ATV Reflex";
Game.MaxPlayers = 5;
Game.MaxPlayersOneMonitor = 5;
Game.LauncherTitle = "";
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "MX Vs ATV REFLEX";
Game.FakeFocus = true;
Game.FakeFocusInterval = 13000;
Game.SendFakeFocusMsg = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\55140\\remote";
Game.Description =
  "IMPORTANT: Connect the instances via the online multiplayer option. If you use the stretching fix UI option make sure to patch the game by clicking start in the patcher windows that will show, after that click ok on the Nucleus prompt to open the instance.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 35;

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\graphics.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "Fullscreen", Nucleus.SearchType.StartsWith) + "|Fullscreen=0",
    Context.FindLineNumberInTextFile(txtPath, "ScreenWidth", Nucleus.SearchType.StartsWith) + "|ScreenWidth=" + Context.Width,
    Context.FindLineNumberInTextFile(txtPath, "ScreenHeight", Nucleus.SearchType.StartsWith) + "|ScreenHeight=" + Context.Height
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient012",
    "SteamGameServer011",
    "SteamGameServerStats001",
    "SteamUser016",
    "SteamFriends013",
    "SteamUtils005",
    "SteamMatchMaking009",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION011",
    "STEAMAPPS_INTERFACE_VERSION005",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION010",
    "STEAMSCREENSHOTS_INTERFACE_VERSION002",
    "STEAMHTTP_INTERFACE_VERSION002",
    "STEAMUNIFIEDMESSAGES_INTERFACE_VERSION001"
  ];
  Context.WriteTextFile(interfaces, lines);

  if (Context.HasKeyboardPlayer == true) {
  } else {
    Game.SetForegroundWindowElsewhere = true;
  }

  var fix = Context.Options["Fix"];

  if (fix == "Yes") {
    if (Context.AspectRatioDecimal > 1.8) {
      Game.KillProcessesOnClose = ["mxreflexuw32x9"];

      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\mxreflexuw32x9.exe");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "mxreflexuw32x9.exe");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\mxreflexuw32x9.exe"], false, 1, false, true);
    } else if (Context.AspectRatioDecimal < 1.2) {
    } else {
    }
  }

  if (fix == "No") {
  }
};
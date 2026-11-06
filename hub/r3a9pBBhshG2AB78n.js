Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Thu Jun 11 2020 00:42:05 GMT+0000 (UTC).
Hub.Handler.Id = "r3a9pBBhshG2AB78n";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.KillMutex = [
  "TrophyMutex",
  "sys file mutex",
  "SWORD ART ONLINE : HOLLOW REALIZATION",
  "sndSE",
  "SklCountSync",
  "Physics",
  "MicroThread",
  "memory_sync18",
  "memory_sync17",
  "memory_sync16",
  "memory_sync15",
  "memory_sync14",
  "memory_sync13",
  "memory_sync12",
  "memory_sync11",
  "memory_sync10",
  "memory_sync09",
  "memory_sync08",
  "memory_sync07",
  "memory_sync06",
  "memory_sync05",
  "memory_sync04",
  "memory_sync03",
  "memory_sync02",
  "memory_sync01",
  "memory_sync00",
  "PadMutex",
  "MsgFont",
  "MsgChkDataSync",
  "MouseMutex",
  "map navi mutex",
  "map lightregist mutex",
  "map height mutex",
  "InfoMsgSync",
  "Effect",
  "damage_sync",
  "ChrShaderSync",
  "ChrRangeDraw",
  "ChrEffectMngr",
  "CDdf212806D6EmB31yE0c",
  "CChrDataClusterSync",
  "bmManager",
  "bmEffect"
];
Game.DirSymlinkExclusions = ["userdata"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_api64.dll", "steam_appid.txt"];
Game.FileSymlinkCopyInstead = ["GRPCFG.BIN"];
Game.RenameNotKillMutex = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.GoldbergNoLocalSave = true;
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "sao_hr.exe";
Game.SteamID = "607890";
Game.GUID = "SAOHR";
Game.GameName = "Sword Art Online: Hollow Realization Deluxe Edition";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "";
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "SWORD ART ONLINE: HOLLOW REALIZATION";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_4.dll", "xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.PreventWindowDeactivation = true;
Game.KeyboardPlayerSkipPreventWindowDeactivate = true;
Game.HookFocus = false;
Game.RefreshWindowAfterStart = true;
Game.ResetWindows = true;
Game.KeepSymLinkOnExit = true;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\607890\\remote";
Game.Description =
  "Set your main game to windowed and disable the aspect ratio option first, do that or the windows will not resize correctly. The instances will look stretched until you hit a monster in single player with a skill. Wait until all instances resize and position correctly to start the game from the title screen. Each instance has its own save, you can access these saves in the app, after the first launch click game options/open user profile save path in the UI. You can even copy your main save to all instances there. Remember the multiplayer option unlocks after you defeat the first area Kobold boss. Lower graphics settings per instance like textures and shadows to improve performance.";
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\controller");
  System.IO.Directory.CreateDirectory(filePath);

  var gamepad = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\controller\\saohrdef.txt";
  var lines = [
    "button_ST=START",
    "button_SL=BACK",
    "button_BL1=LBUMPER",
    "button_BR1=RBUMPER",
    "button_BD=A",
    "button_BR=B",
    "button_BL=X",
    "button_BU=Y",
    "button_BL3=LSTICK",
    "Move=LJOY=joystick_move",
    "button_BL2=LTRIGGER=trigger",
    "button_BR2=RTRIGGER=trigger",
    "button_BR3=RSTICK",
    "Camera=RJOY=joystick_move",
    "button_U=DUP",
    "button_D=DDOWN",
    "button_R=DRIGHT",
    "button_L=DLEFT"
  ];

  Context.WriteTextFile(gamepad, lines);
};
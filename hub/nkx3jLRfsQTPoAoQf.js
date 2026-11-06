Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Thu Apr 21 2022 07:04:27 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "nkx3jLRfsQTPoAoQf";
Hub.Maintainer.Name = "gotenks";
Hub.Maintainer.Id = "PKW8fDRgHFm6aPaYH";

var answers1 = ["No", "Yes"];
var answers2 = ["1", "2"];
Game.AddOption(
  "Are you running the game for the first time?",
  "Only select yes if you are, set the game to windowed mode and choose the resolution (720p recommended) in all instances the first time.",
  "first",
  answers1
);
Game.AddOption("PC-ID", "Allows you to play in LAN mode between 2 PCs, make sure you set different IDs to each PC or they won't be able to join the same game.", "id", answers2);

Game.ExecutableContext = ["COMMON", "license", "amd_ags_x64.dll"];
Game.DirSymlinkExclusions = ["SmartSteamLoader\\SmartSteamEmu\\Plugins"];
Game.FileSymlinkExclusions = ["SSE_lifeSUpport.dll", "xinput1_3.dll", "winmm.dll"];
Game.FileSymlinkCopyInstead = ["steam_api64.dll", "amd_ags_x64.dll"];
Game.NeedsSteamEmulation = true;
Game.UseSteamStubDRMPatcher = true;
Game.HandlerInterval = 100;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SymlinkExe = false;
Game.SteamID = "921590";
Game.ExecutableName = "dffnt.exe";
Game.GUID = "DISSIDIA FINAL FANTASY NT";
Game.GameName = "DISSIDIA FINAL FANTASY NT Free Edition";
Game.UserProfileSavePath = "AppData\\Roaming\\SmartSteamEmu";
Game.UserProfileConfigPath = "Documents\\My Games\\DISSIDIA FINAL FANTASY NT Free Edition\\Steam";
Game.MaxPlayers = 6;
Game.MaxPlayersOneMonitor = 6;
Game.FakeFocus = true;
Game.FakeFocusInterval = 15000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "DISSIDIA FINAL FANTASY NT Free Edition";
//Game.HasDynamicWindowTitle = true;
Game.SetForegroundWindowElsewhere = true;
Game.WindowStyleValues = ["~0xC00000", "~0x40000", "~0x20000000", "~0x20000", "~0x80000", "0x40000000"];
Game.ExtWindowStyleValues = ["~0x00000001", "~0x00000200", "~0x00020000"];
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.Description =
  "IMPORTANT: On first run select yes in the Nucleus UI option for first run and set each instance to windowed and in the resolution you want. Make sure Steam is closed before launching this, To connect the instances create an online game in one instance set conexion strength to no restriction and join in the others. Tested and working with DISSIDIA FINAL FANTASY NT Free Edition from Steam. The game can be quite demanding so lower graphics settings in each instance to improve performance.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenStarts = 40;

Game.Play = function() {
  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\SmartSteamLoader\\SmartSteamEmu\\Plugins");
  System.IO.Directory.CreateDirectory(filePath);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\SmartSteamLoader\\SmartSteamEmu\\Plugins\\SSE_lifeSUpport.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "SSE_lifeSUpport.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var id = Context.Options["id"];
  var first = Context.Options["first"];

  if (id == "2") {
    var player = Context.PlayerID;
    switch (player) {
      case 0:
        Game.SSEAdditionalLines = ["SmartSteamEmu|ManualSteamId=76561198134585131", "SmartSteamEmu|EnableHTTP=1"];
        break;
      case 1:
        Game.SSEAdditionalLines = ["SmartSteamEmu|ManualSteamId=76561198131394153", "SmartSteamEmu|EnableHTTP=1"];
        break;
      case 2:
        Game.SSEAdditionalLines = ["SmartSteamEmu|ManualSteamId=76561198011792067", "SmartSteamEmu|EnableHTTP=1"];
        break;
      case 3:
        Game.SSEAdditionalLines = ["SmartSteamEmu|ManualSteamId=76561198043762785", "SmartSteamEmu|EnableHTTP=1"];
        break;
    }
  } else {
    Game.SSEAdditionalLines = ["SmartSteamEmu|EnableHTTP=1"];
  }

  if (first == "Yes") {
    Game.PromptBetweenInstances = true;
    Game.PauseBetweenProcessGrab = 60;
  }
};
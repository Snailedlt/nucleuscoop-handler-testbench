Hub.Handler.Version = 6; // Released at https://hub.splitscreen.me/ on Thu Jan 20 2022 18:09:05 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "xh5yHibezzDHtKsyT";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.KillMutex = ["Type:Event|Overkill Engine Game"];
Game.DirSymlinkExclusions = ["logs"];
Game.FileSymlinkExclusions = [
  //"steam_api.dll",
  "steam_appid.txt",
  "steam_interfaces.txt",
  "winmm.dll",
  "xinput1_3.dll",
  "main.log",
  "pdthhook.log"
];
Game.FileSymlinkCopyInstead = [
  "_discord-rpc.dll",
  "binkw32.dll",
  "context.xml",
  "dieselx.cfg",
  "discord.ver",
  "game.ver",
  "lightfx.dll",
  "PhysX3_x86.dll",
  "PhysX3Common_x86.dll",
  "PhysX3Cooking_x86.dll"
];
Game.NeedsSteamEmulation = true;
Game.UseGoldberg = false;
Game.UseSteamStubDRMPatcher = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "payday_win32_release.exe";
Game.SteamID = "24240";
Game.GUID = "PAYDAY The Heist";
Game.GameName = "PAYDAY: The Heist";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.StartArguments = "-skip_intro";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "PAYDAY: The Heist";
Game.SendFakeFocusMsg = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Local\\PAYDAY\\saves";
Game.Description =
  "IMPORTANT: You need to first install the DAHM/DorHUD mod that adds gamepad support to this game for this script to work. See the more info section of this script when you search for it in the download game scripts option for a link to the mod. If you get crashes reduce graphics in-game and disable anti-cheat in the game options, assign different cores to each instance using task manager if you still get crashes. If you use a keyboard instance don't alt-tab to the gamepad instances or you could lose focus.";
//Game.UseProcessorsPerInstance = ["1|1,2,3,4", "2|5,6,7,8"];
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var path = "%USERPROFILE%\\AppData\\Local\\PAYDAY\\renderer_settings.xml";
  Context.ChangeXmlAttributeValue(path, "//d3d_device", "resolution", Context.Width + " " + Context.Height);
  Context.ChangeXmlAttributeValue(path, "//d3d_device", "windowed", "true");
  Context.ChangeXmlAttributeValue(path, "//d3d_device", "aspect_ratio", Context.AspectRatioDecimal);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient010",
    "SteamGameServer010",
    "SteamGameServerStats001",
    "SteamUser016",
    "SteamFriends009",
    "SteamUtils005",
    "SteamMatchMaking008",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION010",
    "STEAMAPPS_INTERFACE_VERSION004",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION004",
    "STEAMHTTP_INTERFACE_VERSION001",
    "SteamMasterServerUpdater001"
  ];
  Context.WriteTextFile(interfaces, lines);

  if (Context.HasKeyboardPlayer == true) {
    Game.FakeFocus = false;
  } else {
    Game.FakeFocus = true;
    Game.FakeFocusInterval = 8000;
    Game.SetForegroundWindowElsewhere = true;
  }
};
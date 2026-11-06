Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Mon Nov 02 2020 22:09:53 GMT+0000 (UTC).
Hub.Handler.Id = "huGp6jNJS3zMesTN4";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["game\\prefs"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "steam_interfaces.txt", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = ["systemPrefs.xml"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = false;
Game.CreateSteamAppIdByExe = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "Forge Quest.exe";
Game.SteamID = "249950";
Game.GUID = "Forge Quest";
Game.GameName = "Forge Quest";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = true;
Game.SupportsPositioning = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Forge Quest 1.56.6";
Game.HasDynamicWindowTitle = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_4.dll"];
Game.FakeFocus = true;
Game.HookFocus = true;
Game.PromptBetweenInstances = true;
Game.Description =
  "After lauching via Nucleus host a public game before opening the second instance with the prompt, alt-tab to the prompt if you have issues selecting it with the cursor. After opening the second instance join using the direct ip option, you have to write your ip and join before enabling the focus hooks, you can see your ip in the game options, network-network interface. Hover the mouse cursor over the main menus if you have trouble controlling them with gamepads or use the cursor to navigate them. Use different characters per instance. If you use one instance with keyboard go to the game input settings in options, select keyboard only and apply, make sure you alt-tab to that instance to control it with keyboard. Your saves are in your original game files inside the worlds and characters folders.";
Game.PauseBetweenStarts = 40;

Game.Play = function() {
  var path = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\game\\prefs\\systemPrefs.xml";
  Context.ChangeXmlNodeInnerTextValue(path, "//windowWidth", Context.Width);
  Context.ChangeXmlNodeInnerTextValue(path, "//windowHeight", Context.Height);
  Context.ChangeXmlNodeInnerTextValue(path, "//windowBorderless", "1");
  Context.ChangeXmlNodeInnerTextValue(path, "//fullscreen", "0");

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient012",
    "SteamGameServer011",
    "SteamGameServerStats001",
    "SteamUser017",
    "SteamFriends013",
    "SteamUtils006",
    "SteamMatchMaking009",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION011",
    "STEAMAPPS_INTERFACE_VERSION005",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION011",
    "STEAMSCREENSHOTS_INTERFACE_VERSION002",
    "STEAMHTTP_INTERFACE_VERSION002",
    "STEAMUNIFIEDMESSAGES_INTERFACE_VERSION001"
  ];

  Context.WriteTextFile(interfaces, lines);
};
Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Nov 23 2020 23:41:40 GMT+0000 (UTC).
Hub.Handler.Id = "w7pj8awLFNMJgwg44";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["fmod64.dll"];
Game.KillMutex = ["Journey"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "xinput9_1_0.dll", "winmm.dll"];
Game.GameName = "Journey";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "Journey.exe";
Game.SteamID = "638230";
Game.GUID = "Journey";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 4;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.UseNucleusEnvironment = true;
Game.UseSteamStubDRMPatcher = false;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Journey (D3D11) (x64)";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput9_1_0.dll"];
Game.FakeFocus = false;
Game.UserProfileSavePath = "AppData\\Local\\Annapurna Interactive\\Journey\\Steam";
Game.Description =
  "Only working with the steam version of the game. To connect to the other player both have to start/enter the same area at the same time. Co-op is available after the first area. Don't separate too much to avoid disconnections. So the instances launch and resize correctly make sure to run your main game at least one time before running this. You need to add custom resolutions in your AMD/Nvidia/Intel panel (For example: 960x1080, 1920x540, 960x540 etc.) for the game to see them and resize correctly. You can access each instance save in the app, after the first launch click game options/open user profile save path in the UI.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var path = Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\Journey.cfg";
  Context.ChangeXmlAttributeValue(path, "//Screen", "FullScreen", "false");
  Context.ChangeXmlAttributeValue(path, "//Screen", "Height", Context.Height);
  Context.ChangeXmlAttributeValue(path, "//Screen", "Width", Context.Width);
};
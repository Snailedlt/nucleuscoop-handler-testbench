Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Mon Mar 08 2021 07:08:37 GMT+0000 (UTC).
Hub.Handler.Id = "TrMEQjFXnyqqkfuNQ";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["User"];
Game.FileSymlinkExclusions = ["xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["BaseConfig.xml"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergExperimentalSteamClient = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "SpinTires.exe";
Game.SteamID = "263280";
Game.GUID = "Spintires";
Game.GameName = "Spintires";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.StartArguments = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Spintires®";
Game.FakeFocus = true;
Game.HookFocus = true;
Game.HookInit = false;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\SpinTires\\UserSaves";
Game.UserProfileSavePathNoCopy = true;
Game.Description = "CLOSE Steam completely before running this. Use the mouse cursor in all instances to start and join a game.";
Game.HexEditExe = ["SpinTiresWindowClass|SpinTiresWindowClass", "SpinTiresWindowClass|2pinTiresWindowClass", "SpinTiresWindowClass|3pinTiresWindowClass", "SpinTiresWindowClass|4pinTiresWindowClass"]; //53 70 69 6E 54 69 72 65 73 57 69 6E 64 6F 77 43 6C 61 73 73
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var path = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\User\\BaseConfig.xml";
  Context.ChangeXmlAttributeValue(path, "//System", "Width", Context.Width);
  Context.ChangeXmlAttributeValue(path, "//System", "Height", Context.Height);
  Context.ChangeXmlAttributeValue(path, "//System", "Windowed", "true");
  Context.ChangeXmlAttributeValue(path, "//System", "Maximized", "false");

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\DLC.txt";
  var lines = [
    "1472710=Spintires® - China Adventure DLC",
    "1346090=Spintires® - SHERP® Ural Challenge DLC ",
    "1346080=Spintires® - Vehicle Pack 01",
    "1151111=Spintires - Chernobyl® DLC",
    "1151110=Spintires® - Aftermath DLC",
    "1148580=Spintires® - Canyons DLC"
  ];

  Context.WriteTextFile(dlc, lines);
};
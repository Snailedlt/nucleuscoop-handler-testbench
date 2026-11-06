Hub.Handler.Version = 5; // Released at https://hub.splitscreen.me/ on Sat Jun 08 2024 16:39:21 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "G3SZSKRRAFXoNyiie";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("Keep aspect ratio?", "Maintains the game default aspect ratio to avoid stretching in split-screen.", "Ratio", answers1);

Game.FileSymlinkExclusions = ["steam_appid.txt"];
Game.NeedsSteamEmulation = false;
Game.CreateSteamAppIdByExe = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Secrets Of Grindea.exe";
Game.SteamID = "269770";
Game.GUID = "Secrets Of Grindea";
Game.GameName = "Secrets Of Grindea";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Secrets Of Grindea";
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.SupportsKeyboard = true;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\Secrets of Grindea";
Game.Description = "Set network type to IP in the game options for all instances to connect them.";
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var txtPath = Context.NucleusUserRoot + "\\AppData\\Roaming\\Secrets of Grindea\\Config.txt";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "Fullscreen [0", Nucleus.SearchType.StartsWith) + 1 + "|0",
    Context.FindLineNumberInTextFile(txtPath, "Zoom", Nucleus.SearchType.StartsWith) + 1 + "|3",
    Context.FindLineNumberInTextFile(txtPath, "Preserve Aspect Ratio", Nucleus.SearchType.StartsWith) + 1 + "|False"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var ratio = Context.Options["Ratio"];

  if (ratio == "Yes") {
    Game.KeepMonitorAspectRatio = true;
    Game.IgnoreWindowBorderCheck = true;
    Context.HideDesktop();
    Context.HideTaskBar();
  }

  if (ratio == "No") {
  }
};
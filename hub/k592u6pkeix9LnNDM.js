Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Wed Jul 03 2024 08:06:33 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "k592u6pkeix9LnNDM";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["binkw32.dll"];
Game.DirSymlinkExclusions = ["data\\server", "data\\weapon_offsets"];
Game.DirExclusions = ["logs"];
Game.FileSymlinkExclusions = ["xinput1_3.dll"];
Game.FileSymlinkCopyInstead = [
  "binkw32.dll",
  "crash_reporter.exe",
  "custom_menu.exe",
  "d3dx9_43.dll",
  "eldorado.visualelementsmanifest.xml",
  "launcher.exe",
  "manifest.json",
  "mtndew.dll",
  "dewrito.json",
  "dewrito_prefs.cfg",
  "player_customization.json",
  "server.json",
  "offsets.json"
];
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.GameName = "Halo Online ElDewrito";
Game.ExecutableName = "eldorado.exe";
Game.GUID = "Halo Online ElDewrito";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.HideTaskbar = false;
Game.StartArguments = "-multiInstance";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "ElDewrito | Version: 0.7.1 | Build Date: May 15 2024";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.UseAlpha8CustomDll = true;
Game.Hook.BlockKeyboardEvents = false;
Game.Hook.BlockMouseEvents = true;
Game.Hook.BlockInputEvents = true;
Game.SupportsKeyboard = true;
Game.UserProfileConfigPath = "AppData\\Local\\ElDewrito";
Game.UserProfileConfigPathNoCopy = true;
Game.Description =
  "Handler for ElDewrito version 0.7.1, you can get it from here: https://github.com/eldewrito2/ElDewritoLauncher. Host a custom game in one instance, set the host settings to online and join in the other instances using the server browser, press back/select to view the hosted LAN server and join. Set your player names in Nucleus settings. Alt-Tab to the keyboard instance to control it. For the instances to resize correctly without stretching in split-screen you need to add custom resolutions in your AMD/Nvidia/Intel panel (for example if you have a 1920x1080 monitor add custom resolutions like: 960x1080, 1920x540, 960x540 etc.) so the game can see them and use them.";
Game.KeepSymLinkOnExit = true;
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\data\\dewrito_prefs.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "Player.Name", Nucleus.SearchType.StartsWith) + '|Player.Name "' + Context.Nickname + '"',
    Context.FindLineNumberInTextFile(txtPath, "Game.SkipTitleSplash", Nucleus.SearchType.StartsWith) + '|Game.SkipTitleSplash "1"',
    Context.FindLineNumberInTextFile(txtPath, "Game.SkipIntroVideos", Nucleus.SearchType.StartsWith) + '|Game.SkipIntroVideos "1"',
    Context.FindLineNumberInTextFile(txtPath, "Settings.Fullscreen", Nucleus.SearchType.StartsWith) + '|Settings.Fullscreen "0"',
    Context.FindLineNumberInTextFile(txtPath, "Settings.ScreenResolution", Nucleus.SearchType.StartsWith) + '|Settings.ScreenResolution "' + Context.Width + "x" + Context.Height + '"',
    Context.FindLineNumberInTextFile(txtPath, "Settings.Gamepad", Nucleus.SearchType.StartsWith) + '|Settings.Gamepad "1"',
    Context.FindLineNumberInTextFile(txtPath, "Server.Name", Nucleus.SearchType.StartsWith) + '|Server.Name "Nucleus Co-op"',
    Context.FindLineNumberInTextFile(txtPath, "Input.DirectInput", Nucleus.SearchType.StartsWith) + '|Input.DirectInput "0"',
    Context.FindLineNumberInTextFile(txtPath, "Input.ControllerPort", Nucleus.SearchType.StartsWith) + '|Input.ControllerPort "0"'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  if (Context.IsKeyboardPlayer) {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\data\\dewrito_prefs.cfg";
    var dict = [Context.FindLineNumberInTextFile(txtPath, "Settings.Gamepad", Nucleus.SearchType.StartsWith) + '|Settings.Gamepad "0"'];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    Context.Hook.BlockMouseEvents = "False";
    Context.Hook.BlockKeyboardEvents = "False";
    Context.Hook.BlockInputEvents = "False";
    Context.Hook.ForceFocus = "False";
  }
};
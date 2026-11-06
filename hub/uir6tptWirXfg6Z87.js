Hub.Handler.Version = 5; // Released at https://hub.splitscreen.me/ on Sun May 29 2022 13:55:21 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "uir6tptWirXfg6Z87";
Hub.Maintainer.Name = "Genjuro_Kibagami";
Hub.Maintainer.Id = "6s2Fuz9unXTtH453m";

var answers = ["None", "Scourge of Armagon", "Dissolution of Eternity", "Malice", "Aliens", "Dimension of the Past", "Insomnia", "Zerstörer", "Reaper Bots", "Arcane Dimensions", "SlayerTest"];
Game.AddOption("Select a Mod", "", "mod", answers);

Game.ExecutableContext = ["libFLAC-8.dll"];
Game.DirSymlinkCopyInstead = ["id1", "hipnotic", "rogue", "rpbot", "malice", "zer", "dopa", "insomnia", "aliens", "ad", "SlayerTest"];
Game.FileSymlinkExclusions = ["xinput1_4.dll"];
Game.NeedsSteamEmulation = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "quakespasm-spiked-win64.exe";
Game.SteamID = "2310";
Game.GUID = "Quakespasm-Spiked";
Game.GameName = "Quake";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "QSS 2021-07-08";
Game.HasDynamicWindowTitle = true;
Game.FakeFocus = true;
Game.HookFocus = false;
Game.SupportsKeyboard = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_4.dll"];
Game.Description =
  "This script requires Quakespasm-Spiked to be installed in your clean Quake files. Run quakespasm-spiked-win64.exe in your main game files first and change/save any graphics setting and all mission packs before launching via Nucleus. Start a multiplayer game in the first instance then press ok on the prompt to open the next instances when the server is ready, the other instances will connect automatically.";
Game.KeepSymLinkOnExit = true;
Game.PromptAfterFirstInstance = true;
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 20;

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder);

  if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\hipnotic\\CONFIG.CFG")) {
    txtPath += "\\hipnotic\\CONFIG.CFG";
  } else if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\rogue\\config.cfg")) {
    txtPath += "\\rogue\\config.cfg";
  } else if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\aliens\\config.cfg")) {
    txtPath += "\\aliens\\config.cfg";
  } else if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dopa\\config.cfg")) {
    txtPath += "\\dopa\\config.cfg";
  } else if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\insomnia\\config.cfg")) {
    txtPath += "\\insomnia\\config.cfg";
  } else if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\malice\\config.cfg")) {
    txtPath += "\\malice\\config.cfg";
  } else if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ad\\config.cfg")) {
    txtPath += "\\ad\\config.cfg";
  } else if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\zer\\config.cfg")) {
    txtPath += "\\zer\\config.cfg";
  } else if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\SlayerTest\\config.cfg")) {
    txtPath += "\\SlayerTest\\config.cfg";
  } else {
    txtPath += "\\id1\\config.cfg";
  }

  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "joy_enable ", Nucleus.SearchType.StartsWith) + '|joy_enable "1"',
    Context.FindLineNumberInTextFile(txtPath, "m_pitch ", Nucleus.SearchType.StartsWith) + '|m_pitch "0"',
    Context.FindLineNumberInTextFile(txtPath, "m_yaw ", Nucleus.SearchType.StartsWith) + '|m_yaw "0"',
    Context.FindLineNumberInTextFile(txtPath, "name ", Nucleus.SearchType.StartsWith) + '|name "' + Context.Nickname + '"',
    Context.FindLineNumberInTextFile(txtPath, "vid_borderless ", Nucleus.SearchType.StartsWith) + '|vid_borderless "1"',
    Context.FindLineNumberInTextFile(txtPath, "vid_desktopfullscreen ", Nucleus.SearchType.StartsWith) + '|vid_desktopfullscreen "0"',
    Context.FindLineNumberInTextFile(txtPath, "vid_fullscreen ", Nucleus.SearchType.StartsWith) + '|vid_fullscreen "0"',
    Context.FindLineNumberInTextFile(txtPath, "vid_height ", Nucleus.SearchType.StartsWith) + '|vid_height  "' + Context.Height + '"',
    Context.FindLineNumberInTextFile(txtPath, "vid_width ", Nucleus.SearchType.StartsWith) + '|vid_width  "' + Context.Width + '"'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var mod = Context.Options["mod"];
  var modarg = "";
  if (mod == "Scourge of Armagon") {
    modarg = "-game hipnotic";
  } else if (mod == "Dissolution of Eternity") {
    modarg = "-game rogue";
  } else if (mod == "Malice") {
    modarg = "-game malice";
  } else if (mod == "Aliens") {
    modarg = "-game aliens";
  } else if (mod == "Dimension of the Past") {
    modarg = "-game dopa";
  } else if (mod == "Insomnia") {
    modarg = "-game insomnia";
  } else if (mod == "Zerstörer") {
    modarg = "-game zer";
  } else if (mod == "Reaper Bots") {
    modarg = "-game RPBOT";
  } else if (mod == "Arcane Dimensions") {
    modarg = "-game ad";
  } else if (mod == "SlayerTest") {
    modarg = "-game SlayerTest";
  }

  if (Context.PlayerID == 0) {
    Context.StartArguments = modarg;
  } else {
    Context.StartArguments = modarg + " +connect 127.0.0.1";
  }
  Context.RunAdditionalFiles([System.IO.Path.Combine(Game.Folder) + "\\hidemouse.bat"], false, 1);
  Context.RunAdditionalFiles([System.IO.Path.Combine(Game.Folder) + "\\checknucleus.bat"], false, 1);
};
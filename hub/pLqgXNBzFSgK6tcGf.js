Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Sun May 29 2022 13:54:38 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "pLqgXNBzFSgK6tcGf";
Hub.Maintainer.Name = "Genjuro_Kibagami";
Hub.Maintainer.Id = "6s2Fuz9unXTtH453m";

var answers = ["None", "The Reckoning", "Ground Zero", "Eraser Bots"];
Game.AddOption("Select a Mod", "", "mod", answers);

Game.ExecutableContext = ["devil.dll"];
Game.DirSymlinkExclusions = [];
Game.FileSymlinkExclusions = [];
Game.DirSymlinkCopyInstead = ["baseq2", "rogue", "xatrix", "eraser"];
Game.UseNucleusEnvironment = false;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = false;
Game.HandlerInterval = 100;

Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "quake2xp.exe";
Game.SteamID = "2310";
Game.GUID = "Quake 2";
Game.GameName = "Quake 2";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.HideTaskbar = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "quake2xp";
Game.HasDynamicWindowTitle = true;
Game.FakeFocus = true;
Game.FakeFocusInterval = 40000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.UseAlpha8CustomDll = true;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_4.dll", "xinput9_1_0.dll"];
Game.Description =
  "This script requires Quake2XP to be installed in your clean Quake 2 files. Run Quake2xp.exe in your main game files first and change/save any graphics setting and all mission packs before launching via Nucleus. Start a multiplayer game in the first instance then press ok on the prompt to open the next instances when the server is ready, the other instances will connect automatically.";
Game.KeepSymLinkOnExit = true;
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 15;
Game.PromptAfterFirstInstance = true;

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder);

  if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\rogue\\xpconfig.cfg")) {
    txtPath += "\\rogue\\xpconfig.cfg";
  } else if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xatrix\\xpconfig.cfg")) {
    txtPath += "\\xatrix\\xpconfig.cfg";
  } else if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\eraser\\xpconfig.cfg")) {
    txtPath += "\\eraser\\xpconfig.cfg";
  } else {
    txtPath += "\\baseq2\\xpconfig.cfg";
  }

  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "set r_customWidth ", Nucleus.SearchType.StartsWith) + '|set r_customWidth "' + Context.Width + '"',
    Context.FindLineNumberInTextFile(txtPath, "set r_customHeight ", Nucleus.SearchType.StartsWith) + '|set r_customHeight "' + Context.Height + '"',
    Context.FindLineNumberInTextFile(txtPath, "set r_mode ", Nucleus.SearchType.StartsWith) + '|set r_mode "' + 21 + '"',
    Context.FindLineNumberInTextFile(txtPath, "set name ", Nucleus.SearchType.StartsWith) + '|set name "' + Context.Nickname + '"'
  ];

  Context.ReplaceLinesInTextFile(txtPath, dict);

  var mod = Context.Options["mod"];
  var modarg = "";
  if (mod == "The Reckoning") {
    modarg = "+set game xatrix";
  } else if (mod == "Ground Zero") {
    modarg = "+set game rogue";
  } else if (mod == "Eraser Bots") {
    modarg = "+set game eraser";
  }

  if (Context.PlayerID == 0) {
    Context.StartArguments = modarg;
  } else {
    Context.StartArguments = modarg + " +connect 127.0.0.1";
  }
};
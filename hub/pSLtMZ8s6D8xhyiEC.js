Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Mon Dec 15 2025 21:11:11 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "pSLtMZ8s6D8xhyiEC";
Hub.Maintainer.Name = "Perserveruz";
Hub.Maintainer.Id = "nFAYvHKj75jAFRAgt";

var answers = ["Default", "Low", "Med", "High"];
Game.AddOption("Select preferred graphic settings", "Select Default to load default or previously selected setting", "Graphics", answers);
Game.FileSymlinkExclusions = ["D3D9.dll", "dgVoodoo.conf", "motogp.cfg", "settings", "profile"];
Game.FileSymlinkCopyInstead = ["launcher.exe"];
Game.DirExclusions = ["save"];
Game.KillMutex = ["Type:Mutant|motogp2007ownz", "Type:Mutant|motogp2007launch"];
Game.RenameNotKillMutex = false;
Game.HandlerInterval = 100;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = false;
Game.GoldbergLanguage = "english";
Game.GoldbergNoLocalSave = true;
Game.UseNucleusEnvironment = true;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.KeepSymLinkOnExit = true;
Game.SymlinkFolders = false;
Game.SupportsKeyboard = false;
Game.ExecutableName = "motogp.exe";
Game.SteamID = "";
Game.GUID = "MotoGP 07";
Game.GameName = "MotoGP 07";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.PlayersPerInstance = 4;
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "MotoGP2007";
Game.HasDynamicWindowTitle = false;
Game.HookFocus = true;
Game.FakeFocus = true;
Game.FakeFocusSendActivate = false;
Game.PreventWindowDeactivation = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.UseAlpha8CustomDll = false;
Game.Hook.CustomDllEnabled = false;
Game.PauseBetweenProcessGrab = 10;
Game.PauseBetweenProcessStarts = 10;
Game.SetForegroundWindowElsewhere = true;
Game.UseForceBindIP = true;
Game.Description =
  "Game has native 4 player split screen and LAN. The purpose of this handler is to fix graphical issues, to unlock all bikes and tracks, and to increase split screen up to 8 players. Have fun!";

//ProtoInput:

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = false;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = false;
Game.LockInputToggleKey = 0x23;

Game.ProtoInput.MessageFilterHook = false;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.UseDinputRedirection = true;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;
//Game.ProtoInput.MultipleProtoControllers = true;
Game.ProtoInput.GetRawInputDataHook = true;

Game.Play = function() {
  var instanceGuestsCount = PlayerList[Context.PlayerID].InstanceGuests.Count;
  if (instanceGuestsCount == 0) {
    Game.ProtoInput.MultipleProtoControllers = false;
  } else {
    Game.ProtoInput.MultipleProtoControllers = true;
  }

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\save");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\save\\Player " + Context.Nickname + "");
  System.IO.Directory.CreateDirectory(filePath);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\save\\Player " + Context.Nickname + "\\profile");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "profile");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  if (Context.PlayerID == 0) {
    if (!System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\save\\settings"))) {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\save\\settings");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "settings_audio");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }
  } else {
    if (!System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\save\\settings"))) {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\save\\settings");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "settings_noaudio");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }
  }

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "d3d9.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  if (!System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\motogp.cfg"))) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\motogp.cfg");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "motogp_Med.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var Graphics = Context.Options["Graphics"];
  if (Graphics == "Default") {
  }
  if (Graphics == "Low") {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\motogp.cfg";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "motogp_Low.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
  if (Graphics == "Med") {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\motogp.cfg";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "motogp_Med.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
  if (Graphics == "High") {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\motogp.cfg";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "motogp_High.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\motogp.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "vmode/width", Nucleus.SearchType.StartsWith) + "|vmode/width = " + Context.Width + "",
    Context.FindLineNumberInTextFile(txtPath, "vmode/height", Nucleus.SearchType.StartsWith) + "|vmode/height = " + Context.Height + "",
    Context.FindLineNumberInTextFile(txtPath, "vmode/windowed", Nucleus.SearchType.StartsWith) + "|vmode/windowed = 1"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dgVoodoo.conf");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dgVoodoo.conf");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
};
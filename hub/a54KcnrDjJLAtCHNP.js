Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Tue Dec 16 2025 09:04:57 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "a54KcnrDjJLAtCHNP";
Hub.Maintainer.Name = "Perserveruz";
Hub.Maintainer.Id = "nFAYvHKj75jAFRAgt";

var answers1 = ["Default", "Low", "Normal", "High"];
var answers2 = ["-", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
Game.AddOption("Choose your preferred config settings?", "Default will use the previous or default settings", "Config", answers1);
Game.AddOption("PC-ID", "If you are playing with other PCs in LAN, be sure to have different IDs", "id", answers2);
Game.FileSymlinkExclusions = ["credits.usm", "drifting.usm", "gameclear.usm", "logos.usm"];
Game.FileSymlinkCopyInstead = ["steam_api.dll"];
Game.HandlerInterval = 100;
Game.UseNucleusEnvironment = true;
Game.SymlinkExe = false;
Game.KeepSymLinkOnExit = true;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.NeedsSteamEmulation = true;
Game.UseSteamless = true;
Game.ExecutableName = "ASN_App_PcDx9_Final.exe";
Game.LauncherTitle = "Sonic & All-Stars Racing Transformed -";
Game.SteamID = "212480";
Game.GUID = "Sonic & All-Stars Racing Transformed";
Game.GameName = "Sonic & All-Stars Racing Transformed";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.PlayersPerInstance = 4;
Game.HideTaskbar = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Sonic & All-Stars Racing Transformed -";
Game.HasDynamicWindowTitle = true;
Game.HookFocus = false;
Game.FakeFocus = false;
Game.PreventWindowDeactivation = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.UseAlpha8CustomDll = false;
Game.Hook.CustomDllEnabled = false;
Game.DocumentsConfigPath = "SART";
Game.PauseBetweenProcessGrab = 20;
Game.PauseBetweenProcessStarts = 0;
Game.ResetWindows = true;
Game.KillProcessesOnClose = ["AutoIt3"];
Game.Description =
  "Purpose of this handler it to enable 8 player split-screen either on one PC or over LAN on different PCs.\n\nAssign your gamepads accordingly, launch your instances, and once in game, proceed to create a custom online game with the instance that opened last, make sure that everyone has pressed start on their controller prior to creating a custom match.\n\nOnce the custom game has been setup, press SELECT+X on the first gamepad (not the host gamepad) or F2 on your keyboard to automatically connect the first instance to the lobby of the custom match - if the hotkeys don't work you can also alt+tab to the first instance and press shift+tab to connect your instances.\n\nHave fun!";

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
Game.ProtoInput.MultipleProtoControllers = true;
Game.ProtoInput.GetRawInputDataHook = true;

Game.Play = function() {
  Context.RunAdditionalFiles([Context.ScriptFolder + "\\Connect.bat"], false, 10);

  Context.BackupFile(Context.RootInstallFolder + "\\Data\\movies\\drifting.usm", true);
  Context.BackupFile(Context.RootInstallFolder + "\\Data\\movies\\logos.usm", true);

  var filePath = Context.EnvironmentPlayer + "\\Documents";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\Documents\\SART";
  System.IO.Directory.CreateDirectory(filePath);

  if (!System.IO.File.Exists(Context.EnvironmentPlayer + "\\Documents\\SART\\settings.xml")) {
    var savePath = Context.EnvironmentPlayer + "\\Documents\\SART\\settings.xml";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Normal.xml");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var Config = Context.Options["Config"];
  if (Config == "Default") {
  }
  if (Config == "Low") {
    var savePath = Context.EnvironmentPlayer + "\\Documents\\SART\\settings.xml";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Low.xml");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
  if (Config == "Normal") {
    var savePath = Context.EnvironmentPlayer + "\\Documents\\SART\\settings.xml";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Normal.xml");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (Config == "High") {
    var savePath = Context.EnvironmentPlayer + "\\Documents\\SART\\settings.xml";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "High.xml");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Data\\movies\\drifting.usm");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder + "\\intro\\drifting.usm");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Data\\movies\\logos.usm");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder + "\\intro\\logos.usm");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  Game.DontResize = false;
  Game.DontReposition = false;
  Game.DontRemoveBorders = false;

  if (Context.Height < 720) {
    var ScrHeight = "720";
  } else {
    var ScrHeight = Context.Height;
  }

  var path = Context.EnvironmentPlayer + "\\Documents\\SART\\settings.xml";
  Context.ChangeXmlNodeInnerTextValue(path, "//width", Context.Width);
  Context.ChangeXmlNodeInnerTextValue(path, "//height", ScrHeight); //anything less than 720 height will cause the game to crash
  Context.ChangeXmlNodeInnerTextValue(path, "//fullscreen", "0");
  Context.ChangeXmlNodeInnerTextValue(path, "//vsync", "1");

  var id = Context.Options["id"];
  if (id == "-") {
    Game.SSEAdditionalLines = [
      "DLC|271030=Sonic and All-Stars Racing Transformed: Ryo Hazuki",
      "DLC|264600=Sonic and All-Stars Racing Transformed -Yogscast DLC",
      "DLC|229660=Sonic and All-Stars Racing Transformed: Ryo Hazuki",
      "Launcher|InjectDll=1",
      "SmartSteamEmu|SteamIdGeneration=Manual",
      "SmartSteamEmu|ManualSteamId=7656119902312540" + (Context.PlayerID + 1) + "",
      "SmartSteamEmu|StorageOnAppdata=1",
      "SteamApi|SteamClient=15",
      "SteamApi|SteamGameServer=11",
      "SteamApi|SteamScreenshots=2"
    ];
  }
  if (id > 0) {
    Game.SSEAdditionalLines = [
      "DLC|271030=Sonic and All-Stars Racing Transformed: Ryo Hazuki",
      "DLC|264600=Sonic and All-Stars Racing Transformed -Yogscast DLC",
      "DLC|229660=Sonic and All-Stars Racing Transformed: Ryo Hazuki",
      "Launcher|InjectDll=1",
      "SmartSteamEmu|SteamIdGeneration=Manual",
      "SmartSteamEmu|ManualSteamId=765611990231254" + id + "" + (Context.PlayerID + 1) + "",
      "SmartSteamEmu|StorageOnAppdata=1",
      "SteamApi|SteamClient=15",
      "SteamApi|SteamGameServer=11",
      "SteamApi|SteamScreenshots=2"
    ];
  }
};
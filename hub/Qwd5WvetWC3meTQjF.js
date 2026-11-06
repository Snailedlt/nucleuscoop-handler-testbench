Hub.Handler.Version = 10; // Released at https://hub.splitscreen.me/ on Wed Jan 10 2024 07:20:51 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "Qwd5WvetWC3meTQjF";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
var answers2 = ["No", "Yes"];
Game.AddOption("x64 version?", "Select yes if you want to launch the x64 exe instead.", "X64", answers1);
Game.AddOption("Keep aspect ratio?", "Maintains the instances default aspect ratio without filling the monitor/stretching.", "Ratio", answers2);

Game.DirSymlinkExclusions = ["server", "tools\\workshop"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_api64.dll", "steam_appid.txt", "local_save.txt", "xinput1_3.dll", "Wreckfest.exe", "Wreckfest_x64.exe"];
Game.FileSymlinkCopyInstead = ["customWheels.json", "initial_server_config.cfg", "start_server.bat"];
Game.GameName = "Wreckfest";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "Wreckfest.exe";
Game.SteamID = "228380";
Game.GUID = "Wreckfest";
Game.MaxPlayers = 24;
Game.MaxPlayersOneMonitor = 24;
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.LauncherTitle = "";
Game.StartArguments = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Wreckfest 1.282218 32bit DX11";
Game.HasDynamicWindowTitle = true;
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\228380\\local\\wreckfest";
//Game.DocumentsConfigPath = "My Games\\wreckfest";
Game.UserProfileSavePathNoCopy = true;
Game.DocumentsConfigPathNoCopy = true;
Game.Description =
  "The first time you run this you'll get the Wreckfest launcher per instance, just quickly select windowed, the aspect ratio and resolution you want and press play. If you get uneven fps in the instances try alt tabbing to the Nucleus Coop app window when using multiple controllers only. If you launch an instance with the keyboard icon alt-tab to it if you can not control it.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenStarts = 42;

Game.SupportsMultipleKeyboardsAndMice = false;

Game.HookSetCursorPos = true;
Game.HookGetCursorPos = true;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = false;
Game.HookGetKeyboardState = false;
Game.HookFilterRawInput = false;
Game.HookFilterMouseMessages = false;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = false;
Game.ProtoInput.AutoHideTaskbar = false;

Game.SendNormalMouseInput = true;
Game.SendNormalKeyboardInput = false;
Game.SendScrollWheel = false;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;
Game.LockInputAtStart = false;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  if (Context.HasKeyboardPlayer == true) {
    Game.SupportsMultipleKeyboardsAndMice = true;
  } else {
    Game.SupportsMultipleKeyboardsAndMice = true;
    Game.SetForegroundWindowElsewhere = true;
  }

  if (System.IO.File.Exists(Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\settings.conf")) {
    Game.PauseBetweenProcessGrab = 5;
  } else {
    Game.PauseBetweenProcessGrab = 40;
    Game.PromptBetweenInstances = true;
  }

  var x64 = Context.Options["X64"];
  var ratio = Context.Options["Ratio"];

  if (x64 == "Yes") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "Wreckfest_x64.exe"), System.IO.Path.Combine(Context.RootFolder, "Wreckfest.exe"), true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini");
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\XInputPlus.ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll");
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\x64\\xinput1_3.dl_");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (x64 == "No") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "Wreckfest.exe"), System.IO.Path.Combine(Context.RootFolder, "Wreckfest.exe"), true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini");
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\XInputPlus.ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll");
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\x86\\xinput1_3.dl_");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (ratio == "Yes") {
    Game.KeepMonitorAspectRatio = true;
    Game.IgnoreWindowBorderCheck = true;
    Context.HideDesktop();
    Context.HideTaskBar();
  }

  if (ratio == "No") {
  }

  if (Context.IsKeyboardPlayer) {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "0"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "0"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
    ]);
  } else {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", Context.GamepadId)
      //new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", Context.GamepadId),
      //new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", Context.GamepadId),
      //new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", Context.GamepadId),
    ]);
  }
};
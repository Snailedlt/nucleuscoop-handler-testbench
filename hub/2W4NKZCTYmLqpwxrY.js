Hub.Handler.Version = 12; // Released at https://hub.splitscreen.me/ on Tue May 28 2024 14:56:18 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "2W4NKZCTYmLqpwxrY";
Hub.Maintainer.Name = "PoundlandBacon";
Hub.Maintainer.Id = "AdiAjSyfZPMvu3a4M";

var answers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"];
var answers1 = ["No", "Yes"];
var answers2 = ["Manual/Current Settings", "Yes", "No"];
var answers3 = ["60", "50", "45", "40", "30", "200", "144", "90", "0"];
Game.AddOption("Enable music only in the first instance?", '"Manual/Current Settings" will not touch the instances current settings.', "Mus", answers2);
// Game.AddOption('Enable aim assist', 'Use Rip3535\'s custom aim assist for Black Ops 2', 'Aim', answers1);
Game.AddOption("Change graphics settings?", "Allows you to change graphics settings, for all players, in the first instance", "Gra", answers1);
Game.AddOption("PC-ID", "If you are playing with other PCs in LAN, be sure to have different IDs", "Id", answers);
Game.AddOption("Add PC-ID number in nicknames?", "If different nicknames are not set in Nucleus, this will still allow LAN.", "Nik", answers1);
Game.AddOption("Select the FPS Cap the game will use", "", "fps", answers3);
Game.FileSymlinkExclusions = ["binkw32.dll", "t6sp.exe", "t6zm.exe", "hardware_mp.chp", "user_common.cgp"];
Game.DirSymlinkExclusions = ["players"];
Game.BackupFolders = ["players"];
Game.GameName = "Call of Duty Black Ops 2 Multiplayer";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.KeepSymLinkOnExit = false;
Game.ForceSymlink = true;
Game.UseNucleusEnvironment = false;
Game.SupportsKeyboard = false;
Game.ExecutableName = "t6mp.exe";
Game.KillProcessesOnClose = ["END", "cmd"];
Game.LauncherExeIgnoreFileCheck = true;
Game.SteamID = "202970";
Game.GUID = "CallofDutyBlackOps2MP";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.BinariesFolder = "";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = false;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Call of Duty®: Black Ops II - Multiplayer";
Game.HasDynamicWindowTitle = false;
Game.ToggleUnfocusOnInputsLock = true;
Game.SetForegroundWindowElsewhere = true;
Game.DontReposition = false;
Game.NotTopMost = false;
Game.WindowStyleValues = ["0x08000000", /* '0x80000000',*/ "0x40000000", "~0xC00000", "~0x40000", "~0x20000000", "~0x20000", "~0x80000"];
Game.ExtWindowStyleValues = ["~0x00000001", "~0x00000200", "~0x00020000"];
Game.WindowStyleEndChanges = ["~0x08000000", "~0x40000000"];
Game.PauseBetweenStarts = 20;
// Game.PauseBetweenProcessGrab = 5;
Game.PromptAfterFirstInstance = true;
Game.Description =
  "Requires the steam version of the game, it's recommended you have the dlc too. Steam doesn't need to be running when you use the script. \n \nThe game needs to be set to English language for the script to work. You can change this by right clicking the game in your steam library and selecting the properties menu, then selecting the Language tab. Select English from the dropdown menu and the required files will be downloaded. \n \nYour antivirus may delete files the script needs, if the script doesn't work this is the first thing to check. If you find it has deleted files you may need to remove and redownload the script. \n \nThere are two ways to start a game: \n1) The first player starts searching for an online game (it will only find players connected to your local network) after around 7 seconds it will stop searching and start hosting instead, at this point the other players can join by searching the same game mode via the online menu. \n \n2) The first player creates a custom game and then uses the friends menu to send invites to the other players. For invites to work  make sure you set your party to open. \n \nMake sure you press the END key, when all the instances have finished loading, to lock input. Press it again at any time to unlock input. \n \nCredits/Thanks to The Project Nova Team https://projectnova.us/ for the LAN mod, and Pinecone from their forums for his invaluable advice! Script contributors: Rip3535, Pizzo and Zerofox. Also huge thanks to Talos, Ilyaki, Dr.Oldboi and the rest of the SplitScreenDreams discord.";

// OUTDATED OPTIONS, DISABLED TO AVOID CONFLICTS
Game.HookSetCursorPos = false;
Game.HookGetCursorPos = false;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = false;
Game.HookGetKeyboardState = false;
Game.HookFilterRawInput = false;
Game.HookFilterMouseMessages = false;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = false;

Game.SendNormalMouseInput = false;
Game.SendNormalKeyboardInput = false;
Game.SendScrollWheel = false;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;

// REQUIRED FOR MICE/KEYS
Game.SupportsMultipleKeyboardsAndMice = true;
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.InjectStartup = true;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;
Game.ProtoInput.RegisterRawInputHook = true;
Game.ProtoInput.GetRawInputDataHook = false;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = true;
Game.ProtoInput.SetCursorPosHook = true;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.RawInputFilter = true;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = true;
Game.ProtoInput.WindowActvateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = true;
Game.ProtoInput.MouseButtonFilter = true;
Game.ProtoInput.KeyboardButtonFilter = true;
Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;
Game.ProtoInput.EnableFocusMessageLoop = false;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 1000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.BlockedMessages = [0x0008, 0x0006];
Game.ProtoInput.RenameHandlesHook = false;
Game.ProtoInput.RenameHandles = [];
Game.ProtoInput.RenameNamedPipes = [];
Game.LockInputAtStart = false;

// INPUT LOCK/UNLOCK

Game.ProtoInput.OnInputLocked = function() {
  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];
    ProtoInput.DisableMessageBlock(player.ProtoInputInstanceHandle, 0x0006);
    ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, true, true, true);
    System.Threading.Thread.Sleep(1000);
    ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
    ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);
    ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
    ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
    ProtoInput.EnableMessageBlock(player.ProtoInputInstanceHandle, 0x0006);
    ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
  }
};
Game.ProtoInput.OnInputUnlocked = function() {
  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];
    ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
    ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
  }
};

Game.Play = function() {
  Context.CopyScriptFolder(Context.GetFolder(Nucleus.Folder.InstancedGameFolder));

  var gra = Context.Options["Gra"];
  if (gra == "No") {
    Game.PromptAfterFirstInstance = false;
  }
  Context.PatchFile(
    System.IO.Path.Combine(Context.RootFolder, "t6mp.exe"),
    System.IO.Path.Combine(Context.RootFolder, "t6mp.exe"),
    [0x39, 0x8e, 0xe3, 0x3f],
    Context.ConvertToBytes(Context.AspectRatioDecimal)
  );
  if (!System.IO.Directory.Exists(Context.GetFolder(Nucleus.Folder.Documents) + "\\My Mods\\SpecialK\\Global")) {
    var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Mods\\SpecialK\\Global");
    System.IO.Directory.CreateDirectory(filePath);
  }
  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.Documents) + "\\My Mods\\SpecialK\\Global\\osd.ini")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Mods\\SpecialK\\Global\\osd.ini");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Ayria\\Extra\\osd.ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  } else {
    var txtPath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Mods\\SpecialK\\Global\\osd.ini";
    Context.ReplaceLinesInTextFile(txtPath, [Context.FindLineNumberInTextFile(txtPath, "Duration=", Nucleus.SearchType.StartsWith) + "|Duration=0.0"], "utf-8");
  }
  // var aim = Context.Options['Aim'];
  var nik = Context.Options["Nik"];
  var id = Context.Options["Id"];
  // if (aim == 'No') {
  // if (Context.IsKeyboardPlayer != true) {
  if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Ayria\\Plugins\\aimassist.Ayria32")) {
    System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Ayria\\Plugins\\aimassist.Ayria32");
  }
  if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Ayria\\Plugins\\aiming.ini")) {
    System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Ayria\\Plugins\\aiming.ini");
  }
  // }
  // }
  if (nik == "No") {
    var UserName = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Ayria\\Assets\\Platformwrapper\\Username.txt";
    var lines = [Context.Nickname];
    Context.WriteTextFile(UserName, lines);
  }
  if (nik == "Yes") {
    if (id == "1") {
      var UserName = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Ayria\\Assets\\Platformwrapper\\Username.txt";
      var lines = [Context.Nickname];
      Context.WriteTextFile(UserName, lines);
    }
    if (id != "1") {
      var UserName = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Ayria\\Assets\\Platformwrapper\\Username.txt";
      var lines = [Context.Nickname + "(" + id + ")"];
      Context.WriteTextFile(UserName, lines);
    }
  }
  var UserID = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Ayria\\Assets\\Platformwrapper\\UserID.txt";
  var lines = [11111110 + 19 * id + Context.PlayerID];
  Context.WriteTextFile(UserID, lines);
  if (Context.PlayerID == 0) {
    if (!System.IO.Directory.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players")) {
      var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players");
      System.IO.Directory.CreateDirectory(filePath);
    }
    if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\hardware_mp.chp")) {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\hardware_mp.chp");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Ayria\\Extra\\hardware_mp.chp");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }
  } else {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Ayria\\Plugins\\localmp.Aryia32");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Ayria\\Plugins\\localmp.Aryia32");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
    if (!System.IO.Directory.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players")) {
      var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players");
      System.IO.Directory.CreateDirectory(filePath);
    }
    if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\hardware_mp.chp")) {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\hardware_mp.chp");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Ayria\\Extra\\hardware_mp.chp");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }
    if (gra == "Yes") {
      if (System.IO.File.Exists(Context.NucleusFolder + "\\content\\CallofDutyBlackOps2MP\\Instance0\\players\\hardware_mp.chp")) {
        System.IO.File.Copy(
          Context.NucleusFolder + "\\content\\CallofDutyBlackOps2MP\\Instance0\\players\\hardware_mp.chp",
          Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\hardware_mp.chp",
          true
        );
      }
    }
    var mus = Context.Options["Mus"];
    if (mus == "Manual/Current Settings") {
    }
    if (mus == "Yes") {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\user_common.cgp");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Ayria\\Extra\\user_common.cgp.nomusic");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }
    if (mus == "No") {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\user_common.cgp");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Ayria\\Extra\\user_common.cgp.music");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }
  }
  var fps = Context.Options["fps"];
  if (Context.Height < 600) {
    var Height = "600";
  } else {
    var Height = Context.Height;
  }
  if (Context.Width < 800) {
    var Width = "800";
  } else {
    var Width = Context.Width;
  }
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d11.ini";
  Context.ReplaceLinesInTextFile(
    txtPath,
    [
      Context.FindLineNumberInTextFile(txtPath, "OverrideRes=", Nucleus.SearchType.StartsWith) + "|OverrideRes=" + Width + "x" + Height,
      Context.FindLineNumberInTextFile(txtPath, "TargetFPS=", Nucleus.SearchType.StartsWith) + "|TargetFPS=" + fps,
      Context.FindLineNumberInTextFile(txtPath, "BackgroundFPS=", Nucleus.SearchType.StartsWith) + "|BackgroundFPS=" + fps,
      Context.FindLineNumberInTextFile(txtPath, "MinRes=", Nucleus.SearchType.StartsWith) + "|MinRes=" + Width + "x" + Height,
      Context.FindLineNumberInTextFile(txtPath, "MaxRes=", Nucleus.SearchType.StartsWith) + "|MaxRes=" + Width + "x" + Height
    ],
    "utf-8"
  );
  if (Context.IsKeyboardPlayer == true) {
    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Ayria\\Plugins\\aimassist.Ayria32")) {
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Ayria\\Plugins\\aimassist.Ayria32");
    }
    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\aiming.ini")) {
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\aiming.ini");
    }
    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Ayria\\Plugins\\aiming.ini")) {
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Ayria\\Plugins\\aiming.ini");
    }
    var disable0 = "55|DisabledToGame=false";
    var disable1 = "58|DisabledToGame=false";
    var disable2 = "75|DisabledToGame=true";
    var rendback = Context.FindLineNumberInTextFile(txtPath, "RenderInBackground=", Nucleus.SearchType.StartsWith) + "|RenderInBackground=false";
  } else {
    var disable0 = "55|DisabledToGame=true";
    var disable1 = "58|DisabledToGame=true";
    var disable2 = "75|DisabledToGame=false";
    var rendback = Context.FindLineNumberInTextFile(txtPath, "RenderInBackground=", Nucleus.SearchType.StartsWith) + "|RenderInBackground=true";
  }
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d11.ini";
  Context.ReplaceLinesInTextFile(txtPath, [disable0, disable1, disable2, rendback], "utf-8");
  if (Context.IsKeyboardPlayer == true) {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d11.ini";
    Context.ReplaceLinesInTextFile(
      txtPath,
      [
        Context.FindLineNumberInTextFile(txtPath, "ConfineCursor=", Nucleus.SearchType.StartsWith) + "|ConfineCursor=true",
        Context.FindLineNumberInTextFile(txtPath, "UnconfineCursor=", Nucleus.SearchType.StartsWith) + "|UnconfineCursor=false"
      ],
      "utf-8"
    );
  }
  // var DEBUG = Context.ScriptFolder + '\\' + '\\DEBUG.txt';
  // var lines = [CalcWidth2, Height];
  // Context.WriteTextFile(DEBUG, lines);
};
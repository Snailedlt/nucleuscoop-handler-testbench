Hub.Handler.Version = 7; // Released at https://hub.splitscreen.me/ on Sat Dec 28 2024 11:44:50 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "QsaJgmhmanM7YCRMD";
Hub.Maintainer.Name = "Perserveruz";
Hub.Maintainer.Id = "nFAYvHKj75jAFRAgt";

Game.MutexProcessExe = "ffxiv_dx11.exe";
Game.KillMutexType = "Mutant";
Game.KillMutexProcess = ["ffxiv_game_common", "ffxiv_game00"];
Game.PartialMutexSearchProcess = true;
var answers = ["No", "Yes"];
var answers1 = ["Yes", "No"];
var answers2 = ["No", "720p", "1080p"];
var answers3 = ["60", "50", "45", "40", "30", "0"];
//Game.AddOption("First time login/setup?", "Enable process prompts", "log", answers);
Game.AddOption("Apply customized config for low end PCs?", "", "Config", answers);
Game.AddOption("Enable background music only in the first instance?", "", "Music", answers1);
Game.AddOption("Apply 720p or 1080p resolution and fullscreen for low-end PC (no splitscreen)", "", "fullscreen", answers2);
Game.AddOption("Select the FPS Cap the game will use", "", "fps", answers3);
Game.FileSymlinkExclusions = ["XInputPlus.ini", "xinput1_4.dll", "xinput1_3.dll", "d3d11.dll", "d3d11.ini"];
Game.FileSymlinkCopyInstead = ["steam_api.dll", "steam_api64.dll"];
Game.DirSymlinkCopyInstead = ["boot"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.KeepSymLinkOnExit = true;
Game.UseNucleusEnvironment = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "ffxiv_dx11.exe";
Game.LauncherExe = "boot\\ffxivboot64.exe";
Game.BinariesFolder = "game";
Game.SteamID = "39210";
Game.GUID = "Final Fantasy XIV - A Realm Reborn";
Game.GameName = "Final Fantasy XIV - A Realm Reborn";
Game.MaxPlayersOneMonitor = 4;
Game.MaxPlayers = 4;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "FINAL FANTASY XIV";
Game.HookFocus = false;
Game.FakeFocus = false;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.Hook.UseAlpha8CustomDll = false;
//Game.XInputPlusDll = ["XInput1_4.dll"];
//Game.InjectHookXinput = true;
Game.SetTopMostAtEnd = true;
Game.PauseBetweenStarts = 15;
Game.PromptBetweenInstances = true;
Game.ProcessChangesAtEnd = true;
Game.PromptProcessChangesAtEnd = true;
Game.PauseBetweenProcessGrab = 15;
Game.DontRemoveBorders = true;
Game.DontResize = true;
Game.ResetWindows = true;
Game.UserProfileSavePathNoCopy = true;
//Game.UserProfileSavePath = "My Games\\FINAL FANTASY XIV - A Realm Reborn";
Game.DocumentsConfigPath = "My Games\\FINAL FANTASY XIV - A Realm Reborn";
Game.KillProcessesOnClose = ["FFXIVLauncher", "FINAL FANTASY XIV", "ffxivlauncher64"];
Game.Description =
  "DISCLAIMER: I take no responsibility for any account bans, use at your own risk. Personally, I have been testing with trial accounts for a couple of years now and none of them have been banned thus far.\n\nABOUT THIS HANDLER: Allows you to play up to 4 players in split screen on one PC, and supports both controllers and multiple Mice/Keyboards. Each player will need to use their own Square Enix account.\n\nTo get started, search and select the ffxiv_dx11.exe executable through Nucleus Coop - it can be found under your Final Fantasy game folder, then proceed to launch your desired number of instances.\n\nOnce the launcher opens up type in your square enix id/password, login and press play.\n\nOnly once the game instance opens up select ok in the little NucleusCoop prompt window that popped up.\n\nRepeat the same steps for the second/third/fourth instance, once all game instances have opened up press ok in the last NucleusCoop prompt window that popped up to resize/reposition the game instances.\n\nEnjoy!";

Game.SupportsMultipleKeyboardsAndMice = true;

// Deprecated options
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
Game.DrawFakeMouseCursor = false;
Game.DontRemoveBorders = true;
Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = false;
Game.LockInputToggleKey = 0x23;

Game.ProtoInput.RegisterRawInputHook = true;
Game.ProtoInput.GetRawInputDataHook = true;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = true;
Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = true;
Game.ProtoInput.WindowActvateAppFilter = true;
Game.ProtoInput.MouseWheelFilter = false;
Game.ProtoInput.MouseButtonFilter = false;
Game.ProtoInput.KeyboardButtonFilter = true;
Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;

Game.ProtoInput.EnableFocusMessageLoop = false;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 0;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [];
Game.ProtoInput.RenameHandlesHook = false;
Game.ProtoInput.RenameHandles = [];
Game.ProtoInput.RenameNamedPipes = [];

Game.Play = function() {
  //  var log = Context.Options["log"];
  //  if (log == "No") {
  //    Game.PromptBetweenInstances = false;
  //    Game.ProcessChangesAtEnd = false;
  //    Game.PromptProcessChangesAtEnd = false;
  //  }
  //  if (log == "Yes") {
  //    Game.PromptBetweenInstances = true;
  //   Game.ProcessChangesAtEnd = true;
  //    Game.PromptProcessChangesAtEnd = true;
  //  }

  var filePath = Context.EnvironmentPlayer + "\\Documents";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\Documents\\My Games";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\Documents\\My Games\\FINAL FANTASY XIV - A Realm Reborn";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\Documents\\My Mods";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\Documents\\My Mods\\SpecialK";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\Documents\\My Mods\\SpecialK\\Global";
  System.IO.Directory.CreateDirectory(filePath);

  if (!System.IO.File.Exists(Context.EnvironmentPlayer + "\\Documents\\My Games\\FINAL FANTASY XIV - A Realm Reborn\\FFXIV.cfg")) {
    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "Documents\\My Games\\FINAL FANTASY XIV - A Realm Reborn\\FFXIV.cfg");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "FFXIV.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\game\\d3d11.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "d3d11.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\My Mods\\SpecialK\\Global\\osd.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "osd.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\game\\d3d11.ini";
  var dict = ["76|Enable=true"];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\game\\d3d11.ini";
  var dict = [Context.FindLineNumberInTextFile(txtPath, "SlotReassignment=", Nucleus.SearchType.StartsWith) + "|SlotReassignment=" + (Context.GamepadId - 1) + ""];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var Config = Context.Options["Config"];

  if (Config == "Yes") {
    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "Documents\\My Games\\FINAL FANTASY XIV - A Realm Reborn\\FFXIV.cfg");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "FFXIV.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
  if (Config == "No") {
  }

  var fps = Context.Options["fps"];
  var Music = Context.Options["Music"];
  var fullscreen = Context.Options["fullscreen"];
  if (fullscreen == "No") {
    Game.ProtoInput.InjectStartup = false;
    Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
    Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
    Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\game\\d3d11.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "SpecialK64.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var txtPath = Context.EnvironmentPlayer + "\\Documents\\My Games\\FINAL FANTASY XIV - A Realm Reborn\\FFXIV.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "ScreenWidth", Nucleus.SearchType.StartsWith) + "|ScreenWidth	" + Context.Width + "",
      Context.FindLineNumberInTextFile(txtPath, "ScreenHeight", Nucleus.SearchType.StartsWith) + "|ScreenHeight	" + Context.Height + "",
      Context.FindLineNumberInTextFile(txtPath, "ScreenMode", Nucleus.SearchType.StartsWith) + "|ScreenMode	2",
      Context.FindLineNumberInTextFile(txtPath, "FullScreenWidth", Nucleus.SearchType.StartsWith) + "|FullScreenWidth	" + Context.Width + "",
      Context.FindLineNumberInTextFile(txtPath, "FullScreenHeight", Nucleus.SearchType.StartsWith) + "|FullScreenHeight	" + Context.Height + ""
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\game\\d3d11.ini";
    Context.ReplaceLinesInTextFile(
      txtPath,
      [
        Context.FindLineNumberInTextFile(txtPath, "TargetFPS=", Nucleus.SearchType.StartsWith) + "|TargetFPS=" + fps,
        Context.FindLineNumberInTextFile(txtPath, "BackgroundFPS=", Nucleus.SearchType.StartsWith) + "|BackgroundFPS=" + fps,
        Context.FindLineNumberInTextFile(txtPath, "OverrideRes=", Nucleus.SearchType.StartsWith) + "|OverrideRes=" + Context.Width + "x" + Context.Height + "",
        Context.FindLineNumberInTextFile(txtPath, "MinRes=", Nucleus.SearchType.StartsWith) + "|MinRes=" + Context.Width + "x" + Context.Height + "",
        Context.FindLineNumberInTextFile(txtPath, "MaxRes=", Nucleus.SearchType.StartsWith) + "|MaxRes=" + Context.Width + "x" + Context.Height + "",
        Context.FindLineNumberInTextFile(txtPath, "ForceWindowed=", Nucleus.SearchType.StartsWith) + "|ForceWindowed=true"
      ],
      "utf-8"
    );
  }
  if (fullscreen == "720p") {
    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\game\\d3d11.dll")) {
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\game\\d3d11.dll");
    }
    Game.ProtoInput.InjectStartup = false;
    Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
    Game.ProtoInput.InjectRuntime_EasyHookMethod = false;
    Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;
    Game.DontResize = true;
    Game.DontRemoveBorders = true;
    Game.DontReposition = true;
    var txtPath = Context.EnvironmentPlayer + "\\Documents\\My Games\\FINAL FANTASY XIV - A Realm Reborn\\FFXIV.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "ScreenWidth", Nucleus.SearchType.StartsWith) + "|ScreenWidth	1280",
      Context.FindLineNumberInTextFile(txtPath, "ScreenHeight", Nucleus.SearchType.StartsWith) + "|ScreenHeight	720",
      Context.FindLineNumberInTextFile(txtPath, "ScreenMode", Nucleus.SearchType.StartsWith) + "|ScreenMode	1",
      Context.FindLineNumberInTextFile(txtPath, "FullScreenWidth", Nucleus.SearchType.StartsWith) + "|FullScreenWidth	1280",
      Context.FindLineNumberInTextFile(txtPath, "FullScreenHeight", Nucleus.SearchType.StartsWith) + "|FullScreenHeight	720"
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\game\\d3d11.ini";
    Context.ReplaceLinesInTextFile(
      txtPath,
      [
        Context.FindLineNumberInTextFile(txtPath, "TargetFPS=", Nucleus.SearchType.StartsWith) + "|TargetFPS=" + fps,
        Context.FindLineNumberInTextFile(txtPath, "BackgroundFPS=", Nucleus.SearchType.StartsWith) + "|BackgroundFPS=" + fps,
        Context.FindLineNumberInTextFile(txtPath, "OverrideRes=", Nucleus.SearchType.StartsWith) + "|OverrideRes=0x0",
        Context.FindLineNumberInTextFile(txtPath, "MinRes=", Nucleus.SearchType.StartsWith) + "|MinRes=0x0",
        Context.FindLineNumberInTextFile(txtPath, "MaxRes=", Nucleus.SearchType.StartsWith) + "|MaxRes=0x0",
        Context.FindLineNumberInTextFile(txtPath, "ForceWindowed=", Nucleus.SearchType.StartsWith) + "|ForceWindowed=false"
      ],
      "utf-8"
    );
  }

  if (fullscreen == "1080p") {
    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\game\\d3d11.dll")) {
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\game\\d3d11.dll");
    }
    Game.ProtoInput.InjectStartup = false;
    Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
    Game.ProtoInput.InjectRuntime_EasyHookMethod = false;
    Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;
    Game.DontResize = true;
    Game.DontRemoveBorders = true;
    Game.DontReposition = true;
    var txtPath = Context.EnvironmentPlayer + "\\Documents\\My Games\\FINAL FANTASY XIV - A Realm Reborn\\FFXIV.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "ScreenWidth", Nucleus.SearchType.StartsWith) + "|ScreenWidth	1920",
      Context.FindLineNumberInTextFile(txtPath, "ScreenHeight", Nucleus.SearchType.StartsWith) + "|ScreenHeight	1080",
      Context.FindLineNumberInTextFile(txtPath, "ScreenMode", Nucleus.SearchType.StartsWith) + "|ScreenMode	1",
      Context.FindLineNumberInTextFile(txtPath, "FullScreenWidth", Nucleus.SearchType.StartsWith) + "|FullScreenWidth	1920",
      Context.FindLineNumberInTextFile(txtPath, "FullScreenHeight", Nucleus.SearchType.StartsWith) + "|FullScreenHeight	1080"
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\game\\d3d11.ini";
    Context.ReplaceLinesInTextFile(
      txtPath,
      [
        Context.FindLineNumberInTextFile(txtPath, "TargetFPS=", Nucleus.SearchType.StartsWith) + "|TargetFPS=" + fps,
        Context.FindLineNumberInTextFile(txtPath, "BackgroundFPS=", Nucleus.SearchType.StartsWith) + "|BackgroundFPS=" + fps,
        Context.FindLineNumberInTextFile(txtPath, "OverrideRes=", Nucleus.SearchType.StartsWith) + "|OverrideRes=0x0",
        Context.FindLineNumberInTextFile(txtPath, "MinRes=", Nucleus.SearchType.StartsWith) + "|MinRes=0x0",
        Context.FindLineNumberInTextFile(txtPath, "MaxRes=", Nucleus.SearchType.StartsWith) + "|MaxRes=0x0",
        Context.FindLineNumberInTextFile(txtPath, "ForceWindowed=", Nucleus.SearchType.StartsWith) + "|ForceWindowed=false"
      ],
      "utf-8"
    );
  }

  if (Music == "Yes") {
    if (Context.PlayerID == 0) {
      var txtPath = Context.EnvironmentPlayer + "\\Documents\\My Games\\FINAL FANTASY XIV - A Realm Reborn\\FFXIV.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "FPSInActive", Nucleus.SearchType.StartsWith) + "|FPSInActive	0",
        Context.FindLineNumberInTextFile(txtPath, "IsSoundDisable", Nucleus.SearchType.StartsWith) + "|IsSoundDisable	0",
        Context.FindLineNumberInTextFile(txtPath, "IsSoundAlways", Nucleus.SearchType.StartsWith) + "|IsSoundAlways	1",
        Context.FindLineNumberInTextFile(txtPath, "SoundBgm", Nucleus.SearchType.StartsWith) + "|SoundBgm	100",
        Context.FindLineNumberInTextFile(txtPath, "AlwaysInput", Nucleus.SearchType.StartsWith) + "|AlwaysInput	1"
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    } else {
      var txtPath = Context.EnvironmentPlayer + "\\Documents\\My Games\\FINAL FANTASY XIV - A Realm Reborn\\FFXIV.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "FPSInActive", Nucleus.SearchType.StartsWith) + "|FPSInActive	0",
        Context.FindLineNumberInTextFile(txtPath, "IsSoundDisable", Nucleus.SearchType.StartsWith) + "|IsSoundDisable	0",
        Context.FindLineNumberInTextFile(txtPath, "IsSoundAlways", Nucleus.SearchType.StartsWith) + "|IsSoundAlways	1",
        Context.FindLineNumberInTextFile(txtPath, "SoundBgm", Nucleus.SearchType.StartsWith) + "|SoundBgm	0",
        Context.FindLineNumberInTextFile(txtPath, "AlwaysInput", Nucleus.SearchType.StartsWith) + "|AlwaysInput	1"
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }
  }

  if (Music == "No") {
    if (Context.PlayerID == 0) {
      var txtPath = Context.EnvironmentPlayer + "\\Documents\\My Games\\FINAL FANTASY XIV - A Realm Reborn\\FFXIV.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "FPSInActive", Nucleus.SearchType.StartsWith) + "|FPSInActive	0",
        Context.FindLineNumberInTextFile(txtPath, "IsSoundDisable", Nucleus.SearchType.StartsWith) + "|IsSoundDisable	0",
        Context.FindLineNumberInTextFile(txtPath, "IsSoundAlways", Nucleus.SearchType.StartsWith) + "|IsSoundAlways	1",
        Context.FindLineNumberInTextFile(txtPath, "SoundBgm", Nucleus.SearchType.StartsWith) + "|SoundBgm	100",
        Context.FindLineNumberInTextFile(txtPath, "AlwaysInput", Nucleus.SearchType.StartsWith) + "|AlwaysInput	1"
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    } else {
      var txtPath = Context.EnvironmentPlayer + "\\Documents\\My Games\\FINAL FANTASY XIV - A Realm Reborn\\FFXIV.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "FPSInActive", Nucleus.SearchType.StartsWith) + "|FPSInActive	0",
        Context.FindLineNumberInTextFile(txtPath, "IsSoundDisable", Nucleus.SearchType.StartsWith) + "|IsSoundDisable	0",
        Context.FindLineNumberInTextFile(txtPath, "IsSoundAlways", Nucleus.SearchType.StartsWith) + "|IsSoundAlways	1",
        Context.FindLineNumberInTextFile(txtPath, "SoundBgm", Nucleus.SearchType.StartsWith) + "|SoundBgm	100",
        Context.FindLineNumberInTextFile(txtPath, "AlwaysInput", Nucleus.SearchType.StartsWith) + "|AlwaysInput	1"
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }
  }

  if (Context.HasKeyboardPlayer == true) {
    Game.ProtoInput.KeyboardButtonFilter = true;
  } else {
    Game.ProtoInput.KeyboardButtonFilter = false;
  }
  Game.ProtoInput.OnInputLocked = function() {
    if (Context.HasKeyboardPlayer) {
      for (var i = 0; i < PlayerList.Count; i++) {
        var player = PlayerList[i];
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.ClipCursorHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);

        ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 15, true, true, true, true, true);
        ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);
        ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, false);

        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);

        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
        ProtoInput.EnableMessageBlock(player.ProtoInputInstanceHandle, 0x0008);
      }
    }
  };
  Game.ProtoInput.OnInputUnlocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.ClipCursorHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);
      ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, true);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
    }
  };
};
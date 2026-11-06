Hub.Handler.Version = 6; // Released at https://hub.splitscreen.me/ on Sat May 27 2023 00:15:27 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "8MzyqkLztCzTmhQf2";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "Scale", "No"];
Game.AddOption(
  "Edit resolution to match window size?",
  "Fixes stretching in split-screen, set your monitor scale to 100% if you do not see the changes or select Scale if you are using a higher monitor scale.",
  "AR",
  answers1
);

Game.ExecutableContext = ["md"];
Game.KillMutex = ["BLD_MUTEX"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "winmm.dll", "GameLauncher.exe"];
Game.FileSymlinkCopyInstead = ["amd_ags_x64.dll", "KTSLXA2C.dll", "KTSLXA27.dll", "KTSLXA29.dll", "LINKDATA.idx", "LINKDATA_PATCH.idx", "Config.exe"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "DQB2_EU.exe";
Game.SteamID = "1072420";
Game.GUID = "Dragon Quest Builders 2";
Game.GameName = "DRAGON QUEST BUILDERS 2";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "DRAGON QUEST BUILDERS 2";
Game.HookInit = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileSavePath = "Documents\\My Games\\DRAGON QUEST BUILDERS II\\Steam";
//Game.PlayerSteamIDs = ["76561198422152817"];
Game.Description =
  "Co-op unlocks when you complete the first tablet three targets after returning to the first island from Furrowfield. Use the portal to start an online island the other instances can connect to. You can access each instance save from the app, after the first launch click game options/open user profile save path in the UI. If you get uneven fps in the instances try alt tabbing to the Nucleus app window when using multiple gamepads only, the game windows will still remain on top. Open the menu in all instances if the keyboard player can not move the cursor.";
Game.PauseBetweenProcessGrab = 3;
Game.PauseBetweenStarts = 30;

//ProtoInput:

Game.SupportsMultipleKeyboardsAndMice = false;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = false;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = false;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\SQUARE ENIX\\DRAGON QUEST BUILDERS 2\\Graphic Setting", "WindowMode", 2, Nucleus.RegType.DWord);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var nolay = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\disable_overlay.txt";
  var lines = [""];
  Context.WriteTextFile(nolay, lines);

  if (Context.HasKeyboardPlayer == true) {
    Game.PreventWindowDeactivation = true;
    Game.KeyboardPlayerSkipPreventWindowDeactivate = true;

    Game.ProtoInput.RegisterRawInputHook = false;
    Game.ProtoInput.GetRawInputDataHook = false;
    Game.ProtoInput.MessageFilterHook = false;
    Game.ProtoInput.GetCursorPosHook = false;
    Game.ProtoInput.SetCursorPosHook = false;
    Game.ProtoInput.ClipCursorHook = false;
    Game.ProtoInput.RawInputFilter = false;
    Game.ProtoInput.MouseMoveFilter = false;
    Game.ProtoInput.MouseActivateFilter = false;
    Game.ProtoInput.WindowActivateFilter = false;
    Game.ProtoInput.WindowActvateAppFilter = false;
    Game.ProtoInput.MouseWheelFilter = false;
    Game.ProtoInput.MouseButtonFilter = false;
  } else {
    Game.FakeFocus = true;
    Game.FakeFocusInterval = 8000;
    Game.SendFakeFocusMsg = true;
    Game.SetForegroundWindowElsewhere = true;

    Game.ProtoInput.RegisterRawInputHook = true;
    Game.ProtoInput.GetRawInputDataHook = true;
    Game.ProtoInput.MessageFilterHook = true;
    Game.ProtoInput.GetCursorPosHook = true;
    Game.ProtoInput.SetCursorPosHook = true;
    Game.ProtoInput.ClipCursorHook = true;
    Game.ProtoInput.RawInputFilter = true;
    Game.ProtoInput.MouseMoveFilter = false;
    Game.ProtoInput.MouseActivateFilter = true;
    Game.ProtoInput.WindowActivateFilter = false;
    Game.ProtoInput.WindowActvateAppFilter = false;
    Game.ProtoInput.MouseWheelFilter = true;
    Game.ProtoInput.MouseButtonFilter = true;
  }

  var ar = Context.Options["AR"];

  if (ar == "Yes") {
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\SQUARE ENIX\\DRAGON QUEST BUILDERS 2\\Graphic Setting", "Resolution", 6, Nucleus.RegType.DWord);

    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "DQB2_EU.exe"),
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "DQB2_EU.exe"),
      "06 00 00 80 07",
      Context.Width,
      4,
      true
    );

    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "DQB2_EU.exe"),
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "DQB2_EU.exe"),
      "03 00 00 38 04 00",
      Context.Height,
      4,
      true
    );
  }

  if (ar == "Scale") {
    Context.DPIHandling = Nucleus.DPIHandling.InvScaled;

    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\SQUARE ENIX\\DRAGON QUEST BUILDERS 2\\Graphic Setting", "Resolution", 6, Nucleus.RegType.DWord);

    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "DQB2_EU.exe"),
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "DQB2_EU.exe"),
      "06 00 00 80 07",
      Context.Width,
      4,
      true
    );

    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "DQB2_EU.exe"),
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "DQB2_EU.exe"),
      "03 00 00 38 04 00",
      Context.Height,
      4,
      true
    );
  }

  if (ar == "No") {
  }
};
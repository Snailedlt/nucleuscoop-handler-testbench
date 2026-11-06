Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Mon Jun 05 2023 05:29:33 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "takcc74JLtYjx7eji";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
Game.AddOption("Use process picker?", "Select No if you already set the instances to windowed and in the correct res.", "Picker", answers1);

Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "res_config.ini", "local_save.txt", "xinput1_3.dll"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "REResistance.exe";
Game.SteamID = "952070";
Game.GUID = "Resident Evil Resistance";
Game.GameName = "Resident Evil Resistance";
Game.MaxPlayers = 5;
Game.MaxPlayersOneMonitor = 5;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "RESIDENT EVIL RESISTANCE / BIOHAZARD RESISTANCE";
Game.FakeFocus = false;
Game.HookFocus = false;
Game.ResetWindows = true;
Game.SetWindowHookStart = false;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\952070\\remote";
Game.UserProfileSavePathNoCopy = true;
//Game.PlayerSteamIDs = ["76561198134585131","76561198131394153","76561198011792067","76561198043762785"];
Game.Description =
  "On first Nucleus run the game instances will open in fullscreen, change them to windowed in the game graphic settings, select the custom resolution you want there too. After doing that select the REResistance process in Nucleus process picker window, click refresh if you don't see it, do the same for all the instances that open. You need to add custom resolutions in your AMD/Nvidia/Intel panel (for example: 960x1080, 1920x540, 960x540 etc.) for the game to see them. If you get a constant message about being unable to connect to Residentevil.net disable it in the game settings. If you have trouble using the cursor with process picker after the instances have opened disable the lock cursor option in the game control settings for all instances. This is a demanding game so make sure you lower the in-game graphic settings like textures per instance for better performance. You can access each instance saves in the app, after the first launch click game options/open user profile save path in the UI.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenProcessGrab = 1;
Game.PauseBetweenStarts = 40;

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

Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = true;
Game.ProtoInput.SetCursorPosHook = true;
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.GamePlayBeforeGameSetup = true;

Game.Play = function() {
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\res_config.ini");
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("RenderConfig", "PCWindowMode", 0)]);

  if (Context.NumControllers < 5) {
    //>

    Game.ProtoInput.XinputHook = false;
    Game.ProtoInput.UseOpenXinput = false;
    Game.XInputPlusDll = ["xinput1_3.dll"];
  } else {
    Game.ProtoInput.XinputHook = true;
    Game.ProtoInput.UseOpenXinput = true;
  }

  var picker = Context.Options["Picker"];

  if (picker == "Yes") {
    Game.ForceProcessPick = true;
  }

  if (picker == "No") {
    Game.ForceProcessPick = false;
  }
};
Hub.Handler.Version = 5; // Released at https://hub.splitscreen.me/ on Mon Aug 18 2025 01:17:25 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "HJBR8vueFX7JMB3h8";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("Keep aspect ratio?", "Maintains the instances default aspect ratio to avoid stretching in split-screen.", "Ratio", answers1);

Game.ExecutableContext = ["WorkSpace", "Susi.dll"];
Game.DirExclusions = ["settings", "steam_settings"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "dinput8.dll", "xinput1_4.dll"];
Game.DirSymlinkCopyInstead = ["WorkSpace"];
Game.FileSymlinkCopyInstead = ["steam_api.dll", "libeay32.dll", "ssleay32.dll", "Susi.dll", "SWProtection.dll"];
Game.DirSymlinkCopyInsteadIncludeSubFolders = true;
Game.UseNucleusEnvironment = false;
Game.NeedsSteamEmulation = true;
Game.UseGoldberg = false;
Game.GoldbergNoLocalSave = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Main.exe";
Game.SteamID = "633110";
Game.GUID = "Fast Beat Loop Racer GT";
Game.GameName = "FAST BEAT LOOP RACER GT";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.HideTaskbar = false;
Game.HideDesktop = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Fast Beat Loop Racer GT";
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.XInputPlusDll = ["xinput1_4.dll", "Dinput8.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileConfigPath = "AppData\\Roaming\\SmartSteamEmu";
Game.Description = "Connect the instances via the multiplay mode matchmaking. You can change an instance resolution in the game video options, do not use the CTRL+T Nucleus shortcut in splitscreen.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Vibration", "EnableTriggerVibration", true),
    new Nucleus.IniSaveInfo("X2DInput", "EnableX2Dinput", true),
    new Nucleus.IniSaveInfo("X2DInput", "LT", "Z_Axis(+)"),
    new Nucleus.IniSaveInfo("X2DInput", "RT", "Z_Axis(-)"),
    new Nucleus.IniSaveInfo("X2DInput", "ForceFeedBack", true)
  ]);

  if (Context.HasKeyboardPlayer == true) {
  } else {
    Game.SetForegroundWindowElsewhere = true;
  }

  var ratio = Context.Options["Ratio"];

  if (ratio == "Yes") {
    Game.KeepMonitorAspectRatio = true;
    Game.IgnoreWindowBorderCheck = true;
    Context.HideDesktop(true);
  }

  if (ratio == "No") {
  }
};
Hub.Handler.Version = 5; // Released at https://hub.splitscreen.me/ on Fri Apr 19 2024 11:13:35 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "p7ZmhhBZEcmgwdxFM";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["Craftopia_Data"];
Game.DirSymlinkExclusions = ["Craftopia_Data\\Plugins\\x86_64"];
Game.FileSymlinkExclusions = [
  //"steam_api64.dll",
  "steam_appid.txt",
  "xinput1_4.dll"
];
Game.FileSymlinkCopyInstead = ["doorstop_config.ini", "UnityCrashHandler64.exe", "UnityPlayer.dll", "winhttp.dll", "boot.config"];
//Game.LaunchAsDifferentUsers = true;
Game.GameName = "Craftopia";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Craftopia.exe";
Game.SteamID = "1307550";
Game.CreateSteamAppIdByExe = true;
Game.GUID = "Craftopia";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseGoldberg = false;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Craftopia";
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_4.dll"];
Game.Hook.CustomDllEnabled = false;
Game.BlockRawInput = true;
Game.UserProfileSavePath = "AppData\\LocalLow\\PocketPair\\Craftopia\\PPSave";
Game.Description =
  "IMPORTANT: Set your main game to windowed and create different players and worlds before running this, use a different character per instance, do not open the next instance until you have hosted a multiplayer IP game, the first instance will resize correctly after you open the second, join in the other instances using the option join via IP and type 127.0.0.1:8787. Alt-tab between the instances to use the keyboard and make sure the port number is the same. Disable autosave and save manually if you have issues with saving.";
Game.PromptBetweenInstances = true;
Game.PauseBetweenStarts = 40;

Game.Play = function() {
  Context.StartArguments = " -screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\PocketPair\\Craftopia", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\PocketPair\\Craftopia", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\PocketPair\\Craftopia", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\PocketPair\\Craftopia", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);

  var dllPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\UnityPlayer.dll";
  var searchPattern = "57 00 69 00 6E 00 64 00 6F 00 77 00 73 00 2E 00 47 00 61 00 6D 00 69 00 6E 00 67 00 2E 00 49 00 6E 00 70 00 75 00 74 00 2E 00 47 00 61 00 6D 00 65 00 70 00 61 00 64";
  var patchPattern = "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00";
  Context.PatchFileFindPattern(dllPath, dllPath, searchPattern, patchPattern, true);
};
Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Thu Dec 25 2025 01:25:33 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "ztfNYuaAaM6KTC9FM";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["BOKURA_PLANET_Data"];
Game.DirSymlinkExclusions = ["BOKURA_PLANET_Data\\Plugins\\x86_64"];
Game.FileSymlinkExclusions = [
  //"steam_api64.dll",
  "steam_appid.txt"
];
Game.FileSymlinkCopyInstead = ["D3D12Core.dll", "UnityCrashHandler64.exe", "UnityPlayer.dll", "app.info", "boot.config", "globalgamemanagers"];
Game.GameName = "BOKURA: planet";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "BOKURA_PLANET.exe";
Game.CreateSteamAppIdByExe = true;
Game.SteamID = "3126150";
Game.GUID = "BOKURA planet";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 2;
Game.UseGoldberg = false;
Game.HideTaskbar = true;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "BOKURA_PLANET";
Game.HasDynamicWindowTitle = true;
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.SetWindowHookStart = true;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput1_4.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileSavePath = "AppData\\LocalLow\\tokoronyori";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "Steam needs to be opened for the instances to launch correctly. Select the home icon in one instance and use that code to join in the other after selecting the door icon, you can click on an instance or use alt-tab to write with the keyboard, you can also use CTRL+C and CTRL+V to copy and paste the code, if you can not connect make sure the server regions match exactly and are not set to auto, you will need an internet connection.";
Game.PauseBetweenProcessGrab = 1;
Game.PauseBetweenStarts = 20;

Game.Play = function() {
  Context.StartArguments = " -screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\tokoronyori\\BOKURA_PLANET", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\tokoronyori\\BOKURA_PLANET", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\tokoronyori\\BOKURA_PLANET", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\tokoronyori\\BOKURA_PLANET", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\tokoronyori\\BOKURA_PLANET", "Screenmanager Window Position X_h4088080503", Context.PosX, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\tokoronyori\\BOKURA_PLANET", "Screenmanager Window Position Y_h4088080502", Context.PosY, Nucleus.RegType.DWord);

  var dllPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\UnityPlayer.dll";
  var searchPattern = "57 00 69 00 6E 00 64 00 6F 00 77 00 73 00 2E 00 47 00 61 00 6D 00 69 00 6E 00 67 00 2E 00 49 00 6E 00 70 00 75 00 74 00 2E 00 47 00 61 00 6D 00 65 00 70 00 61 00 64";
  var patchPattern = "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00";
  Context.PatchFileFindPattern(dllPath, dllPath, searchPattern, patchPattern, true);

  if (Context.PlayerID == 0) {
  } else {
    var fillPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\BOKURA_PLANET_Data\\globalgamemanagers";
    var base = Context.Nickname;
    var og_Path = "BOKURA_PLANET";
    //Create newPath by rearranging characters from base
    var newPath = og_Path.substring(0, og_Path.length - 3) + base.charAt(0) + base.charAt(base.length - 1) + base.length;

    //Ensure newPath is at least as long as og_Path
    if (newPath.length < og_Path.length) {
      while (newPath.length < og_Path.length) {
        newPath += base.charAt(base.length - 1);
      }
    } else if (og_Path.length < newPath.length) {
      //Ensure og_Path is at least 3 characters long
      newPath = newPath.substring(0, og_Path.length);
    }
    Context.PatchFile(fillPath, fillPath, og_Path, newPath);

    var appInfoPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\BOKURA_PLANET_Data\\app.info";
    Context.PatchFile(appInfoPath, appInfoPath, og_Path, newPath);

    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\tokoronyori\\" + newPath, "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\tokoronyori\\" + newPath, "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\tokoronyori\\" + newPath, "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\tokoronyori\\" + newPath, "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\tokoronyori\\" + newPath, "Screenmanager Window Position X_h4088080503", Context.PosX, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\tokoronyori\\" + newPath, "Screenmanager Window Position Y_h4088080502", Context.PosY, Nucleus.RegType.DWord);
  }
};
Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Thu Nov 06 2025 10:15:52 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "wLZTpqDeZeopF9bAr";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["Dinkum_Data"];
Game.DirSymlinkExclusions = ["Dinkum_Data\\Plugins\\x86_64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "xinput1_3.dll", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = ["D3D12Core.dll", "UnityCrashHandler64.exe", "UnityPlayer.dll", "app.info", "boot.config", "globalgamemanagers"];
Game.GameName = "Dinkum";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "Dinkum.exe";
Game.SteamID = "1062520";
Game.GUID = "Dinkum";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseGoldberg = true;
Game.CreateSteamAppIdByExe = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Dinkum";
Game.HasDynamicWindowTitle = true;
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput1_4.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\LocalLow\\James Bendon";
Game.Description = "Host a LAN game in one instance and join in the others.";
Game.PauseBetweenStarts = 20;

Game.Play = function() {
  Context.StartArguments = " -screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height;

  var dllPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\UnityPlayer.dll";
  var searchPattern = "57 00 69 00 6E 00 64 00 6F 00 77 00 73 00 2E 00 47 00 61 00 6D 00 69 00 6E 00 67 00 2E 00 49 00 6E 00 70 00 75 00 74 00 2E 00 47 00 61 00 6D 00 65 00 70 00 61 00 64";
  var patchPattern = "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00";
  Context.PatchFileFindPattern(dllPath, dllPath, searchPattern, patchPattern, true);

  if (Context.PlayerID == 0) {
  } else {
    var fillPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dinkum_Data\\globalgamemanagers";
    var base = Context.Nickname;
    var og_Path = "Dinkum";
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

    var appInfoPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dinkum_Data\\app.info";
    Context.PatchFile(appInfoPath, appInfoPath, og_Path, newPath);

    if (Context.AspectRatioDecimal < 1.2) {
      Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\James Bendon\\" + newPath, "canvasScale_h1938378453", 0, Nucleus.RegType.DWord);
    } else if (Context.AspectRatioDecimal > 1.8) {
      Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\James Bendon\\" + newPath, "canvasScale_h1938378453", 1, Nucleus.RegType.DWord);
    } else {
      Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\James Bendon\\" + newPath, "canvasScale_h1938378453", 0, Nucleus.RegType.DWord);
    }
  }

  if (Context.AspectRatioDecimal < 1.2) {
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\James Bendon\\Dinkum", "canvasScale_h1938378453", 0, Nucleus.RegType.DWord);
  } else if (Context.AspectRatioDecimal > 1.8) {
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\James Bendon\\Dinkum", "canvasScale_h1938378453", 1, Nucleus.RegType.DWord);
  } else {
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\James Bendon\\Dinkum", "canvasScale_h1938378453", 0, Nucleus.RegType.DWord);
  }
};
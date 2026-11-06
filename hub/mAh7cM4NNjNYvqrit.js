Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Wed Apr 29 2026 00:44:41 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "mAh7cM4NNjNYvqrit";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers2 = ["No", "Yes"];
Game.AddOption(
  "Alternative Xinput hook?",
  "Only use if you are on Windows 11 and the default option is not assigning each gamepad to the correct instance. Remember to disable Steam Input for this game in Steam.",
  "Altx",
  answers2
);

Game.ExecutableContext = ["Hollow Knight Silksong_Data"];
Game.DirSymlinkExclusions = [
  "D3D12",
  "Hollow Knight Silksong_Data\\Plugins\\x86_64",
  "Hollow Knight Silksong_Data\\Managed\\Mods\\Disabled",
  "Hollow Knight Silksong_Data\\Managed\\Mods\\SSMP",
  "BepInEx\\config",
  "BepInEx\\plugins"
];
Game.FileSymlinkExclusions = ["steam_appid.txt", "dinput8.dll", "xinput1_3.dll", "xinput1_4.dll", "chainloader_typeloader.dat", "harmony_interop_cache.dat"];
Game.FileSymlinkCopyInstead = [
  "UnityCrashHandler64.exe",
  "UnityPlayer.dll",
  "D3D12Core.dll",
  "app.info",
  "boot.config",
  "Config.ini",
  "globalgamemanagers",
  "InControlNative.dll",
  "steam_api64.dll",
  "XInputInterface64.dll",
  "Assembly-CSharp.dll",
  "Assembly-CSharp.xml",
  "MMHOOK_Assembly-CSharp.dll",
  "MMHOOK_PlayMaker.dll",
  "authorized.json",
  "banned.json",
  "SimpleSync.cfg",
  "SilklessLib.dll",
  "Silksong_HealthBar.dll",
  "LegacyoftheAbyss.dll",
  "SimpleSync.dll",
  "SilksongCoop.dll",
  "Steamworks.NET.dll",
  "Voicelines.dll",
  "BepInEx.cfg",
  "bergbok.voicelines.cfg",
  "com.Xiaohai.HealthbarAndDamageShow.cfg",
  "doorstop_config.ini",
  "winhttp.dll",
  "LogOutput.log",
  "BouncyCastle.Cryptography.dll",
  "manifest.json",
  "SSMP.dll"
];
Game.GameName = "Hollow Knight: Silksong";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "Hollow Knight Silksong.exe";
Game.SteamID = "1030300";
Game.GUID = "Hollow Knight Silksong";
Game.MaxPlayers = 5;
Game.MaxPlayersOneMonitor = 5;
//Game.PlayersPerInstance = 2;
Game.CreateSteamAppIdByExe = true;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Hollow Knight Silksong";
Game.HasDynamicWindowTitle = true;
Game.SendFakeFocusMsg = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput1_4.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.BlockRawInput = false;
Game.UserProfileSavePath = "AppData\\LocalLow\\Team Cherry";
Game.Description =
  "📝 Important Handler Info:\nTo connect the instances and see other players install the [Silksong Multiplayer mod]{https://github.com/Extremelyd1/SSMP/releases} in your main game files using BepInEx. Select Start Multiplayer in the main menu, select Direct IP and write the port number in the Port field (e.g. 26950) then click start hosting to start the server and select a save, only start a server in one instance, to connect the other instances to the same server write localhost in the IP field, then the same port number as the server, write your nickname and click connect using the mouse cursor, alt-tab between instances to use the keyboard and mouse, pause the game with start or escape in-game if you can not move the mouse cursor to other instances. Disable Steam Input for this game or the gamepads will not restrict correctly.";
Game.PromptBetweenInstances = false;
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenStarts = 30;

//ProtoInput:

Game.SupportsMultipleKeyboardsAndMice = false;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = false;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = false;
Game.LockInputToggleKey = 0x23;

Game.ProtoInput.MessageFilterHook = false;
Game.ProtoInput.FocusHooks = false;
Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseOpenXinput = false;
Game.ProtoInput.MultipleProtoControllers = false;

Game.Play = function() {
  var Args = " -screen-fullscreen 0 -popupwindow" + " -screen-width " + Context.Width + " -screen-height " + Context.Height;

  Context.StartArguments = Args;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Team Cherry\\Hollow Knight Silksong", "Screenmanager Fullscreen mode_h3630240806", 0, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Team Cherry\\Hollow Knight Silksong", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Team Cherry\\Hollow Knight Silksong", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Team Cherry\\Hollow Knight Silksong", "Screenmanager Window Position X_h4088080503", Context.PosX, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Team Cherry\\Hollow Knight Silksong", "Screenmanager Window Position Y_h4088080502", Context.PosY, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Team Cherry\\Hollow Knight Silksong", "VidFullscreen_h2180918881", 2, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Team Cherry\\Hollow Knight Silksong", "NativeInput_h1840871570", 1, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Team Cherry\\Hollow Knight Silksong", "XInput_h3640139883", 1, Nucleus.RegType.DWord);

  var dllPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\UnityPlayer.dll";
  var searchPattern = "57 00 69 00 6E 00 64 00 6F 00 77 00 73 00 2E 00 47 00 61 00 6D 00 69 00 6E 00 67 00 2E 00 49 00 6E 00 70 00 75 00 74 00 2E 00 47 00 61 00 6D 00 65 00 70 00 61 00 64";
  var patchPattern = "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00";
  Context.PatchFileFindPattern(dllPath, dllPath, searchPattern, patchPattern, true);

  if (Context.PlayerID == 0) {
  } else {
    var fillPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Hollow Knight Silksong_Data\\globalgamemanagers";
    var base = Context.Nickname;
    var og_Path = "Hollow Knight Silksong";
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

    var appInfoPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Hollow Knight Silksong_Data\\app.info";
    Context.PatchFile(appInfoPath, appInfoPath, og_Path, newPath);

    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Team Cherry\\" + newPath, "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Team Cherry\\" + newPath, "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Team Cherry\\" + newPath, "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Team Cherry\\" + newPath, "Screenmanager Window Position X_h4088080503", Context.PosX, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Team Cherry\\" + newPath, "Screenmanager Window Position Y_h4088080502", Context.PosY, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Team Cherry\\" + newPath, "VidFullscreen_h2180918881", 2, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Team Cherry\\" + newPath, "NativeInput_h1840871570", 1, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Team Cherry\\" + newPath, "XInput_h3640139883", 1, Nucleus.RegType.DWord);
  }

  //remove 21:9 ar cap
  Context.PatchFileFindAll(
    System.IO.Path.Combine(Context.RootFolder, "Hollow Knight Silksong_Data\\Managed\\Assembly-CSharp.dll"),
    System.IO.Path.Combine(Context.RootFolder, "Hollow Knight Silksong_Data\\Managed\\Assembly-CSharp.dll"),
    [0x11, 0x11, 0x19, 0x40],
    [0x39, 0x8e, 0x63, 0x40]
  );

  var altx = Context.Options["Altx"];

  if (altx == "Yes") {
    Game.PauseBetweenProcessGrab = 1;
    Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
    Game.ProtoInput.XinputHook = true;
    Game.ProtoInput.UseOpenXinput = true;

    System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll");
    System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_4.dll");
  }
  if (altx == "No") {
  }
};
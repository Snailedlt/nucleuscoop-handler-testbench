Hub.Handler.Version = 11; // Released at https://hub.splitscreen.me/ on Wed Apr 29 2026 00:42:54 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "sWgnoTqjmk8M49QML";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
var answers2 = ["No", "Yes"];
Game.AddOption("Letterboxing/Pillarboxing fix?", "Removes the black bars for ultra wide resolutions.", "Pillar", answers1);
Game.AddOption(
  "Alternative Xinput hook?",
  "Only use if you are on Windows 11 and the default option is not assigning each gamepad to the correct instance. Remember to disable Steam Input for this game in Steam.",
  "Altx",
  answers2
);

Game.ExecutableContext = ["hollow_knight_Data"];
Game.DirSymlinkExclusions = ["hollow_knight_Data\\Plugins\\x86_64", "hollow_knight_Data\\Managed\\Mods\\Disabled", "hollow_knight_Data\\Managed\\Mods\\HKMP"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "dinput8.dll", "xinput1_3.dll", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = [
  "D3D12Core.dll",
  "UnityCrashHandler64.exe",
  "UnityPlayer.dll",
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
  "HKMP.dll",
  "HKMP.xml",
  "whitelist.json"
];
Game.GameName = "Hollow Knight";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "hollow_knight.exe";
Game.SteamID = "367520";
Game.GUID = "Hollow Knight";
Game.MaxPlayers = 5;
Game.MaxPlayersOneMonitor = 5;
Game.UseGoldberg = false;
Game.CreateSteamAppIdByExe = true;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Hollow Knight";
Game.HasDynamicWindowTitle = true;
Game.SendFakeFocusMsg = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput1_4.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.BlockRawInput = false;
Game.UserProfileSavePath = "AppData\\LocalLow\\Team Cherry";
Game.Description =
  "IMPORTANT: This handler works best with the Hollow Knight Multiplayer mod by Extremelyd1, make sure you install the HKMP.dll mod using the Lumafly Mod Installer in your main game files first. To connect the instances press start in the first instance and write the port number in the Port field right above connect (e.g. 26950) then click start hosting to start the server, only start a server in one instance, to connect all instances to the same server write localhost in the IP field, then the same port number as the server, write your nickname and click connect using the mouse cursor, do the same in the other instances, alt-tab between instances to use the keyboard. Disable Steam Input for this game in Steam or the gamepads will not restrict correctly.";
Game.PromptBetweenInstances = true;
Game.PauseBetweenStarts = 40;

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
  Context.StartArguments = " -screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Team Cherry\\Hollow Knight", "Screenmanager Fullscreen mode_h3630240806", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Team Cherry\\Hollow Knight", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Team Cherry\\Hollow Knight", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Team Cherry\\Hollow Knight", "NativeInput_h1840871570", 1, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Team Cherry\\Hollow Knight", "XInput_h3640139883", 1, Nucleus.RegType.DWord);

  var dllPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\UnityPlayer.dll";
  var searchPattern = "57 00 69 00 6E 00 64 00 6F 00 77 00 73 00 2E 00 47 00 61 00 6D 00 69 00 6E 00 67 00 2E 00 49 00 6E 00 70 00 75 00 74 00 2E 00 47 00 61 00 6D 00 65 00 70 00 61 00 64";
  var patchPattern = "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00";
  Context.PatchFileFindPattern(dllPath, dllPath, searchPattern, patchPattern, true);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\hollow_knight_Data\\Managed\\Mods\\Disabled");
  System.IO.Directory.CreateDirectory(filePath);

  if (Context.PlayerID == 0) {
  } else {
    var fillPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\hollow_knight_Data\\globalgamemanagers";
    var base = Context.Nickname;
    var og_Path = "Hollow Knight";
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

    var appInfoPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\hollow_knight_Data\\app.info";
    Context.PatchFile(appInfoPath, appInfoPath, og_Path, newPath);

    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Team Cherry\\" + newPath, "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Team Cherry\\" + newPath, "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Team Cherry\\" + newPath, "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Team Cherry\\" + newPath, "NativeInput_h1840871570", 1, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Team Cherry\\" + newPath, "XInput_h3640139883", 1, Nucleus.RegType.DWord);
  }

  var pillar = Context.Options["Pillar"];
  var altx = Context.Options["Altx"];

  if (pillar == "Yes") {
    //remove 21:9 ar cap
    Context.PatchFileFindAll(
      System.IO.Path.Combine(Context.RootFolder, "hollow_knight_Data\\Managed\\Assembly-CSharp.dll"),
      System.IO.Path.Combine(Context.RootFolder, "hollow_knight_Data\\Managed\\Assembly-CSharp.dll"),
      [0x11, 0x11, 0x19, 0x40],
      [0x39, 0x8e, 0x63, 0x40]
    );
  }

  if (pillar == "No") {
  }

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
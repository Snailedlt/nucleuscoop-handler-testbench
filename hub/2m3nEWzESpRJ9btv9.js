Hub.Handler.Version = 7; // Released at https://hub.splitscreen.me/ on Thu Sep 29 2022 23:30:21 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "2m3nEWzESpRJ9btv9";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Default", "pad_start", "pad_back", "rthumb", "lthumb"];
var answers2 = ["Yes", "No"];
Game.AddOption("Map the options menu to a gamepad button?", "This menu is not mappable to any controller button in-game.", "Menu", answers1);
Game.AddOption("Disable bob?", "Disables movement bob to help with motion sickness.", "Bob", answers2);

Game.ExecutableContext = ["megagame.wad", "zandronum.exe", "fmodex64.dll"];
Game.FileSymlinkExclusions = ["autoexec.cfg", "xinput1_3.dll", "xinput1_4.dll", "xinput9_1_0.dll"];
Game.NeedsSteamEmulation = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.HardcopyGame = true;
Game.ExecutableName = "Mega Man 8-Bit Deathmatch.exe";
Game.GUID = "Mega Man 8 bit Deathmatch";
Game.GameName = "Mega Man 8-bit Deathmatch";
Game.MaxPlayers = 32;
Game.MaxPlayersOneMonitor = 32;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.NotTopMost = true;
Game.ProtoInput.AutoHideTaskbar = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "ZANDRONUM";
Game.HasDynamicWindowTitle = true;
Game.WindowStyleValues = ["~0xC00000", "~0x40000", "~0x20000000", "~0x20000", "~0x80000", "0x40000000"];
Game.ExtWindowStyleValues = ["~0x00000001", "~0x00000200", "~0x00020000"];
Game.ResetWindows = true;
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput1_4.dll", "xinput9_1_0.dll"];
Game.InjectHookXinput = false;
Game.SupportsKeyboard = true;
Game.ForceGameArch = "x64";
Game.Hook.CustomDllEnabled = false;
Game.Description =
  "IMPORTANT: Once the first MM8BDM launcher opens go to the Host tab and host a LAN server, then go to the Play tab and start the game, you should join automatically to the server you just created. Close the launcher and minimize the server, then select the zandronum process in the Nucleus process picker window, click refresh if you do not see it, alt-tab between the windows to use the cursor and keyboard, pause in all instances with the escape key to use the cursor correctly otherwise it can get stuck. For the other instances that open just click start in the launcher and they should join the server automatically too, next follow the same steps with process picker and you should be good to go. If you want the instances to resize correctly you need to create custom resolutions in your AMD/Nvidia/Intel panel (For example for a 1920x1080 monitor add: 960x1080, 960x540, 1920x540 etc.) so the game can see them and use them, set your monitor scale to 100% if the instances do not resize correctly. Remember to only map the buttons of your gamepad in-game, if you are using xinput gamepads the sticks should work automatically for movement and camera, do not map them again. Edit this handler with your correct zandronum-Yourusername .ini if the handler is not editing this ini. Your settings/saves per instance are inside Nucleus Co-op content folder in the game instances folders, so be careful if you want to delete the content folder.";
Game.KeepSymLinkOnExit = true;
Game.ForceProcessPick = true;
Game.KillProcessesOnClose = ["zandronum"];
Game.PauseBetweenProcessGrab = 6;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\zandronum-" + Context.UserName + ".ini");
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Doom.AutoExec", "Path", Context.RootFolder + "\\autoexec.cfg"),
    new Nucleus.IniSaveInfo("GlobalSettings", "vid_aspect", 0),
    new Nucleus.IniSaveInfo("GlobalSettings", "vid_nowidescreen", false),
    new Nucleus.IniSaveInfo("GlobalSettings", "vid_defheight", Context.Height),
    new Nucleus.IniSaveInfo("GlobalSettings", "vid_defwidth", Context.Width),
    new Nucleus.IniSaveInfo("GlobalSettings", "use_joystick", true),
    new Nucleus.IniSaveInfo("GlobalSettings", "joy_xinput", true),
    new Nucleus.IniSaveInfo("GlobalSettings", "joy_ps2raw", false),
    new Nucleus.IniSaveInfo("GlobalSettings", "joy_dinput", false),
    new Nucleus.IniSaveInfo("GlobalSettings", "mouse_capturemode", 0),
    new Nucleus.IniSaveInfo("GlobalSettings", "use_mouse", false),
    new Nucleus.IniSaveInfo("GlobalSettings", "k_allowfullscreentoggle", false),
    new Nucleus.IniSaveInfo("GlobalSettings", "fullscreen", false),
    new Nucleus.IniSaveInfo("GlobalSettings", "vid_renderer", 1),
    new Nucleus.IniSaveInfo("Doom.Player", "name", "\\cv" + Context.Nickname + "\\c-"),
    new Nucleus.IniSaveInfo("Doom.Player", "autoaim", "2"),
    new Nucleus.IniSaveInfo("Doom.ConsoleVariables", "sv_maxclientsperip", "16"),
    new Nucleus.IniSaveInfo("Doom.UnknownConsoleVariables", "MM8BDM_ZandronumPath", Context.RootFolder + "\\zandronum.exe"),
    new Nucleus.IniSaveInfo("Doom.UnknownConsoleVariables", "MM8BDM_IWADPath", Context.RootFolder + "\\megagame.wad"),
    new Nucleus.IniSaveInfo("Doom.UnknownConsoleVariables", "MM8BDM_PK3Path", Context.RootFolder + "\\MM8BDM-v6a.pk3")
  ]);

  var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\autoexec.cfg";
  var lines = ["connect localhost"];
  Context.WriteTextFile(autoExec, lines);

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\zandronum-" + Context.UserName + ".ini";
  var dict = [Context.FindLineNumberInTextFile(txtPath, "fullscreen", Nucleus.SearchType.StartsWith) + "|fullscreen=false"];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  if (Context.IsKeyboardPlayer) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\zandronum-" + Context.UserName + ".ini");
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("GlobalSettings", "use_joystick", false),
      new Nucleus.IniSaveInfo("GlobalSettings", "joy_xinput", false),
      new Nucleus.IniSaveInfo("GlobalSettings", "joy_ps2raw", false),
      new Nucleus.IniSaveInfo("GlobalSettings", "joy_dinput", false),
      new Nucleus.IniSaveInfo("GlobalSettings", "use_mouse", true),
      new Nucleus.IniSaveInfo("Doom.Player", "autoaim", "0")
    ]);
  }

  var menu = Context.Options["Menu"];
  var bob = Context.Options["Bob"];

  if (menu == "Default") {
  } else {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\zandronum-" + Context.UserName + ".ini");
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Doom.Bindings", menu, "openmenu mainmenu")]);
  }

  if (bob == "Yes") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\zandronum-" + Context.UserName + ".ini");
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Doom.Player", "stillbob", 0), new Nucleus.IniSaveInfo("Doom.Player", "movebob", 0)]);
  }

  if (bob == "No") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\zandronum-" + Context.UserName + ".ini");
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Doom.Player", "stillbob", 0), new Nucleus.IniSaveInfo("Doom.Player", "movebob", 0.25)]);
  }
};
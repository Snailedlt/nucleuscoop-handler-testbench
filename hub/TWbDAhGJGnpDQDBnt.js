Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sun Dec 25 2022 05:58:18 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "TWbDAhGJGnpDQDBnt";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["binkw32.dll"];
Game.KillMutex = ["MutexLOTRConquest"];
Game.FileSymlinkExclusions = ["dinput8.dll", "xinput1_3.dll", "port_rebinder.dll", "dlls.cfg", "port.ini"];
Game.FileSymlinkCopyInstead = ["GL.ini", "input.xml"];
Game.NeedsSteamEmulation = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Conquest.exe";
Game.GUID = "The Lord of the Rings Conquest";
Game.GameName = "The Lord of the Rings: Conquest";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "The Lord of the Rings: Conquest";
Game.HasDynamicWindowTitle = true;
Game.FakeFocus = true;
Game.FakeFocusInterval = 4000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = true;
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.SupportsKeyboard = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "Documents\\The Lord of the Rings - Conquest";
Game.Description =
  "Select a different in-game profile per instance in the main menu, press X or square in your gamepad to open the change profile menu. Create a LAN game in the first instance and join in the others. In your main game enable the Far Camera option in the game graphics settings and save if you want increased FOV.";
Game.PromptBetweenInstances = false;
Game.PauseBetweenProcessGrab = 16;
Game.PauseBetweenStarts = 35;
Game.GamePlayBeforeGameSetup = true;

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

Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.Documents) + "\\The Lord of the Rings - Conquest\\pc.ini";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "Width", Nucleus.SearchType.StartsWith) + "|Width " + Context.Width,
    Context.FindLineNumberInTextFile(txtPath, "Height", Nucleus.SearchType.StartsWith) + "|Height " + Context.Height,
    Context.FindLineNumberInTextFile(txtPath, "Fullscreen", Nucleus.SearchType.StartsWith) + "|Fullscreen 0",
    Context.FindLineNumberInTextFile(txtPath, "Widescreen", Nucleus.SearchType.StartsWith) + "|Widescreen 1"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  if (Context.PlayerID == 0) {
  } else {
    var id = Context.PlayerID;

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dinput8.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dinput8.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\port_rebinder.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "port_rebinder.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var dlls = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dlls.cfg";
    var lines = ["port_rebinder.dll"];
    Context.WriteTextFile(dlls, lines);

    var ipconfig = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\port.ini";
    Context.ModifySaveFile(ipconfig, ipconfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("MYPORT", "PORT", "235" + id)]);
  }

  if (Context.NumControllers < 5) {
    //>

    Game.ProtoInput.XinputHook = false;
    Game.ProtoInput.UseOpenXinput = false;
    Game.XInputPlusDll = ["xinput1_3.dll"];
  } else {
    Game.ProtoInput.XinputHook = true;
    Game.ProtoInput.UseOpenXinput = true;
  }
};
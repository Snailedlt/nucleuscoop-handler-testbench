Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Wed Mar 20 2024 03:02:24 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "qshqq3JBAdsHDNjhr";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["binkw32.dll"];
Game.DirSymlinkExclusions = ["video"];
Game.FileSymlinkExclusions = ["d3d9.dll", "d3d9.ini", "dinput8.dll", "XInputPlus.ini", "xinput1_3.dll", "xinput1_4.dll", "mc2intro.bik", "rockstar.bik", "sdlogo.bik"];
Game.FileSymlinkCopyInstead = ["assets_p.dat", "mc.pcmap", "mc2patch.c", "mhpatch.c"];
Game.NeedsSteamEmulation = false;
Game.UseSteamless = true;
Game.SteamlessArgs = "--quiet --keepbind";
Game.SteamlessTiming = 4000;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "mc2.exe";
Game.SteamID = "12160";
Game.GUID = "Midnight Club II";
Game.GameName = "Midnight Club II";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Midnight Club II";
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.KeyboardPlayerSkipFakeFocus = true;
Game.HookFocus = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_4.dll", "dinput8.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.Description =
  "IMPORTANT: Use a different save slot/profile per instance, create them in your main game first. To connect the instances go to networking mode, choose the LAN option and host a game in one instance, you can connect in the others by selecting join. If you use a kb instance alt-tab or click on it to control it.";
Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenStarts = 20;

Game.Play = function() {
  Context.BackupFile(Context.OrigRootFolder + "\\userdata\\options.cfg", true);

  var txtPath = Context.OrigRootFolder + "\\userdata\\options.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "ScreenWidth:", Nucleus.SearchType.StartsWith) + "|ScreenWidth: " + Context.Width,
    Context.FindLineNumberInTextFile(txtPath, "ScreenHeight:", Nucleus.SearchType.StartsWith) + "|ScreenHeight: " + Context.Height
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  Context.BackupFile(Context.OrigRootFolder + "\\userdata\\inputdevice_66069.map", true);

  if (Context.PlayerID == 0) {
    var savePath = Context.OrigRootFolder + "\\userdata\\inputdevice_66069.map";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "inputdevice_66069.map");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("KeyAssign", "A", "B"),
    new Nucleus.IniSaveInfo("KeyAssign", "B", "Y"),
    new Nucleus.IniSaveInfo("KeyAssign", "X", "A"),
    new Nucleus.IniSaveInfo("KeyAssign", "Y", "X"),
    new Nucleus.IniSaveInfo("X2DInput", "EnableX2Dinput", true),
    new Nucleus.IniSaveInfo("X2DInput", "LT", "Button11"),
    new Nucleus.IniSaveInfo("X2DInput", "RT", "Button12"),
    new Nucleus.IniSaveInfo("X2DInput", "BACK", "Button8"),
    new Nucleus.IniSaveInfo("X2DInput", "START", "Button7"),
    new Nucleus.IniSaveInfo("X2DInput", "GUIDE", "Button13")
  ]);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "d3d9.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "d3d9.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
};
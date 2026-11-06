Hub.Handler.Version = 9; // Released at https://hub.splitscreen.me/ on Thu Jul 28 2022 05:51:05 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "ivoDijz7uNz4tsyje";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.KillMutex = ["NIOH_MUTEX"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "winmm.dll", "EOSSDK-Win64-Shipping.dll"];
Game.GameName = "Nioh";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "nioh.exe";
Game.SteamID = "485510";
Game.GUID = "Nioh";
Game.MaxPlayers = 3;
Game.MaxPlayersOneMonitor = 4;
Game.UseGoldberg = true;
Game.UseNemirtingasEpicEmu = true;
Game.EpicEmuArgs = false;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Nioh";
Game.HasDynamicWindowTitle = true;
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = true;
Game.ResetWindows = true;
Game.HookInit = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.UserProfileSavePath = "Documents\\KoeiTecmo\\NIOH\\Savedata";
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 40;

//ProtoInput:

Game.SupportsMultipleKeyboardsAndMice = false;

Game.ProtoInput.InjectStartup = true;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = false;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = false;
Game.LockInputToggleKey = 0x23;
Game.ProtoInput.FindWindowHook = true;

Game.Play = function() {
  var path = "%USERPROFILE%\\Documents\\KoeiTecmo\\NIOH\\config.xml";
  Context.ChangeXmlNodeInnerTextValue(path, "//DISP_MODE", "WINDOW");
  //Context.ChangeXmlNodeInnerTextValue(path, "//SCR_REZ", Context.Width + "x" + Context.Height);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\EOSSDK-Win64-Shipping.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "EOSSDK-Win64-Shipping.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  if (!System.IO.File.Exists(Context.OrigRootFolder + "\\steam_api64.dll")) {
    Game.UseGoldberg = false;
  } else {
  }
};
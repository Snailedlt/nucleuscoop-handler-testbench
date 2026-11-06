Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sun Sep 27 2026 02:28:31 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "aYa7RMCpacM2x9prJ";
Hub.Maintainer.Name = "birden";
Hub.Maintainer.Id = "rRycxSn253ZCjQy5C";

Game.FileSymlinkCopyInstead = ["globalgamemanagers"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "Velocity Redux.exe";
Game.GUID = "Velocity Redux";
Game.GameName = "Velocity Redux";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Velocity Redux";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = [];
Game.Description =
  "IMPORTANT: make your main game windowed and dont use vertical split, menus are unusable.\n\nGo into online > enter your nickname > either host or join lobby, to join use IP 127.0.0.1.";
Game.PauseBetweenProcessGrab = 10;
Game.PauseBetweenStarts = 10;

Game.HideTaskbar = true;
Game.SetWindowHook = true;
Game.RefreshWindowAfterStart = true;
Game.UserProfileSavePath = "AppData\\LocalLow\\Team VRX";

Game.ProtoInput.InjectRuntime_EasyHookMethod = true;

Game.ProtoInput.FocusHooks = true;

Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;
Game.ProtoInput.MultipleProtoControllers = false;

Game.ProtoInput.EnableFocusMessageLoop = true;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 15000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008, 0x02a3, 0x02a1]; // Blocks WM_KILLFOCUS, WM_MOUSEHOVER and WM_MOUSELEAVE

Game.Play = function() {
  Context.StartArguments = " -screen-fullscreen 0 -screen-width " + Context.Width + " -screen-height " + Context.Height;

  var fillPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Velocity Redux_Data\\globalgamemanagers";

  var base = Context.Nickname;
  var og_Path = "Velocity Redux";
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
};
Hub.Handler.Version = 5; // Released at https://hub.splitscreen.me/ on Fri Mar 10 2023 08:55:45 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "EjrHSHQQx9LAFHxHm";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var listMaps = [
  { Name: "New Resistance Base", Details: "Default LAN Map. Select the map the LAN server will start with.", Console: "0", ImageUrl: "" },
  { Name: "Dataroom", Details: "", Console: "1", ImageUrl: "" },
  { Name: "Road to Disposal Center", Details: "", Console: "2", ImageUrl: "" }
  //{ Name: "Neo Arcadian Train", Details: "", Console: "3", ImageUrl: "" },
  //{ Name: "Aegis Volcano", Details: "", Console: "4", ImageUrl: "" },
  //{ Name: "Computer Zone", Details: "", Console: "5", ImageUrl: "" },
  //{ Name: "Prison", Details: "", Console: "6", ImageUrl: "" },
  //Commented maps are not working via config yet.
];
var answers1 = ["10", "15", "20", "25", "30", "40", "50", "60"];
Game.AddOption("Score", "Select the score goal.", "Score", answers1);
Game.AddOption("Map", "", "MapID", listMaps);

var MapStep = Game.ShowOptionAsStep("MapID", true, "");

Game.FileSymlinkExclusions = ["dinput8.dll", "xinput1_3.dll", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = ["options.txt"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.KeepSymLinkOnExit = false;
Game.ExecutableName = "MegamanZeroOnlineLegacy0.4.0.2.exe";
Game.GUID = "Megaman Zero Online Legacy";
Game.GameName = "Megaman Zero Online Legacy";
Game.MaxPlayers = 10;
Game.MaxPlayersOneMonitor = 10;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "MMZOnline Legacy 0.4.0.2";
Game.HasDynamicWindowTitle = true;
Game.HookFocus = false;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = true;
Game.Hook.XInputEnabled = true;
Game.SupportsKeyboard = true;
Game.Hook.CustomDllEnabled = false;
//Game.UseDevReorder = true;
Game.Description =
  "IMPORTANT: Host a LAN game in one instance by writing 127.0.0.1 in the IP field then join in the others using the same IP or to change maps host a private game using the find games menu, write the name of the match before selecting the game instance in Nucleus process picker window. Use your main mouse cursor and keyboard to navigate the main menu, to RESTRICT the gamepads correctly click on controls and select only one gamepad per instance, tick all squares in a Joystick for that specific instance, same if you use a keyboard instance, alt-tab to the keyboard instance to control it. This handler also supports dinput gamepads, xinput emulators are not needed. Xbox One gamepads could have issues with background input/focus because of this: http://www.snes9x.com/phpbb3/viewtopic.php?t=27510.";
Game.ForceProcessPick = true;
Game.PauseBetweenProcessGrab = 15;
Game.PauseBetweenStarts = 30;

//ProtoInput:

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = false;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = false;
Game.LockInputToggleKey = 0x23;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.SetWindowPosHook = false;
Game.ProtoInput.SetWindowStyleHook = false;

Game.Play = function() {
  var map = Context.Options["MapID"].Console;
  var score = Context.Options["Score"];

  var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\options.txt");
  Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Gameplay", "Name", Context.Nickname),
    new Nucleus.IniSaveInfo("Gameplay", "Scoregoal", score),
    new Nucleus.IniSaveInfo("Gameplay", "MapID", map)
  ]);
};
Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Mon Aug 10 2026 09:11:18 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "z2XB38s9nkmQAnCef";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.FileSymlinkExclusions = ["steam_appid.txt"];
Game.FileSymlinkCopyInstead = ["steam_api.dll", "Galaxy.dll", "lime.ndll", "modio.dll", "modioWrapperWindows_x86.ndll", "regexp.dll", "std.dll", "systools.ndll", "zlib.dll"];
Game.UseNucleusEnvironment = true;
Game.CreateSteamAppIdByExe = true;
Game.NeedsSteamEmulation = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "Aground.exe";
Game.SteamID = "876650";
Game.GUID = "Aground";
Game.GameName = "Aground";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Aground";
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\Fancy Fish Games\\Aground\\aground";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "Host a multiplayer game in one instance and in the others select join-join other and write localhost in the IP field to connect to the host, use different names. Alt-tab between instances to use the keyboard.";
Game.PauseBetweenStarts = 20;

//ProtoInput:

Game.SupportsMultipleKeyboardsAndMice = false;
Game.SupportsKeyboard = true;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = false;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = false;
Game.LockInputToggleKey = 0x23;
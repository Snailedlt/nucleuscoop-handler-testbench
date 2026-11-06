Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Thu Jul 01 2021 04:58:41 GMT+0000 (UTC).
Hub.Handler.Id = "x4Sg5f3r8sjxs3Z9i";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["modules"];
Game.FileSymlinkExclusions = ["steam_appid.txt"];
Game.FileSymlinkCopyInstead = ["steam_api64.dll", "settings"];
Game.NeedsSteamEmulation = false;
Game.CreateSteamAppIdByExe = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "crea.exe";
Game.SteamID = "280520";
Game.GUID = "Crea";
Game.GameName = "Crea";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Crea";
Game.FakeFocus = true;
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.InjectHookXinput = false;
Game.Description =
  "IMPORTANT: Create the world and characters you will use in your main game before launching this, disable steam input for this game. When an instance opens, in the main menu press select/back in your respective controller to assign that gamepad to that instance, do this for all instances to restrict the gamepads correctly, do not press select/back again after all instances have opened or the gamepad assignment will mess up. To join each other host a server in one instance with the steam host option disabled then the others can join via the add server option, write the name of the host world and type localhost in the IP field. Press the END key in your keyboard to unlock the input and the main cursor when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances.";
Game.PromptBetweenInstances = true;
Game.PauseBetweenStarts = 35;

Game.SupportsMultipleKeyboardsAndMice = true;

Game.HookSetCursorPos = false;
Game.HookGetCursorPos = true;
Game.HookGetKeyState = true;
Game.HookGetAsyncKeyState = true;
Game.HookGetKeyboardState = true;
Game.HookFilterRawInput = false;
Game.HookFilterMouseMessages = false;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = false;

Game.SendNormalMouseInput = true;
Game.SendNormalKeyboardInput = true;
Game.SendScrollWheel = true;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.DrawFakeMouseCursor = false;
Game.LockInputAtStart = true;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\settings";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, '        "x":', Nucleus.SearchType.StartsWith) + '|        "x": ' + Context.Width + ",",
    Context.FindLineNumberInTextFile(txtPath, '        "y":', Nucleus.SearchType.StartsWith) + '|        "y": ' + Context.Height,
    Context.FindLineNumberInTextFile(txtPath, '    "displayMode":', Nucleus.SearchType.StartsWith) + '|    "displayMode": 0,',
    Context.FindLineNumberInTextFile(txtPath, '        "select": "6"', Nucleus.SearchType.StartsWith) + '|        "select": "7",',
    Context.FindLineNumberInTextFile(txtPath, '        "menu": "7"', Nucleus.SearchType.StartsWith) + '|        "menu": "6",',
    Context.FindLineNumberInTextFile(txtPath, '    "xbox_product_id":', Nucleus.SearchType.StartsWith) + '|    "xbox_product_id": ' + Context.PlayerID + ",",
    Context.FindLineNumberInTextFile(txtPath, '        "select": "8"', Nucleus.SearchType.StartsWith) + '|        "select": "9",',
    Context.FindLineNumberInTextFile(txtPath, '        "menu": "9"', Nucleus.SearchType.StartsWith) + '|        "menu": "8",'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);
};
Hub.Handler.Version = 5; // Released at https://hub.splitscreen.me/ on Fri Mar 24 2023 03:43:58 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "THSLWXpAquYkYYZoE";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

//variable used for let the user know if the reroute option is turned on or off. This will be edited when changed.
var status = "KEYBOARDS-MODE";

var answers = ["60", "45", "30", "120", "144", "240", "300"];
var answers2 = ["-", "GAMEPADS-MODE"];
var answers3 = ["Goldberg", "Native-LAN"];
Game.AddOption("Which FPS Cap the game will use?", "", "Fps", answers);
Game.AddOption("Which type of connection you will use?", "Check script's notes for more information.", "Net", answers3);
Game.AddOption("Switch the script compatible input?", 'This will restart Nucleus or at least close it. Current: "' + status + '"', "INPUT", answers2);

//Name of the folders you don't want Nucleuscoop to symlink, only the folders placed here get hardcopied not the files.
Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv147\\Win64", "Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv151\\Win64", "GroundBranch\\Binaries\\Win64"];

Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt"];

Game.NeedsSteamEmulation = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "GroundBranch-Win64-Shipping.exe";
Game.SteamID = "16900";
Game.GUID = "Ground Branch";
Game.GameName = "Ground Branch";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.BinariesFolder = "GroundBranch\\Binaries\\Win64";
Game.LauncherTitle = "";
Game.SupportsPositioning = true;
Game.Hook.CustomDllEnabled = false;
Game.Hook.ForceFocusWindowName = "Ground Branch";
Game.Hook.ForceFocus = false;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.UseDInputBlocker = true;
//Game.XInputPlusDll = ["xinput1_3.dll", "xinput9_1_0.dll"];
Game.PauseBetweenStarts = 35;
Game.PauseBetweenContextAndLaunch = 5;
Game.CreateSteamAppIdByExe = true;
Game.UserProfileConfigPath = "AppData\\Local\\GroundBranch\\Saved\\Config\\WindowsNoEditor";
Game.UserProfileSavePath = "AppData\\Local\\GroundBranch\\Saved\\SaveGames";
Game.UseNucleusEnvironment = true;
Game.FakeFocusSendActivate = false;
Game.KeepSymLinkOnExit = false;
Game.HideTaskbar = true;
Game.GamePlayBeforeGameSetup = true;

//S

Game.HookFocus = true; //Usually helps when you hear the audio only from one instance. Enable or disable the sending of focus messages to each game window at a regular interval. This will help the game on thinking is window is active and not out of focus.
Game.FakeFocus = true; //Enable or disable the sending of focus messages to each game window at a regular interval | default: false
Game.PromptBetweenInstances = true; //Nucleus will show a prompt between each instances for let you decide when start the next one.

//If enable, it will allow multiple Keyboards and Mice to be used as a device input in Nucleus. Before enable it by default, be sure that all works without problems.
Game.SupportsMultipleKeyboardsAndMice = true;

// This will hook the SetCursorPos Windows function which the game may use to set the mouse position.
// This is useful to have on to prevent the game from moving the 'real' Windows mouse cursor around the screen.
Game.HookSetCursorPos = true;
// This will hook the GetCursorPos Windows function which the game may use to get the mouse position.
Game.HookGetCursorPos = true;
// These options hook Windows functions that can be used by the game to detect if keys are down.
// HookGetAsyncKeyState is usually the only one that's needed, but leave the others enabled if there are no problems.
// Some games may conflict with these hooks, so try toggling some of them if keyboard input isn't working properly.
Game.HookGetKeyState = true;
Game.HookGetAsyncKeyState = true;
Game.HookGetKeyboardState = false;
// This filters raw input messages inside the application. This makes sure each instance only receives input for its designated input device.
Game.HookFilterRawInput = true;
// This hook filters many mouse messages to position the mouse cursor and other necessary changes from within the game itself.
// This should almost always be enabled, unless it causes some conflict.
Game.HookFilterMouseMessages = true;
// This is the main switch for legacy input.
Game.HookUseLegacyInput = false;
//Nucleus Coop will hook mouse movement messages and the GetCursorPos function to work around legacy input. Some games only need the GetCursorPos hook and conflict when mouse movement messages are edited. If this is the case, enable this option:
Game.HookDontUpdateLegacyInMouseMsg = false;
// Used for games that toggle the mouse visibility, e.g. hidden in first person movement and visible in menus.
// This shows/hides the fake mouse cursor when the game tries to show/hide the 'real' mouse cursor.
Game.HookMouseVisibility = true;

// This will send the game mouse input via Windows messages.
Game.SendNormalMouseInput = true;
// This sends keyboard input via Windows messages. This is usually all that's needed to get keyboard input working.
Game.SendNormalKeyboardInput = true;
// Use this to send scroll wheel events to the game.
// Some games don't need this, if for example they receive scroll wheel data from raw input.
Game.SendScrollWheel = true;
//In some cases, you may need to forward raw mouse input. This is almost never needed as re-register raw input has the same effect with a much more efficient method. Forwarding input forwards raw input from Nucleus Coop to the game. This has a high CPU usage and many input events will not pass, resulting in choppy movement.
Game.ForwardRawMouseInput = false;
// The same as ForwardRawMouseInput, but for keyboards. Again, this should almost never be used instead of re-register raw input.
Game.ForwardRawKeyboardInput = false;
// This will re-register the game for Windows raw input with the option to receive input while not in the foreground.
// This is important as most games will register to receive raw input only when in the foreground.
Game.HookReRegisterRawInput = true;
Game.HookReRegisterRawInputMouse = true;
Game.HookReRegisterRawInputKeyboard = true;
// This enables the fake mouse cursor to be drawn over the game by Nucleus Coop.
// If the game uses a custom cursor, you will probably not need this option. (This will be obvious if you see the games custom cursor and a fake cursor drawn over it).
// Be aware this is a 'fake' mouse cursor in the sense that Nucleus Coop will fake mouse input to the game via the other options and then the fake mouse cursor is drawn where the game should be responding to mouse input.
// The fake cursor is drawn by creating a large transparent window over the game. This may prevent the game from receiving mouse input from the 'real' Windows cursor. It is sometimes useful to disable this while testing.
Game.DrawFakeMouseCursor = true;
// Once you have finished setting up the input options, enable this to automatically lock input (equivalent to pressing End) once all of the instances have been set up.
// This is usually convenient to leave disabled whilst testing.
Game.LockInputAtStart = true;
// If you need to change the key to toggle input lock, e.g. if the game uses the End key, edit it with this.
// You can find a list of keys and their numbers at https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes
Game.LockInputToggleKey = 0x76;

//F

Game.Description =
  "Script supports multiple keyboards and XInput gamepads but not at the same time. When in 'GAMEPADS-MODE', the keyboard icon shows up only for let change the input mode. It doesn't work completely and the mouse conflicts with the gamepads players, so do not use it for play (*with GAMEPADS-MODE). Wait until the instance is ready, before starting the next one or clicking 'ok' on the last prompt (hook/sends fake messages). You must use the mouse to navigate in menus. When all players are set and ready, you can start hosting a server. There are two type of connections = Goldberg: host a INTERNET server in one instance. When you are in-game, invite the other players through the Goldberg overlay (shift+tab). Native-LAN: host a LAN server in one instance. The other players must join through the console command 'open 127.0.0.1' (For open it, use ~ or *. You will need to click on the gamepad instance to make it work). You will need to map each player's input (the game provides presets). When using multiple keyboards, the mouse scroll wheel and the 'Alt' key will not work. The script automatically restrict the input and if you want to release it press F7.";

Game.Play = function() {
  var input = Context.Options["INPUT"];

  var OneFolderUP = System.IO.Path.Combine(Game.Folder, ".."); // The variable OneFolderUP will return a folder UP of the specified path. Example: var OneFolderUP = System.IO.Path.Combine(Game.Folder, "..");

  if (input == "KEYBOARDS-MODE") {
    var cfgFilePath = OneFolderUP + "\\Ground Branch.js";

    var stat = Context.FindLineNumberInTextFile(cfgFilePath, "var status", Nucleus.SearchType.StartsWith);

    var switchi = Context.FindLineNumberInTextFile(cfgFilePath, "var answers2", Nucleus.SearchType.StartsWith);

    var xinput = Context.FindLineNumberInTextFile(cfgFilePath, "Game.Hook.XInputEnabled", Nucleus.SearchType.StartsWith);

    var xinputplus = Context.FindLineNumberInTextFile(cfgFilePath, "Game.XInputPlusDll", Nucleus.SearchType.StartsWith);

    var key = Context.FindLineNumberInTextFile(cfgFilePath, "Game.SupportsKeyboard", Nucleus.SearchType.StartsWith);

    var keyboard1 = Context.FindLineNumberInTextFile(cfgFilePath, "/*S", Nucleus.SearchType.StartsWith);

    var keyboard2 = Context.FindLineNumberInTextFile(cfgFilePath, "F*/", Nucleus.SearchType.StartsWith);

    Context.ReplaceLinesInTextFile(cfgFilePath, [
      stat + '|var status = "KEYBOARDS-MODE";',
      switchi + '|var answers2 = ["-", "GAMEPADS-MODE"];',
      key + "|Game.SupportsKeyboard = false;",
      xinput + "|Game.Hook.XInputEnabled = false;",
      xinputplus + '|//Game.XInputPlusDll = ["xinput1_3.dll", "xinput9_1_0.dll"];',
      keyboard1 + "|//S",
      keyboard2 + "|//F"
    ]);

    Context.RunAdditionalFiles([Game.Folder + "\\nucleuscloser.bat"], false, 0, false, false);
  }

  if (input == "GAMEPADS-MODE") {
    var cfgFilePath = OneFolderUP + "\\Ground Branch.js";

    var stat = Context.FindLineNumberInTextFile(cfgFilePath, "var status", Nucleus.SearchType.StartsWith);

    var switchi = Context.FindLineNumberInTextFile(cfgFilePath, "var answers2", Nucleus.SearchType.StartsWith);

    var xinput = Context.FindLineNumberInTextFile(cfgFilePath, "Game.Hook.XInputEnabled", Nucleus.SearchType.StartsWith);

    var xinputplus = Context.FindLineNumberInTextFile(cfgFilePath, "//Game.XInputPlusDll", Nucleus.SearchType.StartsWith);

    var key = Context.FindLineNumberInTextFile(cfgFilePath, "Game.SupportsKeyboard", Nucleus.SearchType.StartsWith);

    var keyboard1 = Context.FindLineNumberInTextFile(cfgFilePath, "//S", Nucleus.SearchType.StartsWith);

    var keyboard2 = Context.FindLineNumberInTextFile(cfgFilePath, "//F", Nucleus.SearchType.StartsWith);

    Context.ReplaceLinesInTextFile(cfgFilePath, [
      stat + '|var status = "GAMEPADS-MODE";',
      switchi + '|var answers2 = ["-", "KEYBOARDS-MODE"];',
      key + "|Game.SupportsKeyboard = true;",
      xinput + "|Game.Hook.XInputEnabled = true;",
      xinputplus + '|Game.XInputPlusDll = ["xinput1_3.dll", "xinput9_1_0.dll"];',
      keyboard1 + "|/*S",
      keyboard2 + "|F*/"
    ]);

    Context.RunAdditionalFiles([Game.Folder + "\\nucleuscloser.bat"], false, 0, false, false);
  }

  var net = Context.Options["Net"];

  if (net == "Goldberg") {
    Game.UseGoldberg = true;
    Game.GoldbergExperimental = true;
  } else if (net == "Native-LAN") {
    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv147\\Win64\\steam_api64.dll")) {
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv147\\Win64\\steam_api64.dll");
    }

    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv147\\Win64\\steamclient64.dll")) {
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv147\\Win64\\steamclient64.dll");
    }

    var OriginalGameRootFolder = System.IO.Path.Combine(Context.RootInstallFolder, "..", "..", "..");

    System.IO.File.Copy(
      OriginalGameRootFolder + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv147\\Win64\\steam_api64.dll",
      Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv147\\Win64\\steam_api64.dll",
      true
    );
  }

  if (Player.IsKeyboardPlayer) {
    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\GroundBranch\\Binaries\\Win64\\XinputPlus.ini")) {
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\GroundBranch\\Binaries\\Win64\\XinputPlus.ini");
    }

    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\GroundBranch\\Binaries\\Win64\\Xinput1_3.dll")) {
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\GroundBranch\\Binaries\\Win64\\Xinput1_3.dll");
    }

    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\GroundBranch\\Binaries\\Win64\\xinput9_1_0.dll")) {
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\GroundBranch\\Binaries\\Win64\\xinput9_1_0.dll");
    }
  }

  var Args = (Context.Args = " -windowed -AlwaysFocus -WinX " + Context.Width + " -WinY " + Context.Height + " -ResX= " + Context.Width + " -ResY= " + Context.Height);
  Context.StartArguments = Args;

  var fps = Context.Options["Fps"];

  var savePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\GameUserSettings.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/GroundBranch.GBGameUserSettings", "FrameRateLimit", fps + ".000000")]);

  var savePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\PlayerSettings.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/GroundBranch.GBPlayerSettings", "PlayerName", Player.Nickname)]);
};
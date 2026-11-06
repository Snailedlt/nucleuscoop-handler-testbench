Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Fri Jun 02 2023 00:35:51 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "JhW9hMaeBEPhforN4";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("Keep aspect ratio?", "Maintains the instances default aspect ratio to avoid stretching.", "Ratio", answers1);

Game.ExecutableContext = ["resource"];
Game.DirSymlinkExclusions = ["EasyAntiCheat", "settings"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "winmm.dll", "xinput1_4.dll"];
Game.GameName = "BLACK CLOVER: QUARTET KNIGHTS";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "QuartetKnights.exe";
Game.SteamID = "714080";
Game.GUID = "Black Clover Quartet Knights";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.UseGoldberg = true;
Game.UseSteamless = true;
Game.SteamlessArgs = "--quiet --keepbind";
Game.SteamlessTiming = 5000;
Game.UseEACBypass = true;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Quartet Knights";
Game.SendFakeFocusMsg = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Local\\BANDAI NAMCO Entertainment\\QuartetKnights";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "IMPORTANT: Select online battle (ignore the server not available error message), create a custom room and select recruit players, the room should be visible now for the other instances when you select custom match, you can use bots for the empty slots to start the game. The instances should launch already windowed on first run but if they don't set each instance to windowed in the game settings, also select the resolution you want to improve performance, apply and launch the handler again.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenProcessGrab = 1;
Game.PauseBetweenStarts = 25;

//ProtoInput:

Game.SupportsMultipleKeyboardsAndMice = false;
Game.SupportsKeyboard = true;

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
Game.GamePlayBeforeGameSetup = true;

Game.Play = function() {
  var id = Context.PlayerID + 38;
  var filePath = (Context.filePath = Context.NucleusUserRoot + "\\AppData\\Local\\BANDAI NAMCO Entertainment\\QuartetKnights\\765611990231254" + id + "\\Graphic");
  System.IO.Directory.CreateDirectory(filePath);

  var VideoConfig = Context.NucleusUserRoot + "\\AppData\\Local\\BANDAI NAMCO Entertainment\\QuartetKnights\\765611990231254" + id + "\\Graphic\\GraphicSettings.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Graphic", "_displayMode", "1")]);

  if (Context.HasKeyboardPlayer == true) {
  } else {
    Game.SetForegroundWindowElsewhere = true;
  }

  if (Context.NumControllers < 5) {
    //>

    Game.ProtoInput.XinputHook = false;
    Game.ProtoInput.UseOpenXinput = false;
    Game.XInputPlusDll = ["xinput1_4.dll", "xinput9_1_0.dll"];
  } else {
    Game.ProtoInput.XinputHook = true;
    Game.ProtoInput.UseOpenXinput = true;
  }

  var ratio = Context.Options["Ratio"];

  if (ratio == "Yes") {
    Game.KeepMonitorAspectRatio = true;
    Game.IgnoreWindowBorderCheck = true;
    Context.HideDesktop();
    Context.HideTaskBar();
  }

  if (ratio == "No") {
    Game.ResetWindows = true;
  }
};
Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Fri May 12 2023 08:10:31 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "SmBEp2p7vHJjyStDd";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption(
  "Launch first instance with Steam overlay?",
  "To unlock Steam achievements in the first instance. You won't be able to battle/connect to the other instance but you can make progress in this instance then use the same save for the first instance without this option, read the handler notes for how to move saves. " +
    "IF you use this set your game to windowed and in the correct custom res before launching the other instances.",
  "Steam",
  answers1
);

Game.ExecutableContext = ["Monster Sanctuary_Data"];
Game.DirSymlinkExclusions = ["Monster Sanctuary_Data\\Plugins"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "dinput8.dll", "xinput1_3.dll", "xinput9_1_0.dll"];
Game.GameName = "Monster Sanctuary";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "Monster Sanctuary.exe";
Game.SteamID = "814370";
Game.GUID = "Monster Sanctuary";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 4;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Monster Sanctuary";
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput1_4.dll", "xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.BlockRawInput = false;
Game.DocumentsSavePath = "My Games\\Monster Sanctuary";
Game.Description =
  "IMPORTANT: Launch with Steam opened. Go to the Online Arena inside the Keepers Stronghold to battle the other player, you need to have the rank of Keeper Lancer to enter, create a private game in one instance and join in the other using the room code. If you want the instances to resize correctly you need to create custom resolutions in your AMD/Nvidia/Intel panel (for example if you have a 1920x1080 monitor add resolutions like: 960x1080, 960x540, 1920x540 etc.) so the game can see and use them. You can access each instance save in the app, after the first launch click game options/open documents save path in the UI. You can even copy your main save to all instances there. Your online stats get saved to Nucleus content folder inside the instances folders so be careful about deleting them.";
Game.KeepSymLinkOnExit = true;
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 25;

//USS deprecated options:

Game.SupportsMultipleKeyboardsAndMice = false;

Game.HookSetCursorPos = false;
Game.HookGetCursorPos = false;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = false;
Game.HookGetKeyboardState = false;
Game.HookFilterRawInput = false;
Game.HookFilterMouseMessages = false;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = false;
Game.InjectHookXinput = false;

Game.SendNormalMouseInput = false;
Game.SendNormalKeyboardInput = false;
Game.SendScrollWheel = false;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;

Game.Play = function() {
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\moi rai games\\Monster Sanctuary", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\moi rai games\\Monster Sanctuary", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\moi rai games\\Monster Sanctuary", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\moi rai games\\Monster Sanctuary", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Monster Sanctuary_Data\\Plugins\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Monster Sanctuary_Data\\Plugins\\steam_settings\\stats.txt")) {
    var stats = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Monster Sanctuary_Data\\Plugins\\steam_settings\\stats.txt";
    var lines = ["opponent_rating=int=0"];
    Context.WriteTextFile(stats, lines);
  }

  var id = Context.PlayerID + 8;

  if (!System.IO.File.Exists(Context.NucleusUserRoot + "\\Documents\\My Games\\Monster Sanctuary\\7656119902312543" + id + "\\System\\VideoSettings.xml")) {
    var filePath = (Context.filePath = Context.NucleusUserRoot + "\\Documents\\My Games\\Monster Sanctuary\\7656119902312543" + id + "\\System");
    System.IO.Directory.CreateDirectory(filePath);

    var xml = Context.NucleusUserRoot + "\\Documents\\My Games\\Monster Sanctuary\\7656119902312543" + id + "\\System\\VideoSettings.xml";
    var lines = [
      '<?xml version="1.0"?>',
      '<VideoOptionsSaveGameData xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">',
      "  <ScreenMode>2</ScreenMode>",
      "  <ResolutionWidth>1920</ResolutionWidth>",
      "  <ResolutionHeight>1080</ResolutionHeight>",
      "  <ResolutionRefreshRate>0</ResolutionRefreshRate>",
      "</VideoOptionsSaveGameData>"
    ];
    Context.WriteTextFile(xml, lines);
  } else {
  }

  var path = Context.NucleusUserRoot + "\\Documents\\My Games\\Monster Sanctuary\\7656119902312543" + id + "\\System\\VideoSettings.xml";
  Context.ChangeXmlNodeInnerTextValue(path, "//ScreenMode", "0");
  Context.ChangeXmlNodeInnerTextValue(path, "//ResolutionWidth", Context.Width);
  Context.ChangeXmlNodeInnerTextValue(path, "//ResolutionHeight", Context.Height);

  var steam = Context.Options["Steam"];

  if (steam == "Yes") {
    Game.PromptAfterFirstInstance = true;

    if (Context.PlayerID == 0) {
      Game.SupportsMultipleKeyboardsAndMice = true;
      Game.InjectHookXinput = true;
      Game.RefreshWindowAfterStart = true;

      var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "Monster Sanctuary_Data\\Plugins\\steam_api64.dll");
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Monster Sanctuary_Data\\Plugins\\steam_api64.dll");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_appid.txt");
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll");
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_4.dll");
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput9_1_0.dll");
    } else {
      Game.SupportsMultipleKeyboardsAndMice = false;
      Game.InjectHookXinput = false;
      Game.RefreshWindowAfterStart = false;

      var Args = (Context.Args = " -screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height);

      Context.StartArguments = Args;

      var appid = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_appid.txt";
      var lines = ["814370"];
      Context.WriteTextFile(appid, lines);
    }
  }

  if (steam == "No") {
    var Args = (Context.Args = " -screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height);

    Context.StartArguments = Args;

    var appid = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_appid.txt";
    var lines = ["814370"];
    Context.WriteTextFile(appid, lines);
  }
};
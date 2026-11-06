Hub.Handler.Version = 13; // Released at https://hub.splitscreen.me/ on Tue Jul 18 2023 20:36:19 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "PXjfPSTkww4XNw3yH";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["no change", "low", "medium", "high", "max"];
var answers2 = ["no change", "30", "60", "120"];
var answers3 = ["no change", "100", "50"];
var answers4 = ["no change", "LOW", "MIDDLE", "HIGH"];
var answers5 = ["1", "2"];

Game.AddOption("Change graphics settings?", "Can improve performance at the cost of visual quality.", "preset", answers1);
Game.AddOption("Set a framerate(fps) limit?", "Can improve performance at the cost of responsiveness.", "fps", answers2);
Game.AddOption("Change the resolution scale?", "Can improve performance at the cost of visual clarity.", "resscale", answers3);
Game.AddOption("Change the texture quality?", "Reduce the gpu's Vram usage, if the game stutters too much set this to low.", "texture", answers4);
Game.AddOption("PC-ID", "Enables lan play between 2 PCs, make sure each pc is set with a different id, your savegame is tied to you pc-id", "pcid", answers5);

Game.KillMutex = ["FF_ORIGIN_MUTEX"];
Game.FileSymlinkExclusions = ["EOSSDK-Win64-Shipping.dll", "xinput1_3.dll"];
Game.Description =
  "***FIXED Desync and lobby connection issues *** Tested with the latest version of the game from epic store(1.04) - this game is very heavy on the cpu and the vram, low your settings and limit your fps to 30 for better performance, low texture is recommended,the first time you launch the game make sure to get to the title screen before the windows resize, otherwise you will have to start it again, to connect the instances you have to finish the tutorial, play until you are in the world map, press start then go to the online menu with rb, select create a room, join in the other instances, to even out fps alt tab to the nucleus window.To play with keyboard and mouse wait until all instances opens and press the END key to lock the inputs, click a couple of times for the cursor to show on your screen, to hide or show the cursor use the home key if you cant ighlight options in the menu use the SendScrollWheel so select them.";
Game.GameName = "STRANGER OF PARADISE FINAL FANTASY ORIGIN";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "SOPFFO.exe";
Game.GUID = "STRANGER OF PARADISE FINAL FANTASY ORIGIN";
Game.SteamID = "1358700";
Game.MaxPlayers = 3;
Game.MaxPlayersOneMonitor = 4;
Game.UseGoldberg = true;
Game.UseNemirtingasEpicEmu = true;
Game.EpicEmuArgs = false;
Game.UseSteamless = true;
Game.SteamlessArgs = "--quiet --keepbind";
Game.SteamlessTiming = 5000;
Game.LauncherTitle = "";
Game.UserProfileSavePath = "Documents\\My Games\\STRANGER OF PARADISE FINAL FANTASY ORIGIN";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "STRANGER OF PARADISE FINAL FANTASY ORIGIN";
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenProcessGrab = 6;
Game.PauseBetweenStarts = 10;

//USS deprecated options:

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
Game.SendNormalMouseInput = false;
Game.SendNormalKeyboardInput = false;
Game.SendScrollWheel = false;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;

//ProtoInput

Game.SupportsMultipleKeyboardsAndMice = true;

Game.ProtoInput.InjectStartup = true;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;
Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = true;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = true;
Game.LockInputToggleKey = 0x23;
Game.ProtoInput.RenameHandlesHook = false;
Game.ProtoInput.RenameHandles = [];
Game.ProtoInput.RenameNamedPipes = [];
Game.ProtoInput.RegisterRawInputHook = true;
Game.ProtoInput.GetRawInputDataHook = true;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = true;
Game.ProtoInput.SetCursorPosHook = true;
Game.ProtoInput.GetKeyStateHook = true;
Game.ProtoInput.GetAsyncKeyStateHook = true;
Game.ProtoInput.GetKeyboardStateHook = true;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = true;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = true;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.DontShowCursorWhenImageUpdated = true;
Game.ProtoInput.SetWindowPosHook = false;
Game.ProtoInput.SetWindowStyleHook = false;
Game.ProtoInput.FindWindowHook = true;
Game.ProtoInput.RawInputFilter = true;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = true;
Game.ProtoInput.WindowActivateFilter = true;
Game.ProtoInput.WindowActvateAppFilter = true;
Game.ProtoInput.MouseWheelFilter = true;
Game.ProtoInput.MouseButtonFilter = true;
Game.ProtoInput.KeyboardButtonFilter = true;
Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = false;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;
Game.ProtoInput.EnableFocusMessageLoop = true;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 10000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS

Game.Play = function() {
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\EOSSDK-Win64-Shipping.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "EOSSDK-Win64-Shipping.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  if (System.IO.File.Exists(Context.OrigRootFolder + "\\steam_api64.dll")) {
  } else {
    Game.UseGoldberg = false;
  }

  var pcid = Context.Options["pcid"];
  var steamid = "";
  var epicid = "";
  var prodid = "";
  var playerUser = Context.Nickname;

  switch (true) {
    case pcid == "1" && Context.PlayerID == 0:
      epicid = "695c2115507b547c132912dc7e677f69";
      steamid = "76561199023125438";
      prodid = "892abfc7554d77a33751ada9aa37a915";
      break;
    case pcid == "1" && Context.PlayerID == 1:
      epicid = "695c21155004547c132911dc7e677f69";
      steamid = "76561199023125439";
      prodid = "f731bfc7554d76a33752ada9aa37ae43";
      break;
    case pcid == "1" && Context.PlayerID == 2:
      epicid = "695c21155005547c132910dc7e677f69";
      steamid = "76561199023125440";
      prodid = "f431bfc7554d71a33753ada9aa37ae42";
      break;
    case pcid == "2" && Context.PlayerID == 0:
      epicid = "695c2215507b547c132912dc7e687f69";
      prodid = "882abfc7554d76a33752ada9aa37a96a";
      playerUser = "pc2-" + Context.Nickname;
      break;
    case pcid == "2" && Context.PlayerID == 1:
      epicid = "695c22155004547c132911dc7e687f69";
      prodid = "f631bfc7554d77a33751ada9aa37ae3c";
      playerUser = "pc2-" + Context.Nickname;
      break;
    case pcid == "2" && Context.PlayerID == 2:
      prodid = "f531bfc7554d70a33750ada9aa37ae3d";
      epicid = "695c22155005547c132910dc7e687f69";
      playerUser = "pc2-" + Context.Nickname;
      break;
  }

  Context.startArguments +=
    "-AUTH_LOGIN=unused -AUTH_PASSWORD=cdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcd -AUTH_TYPE=exchangecode -epicapp=STRANGEROFPARADISEFINALFANTASYORIGIN -epicenv=Prod -EpicPortal -epiclocale=en -epicusername=" +
    playerUser +
    " -epicuserid=" +
    epicid +
    " ";

  var path = Context.NucleusUserRoot + "\\Documents\\My Games\\STRANGER OF PARADISE FINAL FANTASY ORIGIN\\EOS\\" + epicid + "\\config.xml";

  if (!System.IO.File.Exists(path)) {
    var dir = Context.NucleusUserRoot + "\\Documents\\My Games\\STRANGER OF PARADISE FINAL FANTASY ORIGIN\\EOS\\" + epicid + "";
    System.IO.Directory.CreateDirectory(dir);
    var lines = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      "<settings>",
      "<CONFIG_TYPE>CUSTOM</CONFIG_TYPE>",
      "<FPS>30</FPS>",
      "<DISP_MODE>WINDOW</DISP_MODE>",
      "<SCR_REZ>1920x1080</SCR_REZ>",
      "<VSYNC>ON</VSYNC>",
      "<REN_REZ>70%</REN_REZ>",
      "<ANTI_ALIAS>OFF</ANTI_ALIAS>",
      "<SHADOW_QUAL>LOW</SHADOW_QUAL>",
      "<SHADOW_DIST>SHORT</SHADOW_DIST>",
      "<DYNAMIC_FRAME>OFF</DYNAMIC_FRAME>",
      "<TEXTURE_QUAL>LOW</TEXTURE_QUAL>",
      "<RT_REF>OFF</RT_REF>",
      "<AO>ON</AO>",
      "<MOT_BLUR>ON</MOT_BLUR>",
      "<CHROMA_ABERRATION>ON</CHROMA_ABERRATION>",
      "<VRAM_MONITOR>OFF</VRAM_MONITOR>",
      "</settings>"
    ];
    Context.WriteTextFile(path, lines);
  }

  var pathst = Context.NucleusUserRoot + "\\Documents\\My Games\\STRANGER OF PARADISE FINAL FANTASY ORIGIN\\Steam\\" + steamid + "\\config.xml";

  if (!System.IO.File.Exists(pathst)) {
    var dir = Context.NucleusUserRoot + "\\Documents\\My Games\\STRANGER OF PARADISE FINAL FANTASY ORIGIN\\Steam\\" + steamid + "";
    System.IO.Directory.CreateDirectory(dir);
    var lines = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      "<settings>",
      "<CONFIG_TYPE>CUSTOM</CONFIG_TYPE>",
      "<FPS>30</FPS>",
      "<DISP_MODE>WINDOW</DISP_MODE>",
      "<SCR_REZ>1920x1080</SCR_REZ>",
      "<VSYNC>ON</VSYNC>",
      "<REN_REZ>70%</REN_REZ>",
      "<ANTI_ALIAS>OFF</ANTI_ALIAS>",
      "<SHADOW_QUAL>LOW</SHADOW_QUAL>",
      "<SHADOW_DIST>SHORT</SHADOW_DIST>",
      "<DYNAMIC_FRAME>OFF</DYNAMIC_FRAME>",
      "<TEXTURE_QUAL>LOW</TEXTURE_QUAL>",
      "<RT_REF>OFF</RT_REF>",
      "<AO>ON</AO>",
      "<MOT_BLUR>ON</MOT_BLUR>",
      "<CHROMA_ABERRATION>ON</CHROMA_ABERRATION>",
      "<VRAM_MONITOR>OFF</VRAM_MONITOR>",
      "</settings>"
    ];
    Context.WriteTextFile(pathst, lines);
  }

  var jsonPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\nepice_settings\\NemirtingasEpicEmu.json";
  var jsonPath2 = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\NemirtingasEpicEmu.json";
  var params = [
    "{",
    '  "username": ' + '"' + playerUser + '"' + ",",
    '  "log_level": "off",',
    '  "language": ' + '"' + Context.EpicLang + '"' + ",",
    //'  "epicid": "'+epicid+PlayerNumber+'",',
    '  "epicid": ' + '"' + epicid + '"' + ",", //player 1 from id-1
    '  "productuserid": ' + '"' + prodid + '"' + ",",
    '  "appid": "STRANGEROFPARADISEFINALFANTASYORIGIN",',
    '  "disable_online_networking": false,',
    '  "enable_overlay": true,',
    '  "enable_lan": true,',
    '  "unlock_dlcs": true,',
    //'  "log_level": true,',
    //'  "savepath": "appdata",',
    '  "signaling_servers": []',
    "}"
  ];
  Context.WriteTextFile(jsonPath, params);
  Context.WriteTextFile(jsonPath2, params);

  var preset = Context.Options["preset"];
  var fps = Context.Options["fps"];
  var resscale = Context.Options["resscale"];
  var texture = Context.Options["texture"];

  Context.ChangeXmlNodeInnerTextValue(path, "//CONFIG_TYPE", "CUSTOM");
  Context.ChangeXmlNodeInnerTextValue(path, "//DISP_MODE", "WINDOW");
  Context.ChangeXmlNodeInnerTextValue(path, "//DYNAMIC_FRAME", "ON");

  Context.ChangeXmlNodeInnerTextValue(pathst, "//CONFIG_TYPE", "CUSTOM");
  Context.ChangeXmlNodeInnerTextValue(pathst, "//DISP_MODE", "WINDOW");
  Context.ChangeXmlNodeInnerTextValue(pathst, "//DYNAMIC_FRAME", "ON");

  if (resscale != "no change") {
    Context.ChangeXmlNodeInnerTextValue(path, "//REN_REZ", resscale + "%");

    Context.ChangeXmlNodeInnerTextValue(pathst, "//REN_REZ", resscale + "%");
  }

  if (fps != "no change") {
    Context.ChangeXmlNodeInnerTextValue(path, "//FPS", fps);

    Context.ChangeXmlNodeInnerTextValue(pathst, "//FPS", fps);
  }

  if (texture != "no change") {
    Context.ChangeXmlNodeInnerTextValue(path, "//TEXTURE_QUAL", texture);

    Context.ChangeXmlNodeInnerTextValue(pathst, "//FPS", fps);
  }

  switch (preset) {
    case "no change":
      break;
    case "low":
      Context.ChangeXmlNodeInnerTextValue(path, "//ANTI_ALIAS", "ON");
      Context.ChangeXmlNodeInnerTextValue(path, "//SHADOW_QUAL", "LOW");
      Context.ChangeXmlNodeInnerTextValue(path, "//SHADOW_DIST", "SHORT");
      Context.ChangeXmlNodeInnerTextValue(path, "//RT_REF", "OFF");
      Context.ChangeXmlNodeInnerTextValue(path, "//AO", "OFF");
      Context.ChangeXmlNodeInnerTextValue(path, "//MOT_BLUR", "OFF");
      Context.ChangeXmlNodeInnerTextValue(path, "//CHROMA_ABERRATION", "OFF");

      Context.ChangeXmlNodeInnerTextValue(pathst, "//ANTI_ALIAS", "ON");
      Context.ChangeXmlNodeInnerTextValue(pathst, "//SHADOW_QUAL", "LOW");
      Context.ChangeXmlNodeInnerTextValue(pathst, "//SHADOW_DIST", "SHORT");
      Context.ChangeXmlNodeInnerTextValue(pathst, "//RT_REF", "OFF");
      Context.ChangeXmlNodeInnerTextValue(pathst, "//AO", "OFF");
      Context.ChangeXmlNodeInnerTextValue(pathst, "//MOT_BLUR", "OFF");
      Context.ChangeXmlNodeInnerTextValue(pathst, "//CHROMA_ABERRATION", "OFF");
      break;
    case "medium":
      Context.ChangeXmlNodeInnerTextValue(path, "//ANTI_ALIAS", "ON");
      Context.ChangeXmlNodeInnerTextValue(path, "//SHADOW_QUAL", "MIDDLE");
      Context.ChangeXmlNodeInnerTextValue(path, "//SHADOW_DIST", "SHORT");
      Context.ChangeXmlNodeInnerTextValue(path, "//RT_REF", "OFF");
      Context.ChangeXmlNodeInnerTextValue(path, "//AO", "OFF");
      Context.ChangeXmlNodeInnerTextValue(path, "//MOT_BLUR", "ON");
      Context.ChangeXmlNodeInnerTextValue(path, "//CHROMA_ABERRATION", "ON");

      Context.ChangeXmlNodeInnerTextValue(pathst, "//ANTI_ALIAS", "ON");
      Context.ChangeXmlNodeInnerTextValue(pathst, "//SHADOW_QUAL", "MIDDLE");
      Context.ChangeXmlNodeInnerTextValue(pathst, "//SHADOW_DIST", "SHORT");
      Context.ChangeXmlNodeInnerTextValue(pathst, "//RT_REF", "OFF");
      Context.ChangeXmlNodeInnerTextValue(pathst, "//AO", "OFF");
      Context.ChangeXmlNodeInnerTextValue(pathst, "//MOT_BLUR", "ON");
      Context.ChangeXmlNodeInnerTextValue(pathst, "//CHROMA_ABERRATION", "ON");
      break;
    case "high":
      Context.ChangeXmlNodeInnerTextValue(path, "//ANTI_ALIAS", "ON");
      Context.ChangeXmlNodeInnerTextValue(path, "//SHADOW_QUAL", "MIDDLE");
      Context.ChangeXmlNodeInnerTextValue(path, "//SHADOW_DIST", "NORMAL");
      Context.ChangeXmlNodeInnerTextValue(path, "//RT_REF", "OFF");
      Context.ChangeXmlNodeInnerTextValue(path, "//AO", "ON");
      Context.ChangeXmlNodeInnerTextValue(path, "//MOT_BLUR", "ON");
      Context.ChangeXmlNodeInnerTextValue(path, "//CHROMA_ABERRATION", "ON");

      Context.ChangeXmlNodeInnerTextValue(pathst, "//ANTI_ALIAS", "ON");
      Context.ChangeXmlNodeInnerTextValue(pathst, "//SHADOW_QUAL", "MIDDLE");
      Context.ChangeXmlNodeInnerTextValue(pathst, "//SHADOW_DIST", "NORMAL");
      Context.ChangeXmlNodeInnerTextValue(pathst, "//RT_REF", "OFF");
      Context.ChangeXmlNodeInnerTextValue(pathst, "//AO", "ON");
      Context.ChangeXmlNodeInnerTextValue(pathst, "//MOT_BLUR", "ON");
      Context.ChangeXmlNodeInnerTextValue(pathst, "//CHROMA_ABERRATION", "ON");
      break;
    case "max":
      Context.ChangeXmlNodeInnerTextValue(path, "//ANTI_ALIAS", "ON");
      Context.ChangeXmlNodeInnerTextValue(path, "//SHADOW_QUAL", "HIGH");
      Context.ChangeXmlNodeInnerTextValue(path, "//SHADOW_DIST", "LONG");
      Context.ChangeXmlNodeInnerTextValue(path, "//RT_REF", "ON");
      Context.ChangeXmlNodeInnerTextValue(path, "//AO", "ON");
      Context.ChangeXmlNodeInnerTextValue(path, "//MOT_BLUR", "ON");
      Context.ChangeXmlNodeInnerTextValue(path, "//CHROMA_ABERRATION", "ON");

      Context.ChangeXmlNodeInnerTextValue(pathst, "//ANTI_ALIAS", "ON");
      Context.ChangeXmlNodeInnerTextValue(pathst, "//SHADOW_QUAL", "HIGH");
      Context.ChangeXmlNodeInnerTextValue(pathst, "//SHADOW_DIST", "LONG");
      Context.ChangeXmlNodeInnerTextValue(pathst, "//RT_REF", "ON");
      Context.ChangeXmlNodeInnerTextValue(pathst, "//AO", "ON");
      Context.ChangeXmlNodeInnerTextValue(pathst, "//MOT_BLUR", "ON");
      Context.ChangeXmlNodeInnerTextValue(pathst, "//CHROMA_ABERRATION", "ON");
      break;
  }

  Context.ChangeXmlNodeInnerTextValue(path, "//SCR_REZ", "3440x1440");

  Context.ChangeXmlNodeInnerTextValue(pathst, "//SCR_REZ", "3440x1440");

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dinput8.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dsound.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\SUWSF.asi");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "SUWSF.asi");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\SUWSF.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "SUWSF.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var VideoConfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\SUWSF.ini");
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("UserSettings", "Resolution", '"' + Context.Width + "x" + Context.Height + '"'),
    new Nucleus.IniSaveInfo("UserSettings", "Enabled", "true"),
    new Nucleus.IniSaveInfo("Patch:AspectRatio", "Enabled", "false"),
    new Nucleus.IniSaveInfo("Patch:Height", "Enabled", "true"),
    new Nucleus.IniSaveInfo("Patch:Height", "Pattern", '"00 00 A0 05 00 00 00"'),
    new Nucleus.IniSaveInfo("Patch:Height", "Offset", "2"),
    new Nucleus.IniSaveInfo("Patch:Height", "Value", '"height"'),
    new Nucleus.IniSaveInfo("Patch:Height", "ValueType", '"int"'),
    new Nucleus.IniSaveInfo("Patch:Height", "Match", '"all"'),
    new Nucleus.IniSaveInfo("Patch:Height", "Module", '"auto"'),
    new Nucleus.IniSaveInfo("Patch:Width", "Enabled", "true"),
    new Nucleus.IniSaveInfo("Patch:Width", "Pattern", '"00 00 70 0D 00 00"'),
    new Nucleus.IniSaveInfo("Patch:Width", "Offset", "2"),
    new Nucleus.IniSaveInfo("Patch:Width", "Value", '"width"'),
    new Nucleus.IniSaveInfo("Patch:Width", "ValueType", '"int"'),
    new Nucleus.IniSaveInfo("Patch:Width", "Match", '"all"'),
    new Nucleus.IniSaveInfo("Patch:Width", "Module", '"auto"')
  ]);
};
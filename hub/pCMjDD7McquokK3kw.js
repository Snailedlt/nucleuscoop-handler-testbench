Hub.Handler.Version = 6; // Released at https://hub.splitscreen.me/ on Mon Jan 13 2025 10:26:47 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "pCMjDD7McquokK3kw";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers0 = ["yes", "no"];
var answers1 = ["no", "very low", "low", "medium", "high"];
var answers2 = ["no", "30", "60", "120"];
var answers3 = ["no", "50", "60", "70", "80", "90", "100"];
var answers4 = ["no", "low", "high"];
var answers5 = ["no", "performance", "quality"];
Game.AddOption("Apply aspect ratio fix?", "Matches resolution to window size to fix stretching.", "Fix", answers0);
Game.AddOption("Change graphics settings?", "Can improve performance at the cost of visual quality.", "preset", answers1);
Game.AddOption("Set a framerate(fps) limit?", "Can improve performance at the cost of responsiveness.", "fps", answers2);
Game.AddOption("Change the resolution scale?", "Can improve performance at the cost of visual clarity.", "resscale", answers3);
Game.AddOption("Change the texture quality?", "Reduce the gpu's Vram usage, if the game stutters too much set this to low.", "texture", answers4);
Game.AddOption("Use DLSS ? (ONLY FOR RTX GPU'S)", "ONLY USE IF YOU HAVE AN NVIDIA RTX GPU SERIES, set the profile that DLSS will use", "dlss", answers5);

Game.ExecutableContext = ["EOSSDK-Win64-Shipping.dll", "GfeSDK.dll"];
Game.KillMutex = ["NIOH_MUTEX"];
Game.Description =
  "WORKS ONLY WITH THE STEAM VERSION, tested on update 1.28.06, lower your settings and limit your fps to 30 for better performance, to connect the instances you have to finish the tutorial, play until you are in the world map, select the tori gate, create a match then join on the other instances (make sure you have crossplay disabled). To play with keyboard and mouse wait until all instances opens and press the END key to lock the inputs, click a couple of times for the cursor to show on your screen, to hide or show the cursor use the home key.";
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt"];
Game.FileSymlinkCopyInstead = ["nvngx_dlss.dll", "AnselSDK64.dll", "amd_ags_x64.dll", "EOSSDK-Win64-Shipping.dll"];
Game.GameName = "Nioh 2";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "nioh2.exe";
Game.GUID = "Nioh 2";
Game.SteamID = "1325200";
Game.MaxPlayers = 3;
Game.MaxPlayersOneMonitor = 4;
Game.UseGoldberg = true;
//Game.UseNemirtingasEpicEmu = true;
Game.UserProfileSavePath = "Documents\\KoeiTecmo\\NIOH2\\Savedata";
Game.UserProfileConfigPath = "Documents\\KoeiTecmo\\NIOH2";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Nioh2";
Game.HasDynamicWindowTitle = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_4.dll"];
Game.PauseBetweenContextAndLaunch = 10;
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 25;
Game.KeepSymLinkOnExit = false;

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
Game.HookFocus = true;

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
Game.ProtoInput.DontShowCursorWhenImageUpdated = false;
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
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseOpenXinput = false;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;

Game.ProtoInput.EnableFocusMessageLoop = true;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 5000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS

Game.Play = function() {
  var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steamless.bat";
  var lines = [
    '"' + Context.NucleusFolder + '\\utils\\Steamless\\Steamless.CLI.exe" --quiet --keepbind ' + '"' + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + '\\nioh2.exe"',
    'move /y "nioh2.exe.unpacked.exe" "nioh2.exe"'
  ];
  Context.WriteTextFile(Bat, lines);

  Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steamless.bat"], false, 1);

  Context.Wait(10000);

  var dir = Context.NucleusUserRoot + "\\Documents\\KoeiTecmo\\NIOH2";
  var path = Context.NucleusUserRoot + "\\Documents\\KoeiTecmo\\NIOH2\\config.xml";
  if (!System.IO.File.Exists(path)) {
    System.IO.Directory.CreateDirectory(dir);
    var lines = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      "<settings>",
      "<CONFIG_TYPE>CUSTOM</CONFIG_TYPE>",
      "<DISP_MODE>WINDOW</DISP_MODE>",
      "<REN_REZ>70</REN_REZ>",
      "<SCR_REZ>1920x1080</SCR_REZ>",
      "<FPS>30</FPS>",
      "<SHADOW_QUAL>LOW</SHADOW_QUAL>",
      "<AO>ON</AO>",
      "<RT_REF>OFF</RT_REF>",
      "<MOT_BLUR>ON</MOT_BLUR>",
      "<TEXTURE_QUAL>LOW</TEXTURE_QUAL>",
      "<EFFECT_QUAL>NORMAL</EFFECT_QUAL>",
      "<DLSS_QUAL>OFF</DLSS_QUAL>",
      "</settings>"
    ];
    Context.WriteTextFile(path, lines);
  }

  var fix = Context.Options["Fix"];

  if (fix == "yes") {
    var screenreswidth = Context.Width;
    var screenresheight = Context.Height;

    if (screenresheight == 540 && screenreswidth == 1920) {
      //1080p Horizontal

      Context.ChangeXmlNodeInnerTextValue(path, "//DISP_MODE", "WINDOW");
      Context.ChangeXmlNodeInnerTextValue(path, "//SCR_REZ", "3440x1440");
      //patch 3440x1440 res 70 0D 00 00 A0 05

      Context.PatchFileFindAll(
        System.IO.Path.Combine(Context.RootFolder, "nioh2.exe"),
        System.IO.Path.Combine(Context.RootFolder, "nioh2.exe"),
        [0x70, 0x0d, 0x00, 0x00, 0xa0, 0x05],
        [0x80, 0x07, 0x00, 0x00, 0x1c, 0x02]
      );
    } else if (screenresheight == 1080 && screenreswidth == 960) {
      //1080p vertical

      Context.ChangeXmlNodeInnerTextValue(path, "//DISP_MODE", "WINDOW");
      Context.ChangeXmlNodeInnerTextValue(path, "//SCR_REZ", "3440x1440");

      Context.PatchFileFindAll(
        System.IO.Path.Combine(Context.RootFolder, "nioh2.exe"),
        System.IO.Path.Combine(Context.RootFolder, "nioh2.exe"),
        [0x70, 0x0d, 0x00, 0x00, 0xa0, 0x05],
        [0xc0, 0x03, 0x00, 0x00, 0x38, 0x04]
      );
    } else if (screenresheight == 540 && screenreswidth == 960) {
      //1080p 1/4

      Context.ChangeXmlNodeInnerTextValue(path, "//DISP_MODE", "WINDOW");
      Context.ChangeXmlNodeInnerTextValue(path, "//SCR_REZ", "3440x1440");

      Context.PatchFileFindAll(
        System.IO.Path.Combine(Context.RootFolder, "nioh2.exe"),
        System.IO.Path.Combine(Context.RootFolder, "nioh2.exe"),
        [0x70, 0x0d, 0x00, 0x00, 0xa0, 0x05],
        [0xc0, 0x03, 0x00, 0x00, 0x1c, 0x02]
      );
    } else if (screenreswidth == 1280 && screenresheight == 360) {
      //720p horizontal
      Context.ChangeXmlNodeInnerTextValue(path, "//DISP_MODE", "WINDOW");
      Context.ChangeXmlNodeInnerTextValue(path, "//SCR_REZ", "1280x720");
    } else if (screenreswidth == 640 && screenresheight == 720) {
      //720p vertical
      Context.ChangeXmlNodeInnerTextValue(path, "//DISP_MODE", "WINDOW");
      Context.ChangeXmlNodeInnerTextValue(path, "//SCR_REZ", "1280x720");
    } else if (screenreswidth == 640 && screenresheight == 360) {
      //720p 1/4
      Context.ChangeXmlNodeInnerTextValue(path, "//DISP_MODE", "WINDOW");
      Context.ChangeXmlNodeInnerTextValue(path, "//SCR_REZ", "1280x720");
    } else if (screenreswidth == 2560 && screenresheight == 720) {
      //1440p horizontal
      Context.ChangeXmlNodeInnerTextValue(path, "//DISP_MODE", "WINDOW");
      Context.ChangeXmlNodeInnerTextValue(path, "//SCR_REZ", "3440x1440");
      Context.PatchFileFindAll(
        System.IO.Path.Combine(Context.RootFolder, "nioh2.exe"),
        System.IO.Path.Combine(Context.RootFolder, "nioh2.exe"),
        [0x70, 0x0d, 0x00, 0x00, 0xa0, 0x05],
        [0x00, 0x0a, 0x00, 0x00, 0xd0, 0x02]
      );
    } else if (screenreswidth == 1280 && screenresheight == 1440) {
      //1440p vertical

      Context.ChangeXmlNodeInnerTextValue(path, "//DISP_MODE", "WINDOW");
      Context.ChangeXmlNodeInnerTextValue(path, "//SCR_REZ", "3440x1440");
      //Context.ChangeXmlNodeInnerTextValue(path, "//REN_REZ", "100%");
      Context.PatchFileFindAll(
        System.IO.Path.Combine(Context.RootFolder, "nioh2.exe"),
        System.IO.Path.Combine(Context.RootFolder, "nioh2.exe"),
        [0x70, 0x0d, 0x00, 0x00, 0xa0, 0x05],
        [0x00, 0x05, 0x00, 0x00, 0xa0, 0x05]
      );
    } else if (screenresheight == 1280 && screenreswidth == 720) {
      //1440p 1/4

      Context.ChangeXmlNodeInnerTextValue(path, "//DISP_MODE", "WINDOW");
      Context.ChangeXmlNodeInnerTextValue(path, "//SCR_REZ", "1280x720");
      Game.KeepAspectRatio = true;
    } else if (screenresheight == 2160 && screenreswidth == 1920) {
      //4k vertical

      Context.ChangeXmlNodeInnerTextValue(path, "//DISP_MODE", "WINDOW");
      Context.ChangeXmlNodeInnerTextValue(path, "//SCR_REZ", "3440x1440");
      //Context.ChangeXmlNodeInnerTextValue(path, "//REN_REZ", "100%");
      Context.PatchFileFindAll(
        System.IO.Path.Combine(Context.RootFolder, "nioh2.exe"),
        System.IO.Path.Combine(Context.RootFolder, "nioh2.exe"),
        [0x70, 0x0d, 0x00, 0x00, 0xa0, 0x05],
        [0x80, 0x07, 0x00, 0x00, 0x70, 0x08]
      );
    } else if (screenresheight == 1080 && screenreswidth == 3840) {
      //4k Horizontal

      Context.ChangeXmlNodeInnerTextValue(path, "//DISP_MODE", "WINDOW");
      Context.ChangeXmlNodeInnerTextValue(path, "//SCR_REZ", "3440x1440");

      //patch 3440x1440 res 70 0D 00 00 A0 05

      Context.PatchFileFindAll(
        System.IO.Path.Combine(Context.RootFolder, "nioh2.exe"),
        System.IO.Path.Combine(Context.RootFolder, "nioh2.exe"),
        [0x70, 0x0d, 0x00, 0x00, 0xa0, 0x05],
        [0x00, 0x0f, 0x00, 0x00, 0x38, 0x04]
      );
    } else {
      Context.ChangeXmlNodeInnerTextValue(path, "//DISP_MODE", "WINDOW");
      Context.ChangeXmlNodeInnerTextValue(path, "//SCR_REZ", "1920x1080");
    }
  }

  var fps = Context.Options["fps"];

  switch (fps) {
    case "no":
      break;
    case "30":
      Context.ChangeXmlNodeInnerTextValue(path, "//FPS", "30");
      break;
    case "60":
      Context.ChangeXmlNodeInnerTextValue(path, "//FPS", "60");
      break;
    case "120":
      Context.ChangeXmlNodeInnerTextValue(path, "//FPS", "120");
      break;
  }

  var texture = Context.Options["texture"];

  switch (texture) {
    case "no":
      break;
    case "low":
      Context.ChangeXmlNodeInnerTextValue(path, "//TEXTURE_QUAL", "LOW");
      break;
    case "high":
      Context.ChangeXmlNodeInnerTextValue(path, "//TEXTURE_QUAL", "NORMAL");
      break;
  }

  var resscale = Context.Options["resscale"];
  switch (resscale) {
    case "no":
      break;
    case "50":
      Context.ChangeXmlNodeInnerTextValue(path, "//REN_REZ", "50");
      break;
    case "60":
      Context.ChangeXmlNodeInnerTextValue(path, "//REN_REZ", "60");
      break;
    case "70":
      Context.ChangeXmlNodeInnerTextValue(path, "//REN_REZ", "70");
      break;
    case "80":
      Context.ChangeXmlNodeInnerTextValue(path, "//REN_REZ", "80");
      break;
    case "90":
      Context.ChangeXmlNodeInnerTextValue(path, "//REN_REZ", "90");
      break;
    case "100":
      Context.ChangeXmlNodeInnerTextValue(path, "//REN_REZ", "100");
      break;
  }

  var preset = Context.Options["preset"];

  switch (preset) {
    case "no":
      break;
    case "very low":
      Context.ChangeXmlNodeInnerTextValue(path, "//CONFIG_TYPE", "CUSTOM");
      Context.ChangeXmlNodeInnerTextValue(path, "//SHADOW_QUAL", "NONE");
      Context.ChangeXmlNodeInnerTextValue(path, "//RT_REF", "OFF");
      Context.ChangeXmlNodeInnerTextValue(path, "//AO", "OFF");
      Context.ChangeXmlNodeInnerTextValue(path, "//MOT_BLUR", "OFF");
      Context.ChangeXmlNodeInnerTextValue(path, "//EFFECT_QUAL", "LOW");

      break;
    case "low":
      Context.ChangeXmlNodeInnerTextValue(path, "//CONFIG_TYPE", "CUSTOM");
      Context.ChangeXmlNodeInnerTextValue(path, "//SHADOW_QUAL", "LOW");
      Context.ChangeXmlNodeInnerTextValue(path, "//RT_REF", "OFF");
      Context.ChangeXmlNodeInnerTextValue(path, "//AO", "OFF");
      Context.ChangeXmlNodeInnerTextValue(path, "//MOT_BLUR", "OFF");
      Context.ChangeXmlNodeInnerTextValue(path, "//EFFECT_QUAL", "LOW");
      break;
    case "medium":
      Context.ChangeXmlNodeInnerTextValue(path, "//CONFIG_TYPE", "CUSTOM");
      Context.ChangeXmlNodeInnerTextValue(path, "//SHADOW_QUAL", "MIDDLE");
      Context.ChangeXmlNodeInnerTextValue(path, "//RT_REF", "OFF");
      Context.ChangeXmlNodeInnerTextValue(path, "//AO", "ON");
      Context.ChangeXmlNodeInnerTextValue(path, "//MOT_BLUR", "ON");
      Context.ChangeXmlNodeInnerTextValue(path, "//EFFECT_QUAL", "NORMAL");
      break;
    case "high":
      Context.ChangeXmlNodeInnerTextValue(path, "//CONFIG_TYPE", "CUSTOM");
      Context.ChangeXmlNodeInnerTextValue(path, "//SHADOW_QUAL", "HIGH");
      Context.ChangeXmlNodeInnerTextValue(path, "//RT_REF", "ON");
      Context.ChangeXmlNodeInnerTextValue(path, "//AO", "ON");
      Context.ChangeXmlNodeInnerTextValue(path, "//MOT_BLUR", "ON");
      Context.ChangeXmlNodeInnerTextValue(path, "//EFFECT_QUAL", "NORMAL");
      break;
  }

  var dlss = Context.Options["dlss"];

  switch (dlss) {
    case "no":
      Context.ChangeXmlNodeInnerTextValue(path, "//DLSS_QUAL", "OFF");
      break;
    case "performance":
      Context.ChangeXmlNodeInnerTextValue(path, "//DLSS_QUAL", "PERFORMANCE");
      break;
    case "balanced":
      Context.ChangeXmlNodeInnerTextValue(path, "//DLSS_QUAL", "BALANCED");
      break;
    case "quality":
      Context.ChangeXmlNodeInnerTextValue(path, "//DLSS_QUAL", "QUALITY");
      break;
  }
};
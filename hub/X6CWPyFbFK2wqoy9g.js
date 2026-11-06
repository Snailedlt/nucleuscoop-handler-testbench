Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Fri Apr 15 2022 06:54:53 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "X6CWPyFbFK2wqoy9g";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
var answers2 = ["No", "very low", "low", "medium", "high", "ultra"];
var answers3 = ["No", "100", "90", "80", "70", "60"];
Game.AddOption("Use Vulkan?", "Only select yes if you want to run the game's Vulkan exe.", "Vulkan", answers1);
Game.AddOption("Change the graphics settings?", "Set the quality of the in-game graphics.", "imagequality", answers2);
Game.AddOption("Change the resolution scale?", "Increase performance at the cost of image quality.", "resScale", answers3);

Game.KillMutex = ["Strange Brigade_68ad150"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "amd_ags_x64.dll", "cracksteam_api64.dll", "steamclient64.dll", "StrangeBrigade_DX12.exe", "StrangeBrigade_Vulkan.exe", "StrangeBrigade.exe"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = false;
Game.KeyboardPlayerFirst = true;
Game.ExecutableName = "StrangeBrigade_DX12.exe";
Game.SteamID = "312670";
Game.GUID = "Strange Brigade";
Game.GameName = "Strange Brigade";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "bin";
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.StartArguments = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Strange Brigade";
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = true;
Game.WindowStyleValues = ["~0xC00000", "~0x40000", "~0x20000000", "~0x20000", "~0x80000", "0x40000000"];
Game.ExtWindowStyleValues = ["~0x00000001", "~0x00000200", "~0x00020000"];
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_4.dll", "xinput9_1_0.dll"];
Game.UserProfileSavePath = "AppData\\Local\\Strange Brigade\\PC_ProfileSaves";
Game.UserProfileConfigPath = "AppData\\Local\\Strange Brigade";
Game.Description = "Create a multiplayer lobby in one instance and join in the others using the friends menu, press RT in the title screen to open it .";
Game.PauseBetweenStarts = 40;
Game.GamePlayBeforeGameSetup = true;

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

Game.SendNormalMouseInput = false;
Game.SendNormalKeyboardInput = false;
Game.SendScrollWheel = false;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;
Game.LockInputAtStart = false;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  Context.BackupFile(Context.NucleusUserRoot + "\\AppData\\Local\\Strange Brigade\\GraphicsOptions.ini", true);

  var VideoConfig = Context.NucleusUserRoot + "\\AppData\\Local\\Strange Brigade\\GraphicsOptions.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Display Settings", "D3D12", 1),
    new Nucleus.IniSaveInfo("Display Settings", "Resolution_Width", Context.Width),
    new Nucleus.IniSaveInfo("Display Settings", "Resolution_Height", Context.Height),
    new Nucleus.IniSaveInfo("Display Settings", "Windowed", "1")
  ]);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var nolay = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\disable_overlay.txt";
  var lines = [""];
  Context.WriteTextFile(nolay, lines);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\amd_ags_x64.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "amd_ags_x64.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\cracksteam_api64.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "cracksteam_api64.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  if (Context.HasKeyboardPlayer) {
  } else {
    Game.SupportsMultipleKeyboardsAndMice = true;
    Game.HookSetCursorPos = true;
    Game.HookGetCursorPos = true;
  }

  var vulkan = Context.Options["Vulkan"];
  var resscale = Context.Options["resScale"];
  var imagequality = Context.Options["imagequality"];

  if (vulkan == "Yes") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "StrangeBrigade_Vulkan.exe"), System.IO.Path.Combine(Context.RootFolder, "bin\\StrangeBrigade_DX12.exe"), true);

    var VideoConfig = Context.NucleusUserRoot + "\\AppData\\Local\\Strange Brigade\\GraphicsOptions.ini";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Display Settings", "D3D12", 0)]);
  }

  if (vulkan == "No") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "StrangeBrigade_DX12.exe"), System.IO.Path.Combine(Context.RootFolder, "bin\\StrangeBrigade_DX12.exe"), true);
  }

  if (resscale == "No") {
  }

  if (resscale == "100") {
    var VideoConfig = Context.NucleusUserRoot + "\\AppData\\Local\\Strange Brigade\\GraphicsOptions.ini";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Display Settings", "RenderScale", "1.000000")]);
  } else {
    var VideoConfig = Context.NucleusUserRoot + "\\AppData\\Local\\Strange Brigade\\GraphicsOptions.ini";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Display Settings", "RenderScale", "0." + resscale + "0000")]);
  }

  if (imagequality == "No") {
  }

  if (imagequality == "very low") {
    var VideoConfig = Context.NucleusUserRoot + "\\AppData\\Local\\Strange Brigade\\GraphicsOptions.ini";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("Display Settings", "AmbientOcclusion", 0),
      new Nucleus.IniSaveInfo("Display Settings", "ReduceMouseLag", 0),
      new Nucleus.IniSaveInfo("Display Settings", "AsyncCompute", 0),
      new Nucleus.IniSaveInfo("Display Settings", "Tessellation", 0),
      new Nucleus.IniSaveInfo("Display Settings", "TextureDetail", 0),
      new Nucleus.IniSaveInfo("Display Settings", "ShadowDetail", 0),
      new Nucleus.IniSaveInfo("Display Settings", "AntiAliasing", 0),
      new Nucleus.IniSaveInfo("Display Settings", "DrawDistance", 0),
      new Nucleus.IniSaveInfo("Display Settings", "AnisotropicFiltering", 0),
      new Nucleus.IniSaveInfo("Display Settings", "SSReflectionsQuality", 0),
      new Nucleus.IniSaveInfo("Display Settings", "ObscuranceFields", 0),
      new Nucleus.IniSaveInfo("Display Settings", "ReverbQuality", 0)
    ]);
  }

  if (imagequality == "low") {
    var VideoConfig = Context.NucleusUserRoot + "\\AppData\\Local\\Strange Brigade\\GraphicsOptions.ini";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("Display Settings", "AmbientOcclusion", 0),
      new Nucleus.IniSaveInfo("Display Settings", "ReduceMouseLag", 0),
      new Nucleus.IniSaveInfo("Display Settings", "AsyncCompute", 0),
      new Nucleus.IniSaveInfo("Display Settings", "Tessellation", 0),
      new Nucleus.IniSaveInfo("Display Settings", "TextureDetail", 0),
      new Nucleus.IniSaveInfo("Display Settings", "ShadowDetail", 0),
      new Nucleus.IniSaveInfo("Display Settings", "AntiAliasing", 1),
      new Nucleus.IniSaveInfo("Display Settings", "DrawDistance", 0),
      new Nucleus.IniSaveInfo("Display Settings", "AnisotropicFiltering", 2),
      new Nucleus.IniSaveInfo("Display Settings", "SSReflectionsQuality", 0),
      new Nucleus.IniSaveInfo("Display Settings", "ObscuranceFields", 0),
      new Nucleus.IniSaveInfo("Display Settings", "ReverbQuality", 0)
    ]);
  }

  if (imagequality == "medium") {
    var VideoConfig = Context.NucleusUserRoot + "\\AppData\\Local\\Strange Brigade\\GraphicsOptions.ini";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("Display Settings", "AmbientOcclusion", 0),
      new Nucleus.IniSaveInfo("Display Settings", "ReduceMouseLag", 0),
      new Nucleus.IniSaveInfo("Display Settings", "AsyncCompute", 0),
      new Nucleus.IniSaveInfo("Display Settings", "Tessellation", 0),
      new Nucleus.IniSaveInfo("Display Settings", "TextureDetail", 1),
      new Nucleus.IniSaveInfo("Display Settings", "ShadowDetail", 1),
      new Nucleus.IniSaveInfo("Display Settings", "AntiAliasing", 2),
      new Nucleus.IniSaveInfo("Display Settings", "DrawDistance", 1),
      new Nucleus.IniSaveInfo("Display Settings", "AnisotropicFiltering", 4),
      new Nucleus.IniSaveInfo("Display Settings", "SSReflectionsQuality", 1),
      new Nucleus.IniSaveInfo("Display Settings", "ObscuranceFields", 0),
      new Nucleus.IniSaveInfo("Display Settings", "ReverbQuality", 0)
    ]);
  }

  if (imagequality == "high") {
    var VideoConfig = Context.NucleusUserRoot + "\\AppData\\Local\\Strange Brigade\\GraphicsOptions.ini";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("Display Settings", "AmbientOcclusion", 1),
      new Nucleus.IniSaveInfo("Display Settings", "ReduceMouseLag", 1),
      new Nucleus.IniSaveInfo("Display Settings", "AsyncCompute", 1),
      new Nucleus.IniSaveInfo("Display Settings", "Tessellation", 1),
      new Nucleus.IniSaveInfo("Display Settings", "TextureDetail", 2),
      new Nucleus.IniSaveInfo("Display Settings", "ShadowDetail", 2),
      new Nucleus.IniSaveInfo("Display Settings", "AntiAliasing", 3),
      new Nucleus.IniSaveInfo("Display Settings", "DrawDistance", 2),
      new Nucleus.IniSaveInfo("Display Settings", "AnisotropicFiltering", 8),
      new Nucleus.IniSaveInfo("Display Settings", "SSReflectionsQuality", 2),
      new Nucleus.IniSaveInfo("Display Settings", "ObscuranceFields", 1),
      new Nucleus.IniSaveInfo("Display Settings", "ReverbQuality", 1)
    ]);
  }

  if (imagequality == "ultra") {
    var VideoConfig = Context.NucleusUserRoot + "\\AppData\\Local\\Strange Brigade\\GraphicsOptions.ini";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("Display Settings", "AmbientOcclusion", 1),
      new Nucleus.IniSaveInfo("Display Settings", "ReduceMouseLag", 1),
      new Nucleus.IniSaveInfo("Display Settings", "AsyncCompute", 1),
      new Nucleus.IniSaveInfo("Display Settings", "Tessellation", 1),
      new Nucleus.IniSaveInfo("Display Settings", "TextureDetail", 3),
      new Nucleus.IniSaveInfo("Display Settings", "ShadowDetail", 3),
      new Nucleus.IniSaveInfo("Display Settings", "AntiAliasing", 4),
      new Nucleus.IniSaveInfo("Display Settings", "DrawDistance", 3),
      new Nucleus.IniSaveInfo("Display Settings", "AnisotropicFiltering", 16),
      new Nucleus.IniSaveInfo("Display Settings", "SSReflectionsQuality", 3),
      new Nucleus.IniSaveInfo("Display Settings", "ObscuranceFields", 1),
      new Nucleus.IniSaveInfo("Display Settings", "ReverbQuality", 1)
    ]);
  }
};
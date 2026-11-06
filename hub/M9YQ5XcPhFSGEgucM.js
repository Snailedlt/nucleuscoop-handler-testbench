Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Fri Jul 02 2021 00:11:12 GMT+0000 (UTC).
Hub.Handler.Id = "M9YQ5XcPhFSGEgucM";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("Alternative method to open multiple instances?", "ONLY use if you have issues running multiple instances with the default.", "Hex", answers1);

Game.ExecutableContext = ["bink2w64.dll"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_api.dll", "steam_appid.txt", "intro.bik", "xinput1_3.dll", "MudRunner.exe"];
Game.FileSymlinkCopyInstead = ["Config.xml"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.UseNemirtingasEpicEmu = false;
Game.EpicEmuArgs = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "MudRunner.exe";
Game.SteamID = "675010";
Game.GUID = "MudRunner";
Game.GameName = "MudRunner";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.StartArguments = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "MudRunner";
Game.HasDynamicWindowTitle = true;
Game.FakeFocus = true;
Game.HookFocus = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\SpinTires MudRunner";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "Only tested and working in the Steam version. Use D-pad to control the menus. Wait until all instances have begun before using gamepads. Press the END key in your keyboard to unlock the input and the main cursor when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances. Create a public multiplayer game in the first instance and join in the others. Each instance has its own save, you can access these saves in the app, after the first launch click game options/open user profile save path in the UI. You can even copy your main save to all instances there.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenStarts = 30;

Game.SupportsMultipleKeyboardsAndMice = true;

Game.HookSetCursorPos = true;
Game.HookGetCursorPos = true;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = true;
Game.HookGetKeyboardState = false;
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
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = true;
Game.DrawFakeMouseCursorForControllers = false;
Game.UpdateFakeMouseWithInternalInput = false;
Game.LockInputAtStart = true;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  var path = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Config.xml";
  Context.ChangeXmlAttributeValue(path, "//System", "Width", Context.Width);
  Context.ChangeXmlAttributeValue(path, "//System", "Height", Context.Height);
  Context.ChangeXmlAttributeValue(path, "//System", "Windowed", "true");
  Context.ChangeXmlAttributeValue(path, "//System", "Maximized", "false");

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\mods");
  System.IO.Directory.CreateDirectory(filePath);

  var hex = Context.Options["Hex"];

  if (hex == "Yes") {
    if (Context.PlayerID == 0) {
      System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "MudRunner.exe"), System.IO.Path.Combine(Context.RootFolder, "MudRunner.exe"), true);
    }

    if (Context.PlayerID == 1) {
      //patch window class 57 69 6E 64 6F 77 43 6C 61 73 73 00
      Context.PatchFile(
        System.IO.Path.Combine(Context.RootInstallFolder, "MudRunner.exe"),
        System.IO.Path.Combine(Context.RootFolder, "MudRunner.exe"),
        [0x57, 0x69, 0x6e, 0x64, 0x6f, 0x77, 0x43, 0x6c, 0x61, 0x73, 0x73, 0x00],
        [0x57, 0x69, 0x6e, 0x64, 0x6f, 0x77, 0x43, 0x6c, 0x61, 0x73, 0x64, 0x00]
      );
    }

    if (Context.PlayerID == 2) {
      Context.PatchFile(
        System.IO.Path.Combine(Context.RootInstallFolder, "MudRunner.exe"),
        System.IO.Path.Combine(Context.RootFolder, "MudRunner.exe"),
        [0x57, 0x69, 0x6e, 0x64, 0x6f, 0x77, 0x43, 0x6c, 0x61, 0x73, 0x73, 0x00],
        [0x57, 0x69, 0x6e, 0x64, 0x6f, 0x77, 0x43, 0x6c, 0x61, 0x73, 0x65, 0x00]
      );
    }

    if (Context.PlayerID == 3) {
      Context.PatchFile(
        System.IO.Path.Combine(Context.RootInstallFolder, "MudRunner.exe"),
        System.IO.Path.Combine(Context.RootFolder, "MudRunner.exe"),
        [0x57, 0x69, 0x6e, 0x64, 0x6f, 0x77, 0x43, 0x6c, 0x61, 0x73, 0x73, 0x00],
        [0x57, 0x69, 0x6e, 0x64, 0x6f, 0x77, 0x43, 0x6c, 0x61, 0x73, 0x66, 0x00]
      );
    }
  }

  if (hex == "No") {
    Game.HookInit = true;

    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "MudRunner.exe"), System.IO.Path.Combine(Context.RootFolder, "MudRunner.exe"), true);
  }
};
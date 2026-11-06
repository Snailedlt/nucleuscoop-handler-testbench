Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon May 22 2023 19:03:55 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "8QmXdCKK6pXoPCG83";
Hub.Maintainer.Name = "Rogueboy_x";
Hub.Maintainer.Id = "6ANro7s2YXiuE2DyZ";

var answers1 = ["No", "Lowest", "Low", "Medium", "High", "Very High"];
var answers2 = ["Default", "No", "Yes"];
Game.AddOption("Graphics Preset", "Do you want to change graphics setting?", "Preset", answers1);
Game.AddOption("Limit FPS", "Setting to yes enables half refresh rate to limit FPS to 30 for smoother gameplay.", "FPS", answers2);

Game.ExecutableContext = ["bigfile.000.tiger"];
Game.KillMutex = ["TRMMUTEX"];
Game.FileSymlinkExclusions = ["steam_api64.dll"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.CreateSteamAppIdByExe = true;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Avengers.exe";
Game.SteamID = "997070";
Game.GUID = "Marvels Avengers";
Game.GameName = "Marvel's Avengers - The Definitive Edition";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.StartArguments = "-nolauncher";
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Marvel's Avengers";
Game.HasDynamicWindowTitle = false;
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.PreventWindowDeactivation = false;
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput9_1_0.dll", "xinput1_4.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "Documents\\Marvel's Avengers";
Game.Description =
  "Game works offline, to unlock online co-op you will need to progress through the game until you unlock the War Table in the helicarrier. Host player can go to war table and choose any mission then other player can join simply by choosing quick match. Host can also invite other players via Social, they should appear on your friend list. Multiple gamepads support for now.";
Game.PauseBetweenProcessGrab = 5;
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

//ProtoInput:

Game.SupportsMultipleKeyboardsAndMice = false;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = true;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = false;
Game.LockInputToggleKey = 0x23;

Game.ProtoInput.RenameHandlesHook = false;
Game.ProtoInput.RenameHandles = [];
Game.ProtoInput.RenameNamedPipes = [];

Game.ProtoInput.RegisterRawInputHook = false;
Game.ProtoInput.GetRawInputDataHook = false;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;
Game.ProtoInput.DontShowCursorWhenImageUpdated = false;
Game.ProtoInput.FindWindowHook = true;

Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.WindowActvateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = false;
Game.ProtoInput.MouseButtonFilter = false;
Game.ProtoInput.KeyboardButtonFilter = false;

Game.ProtoInput.SendMouseWheelMessages = false;
Game.ProtoInput.SendMouseButtonMessages = false;
Game.ProtoInput.SendMouseMovementMessages = false;
Game.ProtoInput.SendKeyboardButtonMessages = false;
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseOpenXinput = false;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;
Game.ProtoInput.MultipleProtoControllers = false;

Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 40000;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS

Game.Play = function() {
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "Fullscreen", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "ExclusiveFullscreen", 1, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "FullscreenHeight", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "FullscreenWidth", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Input", "EnableWindowsGamingInput", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Input", "EnableLibScePad", 0, Nucleus.RegType.DWord);

  var Preset = Context.Options["Preset"];
  var FPS = Context.Options["FPS"];

  if (Preset == "No") {
  }

  if (Preset == "Lowest") {
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "TextureQuality", 0, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "TextureFiltering", 0, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "ShadowQuality", 0, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "DOFQuality", 0, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "AmbientOcclusionQuality", 0, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "Bloom", 0, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "LevelOfDetail", 0, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "Tessellation", 0, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "ScreenSpaceReflections", 0, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "ScreenSpaceContactShadows", 0, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "VolumetricLighting", 0, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "ParticleLighting", 0, Nucleus.RegType.DWord);
  }

  if (Preset == "Low") {
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "TextureQuality", 0, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "TextureFiltering", 0, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "ShadowQuality", 1, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "DOFQuality", 0, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "AmbientOcclusionQuality", 3, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "Bloom", 1, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "LevelOfDetail", 1, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "Tessellation", 0, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "ScreenSpaceReflections", 0, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "ScreenSpaceContactShadows", 0, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "VolumetricLighting", 1, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "ParticleLighting", 0, Nucleus.RegType.DWord);
  }

  if (Preset == "Medium") {
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "TextureQuality", 1, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "TextureFiltering", 1, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "ShadowQuality", 1, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "DOFQuality", 1, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "AmbientOcclusionQuality", 1, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "Bloom", 1, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "LevelOfDetail", 2, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "Tessellation", 0, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "ScreenSpaceReflections", 1, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "ScreenSpaceContactShadows", 0, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "VolumetricLighting", 1, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "ParticleLighting", 1, Nucleus.RegType.DWord);
  }

  if (Preset == "High") {
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "TextureQuality", 2, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "TextureFiltering", 2, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "ShadowQuality", 2, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "DOFQuality", 2, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "AmbientOcclusionQuality", 1, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "Bloom", 1, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "LevelOfDetail", 2, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "Tessellation", 1, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "ScreenSpaceReflections", 1, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "ScreenSpaceContactShadows", 0, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "VolumetricLighting", 2, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "ParticleLighting", 2, Nucleus.RegType.DWord);
  }

  if (Preset == "Very High") {
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "TextureQuality", 3, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "TextureFiltering", 3, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "ShadowQuality", 3, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "DOFQuality", 3, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "AmbientOcclusionQuality", 2, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "Bloom", 1, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "LevelOfDetail", 3, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "Tessellation", 1, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "ScreenSpaceReflections", 2, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "ScreenSpaceContactShadows", 1, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "VolumetricLighting", 2, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "ParticleLighting", 3, Nucleus.RegType.DWord);
  }

  if (FPS == "Default") {
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "VSync", 1, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "ForceHalfRefreshRate", 0, Nucleus.RegType.DWord);
  }

  if (FPS == "No") {
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "VSync", 0, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "ForceHalfRefreshRate", 0, Nucleus.RegType.DWord);
  }

  if (FPS == "Yes") {
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "VSync", 1, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Marvel's Avengers\\Graphics", "ForceHalfRefreshRate", 1, Nucleus.RegType.DWord);
  }
};
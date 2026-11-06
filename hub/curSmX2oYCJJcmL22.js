Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Tue Apr 21 2020 20:38:37 GMT+0000 (UTC).
Hub.Handler.Id = "curSmX2oYCJJcmL22";
Hub.Maintainer.Name = "ZeroFox";
Hub.Maintainer.Id = "fd6NFJsFJef4AZoD9";

Game.KillMutex = ["UnrealEngine4"];
Game.GameName = "Broomstick League";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "Broomstick-Win64-Shipping.exe";
Game.SteamID = "972780";
Game.GUID = "Broomstick League";
Game.MaxPlayers = 6;
Game.MaxPlayersOneMonitor = 6;
Game.BinariesFolder = "Broomstick\\Binaries\\Win64";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.SupportsPositioning = true;
Game.ForceFinishOnPlay = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Broomstick";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.FakeFocus = true;
Game.HookFocus = true;
Game.PauseBetweenStarts = 20;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Description = "";
Game.UserProfileConfigPath = "AppData\\Local\\Broomstick\\Saved\\Config\\WindowsNoEditor";
Game.Description = 'Use "Private Server" to host and have other instances join.';

Game.Play = function() {
  var Args = (Context.Args = " -windowed " + " -AlwaysFocus " + " -nosplash " + " -steam " + " -ResX= " + Context.Width + " -ResY= " + Context.Height);
  Context.StartArguments = Args;

  var GUS = "C:\\Users\\" + System.Environment.UserName + "\\" + Context.UserProfileConfigPath + "\\GameUserSettings.ini";
  Context.ModifySaveFile(GUS, GUS, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("/Script/Broomstick.BroomstickGameUserSettings", "FullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/Broomstick.BroomstickGameUserSettings", "ResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/Broomstick.BroomstickGameUserSettings", "ResolutionSizeY", Context.Height)
  ]);
};
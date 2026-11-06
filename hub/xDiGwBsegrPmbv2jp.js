Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Thu Feb 13 2020 05:48:18 GMT+0000 (UTC).
Hub.Handler.Id = "xDiGwBsegrPmbv2jp";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["bin32", "bin64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_api.dll", "steam_appid.txt", "Engine.dll"];
Game.ExecutableContext = ["physxcore.dll"];
Game.GameName = "Gas Guzzlers Extreme";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = true;
Game.SteamID = "243800";
Game.GUID = "Gas Guzzlers Extreme";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.NeedsSteamEmulation = false;
Game.UseSteamStubDRMPatcher = true;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.SupportsPositioning = true;
Game.ExecutableName = "gasguzzlers.exe";
Game.BinariesFolder = "bin32";
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Gas Guzzlers: Extreme x64";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.XInputNames = ["xinput9_1_0.dll"];
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var path = "%USERPROFILE%\\Documents\\Gamepires\\GasGuzzlersExtreme\\GasGuzzlers.xml";
  Context.ChangeXmlAttributeValue(path, "//Var[contains(@name,'SkipIntro')]", "value", "1");
  Context.ChangeXmlAttributeValue(path, "//Var[contains(@name,'FullScreen')]", "value", "0");
  Context.ChangeXmlAttributeValue(path, "//Var[contains(@name,'ScreenWidth')]", "value", Context.Width);
  Context.ChangeXmlAttributeValue(path, "//Var[contains(@name,'ScreenHeight')]", "value", Context.Height);
  Context.ChangeXmlAttributeValue(path, "//Var[contains(@name,'WindowPosX')]", "value", Player.MonitorBounds.X);
  Context.ChangeXmlAttributeValue(path, "//Var[contains(@name,'WindowPosY')]", "value", Player.MonitorBounds.Y);

  //patch dll
  //patch GetRunWhileNotInFocus
  Context.PatchFile(
    System.IO.Path.Combine(Context.RootInstallFolder, "Engine.dll"),
    System.IO.Path.Combine(Context.RootFolder, "Bin32\\Engine.dll"),
    //8A 81 31 03 00 00 C3
    [0x8a, 0x81, 0x31, 0x03, 0x00, 0x00, 0xc3],
    [0xb0, 0x01, 0xc3, 0xcc, 0xcc, 0xcc, 0xcc]
  );
};

Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Wed Jan 19 2022 13:19:58 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "yEpbYJph2jzzgzYYR";
Hub.Maintainer.Name = "Genjuro_Kibagami";
Hub.Maintainer.Id = "6s2Fuz9unXTtH453m";

Game.KillMutex = ["Codemasters DiRT Rally"];
Game.ExecutableContext = ["raceload.jpk"];
Game.DirSymlinkCopyInstead = ["system"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = true;
Game.UseGoldberg = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = false;
Game.SymlinkFolders = false;
Game.ExecutableName = "drt.exe";
Game.SteamID = "310560";
Game.GUID = "DiRT - Rally";
Game.GameName = "DiRT - Rally";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "DiRT Rally";
Game.UserProfileConfigPath = "Documents\\My Games\\DiRT Rally\\hardwaresettings";
Game.HasDynamicWindowTitle = false;
Game.ForceSymlink = false;
Game.FakeFocus = true;
Game.FakeFocusInterval = 40000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.UseAlpha8CustomDll = true;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Description = "Use PVP mode in multiplayer menu to play splitscreen, some steam emu files may be present in main game folder if nucleus is not closed properly, always use 'ctrl + q' to quit";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenStarts = 10;

Game.Play = function() {
  var path = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\hardware_settings_config.xml";
  var width = Context.Width;
  var height = Context.Height;

  Context.ChangeXmlAttributeValue(path, "//graphics_card//resolution", "width", Context.Width);
  Context.ChangeXmlAttributeValue(path, "//graphics_card//resolution", "height", Context.Height);
  Context.ChangeXmlAttributeValue(path, "//graphics_card//resolution", "fullscreen", "false");
};
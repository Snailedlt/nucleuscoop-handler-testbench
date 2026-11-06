Hub.Handler.Version = 6; // Released at https://hub.splitscreen.me/ on Wed Jan 19 2022 14:40:31 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "jDNKuQTpHTTzy2Th5";
Hub.Maintainer.Name = "Genjuro_Kibagami";
Hub.Maintainer.Id = "6s2Fuz9unXTtH453m";

Game.KillMutex = ["Type:Mutant|DiRT"];
Game.ExecutableContext = ["codies.ico"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = false;
Game.SymlinkFolders = false;
Game.ExecutableName = "DiRT.exe";
Game.SteamID = "11440";
Game.GUID = "Colin McRae DiRT";
Game.GameName = "Colin McRae DiRT";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "DiRT";
Game.HasDynamicWindowTitle = true;
Game.FakeFocus = true;
Game.FakeFocusInterval = 40000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.UseAlpha8CustomDll = true;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput9_1_0.dll"];
Game.Description =
  "Run game outside of nucleus first to create video setting files, use lan mode in multiplayer menu, a backup of the 'harware_restrictions.xml' file is made when nucleus is active, please make sure to quit nucleus properly (ctrl + q) or the backup will not be reinstated properly (backup will still be in the DiRT/system folder)";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenStarts = 10;

Game.Play = function() {
  Context.BackupFile(Context.OrigRootFolder + "\\system\\hardware_settings_restrictions.xml", true);

  var path = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\hardwaresettings\\hardware_settings_config.xml";
  var width = Context.Width;
  var height = Context.Height;

  Context.ChangeXmlAttributeValue(path, "//graphics_card//resolution", "width", Context.Width);
  Context.ChangeXmlAttributeValue(path, "//graphics_card//resolution", "height", Context.Height);
  Context.ChangeXmlAttributeValue(path, "//graphics_card//resolution", "aspect", width + ":" + height);
  Context.ChangeXmlAttributeValue(path, "//graphics_card//resolution", "fullscreen", "false");
  Context.ChangeXmlAttributeValue(path, "//graphics_card//resolution", "vsync", "1");

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\system\\hardware_settings_restrictions.xml";
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "hardware_settings_restrictions.xml");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
};
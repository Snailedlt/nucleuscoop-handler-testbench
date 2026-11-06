Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Fri Apr 25 2025 14:35:02 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "x9AezzrauoQozpxCE";
Hub.Maintainer.Name = "THEKlNG";
Hub.Maintainer.Id = "5EhQGHyiGFZA689yF";

var answers = ["Default", "Low", "Medium", "High"];
Game.AddOption("Choose your Graphics settings", "", "Graphics", answers);

var answers1 = ["Yes", "No"];
Game.AddOption("Enable music only in the first instance?", "", "Music", answers1);

Game.DirSymlinkExclusions = ["Game\\out", "Game\\out\\profiles", "Game\\out\\save", "Game\\out\\Settings"];
Game.FileSymlinkExclusions = ["intro.wmv", "steam_api.dll", "steam_appid.txt"];
Game.FileSymlinkCopyInstead = ["LastUser.scr", "Video.scr", "Audio.scr"];
Game.BackupFolders = ["34830"];
Game.GameName = "Sniper: Ghost Warrior";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.KeepSymLinkOnExit = true;
Game.ExecutableName = "Sniper_x86.exe";
Game.SteamID = "34830";
Game.GUID = "Sniper Ghost Warrior";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.KillMutex = ["ChromeEngine4CoJ2Mutex"];
Game.UseGoldberg = true;
Game.HookFocus = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Sniper: Ghost Warrior";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.SetTopMostAtEnd = true;
Game.FakeFocusInterval = 8000;
Game.SendFakeFocusMsg = true;
Game.FakeFocus = true;
Game.HideTaskbar = false;
Game.Description =
  "This handler only supports xinput controllers. Before using this handler run your main game and change some settings in order to create the necessary configuration files. All players must choose the 'Player' profile when you enter the game, if a controller doesn't work in an instance enable it in the game options. Create a multiplayer server in the first instance and join in the others, if you can not see the server select refresh or exit the list and enter again. Your profiles will be inside the instances folders in Nucleus content folder, so be careful about not deleting them.";
Game.PauseBetweenContextAndLaunch = 1;
Game.PauseBetweenProcessGrab = 2;
Game.PauseBetweenStarts = 15;

Game.SupportsMultipleKeyboardsAndMice = false;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = false;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = false;
Game.LockInputToggleKey = 0x23;

Game.ProtoInput.MessageFilterHook = false;
Game.ProtoInput.FocusHooks = false;
Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;

Game.Play = function() {
  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Game\\out\\profiles");
  System.IO.Directory.CreateDirectory(filePath);

  if (!System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Game\\out\\profiles\\" + Context.Nickname + ".pro"))) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Game\\out\\profiles\\" + Context.Nickname + ".pro");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Profile.pro");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Game\\out\\Settings\\Video.scr";
  var resLine = Context.FindLineNumberInTextFile(savePath, "Resolution", Nucleus.SearchType.StartsWith);
  Context.ReplacePartialLinesInTextFile(savePath, [resLine + "|" + "\\(([^\\)]+)\\)" + "|(" + Context.Width + "," + Context.Height + ")"]);

  var fsLine = Context.FindLineNumberInTextFile(savePath, "Fullscreen()", Nucleus.SearchType.StartsWith);
  Context.RemoveLineInTextFile(savePath, fsLine);

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Game\\out\\LastUser.scr";
  var dict = [Context.FindLineNumberInTextFile(savePath, "User", Nucleus.SearchType.StartsWith) + '|User("' + Context.Nickname + '")'];
  Context.ReplaceLinesInTextFile(savePath, dict);

  var Graphics = Context.Options["Graphics"];
  if (Graphics == "Low") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Game\\out\\Settings\\Video.scr";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "BPP", Nucleus.SearchType.StartsWith) + "|BPP(6)",
      Context.FindLineNumberInTextFile(txtPath, "FSAA", Nucleus.SearchType.StartsWith) + "|FSAA(0)",
      Context.FindLineNumberInTextFile(txtPath, "TexBPP", Nucleus.SearchType.StartsWith) + "|TexBPP(16)",
      Context.FindLineNumberInTextFile(txtPath, "TextureQuality", Nucleus.SearchType.StartsWith) + '|TextureQuality("VeryLow")',
      Context.FindLineNumberInTextFile(txtPath, "Filtering", Nucleus.SearchType.StartsWith) + '|Filtering("Bilinear")',
      Context.FindLineNumberInTextFile(txtPath, "Shadows", Nucleus.SearchType.StartsWith) + '|Shadows("Low")',
      Context.FindLineNumberInTextFile(txtPath, "ShadowMapSize", Nucleus.SearchType.StartsWith) + "|ShadowMapSize(256)",
      Context.FindLineNumberInTextFile(txtPath, "Lightmaps", Nucleus.SearchType.StartsWith) + "|Lightmaps()",
      Context.FindLineNumberInTextFile(txtPath, "GammaFloat", Nucleus.SearchType.StartsWith) + "|GammaFloat(1.00)",
      Context.FindLineNumberInTextFile(txtPath, "MaxRefresh", Nucleus.SearchType.StartsWith) + "|MaxRefresh(60)",
      Context.FindLineNumberInTextFile(txtPath, "MaterialQuality", Nucleus.SearchType.StartsWith) + "|MaterialQuality(2)",
      Context.FindLineNumberInTextFile(txtPath, "FXQuality", Nucleus.SearchType.StartsWith) + "|FXQuality(0)",
      Context.FindLineNumberInTextFile(txtPath, "FXFadeLevel", Nucleus.SearchType.StartsWith) + "|FXFadeLevel(4)",
      Context.FindLineNumberInTextFile(txtPath, "WaterQuality", Nucleus.SearchType.StartsWith) + "|WaterQuality(2)",
      Context.FindLineNumberInTextFile(txtPath, "GrassQuality", Nucleus.SearchType.StartsWith) + "|GrassQuality(2)",
      Context.FindLineNumberInTextFile(txtPath, "EnvQuality", Nucleus.SearchType.StartsWith) + '|EnvQuality("Static")',
      Context.FindLineNumberInTextFile(txtPath, "ShaderPath", Nucleus.SearchType.StartsWith) + "|ShaderPath(0)",
      Context.FindLineNumberInTextFile(txtPath, "Postprocess", Nucleus.SearchType.StartsWith) + '|Postprocess("Simple")',
      Context.FindLineNumberInTextFile(txtPath, "DisplayDeviceType", Nucleus.SearchType.StartsWith) + "|DisplayDeviceType(0,0.000000,1.000000,1.000000,1.000000)"
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
  if (Graphics == "Medium") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Game\\out\\Settings\\Video.scr";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "BPP", Nucleus.SearchType.StartsWith) + "|BPP(24)",
      Context.FindLineNumberInTextFile(txtPath, "FSAA", Nucleus.SearchType.StartsWith) + "|FSAA(2)",
      Context.FindLineNumberInTextFile(txtPath, "TexBPP", Nucleus.SearchType.StartsWith) + "|TexBPP(32)",
      Context.FindLineNumberInTextFile(txtPath, "TextureQuality", Nucleus.SearchType.StartsWith) + '|TextureQuality("Low")',
      Context.FindLineNumberInTextFile(txtPath, "Filtering", Nucleus.SearchType.StartsWith) + '|Filtering("Trilinear")',
      Context.FindLineNumberInTextFile(txtPath, "Shadows", Nucleus.SearchType.StartsWith) + '|Shadows("Low")',
      Context.FindLineNumberInTextFile(txtPath, "ShadowMapSize", Nucleus.SearchType.StartsWith) + "|ShadowMapSize(512)",
      Context.FindLineNumberInTextFile(txtPath, "Lightmaps", Nucleus.SearchType.StartsWith) + "|Lightmaps()",
      Context.FindLineNumberInTextFile(txtPath, "GammaFloat", Nucleus.SearchType.StartsWith) + "|GammaFloat(1.00)",
      Context.FindLineNumberInTextFile(txtPath, "MaxRefresh", Nucleus.SearchType.StartsWith) + "|MaxRefresh(90)",
      Context.FindLineNumberInTextFile(txtPath, "MaterialQuality", Nucleus.SearchType.StartsWith) + "|MaterialQuality(1)",
      Context.FindLineNumberInTextFile(txtPath, "FXQuality", Nucleus.SearchType.StartsWith) + "|FXQuality(2)",
      Context.FindLineNumberInTextFile(txtPath, "FXFadeLevel", Nucleus.SearchType.StartsWith) + "|FXFadeLevel(2)",
      Context.FindLineNumberInTextFile(txtPath, "WaterQuality", Nucleus.SearchType.StartsWith) + "|WaterQuality(1)",
      Context.FindLineNumberInTextFile(txtPath, "GrassQuality", Nucleus.SearchType.StartsWith) + "|GrassQuality(1)",
      Context.FindLineNumberInTextFile(txtPath, "EnvQuality", Nucleus.SearchType.StartsWith) + '|EnvQuality("RareDynamic")',
      Context.FindLineNumberInTextFile(txtPath, "ShaderPath", Nucleus.SearchType.StartsWith) + "|ShaderPath(2)",
      Context.FindLineNumberInTextFile(txtPath, "Postprocess", Nucleus.SearchType.StartsWith) + '|Postprocess("Normal")',
      Context.FindLineNumberInTextFile(txtPath, "DisplayDeviceType", Nucleus.SearchType.StartsWith) + "|DisplayDeviceType(0,0.000000,1.000000,1.000000,1.000000)"
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
  if (Graphics == "High") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Game\\out\\Settings\\Video.scr";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "BPP", Nucleus.SearchType.StartsWith) + "|BPP(32)",
      Context.FindLineNumberInTextFile(txtPath, "FSAA", Nucleus.SearchType.StartsWith) + "|FSAA(4)",
      Context.FindLineNumberInTextFile(txtPath, "TexBPP", Nucleus.SearchType.StartsWith) + "|TexBPP(32)",
      Context.FindLineNumberInTextFile(txtPath, "TextureQuality", Nucleus.SearchType.StartsWith) + '|TextureQuality("High")',
      Context.FindLineNumberInTextFile(txtPath, "Filtering", Nucleus.SearchType.StartsWith) + '|Filtering("AnisotropicTrilinear")',
      Context.FindLineNumberInTextFile(txtPath, "Shadows", Nucleus.SearchType.StartsWith) + '|Shadows("High")',
      Context.FindLineNumberInTextFile(txtPath, "ShadowMapSize", Nucleus.SearchType.StartsWith) + "|ShadowMapSize(1024)",
      Context.FindLineNumberInTextFile(txtPath, "Lightmaps", Nucleus.SearchType.StartsWith) + "|Lightmaps()",
      Context.FindLineNumberInTextFile(txtPath, "GammaFloat", Nucleus.SearchType.StartsWith) + "|GammaFloat(1.00)",
      Context.FindLineNumberInTextFile(txtPath, "MaxRefresh", Nucleus.SearchType.StartsWith) + "|MaxRefresh(120)",
      Context.FindLineNumberInTextFile(txtPath, "MaterialQuality", Nucleus.SearchType.StartsWith) + "|MaterialQuality(0)",
      Context.FindLineNumberInTextFile(txtPath, "FXQuality", Nucleus.SearchType.StartsWith) + "|FXQuality(3)",
      Context.FindLineNumberInTextFile(txtPath, "FXFadeLevel", Nucleus.SearchType.StartsWith) + "|FXFadeLevel(1)",
      Context.FindLineNumberInTextFile(txtPath, "WaterQuality", Nucleus.SearchType.StartsWith) + "|WaterQuality(0)",
      Context.FindLineNumberInTextFile(txtPath, "GrassQuality", Nucleus.SearchType.StartsWith) + "|GrassQuality(0)",
      Context.FindLineNumberInTextFile(txtPath, "EnvQuality", Nucleus.SearchType.StartsWith) + '|EnvQuality("FullDynamic")',
      Context.FindLineNumberInTextFile(txtPath, "ShaderPath", Nucleus.SearchType.StartsWith) + "|ShaderPath(3)",
      Context.FindLineNumberInTextFile(txtPath, "Postprocess", Nucleus.SearchType.StartsWith) + '|Postprocess("Normal")',
      Context.FindLineNumberInTextFile(txtPath, "DisplayDeviceType", Nucleus.SearchType.StartsWith) + "|DisplayDeviceType(0,0.000000,1.000000,1.000000,1.000000)"
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  var Music = Context.Options["Music"];
  if (Music == "No") {
  }
  if (Music == "Yes") {
    if (Context.PlayerID == 0) {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Game\\out\\Settings\\Audio.scr";
      var dict = [Context.FindLineNumberInTextFile(txtPath, "WaveVolume", Nucleus.SearchType.StartsWith) + "|WaveVolume(100)"];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    } else {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Game\\out\\Settings\\Audio.scr";
      var dict = [Context.FindLineNumberInTextFile(savePath, "WaveVolume", Nucleus.SearchType.StartsWith) + "|WaveVolume(0)"];
      Context.ReplaceLinesInTextFile(savePath, dict);
    }
  }
};
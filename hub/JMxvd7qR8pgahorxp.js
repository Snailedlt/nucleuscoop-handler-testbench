Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Mon Jul 28 2025 16:53:52 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "JMxvd7qR8pgahorxp";
Hub.Maintainer.Name = "Perserveruz";
Hub.Maintainer.Id = "nFAYvHKj75jAFRAgt";

Game.KillMutexType = "Mutant";
Game.KillMutex = ["Battlefield2_Instance_Mutex"];
var answers = [64, 32, 16];
var answers1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var answers2 = [50, 80, 90, 100];
var answers3 = ["Default", "No", "Yes"];
var answers4 = ["Default", "Very Low", "Low", "Medium", "High"];
var answers5 = ["Default", "English", "Italian", "German", "French", "Spanish"];
var answers6 = ["Default", "Low", "Medium", "High", "Ultra"];
var answers7 = ["No", "Yes"];
Game.AddOption("Select the number of bots to be added", "", "Bots", answers);
Game.AddOption("Select the number of players", "", "Players", answers1);
Game.AddOption("Select the bot difficulty", "Leave at 50 for intermediate difficulty", "Difficulty", answers2);
Game.AddOption("Friendly Fire", "", "Friendly", answers3);
Game.AddOption("Auto Balance", "", "AutoBalance", answers3);
Game.AddOption("Choose your preferred graphic settings?", "", "Config", answers6);
Game.AddOption("Select your preferred analog sensitivity?", "", "Sensitivity", answers4);
Game.AddOption("Select game language", "", "Language", answers5);
Game.AddOption("Swap shoulder and trigger buttons (useful for Playstation controllers)", "", "pscontrollers", answers3);
Game.AddOption("Activate Game", "Only required on first launch and only if you're using a portable version of Forgotten Hope 2", "Activator", answers3);
Game.AddOption("Would you like to change the draw distance in each instance", "Keep in mind that increasing this value can drastically affect performance", "Draw", answers7);
Game.FileSymlinkExclusions = ["xinput1_4.dll", "XInput1_3.dll", "xinput9_1_0.dll", "Dinput8.dll", "Dinput.dll", "AIDefault.ai", "d3d9.dll", "d3d9.ini"];
Game.DirSymlinkCopyInstead = ["mods\\bf2\\Localization", "mods\\fh2\\localization"];
Game.DirSymlinkCopyInsteadIncludeSubFolders = true;
Game.SupportsKeyboard = true;
Game.HandlerInterval = 100;
Game.ExecutableName = "ForgottenHope2.exe";
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.KeepSymLinkOnExit = true;
Game.GUID = "Forgotten Hope 2";
Game.GameName = "Forgotten Hope 2";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseNucleusEnvironment = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Forgotten Hope 2";
Game.HasDynamicWindowTitle = false;
Game.FakeFocus = false;
Game.FakeFocusSendActivate = false;
Game.HookFocus = false;
Game.PreventWindowDeactivation = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.DInputEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll", "dinput8.dll"];
Game.XInputPlusOldDll = false;
Game.XInputPlusNoIni = true;
Game.BlockRawInput = true;
Game.Hook.CustomDllEnabled = false;
Game.Hook.UseAlpha8CustomDll = false;
Game.PauseBetweenProcessGrab = 10;
Game.PauseBetweenStarts = 0;
Game.HideTaskbar = true;
Game.UserProfileConfigPathNoCopy = true;
Game.UserProfileSavePathNoCopy = true;
//Game.DocumentsConfigPath = "Forgottenhp 2";
Game.UserProfileConfigPath = "AppData\\Local\\Forgotten Hope 2";
Game.DontRemoveBorders = true;
Game.Description =
  "Supports up to 4 gamepads as well as mouse and keyboard.\n\nRequires VC++ Redistributable 2019, Dot Net Framework 4.0 or above, and directX. N.B.\n\nApps that emulate mice/keyboards or virtual controllers such as controlmyjoystick, can interfere with the dinput to xinput translation.\n\nYou can find the latest standalone version of Forgotten Hope 2 at the following link https://playfh2.net/download.\n\nFor Ctrl-Q to work, you may need to first ctrl+tab to the Nucleus window first.\n\nPrior to launching your instances, under the handler's options in Nucleus, select the number of human players and change any other video/server settings based on your preferences.\n\nOnly when using gamepads there is no need to lock input, instead when using mouse/keyboard you will need to lock input by pressing the end key, preferably at the map screen. You may need to press the end key a couple of times to lock input effectively.\n\nOnce your instances have finished resizing and repositioning, proceed to have the first player create a local match under multiplayer, make sure to select Co-op under game mode or no bots will be loaded.\n\nOnce the match has loaded have the other players connect by searching for the local server under multiplayer/join local.\n\nIf you wish to change the draw distance value, you will need to add your preferred draw distance value in the cmd pop up window (only once the Login screen has loaded), wait until all maps have been updated and for the 'Press any key to continue' line to appear - this needs to be repeated for each instance. I've found that setting a value of 1000 works fine on a mid-range PC and looks quite nice, while 2000 looks amazing but can drastically affect performance and cause crashes on lower end PCs.\n\nMassive credit goes to messenils for fixing mouse input in multiple instances and to PoundlandBacon for the draw distance mod.";

Game.SupportsMultipleKeyboardsAndMice = true;

Game.Play = function() {
  // Deprecated options
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

  Game.ExecutableName = "ForgottenHope2.exe";

  var Args = (Context.Args = " +modPath mods/fh2 +fullscreen 0 +szx " + Context.Width + " +szy " + Context.Height + "@60 +restart");
  Context.StartArguments = Args;

  var Draw = Context.Options["Draw"];
  if (Draw == "Yes") {
    Game.PromptBetweenInstances = true;

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\mods\\fh2\\7z.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "View Distance Changer\\7z.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\mods\\fh2\\7z.exe");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "View Distance Changer\\7z.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\mods\\fh2\\FH2.View.Distance.Changer.bat");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "View Distance Changer\\FH2.View.Distance.Changer.bat");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\mods\\fh2\\FH2.View.Distance.Changer.bat"], false, 0, false, false);
  }

  var filePath = Context.EnvironmentPlayer + "\\Documents\\My Mods";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\Documents\\My Mods\\SpecialK";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\Documents\\My Mods\\SpecialK\\Global";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = "C:\\Users\\" + Context.UserName + "\\Documents\\My Mods";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = "C:\\Users\\" + Context.UserName + "\\Documents\\My Mods\\SpecialK";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = "C:\\Users\\" + Context.UserName + "\\Documents\\My Mods\\SpecialK\\Global";
  System.IO.Directory.CreateDirectory(filePath);

  var Language = Context.Options["Language"];
  if (Language == "English") {
    Context.RunAdditionalFiles([Game.Folder + "\\English.bat"], false, 0, true, false);
  }

  if (Language == "Italian") {
    Context.RunAdditionalFiles([Game.Folder + "\\Italian.bat"], false, 0, true, false);
  }
  if (Language == "French") {
    Context.RunAdditionalFiles([Game.Folder + "\\French.bat"], false, 0, true, false);
  }
  if (Language == "German") {
    Context.RunAdditionalFiles([Game.Folder + "\\German.bat"], false, 0, true, false);
  }
  if (Language == "Spanish") {
    Context.RunAdditionalFiles([Game.Folder + "\\Spanish.bat"], false, 0, true, false);
  }

  var Activator = Context.Options["Activator"];
  if (Activator == "No") {
  }
  if (Activator == "Yes") {
    Context.RunAdditionalFiles([Game.Folder + "\\Activator.bat"], false, 0, true, false);
  }

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "d3d9.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "d3d9.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Xinputplus.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Xinputplus.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\My Mods\\SpecialK\\Global\\osd.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "osd.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\My Mods\\SpecialK\\Global\\notifications.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "notifications.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = "C:\\Users\\" + Context.UserName + "\\Documents\\My Mods\\SpecialK\\Global\\notifications.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "notifications.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var Bots = Context.Options["Bots"];

  //var txtPath = Game.Folder + "\\aidefault.ai";
  //Context.ReplaceLinesInTextFile(txtPath, [
  //Context.FindLineNumberInTextFile(txtPath, "aiSettings.setMaxNBots", Nucleus.SearchType.StartsWith) + '|aiSettings.setMaxNBots ' + Bots + '',
  //Context.FindLineNumberInTextFile(txtPath, "aiSettings.setInformationGridDimension", Nucleus.SearchType.StartsWith) + '|aiSettings.setInformationGridDimension ' + Bots + '',
  //], 'utf-8');

  var txtPath = Game.Folder + "\\aidefault.ai";
  var dict = ["1|aiSettings.setMaxNBots " + Bots + "", "10|aiSettings.setMaxNBots " + Bots + "", "17|aiSettings.setMaxNBots " + Bots + "", "18|aiSettings.setInformationGridDimension " + Bots + ""];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var Friendly = Context.Options["Friendly"];
  if (Friendly == "No") {
    var txtPath = Game.Folder + "\\ServerSettings.con";
    Context.ReplaceLinesInTextFile(
      txtPath,
      [Context.FindLineNumberInTextFile(txtPath, "GameServerSettings.setPunishTeamKills", Nucleus.SearchType.StartsWith) + "|GameServerSettings.setPunishTeamKills 0"],
      "utf-8"
    );
  }
  var Friendly = Context.Options["Friendly"];
  if (Friendly == "Yes") {
    var txtPath = Game.Folder + "\\ServerSettings.con";
    Context.ReplaceLinesInTextFile(
      txtPath,
      [Context.FindLineNumberInTextFile(txtPath, "GameServerSettings.setPunishTeamKills", Nucleus.SearchType.StartsWith) + "|GameServerSettings.setPunishTeamKills 1"],
      "utf-8"
    );
  }
  var AutoBalance = Context.Options["AutoBalance"];
  if (AutoBalance == "No") {
    var txtPath = Game.Folder + "\\ServerSettings.con";
    Context.ReplaceLinesInTextFile(
      txtPath,
      [Context.FindLineNumberInTextFile(txtPath, "GameServerSettings.setAutoBalanceTeam", Nucleus.SearchType.StartsWith) + "|GameServerSettings.setAutoBalanceTeam 0"],
      "utf-8"
    );
  }

  var AutoBalance = Context.Options["AutoBalance"];
  if (AutoBalance == "Yes") {
    var txtPath = Game.Folder + "\\ServerSettings.con";
    Context.ReplaceLinesInTextFile(
      txtPath,
      [Context.FindLineNumberInTextFile(txtPath, "GameServerSettings.setAutoBalanceTeam", Nucleus.SearchType.StartsWith) + "|GameServerSettings.setAutoBalanceTeam 1"],
      "utf-8"
    );
  }

  var Difficulty = Context.Options["Difficulty"];
  var txtPath = Game.Folder + "\\ServerSettings.con";
  Context.ReplaceLinesInTextFile(
    txtPath,
    [Context.FindLineNumberInTextFile(txtPath, "GameServerSettings.setCoopBotDifficulty", Nucleus.SearchType.StartsWith) + "|GameServerSettings.setCoopBotDifficulty " + Difficulty + ""],
    "utf-8"
  );

  var Bots = Context.Options["Bots"];
  if (Bots == "16") {
    var txtPath = Game.Folder + "\\ServerSettings.con";
    Context.ReplaceLinesInTextFile(
      txtPath,
      [
        Context.FindLineNumberInTextFile(txtPath, "GameServerSettings.setCoopBotRatio", Nucleus.SearchType.StartsWith) + "|GameServerSettings.setCoopBotRatio 50",
        Context.FindLineNumberInTextFile(txtPath, "GameServerSettings.setCoopBotCount", Nucleus.SearchType.StartsWith) + "|GameServerSettings.setCoopBotCount 16"
      ],
      "utf-8"
    );
  }

  var Bots = Context.Options["Bots"];
  if (Bots == "32") {
    var txtPath = Game.Folder + "\\ServerSettings.con";
    Context.ReplaceLinesInTextFile(
      txtPath,
      [
        Context.FindLineNumberInTextFile(txtPath, "GameServerSettings.setCoopBotRatio", Nucleus.SearchType.StartsWith) + "|GameServerSettings.setCoopBotRatio 50",
        Context.FindLineNumberInTextFile(txtPath, "GameServerSettings.setCoopBotCount", Nucleus.SearchType.StartsWith) + "|GameServerSettings.setCoopBotCount 32"
      ],
      "utf-8"
    );
  }

  var Bots = Context.Options["Bots"];
  if (Bots == "64") {
    var txtPath = Game.Folder + "\\ServerSettings.con";
    Context.ReplaceLinesInTextFile(
      txtPath,
      [
        Context.FindLineNumberInTextFile(txtPath, "GameServerSettings.setCoopBotRatio", Nucleus.SearchType.StartsWith) + "|GameServerSettings.setCoopBotRatio 68",
        Context.FindLineNumberInTextFile(txtPath, "GameServerSettings.setCoopBotCount", Nucleus.SearchType.StartsWith) + "|GameServerSettings.setCoopBotCount 64"
      ],
      "utf-8"
    );
  }

  var Bots = Context.Options["Bots"];
  if (Bots == "95") {
    var txtPath = Game.Folder + "\\ServerSettings.con";
    Context.ReplaceLinesInTextFile(
      txtPath,
      [
        Context.FindLineNumberInTextFile(txtPath, "GameServerSettings.setCoopBotRatio", Nucleus.SearchType.StartsWith) + "|GameServerSettings.setCoopBotRatio 100",
        Context.FindLineNumberInTextFile(txtPath, "GameServerSettings.setCoopBotCount", Nucleus.SearchType.StartsWith) + "|GameServerSettings.setCoopBotCount 95"
      ],
      "utf-8"
    );
  }

  var txtPath = Game.Folder + "\\ServerSettings.con";
  Context.ReplaceLinesInTextFile(txtPath, [Context.FindLineNumberInTextFile(txtPath, "GameServerSettings.setInternet", Nucleus.SearchType.StartsWith) + "|GameServerSettings.setInternet 0"], "utf-8");

  var Players = Context.Options["Players"];

  var txtPath = Game.Folder + "\\ServerSettings.con";
  Context.ReplaceLinesInTextFile(
    txtPath,
    [Context.FindLineNumberInTextFile(txtPath, "GameServerSettings.setMaxPlayers", Nucleus.SearchType.StartsWith) + "|GameServerSettings.setMaxPlayers " + Players + ""],
    "utf-8"
  );

  var txtPath = Game.Folder + "\\Profile.con";
  var dict = ['1|LocalProfile.setName "' + Context.Nickname + '"', '2|LocalProfile.setNick "' + Context.Nickname + '"'];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var txtPath = Game.Folder + "\\Global.con";
  var dict = ['1|GlobalSettings.setDefaultUser "' + Context.Nickname + '"', '2|GlobalSettings.setNamePrefix ""'];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.ini";
  Context.ReplaceLinesInTextFile(
    txtPath,
    [
      Context.FindLineNumberInTextFile(txtPath, "Borderless=", Nucleus.SearchType.StartsWith) + "|Borderless=true",
      Context.FindLineNumberInTextFile(txtPath, "RenderInBackground=", Nucleus.SearchType.StartsWith) + "|RenderInBackground=true",
      Context.FindLineNumberInTextFile(txtPath, "DontHookWndProc=", Nucleus.SearchType.StartsWith) + "|DontHookWndProc=true",
      Context.FindLineNumberInTextFile(txtPath, "OverrideRes=", Nucleus.SearchType.StartsWith) + "|OverrideRes=" + Context.Width + "x" + Context.Height + ""
    ],
    "utf-8"
  );

  var filePath = Context.EnvironmentPlayer + "\\Documents";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\Default";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\Default";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\0001";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\0001";
  System.IO.Directory.CreateDirectory(filePath);

  var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\Global.con");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Global.con");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\Global.con");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Global.con");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\Default\\Profile.con");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Profile.con");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\Default\\Profile.con");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Profile.con");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  //Response32767
  //Scale1

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Xinputplus.ini";
  var dict = ["101|Controller1=" + (Context.PlayerID + 1) + ""];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Xinputplus.ini";
  var dict = [
    "6|LT=LB",
    "7|RT=RB",
    "16|LB=LT",
    "17|RB=RT",
    "117|LT=Button12",
    "118|RT=Button13",
    "119|DPAD_UP=Button14",
    "120|DPAD_RIGHT=Button15",
    "121|DPAD_DOWN=Button16",
    "122|DPAD_LEFT=Button17"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  if (!System.IO.File.Exists(Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\Default\\Video.con")) {
    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\Default\\Video.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Video_Med.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\Default\\Video.con")) {
    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\Default\\Video.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Video_Med.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\0001\\Video.con")) {
    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\0001\\Video.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Video_Med.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\0001\\Video.con")) {
    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\0001\\Video.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Video_Med.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\mods\\fh2\\ai\\aidefault.ai");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "aidefault.ai");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\Default\\ServerSettings.con");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "ServerSettings.con");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\Default\\ServerSettings.con");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "ServerSettings.con");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\0001\\ServerSettings.con");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "ServerSettings.con");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\0001\\ServerSettings.con");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "ServerSettings.con");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\0001\\General.con");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "General.con");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\0001\\General.con");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "General.con");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  if (!System.IO.File.Exists(Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\0001\\Haptic.con")) {
    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\0001\\Haptic.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Haptic.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
  if (!System.IO.File.Exists(Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\0001\\Haptic.con")) {
    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\0001\\Haptic.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Haptic.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
  var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\0001\\mapList.con");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "mapList.con");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\0001\\mapList.con");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "mapList.con");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\0001\\Profile.con");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Profile.con");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\0001\\Profile.con");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Profile.con");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var Sensitivity = Context.Options["Sensitivity"];
  if (Sensitivity == "Default") {
  }
  if (Sensitivity == "Very Low") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Xinputplus.ini";
    var dict = ["44|Scale=0.5"];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
  if (Sensitivity == "Low") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Xinputplus.ini";
    var dict = ["44|Scale=0.7"];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\0001\\Haptic.con";
    Context.ReplaceLinesInTextFile(
      txtPath,
      [
        Context.FindLineNumberInTextFile(txtPath, "HapticSettings.setAimSensitivitySOLDIER", Nucleus.SearchType.StartsWith) + "|HapticSettings.setAimSensitivitySOLDIER 3 3 3",
        Context.FindLineNumberInTextFile(txtPath, "HapticSettings.setAimSensitivityLengthSOLDIER", Nucleus.SearchType.StartsWith) + "|HapticSettings.setAimSensitivityLengthSOLDIER 0.015 0.015 0.015",
        Context.FindLineNumberInTextFile(txtPath, "HapticSettings.setTurnSensitivitySOLDIER", Nucleus.SearchType.StartsWith) + "|HapticSettings.setTurnSensitivitySOLDIER 3 3 3"
      ],
      "utf-8"
    );

    var txtPath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\0001\\Haptic.con";
    Context.ReplaceLinesInTextFile(
      txtPath,
      [
        Context.FindLineNumberInTextFile(txtPath, "HapticSettings.setAimSensitivitySOLDIER", Nucleus.SearchType.StartsWith) + "|HapticSettings.setAimSensitivitySOLDIER 3 3 3",
        Context.FindLineNumberInTextFile(txtPath, "HapticSettings.setAimSensitivityLengthSOLDIER", Nucleus.SearchType.StartsWith) + "|HapticSettings.setAimSensitivityLengthSOLDIER 0.015 0.015 0.015",
        Context.FindLineNumberInTextFile(txtPath, "HapticSettings.setTurnSensitivitySOLDIER", Nucleus.SearchType.StartsWith) + "|HapticSettings.setTurnSensitivitySOLDIER 3 3 3"
      ],
      "utf-8"
    );
  }
  if (Sensitivity == "Medium") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Xinputplus.ini";
    var dict = ["44|Scale=0.9"];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\0001\\Haptic.con";
    Context.ReplaceLinesInTextFile(
      txtPath,
      [
        Context.FindLineNumberInTextFile(txtPath, "HapticSettings.setAimSensitivitySOLDIER", Nucleus.SearchType.StartsWith) + "|HapticSettings.setAimSensitivitySOLDIER 20 20 20",
        Context.FindLineNumberInTextFile(txtPath, "HapticSettings.setAimSensitivityLengthSOLDIER", Nucleus.SearchType.StartsWith) + "|HapticSettings.setAimSensitivityLengthSOLDIER 0.02 0.02 0.01",
        Context.FindLineNumberInTextFile(txtPath, "HapticSettings.setTurnSensitivitySOLDIER", Nucleus.SearchType.StartsWith) + "|HapticSettings.setTurnSensitivitySOLDIER 4 4 4"
      ],
      "utf-8"
    );

    var txtPath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\0001\\Haptic.con";
    Context.ReplaceLinesInTextFile(
      txtPath,
      [
        Context.FindLineNumberInTextFile(txtPath, "HapticSettings.setAimSensitivitySOLDIER", Nucleus.SearchType.StartsWith) + "|HapticSettings.setAimSensitivitySOLDIER 20 20 20",
        Context.FindLineNumberInTextFile(txtPath, "HapticSettings.setAimSensitivityLengthSOLDIER", Nucleus.SearchType.StartsWith) + "|HapticSettings.setAimSensitivityLengthSOLDIER 0.02 0.02 0.01",
        Context.FindLineNumberInTextFile(txtPath, "HapticSettings.setTurnSensitivitySOLDIER", Nucleus.SearchType.StartsWith) + "|HapticSettings.setTurnSensitivitySOLDIER 4 4 4"
      ],
      "utf-8"
    );
  }
  if (Sensitivity == "High") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Xinputplus.ini";
    var dict = ["44|Scale=1"];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\0001\\Haptic.con";
    Context.ReplaceLinesInTextFile(
      txtPath,
      [
        Context.FindLineNumberInTextFile(txtPath, "HapticSettings.setAimSensitivitySOLDIER", Nucleus.SearchType.StartsWith) + "|HapticSettings.setAimSensitivitySOLDIER 37 37 37",
        Context.FindLineNumberInTextFile(txtPath, "HapticSettings.setAimSensitivityLengthSOLDIER", Nucleus.SearchType.StartsWith) + "|HapticSettings.setAimSensitivityLengthSOLDIER 0.03 0.03 0.01",
        Context.FindLineNumberInTextFile(txtPath, "HapticSettings.setTurnSensitivitySOLDIER", Nucleus.SearchType.StartsWith) + "|HapticSettings.setTurnSensitivitySOLDIER 5.8 5.8 5.8"
      ],
      "utf-8"
    );

    var txtPath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\0001\\Haptic.con";
    Context.ReplaceLinesInTextFile(
      txtPath,
      [
        Context.FindLineNumberInTextFile(txtPath, "HapticSettings.setAimSensitivitySOLDIER", Nucleus.SearchType.StartsWith) + "|HapticSettings.setAimSensitivitySOLDIER 37 37 37",
        Context.FindLineNumberInTextFile(txtPath, "HapticSettings.setAimSensitivityLengthSOLDIER", Nucleus.SearchType.StartsWith) + "|HapticSettings.setAimSensitivityLengthSOLDIER 0.03 0.03 0.01",
        Context.FindLineNumberInTextFile(txtPath, "HapticSettings.setTurnSensitivitySOLDIER", Nucleus.SearchType.StartsWith) + "|HapticSettings.setTurnSensitivitySOLDIER 5.8 5.8 5.8"
      ],
      "utf-8"
    );
  }

  if (Context.HasKeyboardPlayer) {
    //    if (System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll"))) {
    //      System.IO.File.Delete((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll"));
    //    }
    //    if (System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dinput8.dll"))) {
    //      System.IO.File.Delete((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dinput8.dll"));
    //    }
  } else {
  }

  if (!System.IO.File.Exists(Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\0001\\Controls.con")) {
    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\0001\\Controls.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Controls_xbox.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
  if (!System.IO.File.Exists(Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\0001\\Controls.con")) {
    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\0001\\Controls.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Controls_xbox.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
  var pscontrollers = Context.Options["pscontrollers"];
  if (pscontrollers == "Default") {
  }
  if (pscontrollers == "Yes") {
    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\0001\\Controls.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Controls_playstation.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\0001\\Controls.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Controls_playstation.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
  if (pscontrollers == "No") {
    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\0001\\Controls.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Controls_xbox.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\0001\\Controls.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Controls_xbox.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (Context.PlayerID == 0) {
    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\0001\\Audio.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Audio.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\0001\\Audio.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Audio.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\Default\\Audio.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Audio.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\Default\\Audio.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Audio.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  } else {
    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\Default\\Audio.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Audio2.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\Default\\Audio.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Audio2.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\0001\\Audio.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Audio2.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\0001\\Audio.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Audio2.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var Config = Context.Options["Config"];

  if (Config == "Default") {
  }
  if (Config == "Low") {
    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\Default\\Video.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Video_Low.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\Default\\Video.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Video_Low.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\0001\\Video.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Video_Low.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\0001\\Video.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Video_Low.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (Config == "Medium") {
    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\Default\\Video.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Video_Med.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\Default\\Video.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Video_Med.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\0001\\Video.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Video_Med.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\0001\\Video.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Video_Med.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (Config == "High") {
    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\Default\\Video.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Video_High.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\Default\\Video.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Video_High.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\0001\\Video.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Video_High.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\0001\\Video.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Video_High.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (Config == "Ultra") {
    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\Default\\Video.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Video_Ultra.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\Default\\Video.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Video_Ultra.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\Forgottenhp 2\\Profiles\\0001\\Video.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Video_Ultra.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Forgotten Hope 2\\Profiles\\0001\\Video.con");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Video_Ultra.con");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (Context.IsKeyboardPlayer) {
    Game.ProtoInput.InjectStartup = false;
    Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
    Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
    Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;
    Game.ProtoInput.RegisterRawInputHook = true;
    Game.ProtoInput.GetRawInputDataHook = true;
    Game.ProtoInput.MessageFilterHook = false;
    Game.ProtoInput.GetCursorPosHook = false;
    Game.ProtoInput.SetCursorPosHook = false;
    Game.ProtoInput.GetKeyStateHook = true;
    Game.ProtoInput.GetAsyncKeyStateHook = false;
    Game.ProtoInput.GetKeyboardStateHook = false;
    Game.ProtoInput.CursorVisibilityHook = false;
    Game.ProtoInput.ClipCursorHook = false;
    Game.ProtoInput.FocusHooks = true;
    Game.ProtoInput.DrawFakeCursor = false;
    Game.ProtoInput.ClipCursorHookCreatesFakeClip = true;
    Game.ProtoInput.RawInputFilter = false;
    Game.ProtoInput.MouseMoveFilter = false;
    Game.ProtoInput.MouseActivateFilter = false;
    Game.ProtoInput.WindowActivateFilter = false;
    Game.ProtoInput.WindowActvateAppFilter = false;
    Game.ProtoInput.MouseWheelFilter = true;
    Game.ProtoInput.MouseButtonFilter = true;
    Game.ProtoInput.KeyboardButtonFilter = true;
    Game.ProtoInput.SendMouseWheelMessages = true;
    Game.ProtoInput.SendMouseButtonMessages = true;
    Game.ProtoInput.SendMouseMovementMessages = true;
    Game.ProtoInput.SendKeyboardButtonMessages = true;
    Game.ProtoInput.EnableFocusMessageLoop = true;
    Game.ProtoInput.FocusLoopIntervalMilliseconds = 10;
    Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
    Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
    Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
    Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
    Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
    Game.ProtoInput.BlockedMessages = [];
    Game.ProtoInput.RenameHandlesHook = false;
    Game.ProtoInput.RenameHandles = [];

    //if (System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dinput8.dll"))) {
    //System.IO.File.Delete((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dinput8.dll"));
    //}
    //if (System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.dll"))) {
    //System.IO.File.Delete((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.dll"));
    //}
    if (System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll"))) {
      System.IO.File.Delete((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll"));
    }
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dinput8.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dinput8.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    Game.DontRemoveBorders = false;
  } else {
    Game.FakeFocus = true;
    Game.FakeFocusSendActivate = false;
    Game.ProtoInput.GetCursorPosHook = true;
    Game.ProtoInput.SetCursorPosHook = true;
    Game.PauseBetweenProcessGrab = 10;
    Game.PauseBetweenStarts = 0;
  }

  if (Context.HasKeyboardPlayer) {
    if (Context.IsKeyboardPlayer) {
    } else {
      Game.HookFilterRawInput = true;
    }
  }

  Game.ProtoInput.OnInputLocked = function() {
    if (Context.IsKeyboardPlayer) {
      for (var i = 0; i < PlayerList.Count; i++) {
        var player = PlayerList[i];
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.ClipCursorHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);

        ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, false);
        ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);

        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
        ProtoInput.EnableMessageBlock(player.ProtoInputInstanceHandle, 0x0008);
      }
    }
  };
  Game.ProtoInput.OnInputUnlocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);
      ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, true);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
    }
  };
};
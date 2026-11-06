Hub.Handler.Version = 5; // Released at https://hub.splitscreen.me/ on Mon Nov 21 2022 18:25:03 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "wBSduky3MfS5SCMAd";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["binkw32.dll"];
Game.KillMutex = ["SRE4"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "local_save.txt", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["display.ini"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "SaintsRowIV.exe";
Game.SteamID = "206420";
Game.GUID = "Saints Row IV";
Game.GameName = "Saints Row IV";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.StartArguments = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Saints Row IV";
Game.FakeFocus = true;
Game.FakeFocusInterval = 7000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.XInputPlusOldDll = true;
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UseForceBindIP = true;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\206420";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "So the instances launch and resize correctly make sure to run your main game at least once first and change some graphic settings. You need to add custom resolutions in your AMD/Nvidia/Intel panel (for example if you have a 1920x1080 monitor add: 1920x540, 960x1080, 960x540 etc.) so the game can see and use them.";
Game.KeepSymLinkOnExit = true;
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\display.ini";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "ResolutionWidth =", Nucleus.SearchType.StartsWith) + "|ResolutionWidth = " + Context.Width,
    Context.FindLineNumberInTextFile(txtPath, "ResolutionHeight =", Nucleus.SearchType.StartsWith) + "|ResolutionHeight = " + Context.Height,
    Context.FindLineNumberInTextFile(txtPath, "Fullscreen =", Nucleus.SearchType.StartsWith) + "|Fullscreen = false",
    Context.FindLineNumberInTextFile(txtPath, "Borderless =", Nucleus.SearchType.StartsWith) + "|Borderless = true",
    Context.FindLineNumberInTextFile(txtPath, "VerifyResolution =", Nucleus.SearchType.StartsWith) + "|VerifyResolution = false"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\display.ini";
  var dict = ["81|SkipIntroVideo = true"];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  if (Player.IsKeyboardPlayer) {
    Context.Hook.BlockMouseEvents = "False";
    Context.Hook.BlockKeyboardEvents = "False";
    Context.Hook.BlockInputEvents = "False";
    Context.Hook.ForceFocus = "False";
  } else {
    Context.Hook.BlockMouseEvents = "True";
    Context.Hook.BlockKeyboardEvents = "True";
    Context.Hook.BlockInputEvents = "True";
    Context.Hook.ForceFocus = "True";
  }

  if (Context.HasKeyboardPlayer == true) {
    Game.FakeFocus = false;
    Game.HookFocus = false;
    Game.Hook.CustomDllEnabled = true;
    Game.Hook.UseAlpha8CustomDll = true;
  } else {
  }
};
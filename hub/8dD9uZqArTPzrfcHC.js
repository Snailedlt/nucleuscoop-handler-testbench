Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Jul 05 2021 02:58:06 GMT+0000 (UTC).
Hub.Handler.Id = "8dD9uZqArTPzrfcHC";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["fmod64.dll"];
Game.DirSymlinkExclusions = ["Settings", "UWP"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "local_save.txt"];
Game.FileSymlinkCopyInstead = ["xinput1_3.dll", "AnselSDK64.dll", "crashrpt_lang.ini", "CrashRpt1403_x64.dll"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "TT2.exe";
Game.SteamID = "1082180";
Game.GUID = "TT Isle of Man 2";
Game.GameName = "TT Isle of Man Ride on the Edge 2";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "TT Isle of Man 2";
Game.FakeFocus = true;
Game.HookFocus = true;
Game.ResetWindows = true;
Game.SetWindowHook = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.CustomDllEnabled = false;
Game.InjectHookXinput = true;
Game.UserProfileConfigPath = "Documents\\My Games\\TT Isle of Man 2";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\1082180\\remote";
Game.UseForceBindIP = true;
Game.Description =
  "Open your main game and change some graphics settings before launching this or the instances will not resize correctly, you need to have Steam open when using this. Create a private multiplayer game and invite the other players using the overlay that will show when you press Y to invite, right click their names to invite and accept the invite in the other instances using the mouse cursor. If the overlay does not show make sure you disable any external overlay apps that could be interfering (e.g. MSI Afterburner). Reduce in-game graphics per instance to improve performance or alt-tab to a different window.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\UserSettings.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "Engine.Device.ScreenMode =", Nucleus.SearchType.StartsWith) + '|Engine.Device.ScreenMode = "Windowed";',
    Context.FindLineNumberInTextFile(txtPath, "Engine.Device.ResolutionWidth =", Nucleus.SearchType.StartsWith) + "|Engine.Device.ResolutionWidth = " + Context.Width + ";",
    Context.FindLineNumberInTextFile(txtPath, "Engine.Device.ResolutionHeight =", Nucleus.SearchType.StartsWith) + "|Engine.Device.ResolutionHeight = " + Context.Height + ";",
    Context.FindLineNumberInTextFile(txtPath, "Engine.Renderer.DynamicResolution.DynamicResolutionMode =", Nucleus.SearchType.StartsWith) +
      '|Engine.Renderer.DynamicResolution.DynamicResolutionMode = "Off";'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);
};
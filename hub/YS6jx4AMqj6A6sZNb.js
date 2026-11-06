Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Tue Feb 20 2024 22:27:43 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "YS6jx4AMqj6A6sZNb";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("Letterboxing/Pillarboxing fix?", "Removes the black bars in split-screen, some UI elements get misaligned.", "Pillar", answers1);

Game.ExecutableContext = ["fmod.dll"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "local_save.txt", "xinput1_3.dll", "ssMaster64.exe"];
Game.GameName = "Nobody Saves the World";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "NStW_x64.exe";
Game.SteamID = "1432050";
Game.GUID = "Nobody Saves the World";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 2;
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseSteamless = true;
Game.SteamlessArgs = "--quiet --keepbind";
Game.SteamlessTiming = 5000;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Game";
Game.SendFakeFocusMsg = false;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\1432050\\remote";
Game.UserProfileConfigPath = "Documents\\NStW";
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileConfigPathNoCopy = true;
Game.Description =
  "Steam version only. Create an online multiplayer game in one instance and join in the other. You can access each instance save file via Nucleus, after the first launch click game options/open user profile save path in the UI.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenStarts = 20;

Game.Play = function() {
  var pillar = Context.Options["Pillar"];
  var id = Context.PlayerID + 1;

  if (pillar == "Yes") {
    //remove pillar boxing
    Context.PatchFileFindAll(
      System.IO.Path.Combine(Context.RootFolder, "NStW_x64.exe"),
      System.IO.Path.Combine(Context.RootFolder, "NStW_x64.exe"),
      [0x39, 0x8e, 0xe3, 0x3f],
      Context.ConvertToBytes(Context.AspectRatioDecimal)
    );
  }

  if (pillar == "No") {
  }
};
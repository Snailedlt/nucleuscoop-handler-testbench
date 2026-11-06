Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Thu Apr 02 2020 01:32:50 GMT+0000 (UTC).
Hub.Handler.Id = "NRNJKGZY2XnrfaX3i";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv139\\Win64", "FadeToSilence\\Binaries\\win64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_api.dll", "steam_appid.txt", "XInput1_3.dll", "winmm.dll"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.UseNucleusEnvironment = true;
Game.UseSteamStubDRMPatcher = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "FadeToSilence-Win64-Shipping.exe";
Game.BinariesFolder = "FadeToSilence\\Binaries\\win64";
Game.SteamID = "706020";
Game.GUID = "Fade to Silence";
Game.GameName = "Fade to Silence";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 4;
Game.SupportsPositioning = true;
Game.ForceFinishOnPlay = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Fade to Silence";
Game.Hook.DInputForceDisable = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.HookFocus = true;
Game.UserProfileSavePath = "AppData\\Local\\FadeToSilence\\Saved\\SaveGames";
Game.SetWindowHookStart = true;
Game.PreventGameFocus = true;
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Description =
  "To co-op you first need to find a survivor to join your camp, then you need to bring up the radial menu (not main menu), and click on start coop (bottom middle option). Then go back into it and click invite, an overlay will appear automatically then to invite the other player.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var Args = (Context.Args = " -windowed " + " -AlwaysFocus " + " -nosplash " + " -steam " + " -ResX= " + Context.Width + " -ResY= " + Context.Height);

  Context.StartArguments = Args;
};
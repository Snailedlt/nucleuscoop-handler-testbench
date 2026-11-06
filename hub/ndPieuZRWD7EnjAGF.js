Hub.Handler.Version = 10; // Released at https://hub.splitscreen.me/ on Sun Sep 18 2022 00:01:47 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "ndPieuZRWD7EnjAGF";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["bd3_Data"];
Game.DirSymlinkExclusions = ["bd3_Data\\Plugins"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_api.dll", "steam_appid.txt", "dinput8.dll", "xinput1_3.dll"];
Game.GameName = "bit Dungeon III";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "bd3.exe";
Game.SteamID = "856210";
Game.GUID = "bit Dungeon III";
Game.MaxPlayers = 5;
Game.MaxPlayersOneMonitor = 5;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "bd3";
Game.SendFakeFocusMsg = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput1_4.dll", "xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.BlockRawInput = false;
Game.UserProfileSavePath = "AppData\\LocalLow\\KintoGames\\bd3";
Game.Description =
  "To co-op with the other players use the crystal in your inventory. You can access each instance save file via Nucleus, after the first launch click game options/open user profile save path in the UI. Click on or alt-tab to the keyboard/mouse instance to control it. Use the mouse cursor to select a save if you have trouble selecting it with gamepad.";
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var Args = (Context.Args = " -screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height);

  Context.StartArguments = Args;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\KintoGames\\bd3", "currentresolutuion_h2338577015", Context.Width + "x" + Context.Height, Nucleus.RegType.Binary);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\KintoGames\\bd3", "Fullscreen_h2248877754", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\KintoGames\\bd3", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\KintoGames\\bd3", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\KintoGames\\bd3", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\KintoGames\\bd3", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);
};
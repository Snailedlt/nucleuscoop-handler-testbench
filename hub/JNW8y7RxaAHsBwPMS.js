Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Sat Mar 20 2021 02:52:21 GMT+0000 (UTC).
Hub.Handler.Id = "JNW8y7RxaAHsBwPMS";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.FileSymlinkExclusions = ["steam_appid.txt"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.CreateSteamAppIdByExe = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "SYNTHETIK Arena.exe";
Game.SteamID = "984110";
Game.GUID = "SYNTHETIK Arena";
Game.GameName = "SYNTHETIK: Arena";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Synthetik";
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Local\\Synthetik";
Game.Description =
  "Make sure to set your main game to windowed first. Once you run via Nucleus press a keyboard key in both instances to get past the title screen, to connect the instances create a password lobby in one instance and join in the other using the mouse cursor to control both instances, alt-tab between the instances to do this, disable gamepads in the game settings if you can't write with the keyboard, after joining the same lobby enable gamepad in the game options in both instances if you are using gamepads. If the windows reposition to the center after you die press CTRL+T to minimize the windows and press it again to fix the positioning. Each instance has its own save that are copies of your original one, so your original save will not be overwritten. You can access these saves in the app, after the first launch click game options/open user profile save path in the UI.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\Settings.sav";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "allowLAN=", Nucleus.SearchType.StartsWith) + '|allowLAN="1.000000"',
    Context.FindLineNumberInTextFile(txtPath, "allowP2P=", Nucleus.SearchType.StartsWith) + '|allowP2P="1.000000"',
    Context.FindLineNumberInTextFile(txtPath, "startfullscreen=", Nucleus.SearchType.StartsWith) + '|startfullscreen="0.000000"',
    Context.FindLineNumberInTextFile(txtPath, "fullscreen=", Nucleus.SearchType.StartsWith) + '|fullscreen="0.000000"'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);
};
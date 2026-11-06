Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Wed Oct 20 2021 05:57:28 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "Cc8WXwuqza5CJmpRn";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

Game.ExecutableContext = ["ForsakenEX.kpf"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.ExecutableName = "selkis_x64.exe";
Game.SteamID = "668980";
Game.GUID = "Forsaken Remastered";
Game.GameName = "Forsaken Remastered";
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 16;
Game.MaxPlayers = 16;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Forsaken EX";
Game.HasDynamicWindowTitle = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_4.dll"];
Game.SupportsKeyboard = true;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Roaming\\Nightdive Studios\\Forsaken EX";
Game.Description =
  'Requires the Steam version. Host with one player and join with the rest. Run your main game at least once before using this. Alt-Tab to the kb/m instance if you can not control it. If you have issues while using DS4Windows with 3 more or gamepad players, use the "Hide DS4 Controller" setting, just make sure to disable it once you are finished playing.';
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\kexengine.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "seta v_windowed", Nucleus.SearchType.StartsWith) + '|seta v_windowed "1"',
    Context.FindLineNumberInTextFile(txtPath, "seta v_height", Nucleus.SearchType.StartsWith) + '|seta v_height "' + Context.Height + '" ',
    Context.FindLineNumberInTextFile(txtPath, "seta v_width", Nucleus.SearchType.StartsWith) + '|seta v_width "' + Context.Width + '" '
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  if (Context.PlayerID > 0) {
    var dict = [Context.FindLineNumberInTextFile(txtPath, "seta snd_musicvolume", Nucleus.SearchType.StartsWith) + '|seta snd_musicvolume "0.000000"'];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  if (Context.HasKeyboardPlayer == true) {
    Game.PreventWindowDeactivation = true;
    Game.KeyboardPlayerSkipPreventWindowDeactivate = true;
  } else {
    Game.FakeFocus = true;
  }
};
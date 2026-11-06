Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Thu Jun 20 2024 20:26:45 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "H6RyEAmSXzxbesuZc";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("Keep aspect ratio?", "Maintains the game window default aspect ratio to avoid stretching in split-screen.", "Ratio", answers1);

Game.ExecutableContext = ["assets"];
Game.FileSymlinkExclusions = ["options.txt", "dinput8.dll", "xinput1_3.dll", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = ["controls.txt"];
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.KeepSymLinkOnExit = false;
Game.ExecutableName = "MMX.exe";
Game.GUID = "Mega Man X Online Deathmatch";
Game.GameName = "Mega Man X Online: Deathmatch";
Game.MaxPlayers = 10;
Game.MaxPlayersOneMonitor = 10;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "MMX Online: Deathmatch";
Game.FakeFocus = true;
Game.FakeFocusInterval = 10000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = false;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = true;
Game.Hook.XInputEnabled = true;
Game.UseDevReorder = true;
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileSavePath = "Documents\\MMXOD";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "MMX fan game: https://gamemaker19.github.io/MMXOnlineDesktop/. On first run quickly click ok on the prompt about saving in your documents folder. Create a private or public match in one instance and join in the others, press the escape key in the join match menu to join private rooms, alt-tab between the instances orclick on them to use the keyboard in all. You can change your name and region per instance in the game settings-general settings. To connect via LAN for smoother gameplay download the Relay Server files: https://gamemaker19.github.io/MMXOnlineDesktop/tools.html , write the version of the game you have inside overrideversion.txt (e.g. 19.12) then run the RelayServer.exe. Leave the server window open, launch multiple instances via Nucleus then create a LAN game in one instance and join in the others in the join match menu, press escape and write the IP 127.0.0.1 if you can not see the LAN game, alt-tab to an instance to do this. This handler also supports dinput gamepads, xinput emulators are not needed. Xbox One gamepads could have issues with background input/focus because of this: http://www.snes9x.com/phpbb3/viewtopic.php?t=27510.";
Game.PauseBetweenProcessGrab = 3;
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var ratio = Context.Options["Ratio"];

  if (ratio == "Yes") {
    Game.KeepMonitorAspectRatio = true;
    Game.IgnoreWindowBorderCheck = true;
    Context.HideDesktop();
    Context.HideTaskBar();
  }

  if (ratio == "No") {
    Game.ResetWindows = true;
  }
};
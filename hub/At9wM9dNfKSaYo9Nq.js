Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sat Jul 04 2020 22:05:46 GMT+0000 (UTC).
Hub.Handler.Id = "At9wM9dNfKSaYo9Nq";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = [
  "Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv132\\Win64",
  "CyberdimensionNeptunia4GoddessesOnline\\Binaries\\Win64",
  "CyberdimensionNeptunia4GoddessesOnline\\Content\\Sound"
];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "logo.usm", "OP.usm"];
Game.KillMutex = ["UnrealEngine4"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.SupportsKeyboard = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "CyberdimensionNeptunia4GoddessesOnline-Win64-Shipping.exe";
Game.SteamID = "632350";
Game.GUID = "Cyberdimension Neptunia 4 Goddesses Online";
Game.GameName = "Cyberdimension Neptunia: 4 Goddesses Online";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "CyberdimensionNeptunia4GoddessesOnline\\Binaries\\Win64";
Game.LauncherTitle = "";
Game.HideTaskbar = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Cyberdimension Neptunia: 4 Goddesses Online";
Game.Hook.DInputForceDisable = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.PreventWindowDeactivation = false;
Game.HookInit = true;
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.PromptBetweenInstances = true;
Game.WindowStyleValues = ["~0xC00000", "~0x40000", "~0x20000000", "~0x20000", "~0x80000", "0x40000000"];
Game.ExtWindowStyleValues = ["~0x00000001", "~0x00000200", "~0x00020000"];
Game.UserProfileSavePath = "AppData\\Local\\CyberdimensionNeptunia4GoddessesOnline\\Saved\\SaveGames";
Game.Description =
  "Set your main game to windowed first. This game takes a few minutes to boot up, do not press the prompt to open the next instance until you are in the title screen. Use different save slots per instance and connect to the other players using the bulletin board available after the tutorial stage. If the windows distort after you alt-tab to them press the shortcut CTRL+T to minimize the windows and press it again to fix them. You can change the FOV in the game display settings.";
Game.PauseBetweenStarts = 40;

Game.Play = function() {
  var Args = (Context.Args = " -windowed " + " -ResX= " + Context.Width + " -ResY= " + Context.Height);

  Context.StartArguments = Args;

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\CyberdimensionNeptunia4GoddessesOnline\\Content\\Sound\\logo.usm");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "logo.usm");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\CyberdimensionNeptunia4GoddessesOnline\\Content\\Sound\\OP.usm");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "OP.usm");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
};
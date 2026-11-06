Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Sat Jul 17 2021 09:17:10 GMT+0000 (UTC).
Hub.Handler.Id = "MMyQHATZcspSEqHMY";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.KillMutex = ["FarCry2Instance"];
Game.DirSymlinkExclusions = ["bin"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = false;
Game.CreateSteamAppIdByExe = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "farcry2.exe";
Game.SteamID = "19900";
Game.GUID = "Far Cry 2";
Game.GameName = "Far Cry 2: Fortune's Edition";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.BinariesFolder = "bin";
Game.LauncherTitle = "splashscreen";
Game.HideTaskbar = false;
Game.StartArguments = "-RenderProfile_Fullscreen 0 -GameProfile_SkipIntroMovies 1";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Far Cry 2";
Game.PreventWindowDeactivation = true;
Game.KeyboardPlayerSkipPreventWindowDeactivate = true;
Game.ResetWindows = true;
Game.SetWindowHook = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.DocumentsSavePath = "My Games\\Far Cry 2\\Saved Games";
Game.DocumentsConfigPath = "My Games\\Far Cry 2";
Game.Description =
  "GoG version only. Create a LAN match in one instance and join in the others. Press a button in your respective controller when an instance reaches the title screen to restrict the gamepads correctly. Lauch another instance with the prompt until the previous one has repositioned and lost borders correctly. Alt-Tab to the keyboard instance to control it if you launch one. Reduce game graphics in your main game to improve performance.";
Game.PromptBetweenInstances = true;
Game.PauseBetweenProcessGrab = 35;
Game.PauseBetweenStarts = 40;

Game.Play = function() {
  var savePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Games\\Far Cry 2\\GamerProfile.xml";
  Context.ChangeXmlAttributeValue(savePath, "//RenderProfile", "ResolutionX", Context.Width);
  Context.ChangeXmlAttributeValue(savePath, "//RenderProfile", "ResolutionY", Context.Height);
  Context.ChangeXmlAttributeValue(savePath, "//quality", "ResolutionX", Context.Width);
  Context.ChangeXmlAttributeValue(savePath, "//quality", "ResolutionY", Context.Height);
  Context.ChangeXmlAttributeValue(savePath, "//Account", "Name", Context.Nickname);
};
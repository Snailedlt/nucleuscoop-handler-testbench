Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Fri Feb 14 2020 09:08:49 GMT+0000 (UTC).
Hub.Handler.Id = "RAe3Gi2fmbufyHwM7";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "video_cfg.xml"];
Game.KillMutex = ["final_exam_lock"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "final_exam.exe";
Game.SteamID = "233190";
Game.GUID = "Final Exam";
Game.GameName = "Final Exam";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "";
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.StartArguments = "-window";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Final Exam";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.HookFocus = true;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\233190\\remote";
Game.ResetWindows = true;
Game.Description = "Press NO very quickly if a prompt about not closing the game correctly appears or windows will not resize correctly.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\video_cfg.xml");
  var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "video_cfg.xml");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var path = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\video_cfg.xml";
  Context.ChangeXmlAttributeValue(path, "//VideoModeWidth", "value", Context.Width);
  Context.ChangeXmlAttributeValue(path, "//VideoModeHeight", "value", Context.Height);
  Context.ChangeXmlAttributeValue(path, "//Windowed", "value", 1);
};

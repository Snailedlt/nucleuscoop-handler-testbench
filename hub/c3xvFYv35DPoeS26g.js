Hub.Handler.Version = 6; // Released at https://hub.splitscreen.me/ on Tue Oct 07 2025 09:34:44 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "c3xvFYv35DPoeS26g";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["1.kupack"];
Game.DirExclusions = ["settings", "steam_settings"];
Game.FileSymlinkExclusions = ["steam_666.dll", "steam_appid.txt", "local_save.txt", "ColdClientLoader.ini", "steamclient64.dll", "steamclient.dll", "steamclient_loader.exe"];
Game.FileSymlinkCopyInstead = [
  "steam_api.dll",
  "acknex.dll",
  "acknex.wdf",
  "d3dcompiler_42.dll",
  "d3dx9_30.dll",
  "d3dx9_32.dll",
  "d3dx9_42.dll",
  "data.wrs",
  "kuSound.dll",
  "loca.wrs",
  "map3Progress.pak",
  "pogoMain.dll",
  "pogoSound.dll",
  "pogoXinput.dll",
  "tex.wrs"
];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergExperimentalSteamClient = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.HardcopyGame = false;
Game.ExecutableName = "Pogostuck.exe";
Game.SteamID = "688130";
Game.GUID = "Pogostuck";
Game.GameName = "Pogostuck: Rage With Your Friends";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Pogostuck";
Game.FakeFocus = true;
Game.FakeFocusInterval = 10000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileConfigPath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\688130\\remote";
Game.Description =
  "CLOSE Steam completely before running this. Select a map and after it starts the other players select the same map and they will join automatically. Only working with legit Steam version.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  //Context.CopyScriptFolder(Context.GetFolder(Nucleus.Folder.InstancedGameFolder));
};
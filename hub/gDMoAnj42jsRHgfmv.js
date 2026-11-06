Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sun May 23 2021 00:06:54 GMT+0000 (UTC).
Hub.Handler.Id = "gDMoAnj42jsRHgfmv";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["Underlings.pck"];
Game.DirSymlinkCopyInstead = ["Saves\\Multiplayer"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = ["config.cfg"];
Game.DirSymlinkCopyInsteadIncludeSubFolders = true;
Game.GameName = "Underlings";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "Underlings.exe";
Game.SteamID = "1370040";
Game.GUID = "Underlings";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.NeedsSteamEmulation = false;
Game.CreateSteamAppIdByExe = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Underlings";
Game.FakeFocus = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_4.dll"];
Game.UseForceBindIP = true;
Game.Description =
  "Host a multiplayer world in one instance and join in the others via IP by writing localhost. Your saves per instance will be inside Nucleus content folder so be careful about deleting the Underlings instances folders there. Press the END key in your keyboard to unlock the input and the main cursor when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances.";
Game.KeepSymLinkOnExit = true;
Game.PauseBetweenStarts = 25;

Game.SupportsMultipleKeyboardsAndMice = true;

Game.HookSetCursorPos = true;
Game.HookGetCursorPos = true;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = false;
Game.HookGetKeyboardState = false;
Game.HookFilterRawInput = true;
Game.HookFilterMouseMessages = false;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = false;

Game.SendNormalMouseInput = true;
Game.SendNormalKeyboardInput = true;
Game.SendScrollWheel = true;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = true;
Game.HookReRegisterRawInputMouse = true;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = true;
Game.DrawFakeMouseCursorForControllers = true;
Game.UpdateFakeMouseWithInternalInput = true;
Game.LockInputAtStart = true;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\config.cfg");
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("profile", "name", '"' + Context.Nickname + '"'), new Nucleus.IniSaveInfo("settings", "window", "2")]);
};
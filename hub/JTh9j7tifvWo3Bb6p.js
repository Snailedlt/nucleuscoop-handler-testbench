Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Fri May 22 2020 21:42:44 GMT+0000 (UTC).
Hub.Handler.Id = "JTh9j7tifvWo3Bb6p";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "DoorKickers.exe";
Game.SteamID = "248610";
Game.GUID = "Door Kickers";
Game.GameName = "Door Kickers";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "";
Game.LauncherTitle = "";
Game.SupportsPositioning = true;
Game.ForceFinishOnPlay = true;
Game.StartArguments = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "DoorKickers";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.FakeFocus = true;
Game.HookFocus = true;
Game.UserProfileSavePath = "Documents\\KillHouseGames\\DoorKickers";
Game.Description =
  "Use the online co-op mode to connect the instances. Multiple Keyboards/mice only. Press the END key in your keyboard to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances. Each instance has its own saves that are copies of your original ones. You can access these saves in the app, after the first launch click game options/open user profile save path in the UI.";
Game.PauseBetweenStarts = 30;

Game.SupportsMultipleKeyboardsAndMice = true;

Game.HookSetCursorPos = true;
Game.HookGetCursorPos = true;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = true;
Game.HookGetKeyboardState = false;
Game.HookFilterRawInput = false;
Game.HookFilterMouseMessages = false;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = false;

Game.SendNormalMouseInput = true;
Game.SendNormalKeyboardInput = true;
Game.SendScrollWheel = true;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = true;
Game.LockInputAtStart = true;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  var path = Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\options.xml";
  Context.ChangeXmlAttributeValue(path, "//Video", "width", Context.Width);
  Context.ChangeXmlAttributeValue(path, "//Video", "height", Context.Height);
  Context.ChangeXmlAttributeValue(path, "//Video", "mode", "0");
  Context.ChangeXmlAttributeValue(path, "//Video", "stretchToFit", "0");
  Context.ChangeXmlAttributeValue(path, "//Video", "skipLogo", "true");

  if (Player.Owner.IsDualVertical()) {
    var path = Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\options.xml";
    Context.ChangeXmlAttributeValue(path, "//Video", "width", Context.Width);
    Context.ChangeXmlAttributeValue(path, "//Video", "height", Context.Height);
    Context.ChangeXmlAttributeValue(path, "//Video", "mode", "0");
    Context.ChangeXmlAttributeValue(path, "//Video", "stretchToFit", "1");
    Context.ChangeXmlAttributeValue(path, "//Video", "skipLogo", "true");
  }

  if (Player.Owner.IsDualHorizontal()) {
    var path = Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\options.xml";
    Context.ChangeXmlAttributeValue(path, "//Video", "width", Context.Width);
    Context.ChangeXmlAttributeValue(path, "//Video", "height", Context.Height);
    Context.ChangeXmlAttributeValue(path, "//Video", "mode", "0");
    Context.ChangeXmlAttributeValue(path, "//Video", "stretchToFit", "1");
    Context.ChangeXmlAttributeValue(path, "//Video", "skipLogo", "true");
  }
};
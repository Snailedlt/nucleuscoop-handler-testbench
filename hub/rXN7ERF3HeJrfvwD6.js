Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Fri Dec 25 2020 16:59:32 GMT+0000 (UTC).
Hub.Handler.Id = "rXN7ERF3HeJrfvwD6";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("Use Flawless Widescreen?", "Select yes if you want to fix the letterboxing/pillarboxing.", "FW", answers1);

Game.DirSymlinkExclusions = ["savedata"];
Game.FileSymlinkExclusions = [
  "steam_api.dll",
  "steam_appid.txt",
  "XInput1_3.dll",
  "playdata00.pp",
  "playdata01.pp",
  "playdata02.pp",
  "playdata03.pp",
  "playdata04.pp",
  "playdata05.pp",
  "playdata06.pp",
  "playdata07.pp",
  "playdata08.pp",
  "playdata09.pp",
  "playdata10.pp",
  "playdata11.pp",
  "playdata12.pp",
  "playdata13.pp",
  "playdata14.pp",
  "playdata15.pp",
  "playdata16.pp",
  "playdata17.pp",
  "playdata18.pp",
  "playdata19.pp",
  "IconCFG.txt",
  "sysdata.cfg"
];
Game.FileSymlinkCopyInstead = ["BinaryDomainConfiguration.exe", "UserCFG.txt"];
Game.KillMutex = ["Binary_Domain"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "binarydomain.exe";
Game.SteamID = "203750";
Game.GUID = "Binary Domain";
Game.GameName = "Binary Domain";
Game.MaxPlayers = 10;
Game.MaxPlayersOneMonitor = 10;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
//Game.NotTopMost = true;
Game.StartArguments = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "SEGA Binary Domain - PC";
Game.HasDynamicWindowTitle = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.UseAlpha8CustomDll = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput9_1_0.dll"];
Game.FakeFocus = true;
Game.HookFocus = true;
Game.Description =
  "For versus mode host a private match instead of a public one. Select the Flawless Widescreen option in the UI if you want to remove the black bars in splitscreen. Each instance savedata is inside the savedata folder in Nucleus instances folders. If you use keyboards and mice after the instances open press the END key to lock the input for all instances to have their own cursor. Press the END key again to unlock the input. You can also use CTRL+Q to close Nucleus and all its instances. If you use the FWS option you will get a message saying it can't find the Flawless Widescreen module, click ok and FWS will open, in the list of modules select the Binary Domain one, once it is installed close FWS and the instances will open. Once the last instance opens FWS will open again and the patches to remove blackbars should apply automatically, if they don't apply automatically after FWS opens the second time just select the new instances modules that Nucleus created in the FWS UI and they should enable. Use CTRL+T if Nucleus instances get in the way. If you want to change the icons in the game UI between gamepad and keyboard icons go to Nucleus content folder and open the Binary Domain configuration exe, in the tab input configuration scroll down and select the input display icons you want, you can do it per instance folder.";
Game.KeepSymLinkOnExit = true;
Game.GamePlayBeforeGameSetup = true;
Game.PauseBetweenStarts = 30;

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
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;
Game.LockInputAtStart = false;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\savedata\\UserCFG.txt";
  var dict = ['5|windowed="0"|windowed="1" '];

  Context.ReplacePartialLinesInTextFile(txtPath, dict);

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\savedata\\UserCFG.txt";
  var dict = ['4|    <resolution width="' + Context.Width + '" height="' + Context.Height + '" refresh="60" />'];

  Context.ReplaceLinesInTextFile(txtPath, dict);

  if (Context.IsKeyboardPlayer) {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\savedata\\UserCFG.txt";
    var dict = ['5|control_layout="1"|control_layout="0"'];

    Context.ReplacePartialLinesInTextFile(txtPath, dict);
  } else {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\savedata\\UserCFG.txt";
    var dict = ['5|control_layout="0"|control_layout="1"'];

    Context.ReplacePartialLinesInTextFile(txtPath, dict);
  }

  var fw = Context.Options["FW"];

  if (fw == "Yes") {
    Game.FlawlessWidescreen = "BinaryDomain";
  }

  if (fw == "No") {
  }
};
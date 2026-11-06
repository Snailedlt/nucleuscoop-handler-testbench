Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Thu Sep 09 2021 23:09:36 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "XHK9MzqToPd7T9HCT";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["Binaries", "Binaries\\SETTINGS"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "winmm.dll"];
Game.FileSymlinkCopyInstead = ["TKGRAPHICSSETTINGS.MXML", "TKGAMESETTINGS.MXML", "GCUSERSETTINGSDATA.MXML"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.UseSteamStubDRMPatcher = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "NMS.exe";
Game.SteamID = "275850";
Game.GUID = "No Mans Sky";
Game.GameName = "No Man's Sky";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "Binaries";
Game.LauncherTitle = "";
Game.StartArguments = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "No Man's Sky";
Game.SendFakeFocusMsg = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_4.dll", "xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.KeepSymLinkOnExit = false;
Game.UserProfileSavePath = "AppData\\Roaming\\HelloGames\\NMS";
Game.Description =
  "IMPORTANT: Only working with the old version of the game that uses steamworks online API for multiplayer. Start a game in one instance and join in the others in the multiplayer option.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var path = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\SETTINGS\\TKGRAPHICSSETTINGS.MXML";
  Context.ChangeXmlAttributeValue(path, "//Property[contains(@name,'FullScreen')]", "value", "false");
  Context.ChangeXmlAttributeValue(path, "//Property[contains(@name,'Borderless')]", "value", "false");
  Context.ChangeXmlAttributeValue(path, "//Property[contains(@name,'ResolutionWidth')]", "value", Context.Width);
  Context.ChangeXmlAttributeValue(path, "//Property[contains(@name,'ResolutionHeight')]", "value", Context.Height);

  var path = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\SETTINGS\\GCUSERSETTINGSDATA.MXML";
  Context.ChangeXmlAttributeValue(path, "//Property[contains(@name,'VoiceChat')]", "value", "false");

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\steam_settings\\controller");
  System.IO.Directory.CreateDirectory(filePath);

  var nolan = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\disable_lan_only.txt";
  var lines = [""];
  Context.WriteTextFile(nolan, lines);

  var nolay = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\steam_settings\\disable_overlay.txt";
  var lines = [""];
  Context.WriteTextFile(nolay, lines);

  var steaminput = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\steam_settings\\controller\\BuildMenuAnalogueRotate.txt";
  var lines = [
    "build_arot1=LBUMPER",
    "build_arot2=RBUMPER",
    "build_arot_right_z=DLJOYRIGHT",
    "build_arot_left_z=DLJOYLEFT",
    "fire=DRTRIGGER",
    "build_scaleup=DUP",
    "build_scaledown=DDOWN",
    "build_arotright=DRIGHT",
    "build_arotleft=DLEFT",
    "Camera=RJOY=joystick_move"
  ];
  Context.WriteTextFile(steaminput, lines);

  var steaminput = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\steam_settings\\controller\\FRONTEND.txt";
  var lines = [
    "quitmenu=START",
    "skipmessage=BACK",
    "Inventory=BACK",
    "char_show=LBUMPER",
    "left=LBUMPER",
    "right=RBUMPER",
    "menu_delete=X,RSTICK",
    "netretry=LSTICK,Y",
    "Move=LJOY=joystick_move",
    "SELECT=A",
    "menu_canceldelete=B",
    "Back=B",
    "Exit=B",
    "menu_upload=X",
    "inventory_swap=X",
    "menu_transfer=Y",
    "shop_buy_sell=Y",
    "alt_up=DUP",
    "up=DUP",
    "Down=DDOWN",
    "alt_down=DDOWN",
    "alt_right=DRIGHT",
    "alt_left=DLEFT",
    "confirmdelete=RSTICK",
    "char_cam=RJOY=joystick_move"
  ];
  Context.WriteTextFile(steaminput, lines);

  var steaminput = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\steam_settings\\controller\\GalacticMap.txt";
  var lines = [
    "Exit=START",
    "boost=RBUMPER",
    "screenshot=A",
    "scan=LSTICK",
    "Move=LJOY=joystick_move",
    "SELECT=A",
    "Back=B",
    "fire=X",
    "expand=Y",
    "Down=DLTRIGGER",
    "up=DRTRIGGER",
    "alt_down=DUP",
    "alt_up=DDOWN",
    "alt_right=DRIGHT",
    "alt_left=DLEFT",
    "home=RSTICK",
    "Camera=RJOY=joystick_move"
  ];
  Context.WriteTextFile(steaminput, lines);

  var steaminput = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\steam_settings\\controller\\OnFootControls.txt";
  var lines = [
    "pause_menu=START",
    "Inventory=BACK",
    "skipmessage=BACK",
    "alt_fire=LBUMPER",
    "melee=RBUMPER",
    "zoom=A,RSTICK",
    "scan=LSTICK",
    "Move=LJOY=joystick_move",
    "jump=A",
    "interactsecondary=A",
    "swap_secondary=B",
    "Back=B",
    "interact=X",
    "placemarker=X",
    "tagmarker=X",
    "reload=X",
    "swap_weapon=Y",
    "analysis=DLTRIGGER",
    "fire=DRTRIGGER",
    "build_menu=DUP",
    "quick_menu=DDOWN",
    "bin_nextmode=DRIGHT",
    "showhud=DLEFT",
    "deconstruct=RSTICK",
    "boost=RSTICK",
    "Camera=RJOY=joystick_move"
  ];
  Context.WriteTextFile(steaminput, lines);

  var steaminput = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\steam_settings\\controller\\OnFootQuickMenu.txt";
  var lines = [
    "pause_menu=START",
    "Inventory=BACK",
    "build_arot1=LBUMPER",
    "alt_down=LBUMPER",
    "rotate_left=LBUMPER",
    "build_arot2=RBUMPER",
    "alt_up=RBUMPER",
    "rotate_right=RBUMPER",
    "Delete=X,DLTRIGGER",
    "toggle_info=LSTICK",
    "Move=LJOY=joystick_move",
    "jump=A",
    "SELECT=A",
    "swap_secondary=B",
    "Back=B",
    "build_pinrecipe=X",
    "terrain_shape=X",
    "swap_weapon=Y",
    "build_switchbase=Y",
    "fire=DRTRIGGER",
    "up=DUP",
    "Down=DDOWN",
    "alt_right=DRIGHT",
    "ui_right=DRIGHT",
    "alt_left=DLEFT",
    "ui_left=DLEFT",
    "boost=RSTICK",
    "Camera=RJOY=joystick_move"
  ];
  Context.WriteTextFile(steaminput, lines);

  var steaminput = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\steam_settings\\controller\\PhotoModeMenu.txt";
  var lines = [
    "pause_menu=START",
    "Inventory=BACK",
    "ui_left=LBUMPER",
    "ui_right=RBUMPER",
    "Move=RJOY,LJOY=joystick_move",
    "SELECT=A",
    "Exit=B",
    "toggle_camera=X",
    "hide_hud=Y",
    "alt_up=DUP",
    "alt_down=DDOWN",
    "up=DRIGHT",
    "Down=DLEFT",
    "fire=RSTICK"
  ];
  Context.WriteTextFile(steaminput, lines);

  var steaminput = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\steam_settings\\controller\\PhotoModeMvCam.txt";
  var lines = [
    "pause_menu=START",
    "Inventory=BACK",
    "alt_left=LBUMPER",
    "alt_right=RBUMPER",
    "Move=LJOY=joystick_move",
    "SELECT=A",
    "Exit=B",
    "toggle_camera=X",
    "hide_hud=Y",
    "up=DUP",
    "Down=DDOWN",
    "fire=RSTICK",
    "Camera=RJOY=joystick_move"
  ];
  Context.WriteTextFile(steaminput, lines);

  var steaminput = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\steam_settings\\controller\\ShipControls.txt";
  var lines = [
    "pause_menu=START",
    "Inventory=BACK",
    "skipmessage=BACK",
    "left=LBUMPER",
    "right=RBUMPER",
    "scan=A,LSTICK",
    "pulse_jump=X",
    "ship_steer=LJOY=joystick_move",
    "fire=A",
    "boost=B",
    "Back=B",
    "land=X",
    "Exit=X",
    "tagmarker=X",
    "swap_weapon=Y",
    "brake=DLTRIGGER",
    "Forward=DRTRIGGER",
    "ship_targetcur=DUP",
    "quick_menu=DDOWN",
    "ship_targetnext=DRIGHT",
    "showhud=DLEFT",
    "ship_targetprev=DLEFT",
    "zoom=RSTICK",
    "Camera=RJOY=joystick_move"
  ];
  Context.WriteTextFile(steaminput, lines);

  var steaminput = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\steam_settings\\controller\\ShipQuickMenu.txt";
  var lines = [
    "pause_menu=START",
    "Inventory=BACK",
    "left=LBUMPER",
    "right=RBUMPER",
    "ship_steer=LJOY=joystick_move",
    "SELECT=A",
    "Back=B",
    "land=X",
    "braking=LTRIGGER=trigger",
    "acceleration=RTRIGGER=trigger",
    "up=DUP",
    "Down=DDOWN",
    "ui_right=DRIGHT",
    "ui_left=DLEFT",
    "Camera=RJOY=joystick_move"
  ];
  Context.WriteTextFile(steaminput, lines);

  var steaminput = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\steam_settings\\controller\\VehicleMode.txt";
  var lines = [
    "pause_menu=START",
    "Inventory=BACK",
    "boost=LBUMPER",
    "vehicle_placecheckpoint=RBUMPER",
    "scan=LSTICK",
    "vehicle_steer=LJOY=joystick_move",
    "jump=A",
    "vehicle_deletecheckpoint=B",
    "Back=B",
    "Exit=X",
    "tagmarker=X",
    "swap_weapon=Y",
    "fire=DRTRIGGER",
    "quick_menu=DDOWN",
    "showhud=DLEFT",
    "alt_fire=RSTICK",
    "Camera=RJOY=joystick_move"
  ];
  Context.WriteTextFile(steaminput, lines);

  if (Context.HasKeyboardPlayer !== true) {
    Game.SetForegroundWindowElsewhere = true;
  }
};
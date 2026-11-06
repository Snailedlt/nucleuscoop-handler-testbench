Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Sun May 28 2023 01:26:10 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "M2MbhbsjCj5Zj4vvg";
Hub.Maintainer.Name = "LordVGames";
Hub.Maintainer.Id = "r9YaWrFtkQWGHLaDX";

//#################### Game Info ####################
Game.ExecutableContext = ["Titanfall2.exe", "Northstar.dll", "R2Northstar"];
Game.GameName = "Titanfall 2";
Game.GUID = "Titanfall2";
Game.SteamID = "1237970";
Game.ExecutableName = "NorthstarLauncher.exe";
Game.LauncherTitle = "";
Game.HandlerInterval = 100;
Game.NeedsSteamEmulation = false;
Game.CreateSteamAppIdByExe = false;
Game.MaxPlayersOneMonitor = 4;
Game.MaxPlayers = 16;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Titanfall 2";
Game.DPIHandling = Nucleus.DPIHandling.InvScaled;
Game.IgnoreWindowBordercheck = true;
Game.SupportsPositioning = false;
Game.ProcessChangesAtEnd = false;
Game.Hook.FixPosition = false;
Game.Hook.FixResolution = false;
Game.ResetWindows = false;
Game.KeyboardPlayerFirst = true;
Game.PromptAfterFirstInstance = true;
Game.KillProcessesOnClose = ["connectinstances"]; //Get rid of the auto-connect ahk script if it's still running somehow

//#################### File System ####################
//TF|2's version of the "config.cfg", named "profile.cfg", is stored in the documents folder
Game.UseNucleusEnvironment = true;
Game.DocumentsConfigPath = "Respawn\\Titanfall2";
Game.SymlinkExe = true;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
//Not copying Northstar's core mods can make the game say that parts of it is missing/empty for some reason
Game.DirSymlinkCopyInstead = [
  "r2\\cfg",
  "R2Northstar\\mods\\Northstar.Custom\\keyvalues",
  "R2Northstar\\mods\\Northstar.CustomServers\\mod\\scripts",
  "R2Northstar\\mods\\Northstar.CustomServers\\mod\\cfg"
];
Game.DirSymlinkCopyInsteadIncludeSubFolders = true;
Game.FileSymlinkExclusions = ["xinput1_3.dll", "xinput9_1_0.dll", "LEGAL.txt", "r2.bat", "README.md", "LICENSE"];
Game.FileSymlinkCopyInstead = ["autoexec.cfg", "autoexec_ns_server.cfg"];
Game.DirExclusions = ["__overlay", "__Installer", "Support"];
Game.XInputPlusDll = ["xinput1_3.dll", "xinput9_1_0.dll"];
Game.Description =
  "NOTE: You will need either Origin or the EA app started up beforehand, logged in with the account that owns Titanfall 2.\n\n" +
  "Once the first instance has loaded into the chosen map, press OK on the prompt to start the rest of the instances up. " +
  "When the last instance has loaded into the main menu, press OK on the prompt to connect all the instances together. " +
  "After the auto-connect, if players need to re-join the server, they can do so via the server browser, or use the `con` command in the console. " +
  'The server created by the first instance is named "Nucleus Co-op server for *nickname*!".\n\n' +
  'Each player has their own "profile.cfg" file, meaning each player can make changes to their settings without affecting another player\'s file, or the original file. ' +
  'If a player wants their loadouts back, look on the thunderstore for a Northstar mod I made, and use a player\'s own "autoexec.cfg" file with it. ' +
  "If you want to play Frontier Defense, you'll need to have set it up beforehand. Here's a guide: https://pastebin.com/fRTzw1v3 \n\n" +
  'If you get an "INVALID_MASTERSERVER_TOKEN" error, it means either the Northstar masterserver is down, or you need to restart Origin or the EA app. ' +
  'If you get an "Authentication Failed" error when joining the splitscreen server through the server browser, you may have to connect with the "con" command instead. ' +
  "If you get that error when joining someone else's server, they likely don't allow no-auth connections, so you'll have to find one that does.";
Game.PauseBetweenStarts = 25;

Game.Hook.CustomDllEnabled = false;
Game.Hook.EnableMKBInput = true;
Game.SupportsMultipleKeyboardsAndMice = true;

//#region Deprecated options
Game.HookSetCursorPos = false;
Game.HookGetCursorPos = false;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = false;
Game.HookGetKeyboardState = false;
Game.HookFilterRawInput = false;
Game.HookFilterMouseMessages = false;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = false;
Game.SendNormalMouseInput = false;
Game.SendNormalKeyboardInput = false;
Game.SendScrollWheel = false;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.DrawFakeMouseCursor = false;
//#endregion

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = true;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = true;
Game.LockInputToggleKey = 0x23;

Game.ProtoInput.InjectStartup = true;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

// This hook should always be on, regardless of input lock
Game.ProtoInput.RegisterRawInputHook = true;

// This can always be enabled, since we are going to allow/disallow raw input with the bypass function
Game.ProtoInput.GetRawInputDataHook = true;

// We will be installing/uninstalling the filters manually so there's no need to
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;

// These aren't problematic to leave on, since the external "freeze fake input input" when real input ISN'T locked will prevent these from interfering
Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;

//#region Handled on input lock/unlock, don't enable this by default
//Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
//#endregion

Game.ProtoInput.AutoHideTaskbar = true;

Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS

Game.ProtoInput.RenameHandlesHook = false;
Game.ProtoInput.RenameHandles = [];
Game.ProtoInput.RenameNamedPipes = [];

// We can leave these on and not worry about input lock.
// It doesn't matter if controller input still works since it won't get in the way
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.UseDinputRedirection = false;

//#region The old Nucleus options. Don't use these with the Xinput hook
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
//#endregion

Game.SaveAndEditCustomUserGeneralValues = false;
Game.CustomUserGeneralPrompts = ["To start the game server with a password, enter it in the textbox. Leave it blank for no password."];

//#region ######## Options ########
var GamemodeAnswers = [
  "Skirmish",
  "Attrition",
  "Amped Hardpoint",
  "Bounty Hunt",
  "Capture the Flag",
  "Last Titan Standing",
  "Pilots vs. Pilots",
  "Live Fire",
  "Marked for Death",
  "Titan Brawl",
  "Free for All",
  "Free Agents",
  "Coliseum",
  "Aegis Titan Brawl",
  "Turbo Titan Brawl",
  "Aegis LTS",
  "Turbo LTS",
  "Rocket Arena",
  "The Great Bamboozle",
  "One in the Chamber",
  "The Hidden",
  "Sticks and Stones",
  "Frontier War",
  "Gun Game",
  "Titan Tag",
  "Infection",
  "Amped Killrace",
  "Fastball",
  "Hide and Seek",
  "Competitive CTF",
  "Titan Free for All",
  //Only works if manually setup beforehand as of 5/27/23
  "Frontier Defense: Easy",
  "Frontier Defense: Regular",
  "Frontier Defense: Hard",
  "Frontier Defense: Master"
];
Game.AddOption(
  "Gamemode",
  "Select the gamemode. Note that certain modes wil NOT work properly on certain maps. For example, titan-based modes will most likely not work on live fire maps, nor the coliseum maps.",
  "GamemodeOption",
  GamemodeAnswers
);

var TimeLimitAnswers = ["Use default", "10", "5", "15", "20", "25", "30", "60", "1 day"];
Game.AddOption("Match TimeLimit", "Match TimeLimit in minutes.", "TimeLimitOption", TimeLimitAnswers);

var ScoreLimitAnswers = ["Use default", "25", "5", "10", "15", "20", "30", "40", "50", "100", "200", "250", "300", "400", "500", "600", "700", "750", "1000", "9999"];
Game.AddOption(
  "Score limit",
  "The score/frag limit, based on the mode. Note that some gamemodes have score limits higher than others, i.e. attrition works best with a scorelimit of 500-750, while skirmish works best with a scorelimit of around 30.",
  "ScoreLimitOption",
  ScoreLimitAnswers
);

var YesNoAnswers = ["Yes", "No"];
var NoYesAnswers = ["No", "Yes"];

Game.AddOption("Out of bounds timer", "Should the out of bounds timer be enabled?", "OutOfBoundsEnabledOption", YesNoAnswers);
Game.AddOption("Map intro", "Should the map intro be enabled? This only works when starting a map through the lobby.", "ClassicMPEnabledOption", YesNoAnswers);
Game.AddOption("Dropship escape", "Should the dropship escape sequence be enabled? May only work in certain gamemodes.", "EpilogueEnabledOption", YesNoAnswers);
Game.AddOption(
  "Return to lobby",
  "Should the server return to the private lobby after a match is finished? If not, it will go to the next map/mode in the playlist.",
  "ReturnToLobbyOption",
  YesNoAnswers
);
Game.AddOption("Report to masterserver", "Should the server be shown in the public server browser?", "ReportToMasterserverOption", NoYesAnswers);

var MapList = [
  {
    Name: "None",
    Details: "Do not start the first instance in a map, and leave it in the main menu. You will then have to go into a private lobby for the other instances to join.",
    Console: "none",
    ImageUrl: ""
  },
  {
    Name: "Lobby",
    Details: "Start the first instance in the lobby. It isn't started in the private match lobby, so you must click on the 'Private Match' button to get into a joinable lobby.",
    Console: "mp_lobby",
    ImageUrl: "mapimgs\\lobby.png"
  },
  { Name: "Angel City", Details: "Start the first instance in the 'Angel City' map.", Console: "mp_angel_city", ImageUrl: "mapimgs\\angelcity.png" },
  { Name: "Black Water Canal", Details: "Start the first instance in the 'Black Water Canal' map.", Console: "mp_black_water_canal", ImageUrl: "mapimgs\\blackwatercanal.png" },
  { Name: "Boomtown", Details: "Start the first instance in the 'Boomtown' map.", Console: "mp_grave", ImageUrl: "mapimgs\\boomtown.png" },
  { Name: "Colony", Details: "Start the first instance in the 'Colony' map.", Console: "mp_colony02", ImageUrl: "mapimgs\\colony.png" },
  { Name: "Complex", Details: "Start the first instance in the 'Complex' map.", Console: "mp_complex3", ImageUrl: "mapimgs\\complex.png" },
  { Name: "Crashsite", Details: "Start the first instance in the 'Crashsite' map.", Console: "mp_crashsite3", ImageUrl: "mapimgs\\crashsite.png" },
  { Name: "DryDock", Details: "Start the first instance in the 'DryDock' map.", Console: "mp_drydock", ImageUrl: "mapimgs\\drydock.png" },
  { Name: "Eden", Details: "Start the first instance in the 'Eden' map.", Console: "mp_eden", ImageUrl: "mapimgs\\eden.png" },
  { Name: "Exoplanet", Details: "Start the first instance in the 'Exoplanet' map.", Console: "mp_thaw", ImageUrl: "mapimgs\\exoplanet.png" },
  { Name: "Forward Base Kodai", Details: "Start the first instance in the 'Forward Base Kodai' map.", Console: "mp_forwardbase_kodai", ImageUrl: "mapimgs\\forwardbasekodai.png" },
  { Name: "Glitch", Details: "Start the first instance in the 'Glitch' map.", Console: "mp_glitch", ImageUrl: "mapimgs\\glitch.png" },
  { Name: "Homestead", Details: "Start the first instance in the 'Homestead' map.", Console: "mp_homestead", ImageUrl: "mapimgs\\homestead.png" },
  { Name: "Relic", Details: "Start the first instance in the 'Relic' map.", Console: "mp_relic02", ImageUrl: "mapimgs\\relic.png" },
  { Name: "Rise", Details: "Start the first instance in the 'Rise' map.", Console: "mp_rise", ImageUrl: "mapimgs\\rise.png" },
  { Name: "Wargames", Details: "Start the first instance in the 'Wargames' map.", Console: "mp_wargames", ImageUrl: "mapimgs\\wargames.png" },
  { Name: "Deck", Details: "Start the first instance in the 'Deck' live fire map.", Console: "mp_lf_deck", ImageUrl: "mapimgs\\deck.png" },
  { Name: "Meadow", Details: "Start the first instance in the 'Meadow' live fire map.", Console: "mp_lf_meadow", ImageUrl: "mapimgs\\meadow.png" },
  { Name: "Stacks", Details: "Start the first instance in the 'Stacks' live fire map.", Console: "mp_lf_stacks", ImageUrl: "mapimgs\\stacks.png" },
  { Name: "Township", Details: "Start the first instance in the 'Township' live fire map.", Console: "mp_lf_township", ImageUrl: "mapimgs\\township.png" },
  { Name: "Traffic", Details: "Start the first instance in the 'Traffic' live fire map.", Console: "mp_lf_traffic", ImageUrl: "mapimgs\\traffic.png" },
  { Name: "UMA", Details: "Start the first instance in the 'UMA' live fire map.", Console: "mp_lf_uma", ImageUrl: "mapimgs\\uma.png" },
  { Name: "The Coliseum", Details: "Start the first instance in the 'The Coliseum' coliseum map.", Console: "mp_coliseum", ImageUrl: "mapimgs\\coliseum.png" },
  { Name: "Pillars", Details: "Start the first instance in the 'Pillars' coliseum map.", Console: "mp_coliseum_column", ImageUrl: "mapimgs\\pillars.png" }
];

Game.AddOption("Starting Map", "The map the first instance will start in.", "MapName", MapList);
Game.ShowOptionAsStep("MapName", true, "Select a Map");
//#endregion

Game.Play = function() {
  Context.RunAdditionalFiles(["2|" + Game.Folder + "\\connectinstances.exe"], false, 0); //Start our auto-connect ahk script once the first instance is already up

  //#region ################### File, folder and options setup ####################
  var InstanceFolder = Context.GetFolder(Nucleus.Folder.InstancedGameFolder);
  var CfgFolder = InstanceFolder + "\\r2\\cfg";
  var AutoexecFile = CfgFolder + "\\autoexec.cfg";
  var ServerOverrideCfgFile = CfgFolder + "\\nucleusconfig_server.cfg";

  if (System.IO.File.Exists(AutoexecFile)) {
    //The real autoexec file exists somewhere else
    //But if someone made their own version in the cfg folder, we'll back it up
    System.IO.File.Copy(AutoexecFile, CfgFolder + "\\autoexec_original.cfg", true);
  }

  var TimeLimitChoice = Context.Options["TimeLimitOption"];
  var ScoreLimitChoice = Context.Options["ScoreLimitOption"];
  var OutOfBoundsEnabledChoice = Context.Options["OutOfBoundsEnabledOption"];
  var ClassicMPEnabledChoice = Context.Options["ClassicMPEnabledOption"];
  var EpilogueEnabledChoice = Context.Options["EpilogueEnabledOption"];
  var ReturnToLobbyChoice = Context.Options["ReturnToLobbyOption"];
  var ReportToMasterserverChoice = Context.Options["ReportToMasterserverOption"];
  var GamemodeChoice = "";
  switch (Context.Options["GamemodeOption"]) {
    case "Skirmish":
      GamemodeChoice = "tdm";
      break;
    case "Attrition":
      GamemodeChoice = "aitdm";
      break;
    case "Amped Hardpoint":
      GamemodeChoice = "cp";
      break;
    case "Bounty Hunt":
      GamemodeChoice = "at";
      break;
    case "Capture the Flag":
      GamemodeChoice = "ctf";
      break;
    case "Last Titan Standing":
      GamemodeChoice = "lts";
      break;
    case "Pilots vs. Pilots":
      GamemodeChoice = "ps";
      break;
    case "Live Fire":
      GamemodeChoice = "speedball";
      break;
    case "Marked for Death":
      GamemodeChoice = "mfd";
      break;
    case "Titan Brawl":
      GamemodeChoice = "ttdm";
      break;
    case "Free for All":
      GamemodeChoice = "ffa";
      break;
    case "Free Agents":
      GamemodeChoice = "fra";
      break;
    case "Coliseum":
      GamemodeChoice = "coliseum";
      break;
    case "Aegis Titan Brawl":
      GamemodeChoice = "attdm";
      break;
    case "Turbo Titan Brawl":
      GamemodeChoice = "turbo_ttdm";
      break;
    case "Aegis LTS":
      GamemodeChoice = "alts";
      break;
    case "Turbo LTS":
      GamemodeChoice = "turbo_lts";
      break;
    case "Rocket Arena":
      GamemodeChoice = "rocket_lf";
      break;
    case "The Great Bamboozle":
      GamemodeChoice = "holopilot_lf";
      break;
    case "One in the Chamber":
      GamemodeChoice = "chamber";
      break;
    case "The Hidden":
      GamemodeChoice = "hidden";
      break;
    case "Sticks and Stones":
      GamemodeChoice = "sns";
      break;
    case "Frontier War":
      GamemodeChoice = "fw";
      break;
    case "Gun Game":
      GamemodeChoice = "gg";
      break;
    case "Titan Tag":
      GamemodeChoice = "tt";
      break;
    case "Infection":
      GamemodeChoice = "inf";
      break;
    case "Amped Killrace":
      GamemodeChoice = "kr";
      break;
    case "Fastball":
      GamemodeChoice = "fastball";
      break;
    case "Hide and Seek":
      GamemodeChoice = "hs";
      break;
    case "Competitive CTF":
      GamemodeChoice = "ctf_comp";
      break;
    case "Titan Free for All":
      GamemodeChoice = "tffa";
      break;
    case "Frontier Defense: Easy":
      GamemodeChoice = "fd_easy";
      break;
    case "Frontier Defense: Regular":
      GamemodeChoice = "fd_normal";
      break;
    case "Frontier Defense: Hard":
      GamemodeChoice = "fd_hard";
      break;
    case "Frontier Defense: Master":
      GamemodeChoice = "fd_master";
      break;
    case "Frontier Defense: Insane":
      GamemodeChoice = "fd_insane";
      break;
  }
  //#endregion

  //#region ################### Config settings setup ####################
  //We insert a line into the autoexec_ns_server.cfg file to exec our own cfg to override the original cfg's cvars
  //Searching for the end of a comment on the last line in the file
  var EndOfServerConfig = Context.FindLineNumberInTextFile(
    InstanceFolder + "\\R2Northstar\\mods\\Northstar.CustomServers\\mod\\cfg\\autoexec_ns_server.cfg",
    "client.dll edit",
    Nucleus.SearchType.Contains
  );
  //Replace it with itself + a line break and our line to exec our override cfg file
  Context.ReplacePartialLinesInTextFile(InstanceFolder + "\\R2Northstar\\mods\\Northstar.CustomServers\\mod\\cfg\\autoexec_ns_server.cfg", [
    EndOfServerConfig + "|client.dll edit|client.dll edit\nexec nucleusconfig_server"
  ]);

  var ReportToMasterserverResult;
  if (ReportToMasterserverChoice == "Yes") {
    ReportToMasterserverResult = "1";
  } else {
    ReportToMasterserverResult = "0";
  }

  var ServerOverrideCfgLines = [
    "ns_auth_allow_insecure 1",
    "ns_report_server_to_masterserver " + ReportToMasterserverResult,
    'ns_server_name "Nucleus Co-op server for ' + Context.Nickname + '!"',
    'ns_server_desc "Server for a nucleus co-op session for ' + Context.Nickname + '."'
  ];

  //Base autoexec lines
  if (Context.CustomUserGeneralValues[0] != null) {
    var ConnectAlias = 'alias con "connect ' + Context.LocalIP + ":37015 " + Context.CustomUserGeneralValues[0] + '"'; //alias-ed connect command w/ server password
  } else {
    var ConnectAlias = 'alias con "connect ' + Context.LocalIP + ':37015"'; //alias-ed connect command w/o server password
  }
  var AutoexecLines = [
    "exec autoexec_original",
    ConnectAlias,
    "not_focus_sleep 0", //This disables fps drop when not in focus
    "sound_without_focus 1",
    "ns_private_match_only_host_can_change_settings 1",
    "ns_private_match_only_host_can_start 1",
    "ns_private_match_countdown_length 5",
    "ns_allow_kill_commands 1",
    "exec autoexec_player" + (Context.PlayerID + 1)
  ];

  //Inserting cvars based on the nucleus options
  var MapInternalName = Context.Options["MapName"].Console;
  var IsMapInternalNameValid = MapInternalName != "none" && MapInternalName != "undefined";
  if (ReturnToLobbyChoice == "No") {
    ServerOverrideCfgLines.push("ns_should_return_to_lobby 0");
  } else {
    ServerOverrideCfgLines.push("ns_should_return_to_lobby 1");
  }
  if (Context.CustomUserGeneralValues[0] != null) {
    ServerOverrideCfgLines.push('ns_server_password "' + Context.CustomUserGeneralValues[0] + '"');
  }
  if (IsMapInternalNameValid) {
    AutoexecLines.push("ns_private_match_last_map " + MapInternalName);
  } else {
    Game.PromptAfterFirstInstance = true; //Give them time to get to the lobby by pausing before starting up the rest of the instances.
  }
  if (GamemodeChoice != "tdm") {
    AutoexecLines.push("ns_private_match_last_mode " + GamemodeChoice);
  }

  Context.WriteTextFile(AutoexecFile, AutoexecLines);
  Context.WriteTextFile(ServerOverrideCfgFile, ServerOverrideCfgLines);
  //#endregion

  //#region ################### Launch arguement setup ####################
  var BaseStartArgs =
    "-multiple -noborder -window -novid -nohltv -nomenuvid -allowdupeaccounts +exec autoexec -w " + Context.Width + " -h " + Context.Height + " -x " + Context.PosX + " -y " + Context.PosY;
  if (Context.PlayerID == 0) {
    //First instance is the one that auto-hosts
    var HostStartArgs = BaseStartArgs;
    HostStartArgs += " -clientport 37005"; //Different client port to have server visible + joinable for other instances through server browser

    //#region setplaylistvaroverrides
    HostStartArgs += ' +setplaylistvaroverrides "';
    if (TimeLimitChoice != "Use default") {
      if (TimeLimitChoice == "1 day") {
        TimeLimitChoice = "1440"; //1440 minutes is 24 hours
      }
      HostStartArgs += "timelimit " + TimeLimitChoice + " ";
    }
    if (OutOfBoundsEnabledChoice == "Yes") {
      HostStartArgs += "oob_timer_enabled 1 ";
    } else {
      HostStartArgs += "oob_timer_enabled 0 ";
    }
    if (ClassicMPEnabledChoice == "Yes") {
      HostStartArgs += "classic_mp 0 ";
    } else {
      HostStartArgs += "classic_mp 1 ";
    }
    if (EpilogueEnabledChoice == "Yes") {
      HostStartArgs += "run_epilogue 1";
    } else {
      HostStartArgs += "run_epilogue 0";
    }
    if (ScoreLimitChoice != "Use default") {
      HostStartArgs += "scorelimit " + ScoreLimitChoice + " ";
    }
    HostStartArgs += '"';
    //#endregion

    if (IsMapInternalNameValid) {
      HostStartArgs += " +map " + MapInternalName;
    }
    if (GamemodeChoice != "tdm") {
      Context.StartArguments = HostStartArgs + " +mp_gamemode " + GamemodeChoice;
    } else {
      Context.StartArguments = HostStartArgs;
    }
  } else {
    Context.StartArguments = BaseStartArgs; //I would use the +connect launch arg, but it doesn't work with northstar
  }
  //#endregion
};

Game.ProtoInput.OnInputLocked = function() {
  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];

    ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
    ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
    ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
    ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
    ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
    ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);

    ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

    ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);

    // Avoid the mouse move filter unless absolutely necessary as it can massively affect performance if the game gets primary input from mouse move moessages
    //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

    ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
    ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
    ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
    ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
    ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
    ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

    ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

    ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 5, true, true, true, true, true);

    // Disable the bypass: let the input be processed by Proto Input
    ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, false);
  }
};

Game.ProtoInput.OnInputUnlocked = function() {
  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];

    ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
    ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
    ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
    ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
    ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
    ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);

    // Intentionally disable focus so all the instances don't respond to input at the same time
    ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

    ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);

    // Intentionally disable focus so all the instances don't respond to input at the same time
    ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);

    // Enable the bypass: allow any raw input to pass
    ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, true);
  }
};
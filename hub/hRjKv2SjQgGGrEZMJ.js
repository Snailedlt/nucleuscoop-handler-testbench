Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Nov 16 2026 08:36:31 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "hRjKv2SjQgGGrEZMJ";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

const AUTO_DETECT = "Autodetect";
const XLLN = "XLiveLessNess";
const CHLOE = "Chloe Collection";
const modOptions = [AUTO_DETECT, XLLN, CHLOE];
Game.AddOption(
  "Select an option:",
  "Select [Chloe Collection]{https://gaycoderprincess.github.io/project/chloe-collection} ONLY if you have the mod installed already in your main game files. Run your main game with the mod and create an in-game profile before using this. To connect the instances using the Chloe Collection mod select multiplayer-online-create game in one instance and join in the others using the IP 127.0.0.1 after selecting join, alt-tab between instances to write with the keyboard. Use this mod if you have freezing/crashes in multiplayer with the default XLiveLessNess option.",
  "Mod",
  modOptions
);
const resolutionOptions = ["Auto", "2560 x 1440", "1920 x 1080", "960 x 1080", "1280 x 1024", "1920 x 540", "1280 x 540", "960 x 540", "640 x 540", "480 x 540"];
Game.AddOption(
  "Resolution of instances:",
  "Auto: Resolution is set to instance size. (Preferred)\r\n" +
    "Scenarios where you need to set a resolution manually:\r\n" +
    '* "Could not obtain native display resolution" error. Happens in some multi-monitor setups if the screen or game doesn\'t support the resolution.\r\n' +
    '* "Chloe Collection" mod. If the initial resolution changes and then resizes causing stretching, poor quality or absense of "Enter IP address" text.\r\n\r\n' +
    "Fix the above issues by setting a resolution value that the screen and game supports.",
  "Resolution",
  resolutionOptions
);
const NO_OVERRIDE = "No Override";
const antialiasingOptions = [NO_OVERRIDE, "0", "2", "4", "8"];
Game.AddOption("Antialiasing:", "Smooths jagged, stair-stepped edges.", "Antialiasing", antialiasingOptions);
const anisotropyOptions = [NO_OVERRIDE, "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"];
Game.AddOption("Anisotropy:", "Enhances the sharpness and clarity of textures.", "Anisotropy", anisotropyOptions);
const qualityPresetOptions = [NO_OVERRIDE, "Low", "Medium", "High"];
Game.AddOption("Quality Preset:", "Affects texture quality, view distance, reflection quality, shadow quality, and foliage quality.", "Quality Preset", qualityPresetOptions);
const volumeOptions = ["0", "5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60", "65", "70", "75", "80", "85", "90", "95", "100"];
Game.AddOption("Player 1 music volume:", "All other instances have the music muted.", "Music Volume", volumeOptions);
const vibrationOptions = ["TRUE", "FALSE"];
Game.AddOption("Enable controller vibration:", "", "Vibration", vibrationOptions);
const randModelOptions = ["False", "True"];
Game.AddOption(
  "Randomize Player Models:",
  "Gives each player a different player model.\r\n" + "Vanilla only has a male and female model.\r\n" + "Chloe Collection has 14 models.",
  "Randomize Models",
  randModelOptions
);
const chloeAutoFillIPOptions = ["TRUE", "FALSE"];
Game.AddOption("Chloe Collection - Auto fill local IP:", "", "Chloe Auto Fill IP", chloeAutoFillIPOptions);

Game.ExecutableContext = ["binkw32.dll"];
Game.DirExclusions = ["XLiveLessNess", "scripts"];
Game.DirSymlinkExclusions = [
  "Data\\music",
  "Data\\sound",
  "Data\\Video",
  "Savegame" //Chloe mod - exclude in chloe mod to get separate profiles and settings.
];
Game.DirSymlinkCopyInstead = [
  "Data\\music",
  "Data\\sound",
  "Savegame" //Chloe mod - copy the files when dir is symlink excluded.
];
Game.BackupFolders = ["Savegame"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "xlive.dll", "intro.bik", "dinput8.dll", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = [
  "binkw32.dll",
  //"data.bfs",
  "filesystem",
  "fmodex.dll",
  "fouc.exe.cfg",
  "langpack.bfs",
  "launcher.exe",
  "streamed.bfs"
];
Game.UseNucleusEnvironment = true;
Game.CreateSteamAppIdByExe = true;
//Game.SteamlessPatch = ["true", "--quiet --keepbind", "2500"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Fouc.exe";
Game.SteamID = "12360";
Game.GUID = "FlatOut Ultimate Carnage";
Game.GameName = "FlatOut: Ultimate Carnage Collector's Edition";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.LauncherTitle = "FlatOut Ultimate Carnage v1.0";
//Game.LauncherExe = "launcher.exe";
//Game.StartArguments = "-fromlauncher";
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "FlatOut Ultimate Carnage";
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.ResetWindows = false;
Game.SetForegroundWindowElsewhere = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileSavePath = "AppData\\Local\\FlatOut Ultimate Carnage\\Savegame";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "IMPORTANT: For the GFWL version of the game with multiplayer that you can get via the Steam betas tab if you have the game in Steam. When the FlatOut launcher opens quickly check windowed mode, select the resolution that matches the window size in the display mode option then click ok. Go to the live option and select create list play in one instance and connect to it in the others using the list play option. If you are using controllers make sure they are enabled in the game options-configure controls per instance otherwise they won't work in-game, you can also enable controller vibration in the controller options. To avoid stretching in split-screen you need to create custom resolutions in your AMD/Nvidia/Intel panel (for example for a 1920x1080 monitor add resolutions like: 960x1080, 960x540, 1920x540 etc.) so the game can see them and you can select them in the launcher. Connecting the instances in the same PC is only possible thanks to the great work of the [XLiveLessNess]{https://gitlab.com/GlitchyScripts/xlivelessness} devs.";
Game.ForceProcessPick = false;
Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenProcessGrab = 20;
Game.PauseBetweenStarts = 25;

//ProtoInput:

Game.SupportsMultipleKeyboardsAndMice = false;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = false;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = false;
Game.LockInputToggleKey = 0x23;

Game.ProtoInput.MessageFilterHook = false;
Game.ProtoInput.FocusHooks = false;
Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.MultipleProtoControllers = false;

Game.KillProcessesOnClose = ["AutoEnterIPFouc"];
//Shuffle player models outside of Game.Play so it is shuffled once.
//Function for shuffling an array.
const shuffleArray = function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};
//Shuffle player models for Chloe
let randomPortraits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; //There are 14 portraits and 25 models in Chloe collection.
shuffleArray(randomPortraits);

//Shuffle player models for XLiveLessNess
let randomXLiveModels = [0, 1];
shuffleArray(randomXLiveModels);

Game.Play = function() {
  //Throw an error if the user has the Steam "Default Public Version" installed.
  const filesystemPath = System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "filesystem");
  if (System.IO.File.Exists(filesystemPath)) {
    const reader = new System.IO.StreamReader(filesystemPath);
    let contents = reader.ReadToEnd();
    if (contents.indexOf("zoom_platform.bfs") !== -1) {
      throw 'Wrong version of "FlatOut: Ultimate Carnage"!\r\n' +
        "You need to install the GFWL version.\r\n" +
        "If you have the game in Steam you can get it like this:\r\n" +
        "Right click the game in the Steam Library -> Properties -> Game Versions & Betas -> gfwl";
    }
  }

  //get answers
  const modAnswer = Context.Options["Mod"];
  const p1Volume = Context.Options["Music Volume"];
  const vibration = Context.Options["Vibration"];
  const resolutionAnswer = Context.Options["Resolution"];
  const antialiasingAnswer = Context.Options["Antialiasing"];
  const anisotropyAnswer = Context.Options["Anisotropy"];
  const qualityPresetAnswer = Context.Options["Quality Preset"];
  const chloeAutoFillIPAnswer = Context.Options["Chloe Auto Fill IP"];
  const randModelsAnswer = Context.Options["Randomize Models"];

  //Detect mod. The user can also manually select the mod in the options.
  let mod = modAnswer;
  if (modAnswer === AUTO_DETECT) {
    const chloeFilePath = System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "FlatOutUCChloeCollection_gcp.asi");
    mod = System.IO.File.Exists(chloeFilePath) ? CHLOE : XLLN;
  }

  //Function for updating options.cfg
  const updateOptionsCfg = function(optionsCfgPath) {
    //Set windowed and vibration
    const dict = [
      Context.FindLineNumberInTextFile(optionsCfgPath, "Settings.Visual.Windowed =", Nucleus.SearchType.StartsWith) + "|Settings.Visual.Windowed = TRUE",
      Context.FindLineNumberInTextFile(optionsCfgPath, "Settings.Control.ForceFeedback =", Nucleus.SearchType.StartsWith) + "|Settings.Control.ForceFeedback = " + vibration
    ];

    //Set controller
    let settingsControllerGuid = "01010101010101010101010101010101"; // XBox gamepad
    let settingsController = 1; // gamepad
    if (Context.IsKeyboardPlayer) {
      settingsControllerGuid = "00000000000000000000000000000000"; // keyboard
      settingsController = 0; // keyboard
    }
    dict.push(
      Context.FindLineNumberInTextFile(optionsCfgPath, "Settings.Control.ControllerGuid =", Nucleus.SearchType.StartsWith) + '|Settings.Control.ControllerGuid = "' + settingsControllerGuid + '"',
      Context.FindLineNumberInTextFile(optionsCfgPath, "Settings.Control.Controller =", Nucleus.SearchType.StartsWith) + "|Settings.Control.Controller = " + settingsController + " \t\t\t--[0 .. 2]"
    );

    //Set music volume
    let musicVolume = "0";
    if (Context.PlayerID == 0) {
      musicVolume = p1Volume;
    }
    dict.push(
      Context.FindLineNumberInTextFile(optionsCfgPath, "Settings.Audio.InterfaceMusicVolume =", Nucleus.SearchType.StartsWith) +
        "|Settings.Audio.InterfaceMusicVolume = " +
        musicVolume +
        " \t\t\t--[0 .. 100]",
      Context.FindLineNumberInTextFile(optionsCfgPath, "Settings.Audio.IngameMusicVolume =", Nucleus.SearchType.StartsWith) +
        "|Settings.Audio.IngameMusicVolume = " +
        musicVolume +
        " \t\t\t--[0 .. 100]"
    );

    //Set Quality preset
    //low = 0, medium = 1, high = 2, custom = 3
    if (qualityPresetAnswer != NO_OVERRIDE) {
      let qualityVal = qualityPresetOptions.indexOf(qualityPresetAnswer) - 1;
      dict.push(
        Context.FindLineNumberInTextFile(optionsCfgPath, "Settings.Visual.QualityPreset =", Nucleus.SearchType.StartsWith) + "|Settings.Visual.QualityPreset = " + qualityVal + " \t\t\t--[0 .. 3]"
      );
    }

    //Apply changes
    Context.ReplaceLinesInTextFile(optionsCfgPath, dict);
  };

  //Function for updating device.cfg
  const updateDeviceCfg = function(deviceCfgPath) {
    //Set resolution
    const widthAddress = "7c"; //window width address
    const heightAddress = "80"; //window height address

    //Function to make a 16 bit decimal into a 2 byte hex array in little endian order.
    const numberToByteArray = function(num) {
      return [
        num & 0xff, // low byte
        (num >> 8) & 0xff // high byte
      ];
    };

    let width, height;
    if (resolutionAnswer === "Auto") {
      width = Context.Width;
      height = Context.Height;
    } else {
      let res = resolutionAnswer.split(" x ");
      width = parseInt(res[0]);
      height = parseInt(res[1]);
    }

    Context.HexEdit(deviceCfgPath, widthAddress, numberToByteArray(width));
    Context.HexEdit(deviceCfgPath, heightAddress, numberToByteArray(height));

    //Set refresh rate to "Default". Then flatout finds an available value for the resolution selected.
    const fpsAddress = "88";
    Context.HexEdit(deviceCfgPath, fpsAddress, [0]); //The "Default" option is 0x00

    //Automatically set aspect ratio to the closest match
    const aspectRatioAddress = "8c";
    //4:3 == 0x00
    //16:10 == 0x01
    //16:9 == 0x02
    //5:4 == 0x03
    //21:9 == 0x04
    //32:9 == 0x05
    const aspectRatiosLiveLessNess = [4 / 3, 16 / 10, 16 / 9, 5 / 4];
    const aspectRatiosChloe = [4 / 3, 16 / 10, 16 / 9, 5 / 4, 21 / 9, 32 / 9];
    const aspectRatios = mod == XLLN ? aspectRatiosLiveLessNess : aspectRatiosChloe;
    let aspectRatioDiff = Number.MAX_VALUE;
    let bestMatch;
    for (let i = 0; i < aspectRatios.length; i++) {
      let diff = Math.abs(aspectRatios[i] - Context.AspectRatioDecimal);
      if (diff < aspectRatioDiff) {
        aspectRatioDiff = diff;
        bestMatch = i;
      }
    }
    Context.HexEdit(deviceCfgPath, aspectRatioAddress, [bestMatch]); //For XLive the launcher ignores this and preselects the aspect ratio of the selected resolution.

    //Set windowed
    const windowedAddress = "a4";
    Context.HexEdit(deviceCfgPath, windowedAddress, [0x01]);

    //Set antialiasing
    const antialiasAddress = "90";
    if (antialiasingAnswer != NO_OVERRIDE) {
      Context.HexEdit(deviceCfgPath, antialiasAddress, [parseInt(antialiasingAnswer)]);
    }

    //Set Anisotropy
    const anisotropyAddress = "94";
    if (anisotropyAnswer != NO_OVERRIDE) {
      Context.HexEdit(deviceCfgPath, anisotropyAddress, [anisotropyAnswer]); //Min is 0x01. Max is 0x10
    }
  };

  //Handle XLiveLessNess specific logic
  if (mod == XLLN) {
    //Apply wide screen fix if aspect ration is wider than 16:9.
    if (Context.AspectRatioDecimal > 1.8) {
      const savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\winmm.dll"); // rename to winmm.dll so it doesn't clash with devreorder
      const savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dinput8.dll");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      Context.CopyFolder(Context.ScriptFolder + "\\scripts", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts");
    }

    const savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xlive.dll");
    const savePkgOrigin = System.IO.Path.Combine(Game.Folder, "xlive.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    Context.CopyFolder(Context.ScriptFolder + "\\XLiveLessNess", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XLiveLessNess");

    var number = Context.PlayerID + 1;
    const VideoConfig = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XLiveLessNess\\xlln-config-" + number + ".ini";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("XLLN-Config-Version:1.6.1.1", "xlive_username_p1", Context.Nickname),
      new Nucleus.IniSaveInfo("XLLN-Config-Version:1.6.1.1", "xlive_user_live_enabled_p1", 1),
      new Nucleus.IniSaveInfo("XLLN-Config-Version:1.6.1.1", "xlive_user_online_enabled_p1", 1),
      new Nucleus.IniSaveInfo("XLLN-Config-Version:1.6.1.1", "xlive_user_auto_login_p1", 1)
    ]);

    const optionsCfgPath = Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\options.cfg";
    if (System.IO.File.Exists(optionsCfgPath)) {
      updateOptionsCfg(optionsCfgPath);

      //Set random player model for each player.
      if (randModelsAnswer === "True") {
        const clampedPlayerId = Context.PlayerID % randomXLiveModels.length;
        const gender = randomXLiveModels[clampedPlayerId];
        const dict = [Context.FindLineNumberInTextFile(optionsCfgPath, "Settings.Game.Gender =", Nucleus.SearchType.StartsWith) + "|Settings.Game.Gender = " + gender + " \t\t\t--[0 .. 1]"];
        Context.ReplaceLinesInTextFile(optionsCfgPath, dict);
      }
    }

    const deviceCfgPath = Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\device.cfg";
    if (System.IO.File.Exists(deviceCfgPath)) {
      updateDeviceCfg(deviceCfgPath);
    }
  }

  //Handle Chloe Collection specific logic
  if (mod == CHLOE) {
    Game.PauseBetweenProcessGrab = 2;
    Game.PauseBetweenStarts = 15;

    if (chloeAutoFillIPAnswer == "TRUE") {
      const autoEnterIPFocusPath = System.IO.Path.Combine(Context.ScriptFolder, "AutoHotkey", "AutoEnterIPFouc.exe");
      Context.RunAdditionalFiles(["2|" + autoEnterIPFocusPath], false, 0); //Only run when  player 2 starts
    }

    //Update options.cfg
    const instancedGameFolder = Context.GetFolder(Nucleus.Folder.InstancedGameFolder);
    const optionsCfgPath = System.IO.Path.Combine(instancedGameFolder, "Savegame", "options.cfg");
    if (!System.IO.File.Exists(optionsCfgPath)) {
      throw "Either you don't have Chloe Collection mod installed or you forgot to run the game once after installing it.\r\nThis file was not found: " + optionsCfgPath + ".";
    }
    updateOptionsCfg(optionsCfgPath);

    //Set Widescreen Menu and safe zone
    //Menu safe zone values:  4/3, 16/9, 6/10, 21/9, None
    const enableWidescreenMenu = (Context.AspectRatioDecimal > (4 / 3 + 16 / 10) / 2).toString().toUpperCase();
    const safeZones = [4 / 3, 16 / 9, 16 / 10, 21 / 9];
    let aspectRatioDiff = Number.MAX_VALUE;
    let bestMatch;
    for (let i = 0; i < safeZones.length; i++) {
      let diff = Math.abs(safeZones[i] - Context.AspectRatioDecimal);
      if (diff < aspectRatioDiff) {
        aspectRatioDiff = diff;
        bestMatch = i;
      }
    }
    const dict = [
      Context.FindLineNumberInTextFile(optionsCfgPath, "Settings.Game.WidescreenMenu =", Nucleus.SearchType.StartsWith) + "|Settings.Game.WidescreenMenu = " + enableWidescreenMenu,
      Context.FindLineNumberInTextFile(optionsCfgPath, "Settings.Game.WidescreenSafeZone =", Nucleus.SearchType.StartsWith) + "|Settings.Game.WidescreenSafeZone = " + bestMatch + " \t\t\t--[0 .. 4]"
    ];
    Context.ReplaceLinesInTextFile(optionsCfgPath, dict);

    //Update device.cfg
    const deviceCfgPath = System.IO.Path.Combine(instancedGameFolder, "Savegame", "device.cfg");
    if (!System.IO.File.Exists(deviceCfgPath)) {
      throw "Either you don't have Chloe Collection mod installed or you forgot to run the game once after installing it.\r\nThis file was not found: " + deviceCfgPath + ".";
    }
    updateDeviceCfg(deviceCfgPath);

    //Set player name
    const nick = Player.Nickname;
    const maxChars = 15;
    let nickHex = new Array(maxChars * 2); //max 15 chars = 30 bytes since every other byte is empty.

    //Fill the array with zeroes. (Array.fill is not available).
    for (let i = 0; i < nickHex.length; i++) {
      nickHex[i] = 0;
    }
    //Place each letter of the nick in every other byte
    const len = Math.min(nick.length, maxChars);
    for (let i = 0; i < len; i++) {
      nickHex[i * 2] = nick.charCodeAt(i);
    }

    //Set player name in player001.sav
    const playerSavPath = System.IO.Path.Combine(instancedGameFolder, "Savegame", "player001.sav");
    if (!System.IO.File.Exists(playerSavPath)) {
      throw "You forgot to create a player profile in the first slot when running the game normally.\r\nThis file was not found: " + playerSavPath;
    }
    Context.HexEdit(playerSavPath, "0C", nickHex);

    //Set player name in custom 001.sav
    const customSave001Path = System.IO.Path.Combine(instancedGameFolder, "Savegame", "customsave001.sav");
    if (!System.IO.File.Exists(customSave001Path)) {
      throw "You forgot to create a player profile in the first slot when running the game normally.\r\nThis file was not found: " + customSave001Path;
    }
    Context.HexEdit(customSave001Path, "0", nickHex);

    //Set random portrait and the model that matches the portrait.
    //Also set different chat colors for each player since that gives each player a different color in the minimap.
    //There are 17 available colors and 14 portraits so the lazy implementation is to set the chat color to the portrait number.

    if (randModelsAnswer === "True") {
      const clampedPlayerId = Context.PlayerID % randomPortraits.length;
      const portraitNumber = randomPortraits[clampedPlayerId];
      const portraitToModelMap = [2, 10, 9, 11, 3, 4, 5, 7, 6, 12, 13, 8, 0];
      const modelNumber = portraitToModelMap[portraitNumber];

      //Set portrait, model and chat color in options.cfg.
      const dict = [
        Context.FindLineNumberInTextFile(optionsCfgPath, "Settings.Game.MPPortrait =", Nucleus.SearchType.StartsWith) + "|Settings.Game.MPPortrait = " + portraitNumber + " \t\t\t--[0 .. 12]",
        Context.FindLineNumberInTextFile(optionsCfgPath, "Settings.Game.PlayerModel =", Nucleus.SearchType.StartsWith) + "|Settings.Game.PlayerModel = " + modelNumber + " \t\t\t--[0 .. 24]",
        Context.FindLineNumberInTextFile(optionsCfgPath, "Settings.Game.ChatColor =", Nucleus.SearchType.StartsWith) + "|Settings.Game.ChatColor = " + portraitNumber + " \t\t\t--[0 .. 100]"
      ];
      Context.ReplaceLinesInTextFile(optionsCfgPath, dict);

      //Set portrait, model and chat color in customsave001.sav
      const portraitAddress = "561D";
      const modelAddress = "561C";
      const chatColorAddress = "5C66";
      Context.HexEdit(customSave001Path, portraitAddress, [portraitNumber]);
      Context.HexEdit(customSave001Path, modelAddress, [modelNumber]);
      Context.HexEdit(customSave001Path, chatColorAddress, [portraitNumber]);
    }

    //Replace the XLiveLessNess xlive.dll with the Chloe mod one.
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "xlive.dll"), System.IO.Path.Combine(Context.RootFolder, "xlive.dll"), true);
  }
};
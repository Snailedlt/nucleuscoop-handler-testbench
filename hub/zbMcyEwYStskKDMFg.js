Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sat Feb 22 2020 07:26:38 GMT+0000 (UTC).
Hub.Handler.Id = "zbMcyEwYStskKDMFg";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv142\\Win64", "EDFIR\\Binaries\\Win64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "winmm.dll"];
Game.GameName = "Earth Defense Force - Iron Rain";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "EDFIR-Win64-Shipping.exe";
Game.SteamID = "1039890";
Game.GUID = "EDF Iron Rain";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "EDFIR\\Binaries\\Win64";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.UseSteamStubDRMPatcher = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "EARTH DEFENSE FORCE: IRON RAIN";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.FakeFocus = true;
Game.HookFocus = true;
Game.SetWindowHookStart = true;
Game.PauseBetweenStarts = 20;

Game.Play = function() {
  var Args = (Context.Args = " -windowed " + " -AlwaysFocus " + " -nosplash " + " -steam " + " -ResX= " + Context.Width + " -ResY= " + Context.Height);

  Context.StartArguments = Args;

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv142\\Win64\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv142\\Win64\\steam_settings\\DLC.txt";
  var lines = [
    "1103670=EARTH DEFENSE FORCE: IRON RAIN - Operator Voice : Riho Futaba (Japanese voice only)",
    '1103710=EARTH DEFENSE FORCE: IRON RAIN - Energy Gems & Credits "Type31500" ',
    '1103711=EARTH DEFENSE FORCE: IRON RAIN - Energy Gems & Credits "Type53000" ',
    '1106100=EARTH DEFENSE FORCE: IRON RAIN - Energy Gems & Credits "Type73000" ',
    "1106220=EARTH DEFENSE FORCE: IRON RAIN - DLC Mission : Golden Storm",
    "1106221=EARTH DEFENSE FORCE: IRON RAIN - Weapon: GK-Predator",
    "1106222=EARTH DEFENSE FORCE: IRON RAIN - Weapon: PT-Pythagoras",
    "1106223=EARTH DEFENSE FORCE: IRON RAIN - Weapon: FX-Trailblazer",
    "1106224=EARTH DEFENSE FORCE: IRON RAIN - Weapon: MR-Geo Needle",
    "1106225=EARTH DEFENSE FORCE: IRON RAIN - Item: PR-Shaman",
    "1106226=EARTH DEFENSE FORCE: IRON RAIN - Item: Wrapping Car",
    "1106227=EARTH DEFENSE FORCE: IRON RAIN - Item: Wrapping Pickup Truck",
    "1106228=EARTH DEFENSE FORCE: IRON RAIN - Item: Wrapping Bus",
    "1106230=EARTH DEFENSE FORCE: IRON RAIN - Bunny Ears",
    "1106231=EARTH DEFENSE FORCE: IRON RAIN - Welding Mask",
    "1106232=EARTH DEFENSE FORCE: IRON RAIN - DLC",
    "1106233=EARTH DEFENSE FORCE: IRON RAIN - Anarchy Helm",
    "1106234=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: T-Shirt: EARTH DEFENSE FORCE: IRON RAIN",
    "1106235=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: T-Shirt: EDF4.1 Ranger",
    "1106236=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: T-Shirt: EDF4.1 Wing Diver",
    "1106237=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: T-Shirt: EDF4.1 Fencer",
    "1106238=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: T-Shirt: EDF4.1 Air Raider",
    "1106239=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: T-Shirt: EDF5 Ranger",
    "1106240=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: T-Shirt: EDF5 Wing Diver",
    "1106241=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: T-Shirt: EDF5 Fencer",
    "1106242=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: T-Shirt: EDF5 Air Raider",
    "1106243=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: One Man Army",
    "1106250=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: Tank Top 'Riho Futaba' ",
    "1106251=EARTH DEFENSE FORCE: IRON RAIN - Cyber Goggles",
    "1106280=EARTH DEFENSE FORCE: IRON RAIN - DLC",
    "1106290=EARTH DEFENSE FORCE: IRON RAIN - Superhero Mask",
    "1106300=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: Infantryman Pants",
    "1106310=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: Pale Wing",
    "1106320=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: Naval Uniform",
    "1106321=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: T-Shirt: EDF4.1 Symbol",
    "1106360=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: T-Shirt: EDF5 Symbol",
    "1106361=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: Onechanbara ORIGIN",
    "1106362=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: T-Shirt: Bullet Girls Phantasia",
    "1106363=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: T-Shirt: Dream C Club ZERO",
    "1106370=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: T-Shirt: SG/ZH",
    "1106371=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: T-Shirt: HappyManager",
    "1106380=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: Tank Top: Natsuiro High School",
    "1106381=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: Business Bundle",
    "1106390=EARTH DEFENSE FORCE: IRON RAIN - DLC",
    "1106391=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: Full-Body Tights Bundle",
    "1106450=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: Skeleton Costume Bundle",
    "1106451=EARTH DEFENSE FORCE: IRON RAIN - Tactical Mask Bundle",
    "1106452=EARTH DEFENSE FORCE: IRON RAIN - HMD",
    "1176660=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: Bunny Costume Bundle",
    "1176730=EARTH DEFENSE FORCE: IRON RAIN - DLC",
    "1176750=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: T-shirt(EDF4.1 set Bundle)",
    "1176760=EARTH DEFENSE FORCE: IRON RAIN - Creation parts: T-shirt(EDF5 set Bundle)"
  ];

  Context.WriteTextFile(autoExec, lines);
};

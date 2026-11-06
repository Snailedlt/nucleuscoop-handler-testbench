Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Wed Nov 13 2024 00:20:15 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "9MzDkQkvk9RBrbq4q";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
Game.AddOption(
  "Use REFramework?",
  "Removes black bars in split-screen. In the REFramework overlay click on graphics and enable the Ultra Wide/FOV/Aspect ratio fix. Do not forget to set the resolution first in the game graphics options that matches the window size.",
  "REF",
  answers1
);

Game.ExecutableContext = ["amd_ags_x64.dll"];
Game.DirSymlinkExclusions = ["D3D12", "settings", "steam_settings"];
Game.FileSymlinkExclusions = ["steamclient_loader.exe", "ColdClientLoader.ini", "steam_appid.txt", "local_save.txt", "xinput1_3.dll", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = ["config.ini", "dinput8.dll", "amd_ags_x64.dll", "CrashReport.exe", "CrashReportDll.dll", "nvngx_dlss.dll", "D3D12Core.dll"];
Game.BackupFiles = ["config.ini"];
Game.GameName = "Monster Hunter Rise";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "MonsterHunterRise.exe";
Game.SteamID = "1446780";
Game.GUID = "Monster Hunter Rise";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.GoldbergExperimentalSteamClient = true;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Monster Hunter Rise";
Game.RefreshWindowAfterStart = true;
Game.ResetWindows = true;
Game.SetWindowHook = false;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput1_4.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\1446780\\remote";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "CLOSE Steam completely before launching this handler. On first run set the resolution in the game graphics options that matches the window size in all instances, reduce graphic settings to improve performance. To avoid stretching in split-screen you need to create custom resolutions in your AMD/Nvidia/Intel panel (for example for a 1920x1080 monitor add resolutions like: 960x1080, 960x540, 1920x540 etc.) so the game can see and use them. To remove the black bars after you are in the title screen in the REFramework menu click on graphics and enable the aspect ratio fix, use CTRL+T twice if you notice it didn't apply. Alt-tab between the instances to use the keyboard for names and such. Connect the instances via the cat lobby in the middle of the village after completing the tutorial (talk with the first npc).";
Game.PromptBetweenInstances = false;
Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenProcessGrab = 35;
Game.PauseBetweenStarts = 40;

//USS deprecated options:

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
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;

//ProtoInput:

Game.SupportsMultipleKeyboardsAndMice = false;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = true;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = false;
Game.LockInputToggleKey = 0x23;

Game.ProtoInput.RenameHandlesHook = false;
Game.ProtoInput.RenameHandles = [];
Game.ProtoInput.RenameNamedPipes = [];

Game.ProtoInput.RegisterRawInputHook = false;
Game.ProtoInput.GetRawInputDataHook = false;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = true;
Game.ProtoInput.DontShowCursorWhenImageUpdated = false;
Game.ProtoInput.AllowFakeCursorOutOfBounds = false;
Game.ProtoInput.ExtendFakeCursorBounds = true;

Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.WindowActvateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = false;
Game.ProtoInput.MouseButtonFilter = false;
Game.ProtoInput.KeyboardButtonFilter = false;

Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseOpenXinput = false;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;

Game.ProtoInput.EnableFocusMessageLoop = false;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 10000;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
//Game.ProtoInput.BlockedMessages = [0x0008, 0x02A3, 0x02A1]; //Blocks WM_KILLFOCUS, WM_MOUSEHOVER and WM_MOUSELEAVE.

Game.Play = function() {
  var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\config.ini");
  Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Application", "WindowModeOption", 0),
    new Nucleus.IniSaveInfo("Application", "AspectRatioOption", 0)
  ]);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\_storage_");
  System.IO.Directory.CreateDirectory(filePath);

  var nolay = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\disable_overlay.txt";
  var lines = [""];
  Context.WriteTextFile(nolay, lines);

  var nolan = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\disable_lan_only.txt";
  var lines = [""];
  Context.WriteTextFile(nolan, lines);

  System.IO.File.Copy(System.IO.Path.Combine(Context.RootFolder, "XInputPlus.ini"), System.IO.Path.Combine(Context.RootFolder, "_storage_\\XInputPlus.ini"), true);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\DLC.txt";
  var lines = [
    "1748410 = MONSTER HUNTER RISE - Pre-order bonus Add-on Content",
    "1748411 = MONSTER HUNTER RISE - Deluxe Kit",
    "1753180 = MONSTER HUNTER RISE - Bonus Pack: PC Assistance Pack",
    "1753181 = MONSTER HUNTER RISE - Fox Mask Hunter layered armor piece",
    "1753182 = MONSTER HUNTER RISE - Theater Wig Hunter layered armor piece",
    "1797960 = MONSTER HUNTER RISE - Wyverian Earrings Hunter layered armor piece",
    "1797961 = MONSTER HUNTER RISE - Nine Tails Palico layered armor set",
    "1797962 = MONSTER HUNTER RISE - Long Coat Costume Palamute layered armor set",
    "1797963 = MONSTER HUNTER RISE - High Five gesture",
    "1797964 = MONSTER HUNTER RISE - Attack pose set",
    "1797965 = MONSTER HUNTER RISE - Hurt pose set",
    "1797966 = MONSTER HUNTER RISE - Eye Shadow makeup",
    "1797967 = MONSTER HUNTER RISE - Hero face paint",
    "1797968 = MONSTER HUNTER RISE - Spread Wings makeup",
    "1797969 = MONSTER HUNTER RISE - Airy Short Bob hairstyle",
    "1797970 = MONSTER HUNTER RISE - Beachy Waves hairstyle",
    "1797971 = MONSTER HUNTER RISE - Great Baggi Crest hairstyle",
    "1797972 = MONSTER HUNTER RISE - Hunter Voice: Master Utsushi",
    "1797973 = MONSTER HUNTER RISE - Hunter Voice: Hinoa the Quest Maiden",
    "1797980 = MONSTER HUNTER RISE - Wind-up Cohoot Cohoot outfit",
    "1797981 = MONSTER HUNTER RISE - Fluffy Hood Cohoot outfit",
    "1797982 = MONSTER HUNTER RISE - Swallow Shirt Hunter layered armor piece",
    "1797983 = MONSTER HUNTER RISE - Swallow Gloves Hunter layered armor piece",
    "1797984 = MONSTER HUNTER RISE - Swallow Boots Hunter layered armor piece",
    "1797985 = MONSTER HUNTER RISE - Bell Collar Palico layered armor piece",
    "1797986 = MONSTER HUNTER RISE - Spiked Collar Palico layered armor piece",
    "1797987 = MONSTER HUNTER RISE - Heart Collar Palico layered armor piece",
    "1797988 = MONSTER HUNTER RISE - Bow Collar Palico layered armor piece",
    "1797989 = MONSTER HUNTER RISE - Bone Collar Palamute layered armor piece",
    "1797990 = MONSTER HUNTER RISE - Spiked Collar Palamute layered armor piece",
    "1797991 = MONSTER HUNTER RISE - Heart Collar Palamute layered armor piece",
    "1797992 = MONSTER HUNTER RISE - Bow Collar Palamute layered armor piece",
    "1797993 = MONSTER HUNTER RISE - Delightful Dance gesture set",
    "1797994 = MONSTER HUNTER RISE - Idol pose set",
    "1797995 = MONSTER HUNTER RISE - Petit Face makeup",
    "1797996 = MONSTER HUNTER RISE - Tear face paint",
    "1797997 = MONSTER HUNTER RISE - Samurai hairstyle",
    "1797998 = MONSTER HUNTER RISE - Twin Ponytails hairstyle",
    "1797999 = MONSTER HUNTER RISE - Hunter Voice: Fugen the Elder",
    "1798002 = MONSTER HUNTER RISE - Hunter Voice: Minoto the Hub Maiden",
    "1798003 = MONSTER HUNTER RISE - Yukumo Village BGM",
    "1798004 = MONSTER HUNTER RISE - Kamura Village: Piano version BGM",
    "1798005 = MONSTER HUNTER RISE - Ace Pilot Cohoot outfit",
    "1798006 = MONSTER HUNTER RISE - Menacing Macaw Cohoot outfit",
    "1798007 = MONSTER HUNTER RISE - One Character Edit Voucher",
    "1798008 = MONSTER HUNTER RISE - Two Character Edit Vouchers",
    "1798009 = MONSTER HUNTER RISE - Three Character Edit Vouchers",
    "1798040 = MONSTER HUNTER RISE - One Character Edit Voucher (Free)",
    "1798041 = MONSTER HUNTER RISE - Special Stickers 1 Sticker set",
    "1798050 = MONSTER HUNTER RISE - Felyne Ears Hunter layered armor piece",
    "1798051 = MONSTER HUNTER RISE - Felyne Tail Hunter layered armor piece",
    "1798052 = MONSTER HUNTER RISE - Canyne Mask Hunter layered armor piece",
    "1798053 = MONSTER HUNTER RISE - Canyne Tail Hunter layered armor piece",
    "1798054 = MONSTER HUNTER RISE - Canyne Mask Palico layered armor piece",
    "1798055 = MONSTER HUNTER RISE - Felyne Mask Palamute layered armor piece",
    "1798056 = MONSTER HUNTER RISE - Hide Pose Set",
    "1798057 = MONSTER HUNTER RISE - Using the Wall Pose Set",
    "1798058 = MONSTER HUNTER RISE - Stitches face paint",
    "1798059 = MONSTER HUNTER RISE - Cheek Tusk face paint",
    "1798060 = MONSTER HUNTER RISE - Delicate Beauty hairstyle",
    "1798061 = MONSTER HUNTER RISE - Noble Short hairstyle",
    "1798062 = MONSTER HUNTER RISE - Hunter Voice: Buddy Handler Iori",
    "1798063 = MONSTER HUNTER RISE - Hunter Voice: Yomogi the Chef",
    "1798064 = MONSTER HUNTER RISE - Monster Hunter Series Bases BGM",
    "1798065 = MONSTER HUNTER RISE - Monster Music: Dance Version BGM",
    "1798066 = MONSTER HUNTER RISE - Out on the Hunt Cohoot outfit",
    "1798067 = MONSTER HUNTER RISE - Li'l Wingdrake Cohoot outfit",
    "1798068 = MONSTER HUNTER RISE - Special Stickers 2 Sticker Set",
    "1798069 = MONSTER HUNTER RISE - Floral Mask Hunter layered armor piece",
    "1798070 = MONSTER HUNTER RISE - Floral Yukata Hunter layered armor piece",
    "1798071 = MONSTER HUNTER RISE - Floral Sleeves Hunter layered armor piece",
    "1798072 = MONSTER HUNTER RISE - Floral Zori Hunter layered armor piece",
    "1798073 = MONSTER HUNTER RISE - F Floral Yukata Palico layered armor piece",
    "1798074 = MONSTER HUNTER RISE - C Floral Yukata Palamute layered armor piece",
    "1798075 = MONSTER HUNTER RISE - Traditional Dance gesture set",
    "1798076 = MONSTER HUNTER RISE - Cursed Flame face paint",
    "1798077 = MONSTER HUNTER RISE - Third Eye face paint",
    "1798078 = MONSTER HUNTER RISE - Bob with Hairband hairstyle",
    "1798079 = MONSTER HUNTER RISE - Hunter Voice: Kagero the Merchant",
    "1798080 = MONSTER HUNTER RISE - Hunter Voice: Rondine the Trader",
    "1798081 = MONSTER HUNTER RISE - Kamura Village: Summer Remix BGM",
    "1798082 = MONSTER HUNTER RISE - Summery Sailor Cohoot outfit",
    "1798083 = MONSTER HUNTER RISE - Puffy Penguin Cohoot outfit",
    "1798084 = MONSTER HUNTER RISE - Special Stickers 3 Sticker set",
    "1798085 = MONSTER HUNTER RISE - Special Stickers 4 Sticker set",
    "1798086 = MONSTER HUNTER RISE - Special Stickers 5 Sticker set",
    "1798087 = MONSTER HUNTER RISE - Bombadgy Mask Hunter layered armor piece",
    "1798088 = MONSTER HUNTER RISE - Royal Dreads hairstyle",
    "1798089 = MONSTER HUNTER RISE - Utsushi Cut hairstyle",
    "1798090 = MONSTER HUNTER RISE - DLC 15 hairstyle",
    "1798091 = MONSTER HUNTER RISE - DLC 16 hairstyle",
    "1798092 = MONSTER HUNTER RISE - DLC 17 hairstyle",
    "1798093 = MONSTER HUNTER RISE - Special Stickers 6 Sticker set",
    "1798094 = MONSTER HUNTER RISE - Hunter Voice: Big Bro",
    "1798095 = MONSTER HUNTER RISE - Hunter Voice: Cool Girl",
    "1798096 = MONSTER HUNTER RISE - Gorgeous Earrings Hunter layered armor piece",
    "1798097 = MONSTER HUNTER RISE - Spiribird Earrings Hunter layered armor piece",
    "1798098 = MONSTER HUNTER RISE - Woofpurr Earrings Hunter layered armor piece",
    "1799310 = MONSTER HUNTER RISE - Bunny Dango Earrings Hunter layered armor piece",
    "1799311 = MONSTER HUNTER RISE - Kunai Earrings Hunter layered armor piece",
    "1799312 = MONSTER HUNTER RISE - Reindeer Party Cohoot outfit",
    "1799313 = MONSTER HUNTER RISE - Special Stickers 7 sticker set",
    "1852230 = Monster Hunter Rise - Reverent Wrap Hunter layered armor piece",
    "1852231 = Monster Hunter Rise - Bow Necklace Hunter layered armor piece",
    "1852232 = Monster Hunter Rise - Leather Choker Hunter layered armor piece",
    "1852233 = Monster Hunter Rise - Benevolent Bandage Hunter layered armor piece",
    "1852234 = Monster Hunter Rise - Frilled Choker Hunter layered armor piece",
    "1852235 = Monster Hunter Rise - Hinoa Long hairstyle",
    "1852236 = Monster Hunter Rise - Minoto Long hairstyle",
    "1852237 = Monster Hunter Rise - Monster Music: Rock Version BGM",
    "1852238 = Monster Hunter Rise - Felyne Stealth Hood Hunter layered armor piece",
    "1852239 = Monster Hunter Rise - Pretty Present Cohoot outfit",
    "1852250 = Monster Hunter Rise - Special Stickers 8 sticker set",
    "1852251 = Monster Hunter Rise - Kamura Cloak Garb Hunter layered armor piece",
    "1852252 = Monster Hunter Rise - Kamura Cloak Braces Hunter layered armor piece",
    "1852253 = Monster Hunter Rise - Topknot Soul hairstyle",
    "1852254 = Monster Hunter Rise - Hunter Voice: Royal Pain",
    "1852255 = Monster Hunter Rise - Hunter Voice: Mood Swings",
    "1880360 = Monster Hunter Rise: Sunbreak",
    "1913710 = Monster Hunter Rise: Sunbreak - Bonus Add-on Content",
    "1913711 = Monster Hunter Rise: Sunbreak Deluxe Kit",
    "1940750 = Monster Hunter Rise - Relunea Glasses Hunter layered armor piece",
    "1940751 = Monster Hunter Rise - Relunea Jacket Hunter layered armor piece",
    "1940752 = Monster Hunter Rise - Relunea Bottoms Hunter layered armor piece",
    "1940753 = Monster Hunter Rise - F Academic Palico layered armor set",
    "1940754 = Monster Hunter Rise - C Academic Palamute layered armor set",
    "1940755 = Monster Hunter Rise - Graceful Dance gesture set",
    "1940756 = Monster Hunter Rise - Chase pose set",
    "1940757 = Monster Hunter Rise - Wild Pompadour hairstyle",
    "1940758 = Monster Hunter Rise - Braided hairstyle",
    "1940759 = Monster Hunter Rise - Fierce Eyes face paint",
    "1940760 = Monster Hunter Rise - Pawprint face paint",
    "1940761 = Monster Hunter Rise - Special Stickers 9 sticker set",
    "1940762 = Monster Hunter Rise - One Character Edit Voucher (Batch 2)",
    "1940763 = Monster Hunter Rise - Two Character Edit Vouchers (Batch 2)",
    "1940764 = Monster Hunter Rise - Three Character Edit Vouchers (Batch 2)",
    "1961880 = Monster Hunter Rise - Morale Boost gesture",
    "1961881 = Monster Hunter Rise - Warm Up gesture",
    "2011630 = Monster Hunter Rise - Special Stickers 10 sticker set",
    "2011631 = Monster Hunter Rise - For the Fans gesture set",
    "2011632 = Monster Hunter Rise - MC Pose Set",
    "2011633 = Monster Hunter Rise - Spiribird Edge hairstyle",
    "2011634 = Monster Hunter Rise - Fiorayne Short hairstyle",
    "2011635 = Monster Hunter Rise - Malzeno Menace face paint",
    "2011636 = Monster Hunter Rise - Single Stroke Cheek face paint",
    "2011637 = Monster Hunter Rise - Summer Hat Hunter layered armor piece",
    "2011638 = Monster Hunter Rise - Summer Top Hunter layered armor piece",
    "2011639 = Monster Hunter Rise - Summer Bracelets Hunter layered armor piece",
    "2011700 = Monster Hunter Rise - Summer Belt Hunter layered armor piece",
    "2011701 = Monster Hunter Rise - Summer Pants Hunter layered armor piece",
    "2011702 = Monster Hunter Rise - F Summer Palico layered armor set",
    "2011703 = Monster Hunter Rise - C Summer Palamute layered armor set",
    "2011704 = Monster Hunter Rise - Hunter Voice: Fiorayne",
    "2011705 = Monster Hunter Rise - Hunter Voice: Galleus",
    "2011706 = Monster Hunter Rise - Monster & Title Music: Piano Version BGM",
    "2011707 = Monster Hunter Rise - Monster Hunter Series Bases Pt. 2 BGM",
    "2011708 = Monster Hunter Rise - Fiorayne Hunter layered armor set",
    "2011709 = Monster Hunter Rise - Utsushi Hunter layered armor set",
    "2011710 = Monster Hunter Rise - Fall Scarf Hunter layered Armor Piece",
    "2078140 = Monster Hunter Rise - Fall Jacket Hunter layered Armor Piece",
    "2078141 = Monster Hunter Rise - Fall Sleeves Hunter layered Armor Piece",
    "2078142 = Monster Hunter Rise - Fall Waist Hunter layered Armor Piece",
    "2078143 = Monster Hunter Rise - Fall Pants Hunter layered Armor Piece",
    "2078144 = Monster Hunter Rise - Arlow Hunter layered armor set",
    "2078145 = Monster Hunter Rise - Felyne Fall Palico Layered Armor Set",
    "2078146 = Monster Hunter Rise - Canyne Fall Palamute Layered Armor Set",
    "2078147 = Monster Hunter Rise - Acrobat gesture set",
    "2078148 = Monster Hunter Rise - Unique Pose Set",
    "2078149 = Monster Hunter Rise - Ghost face paint",
    "2078150 = Monster Hunter Rise - Wide Eyeline makeup",
    "2078151 = Monster Hunter Rise - Arlow Dreads hairstyle",
    "2078152 = Monster Hunter Rise - Fluffy Long hairstyle",
    "2078153 = Monster Hunter Rise - Hunter Voice: Luchika",
    "2078154 = Monster Hunter Rise - Hunter Voice: Arlow",
    "2078155 = Monster Hunter Rise - Monster & Elgado Music: Jazz Version BGM",
    "2078156 = Monster Hunter Rise - Special Stickers 11 sticker set",
    "2078157 = Monster Hunter Rise - Lost Code: Asca Hunter layered weapon (Great Sword)",
    "2078158 = Monster Hunter Rise - Lost Code: Kiri Hunter layered weapon (Long Sword)",
    "2078159 = Monster Hunter Rise - Lost Code: Carnhan Hunter layered weapon (Sword & Shield)",
    "2078170 = Monster Hunter Rise - Lost Code: Rah Hunter layered weapon (Dual Blades)",
    "2078171 = Monster Hunter Rise - Lost Code: Mia Hunter layered weapon (Lance)",
    "2078172 = Monster Hunter Rise - Lost Code: Nir Hunter layered weapon (Gunlance)",
    "2078173 = Monster Hunter Rise - Lost Code: Mjo Hunter layered weapon (Hammer)",
    "2078174 = Monster Hunter Rise - Lost Code: Alos Hunter layered weapon (Hunting Horn)",
    "2078175 = Monster Hunter Rise - Lost Code: Labr Hunter layered weapon (Switch Axe)",
    "2078176 = Monster Hunter Rise - Lost Code: Sara Hunter layered weapon (Charge Blade)",
    "2078177 = Monster Hunter Rise - Lost Code: Telth Hunter layered weapon (Insect Glaive)",
    "2078178 = Monster Hunter Rise - Lost Code: Kera Hunter layered weapon (Light Bowgun)",
    "2078179 = Monster Hunter Rise - Lost Code: Jura Hunter layered weapon (Heavy Bowgun)",
    "2078190 = Monster Hunter Rise - Lost Code: Iru Hunter layered weapon (Bow)",
    "2078191 = Monster Hunter Rise - Fluffy Fur Hat Hunter layered armor piece",
    "2133120 = Monster Hunter Rise - Fluffy Fur Robe Hunter layered armor piece",
    "2133121 = Monster Hunter Rise - Fluffy Fur Gloves Hunter layered armor piece",
    "2133122 = Monster Hunter Rise - Fluffy Fur Belt Hunter layered armor piece",
    "2133123 = Monster Hunter Rise - Fluffy Fur Boots Hunter layered armor piece",
    "2133124 = Monster Hunter Rise - Hinoa Hunter layered armor set",
    "2133125 = Monster Hunter Rise - Felyne Fluffy Fur Palico layered armor set",
    "2133126 = Monster Hunter Rise - Canyne Fluffy Fur Palamute layered armor set",
    "2133127 = Monster Hunter Rise - Wild & Elegant gesture set",
    "2133128 = Monster Hunter Rise - Attack Pose Set 2",
    "2133129 = Monster Hunter Rise - High-brows makeup",
    "2133140 = Monster Hunter Rise - Mizutsune face paint",
    "2133141 = Monster Hunter Rise - Princely Tail hairstyle",
    "2133142 = Monster Hunter Rise - Princess Curls hairstyle",
    "2133143 = Monster Hunter Rise - Hunter Voice: Kagami",
    "2133144 = Monster Hunter Rise - Hunter Voice: Chichae",
    "2133145 = Monster Hunter Rise - Hunter Voice: Bahari",
    "2133146 = Monster Hunter Rise - Proof of a Hero & Monster Music: Various Arrangements BGM",
    "2133147 = Monster Hunter Rise - Special Stickers 12 sticker set",
    "2133148 = Monster Hunter Rise - Stuffed Rathalos Hunter layered weapon (Great Sword)",
    "2133149 = Monster Hunter Rise - Stuffed Nargacuga Hunter layered weapon (Long Sword)",
    "2133150 = Monster Hunter Rise - Stuffed Zinogre Hunter layered weapon (Sword & Shield)",
    "2133151 = Monster Hunter Rise - Stuffed Goss Harag Hunter layered weapon (Dual Blades)",
    "2133152 = Monster Hunter Rise - Stuffed Malzeno Hunter layered weapon (Lance)",
    "2133153 = Monster Hunter Rise - Stuffed Magnamalo Hunter layered weapon (Gunlance)",
    "2133154 = Monster Hunter Rise - Stuffed Diablos Hunter layered weapon (Hammer)",
    "2133155 = Monster Hunter Rise - Stuffed Tigrex Hunter layered weapon (Hunting Horn)",
    "2133156 = Monster Hunter Rise - Stuffed Lunagaron Hunter layered weapon (Switch Axe)",
    "2133157 = Monster Hunter Rise - Stuffed Garangolm Hunter layered weapon (Charge Blade)",
    "2133158 = Monster Hunter Rise - Stuffed Rakna-Kadaki Hunter layered weapon (Insect Glaive)",
    "2133159 = Monster Hunter Rise - Stuffed Khezu Hunter layered weapon (Light Bowgun)",
    "2133160 = Monster Hunter Rise - Stuffed Mizutsune Hunter layered weapon (Heavy Bowgun)",
    "2133161 = Monster Hunter Rise - Stuffed Rajang Hunter layered weapon (Bow)",
    "2167450 = Monster Hunter Rise - Lance Gunn Hunter layered armor set",
    "2167451 = Monster Hunter Rise - Ran Page Hunter layered armor set",
    "2167452 = Monster Hunter Rise - Minoto Hunter layered armor set",
    "2167453 = Monster Hunter Rise - Kit T. Palico layered armor set",
    "2167454 = Monster Hunter Rise - Pup R. Palamute layered armor set",
    "2167455 = Monster Hunter Rise - Model Walk gesture set",
    "2167456 = Monster Hunter Rise - Musical Pose Set",
    "2167457 = Monster Hunter Rise - Palico makeup",
    "2167458 = Monster Hunter Rise - Cohoot face paint",
    "2167459 = Monster Hunter Rise - Jae Cut hairstyle",
    "2167460 = Monster Hunter Rise - Elegant hairstyle",
    "2167461 = Monster Hunter Rise - Hunter Voice: Minayle",
    "2167462 = Monster Hunter Rise - Hunter Voice: Tadori",
    "2167463 = Monster Hunter Rise - Monster & Stage Music: Chiptune Version BGM",
    "2167464 = Monster Hunter Rise - Special Stickers 13 sticker set",
    "2167465 = Monster Hunter Rise - Velkhana Costume Palamute layered armor set",
    "2167466 = Monster Hunter Rise - Wild Head Hunter layered armor piece",
    "2167467 = Monster Hunter Rise - Wild Body Hunter layered armor piece",
    "2306790 = Monster Hunter Rise - Wild Arms Hunter layered armor piece",
    "2306791 = Monster Hunter Rise - Wild Waist Hunter layered armor piece",
    "2306792 = Monster Hunter Rise - Wild Legs Hunter layered armor piece",
    "2306793 = Monster Hunter Rise - Rondine Hunter layered armor set",
    "2306794 = Monster Hunter Rise - Mechanical face paint",
    "2306795 = Monster Hunter Rise - Risen face paint",
    "2306796 = Monster Hunter Rise - Bahari Locks hairstyle",
    "2306797 = Monster Hunter Rise - Asymmetric Cut hairstyle",
    "2306798 = Monster Hunter Rise - Hunter Voice: Oboro",
    "2306799 = Monster Hunter Rise - Hunter Voice: Jae",
    "2306800 = Monster Hunter Rise - Stage & Title Music: Chill Version BGM",
    "2306801 = Monster Hunter Rise - Special Stickers 14 sticker set"
  ];
  Context.WriteTextFile(dlc, lines);

  var ref = Context.Options["REF"];

  if (ref == "Yes") {
    Context.CopyScriptFolder(Context.GetFolder(Nucleus.Folder.InstancedGameFolder));
  }

  if (ref == "No") {
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);

      //Avoid the mouse move filter unless absolutely necessary as it can massively affect performance if the game gets primary input from mouse move messages.
      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      //ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, false, false, false, true);

      System.Threading.Thread.Sleep(1000);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
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
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);

      //ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      //ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);
    }
  };
};
// Jint 2.11 + PlayerInfo: a player's ProtoController5 (not a PlayerInfo field) vs ProtoController4.
// Expect: the write to 5 is ignored (reads back undefined), 4 keeps its value.
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () {
  var player = PlayerList[0];
  player.ProtoController4 = 4;
  player.ProtoController5 = 5;
  Context.StartArguments = "pc4=" + player.ProtoController4 + " pc5=" + player.ProtoController5;
};

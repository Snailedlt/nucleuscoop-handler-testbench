// An expression split across lines still works after Nucleus re-joins the lines.
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () {
  var s = "x"
  + "y";
  Context.StartArguments = s;
};

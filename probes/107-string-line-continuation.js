// Nucleus re-joins the file as "\r\n" + line + "\r\n": a backslash line continuation in a string no longer parses.
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () {
  Context.StartArguments = "-a \
-b";
};

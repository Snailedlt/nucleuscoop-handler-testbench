// Jint 2.11: `let x` in a block, then `var x` in a nested block (an ES2015 SyntaxError). Does it load?
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () {
  if (true) {
    let server = "a";
    if (true) {
      var server = "b";
    }
    Context.StartArguments = server;
  }
};

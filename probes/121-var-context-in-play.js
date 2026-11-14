// `var Context = {}` inside Game.Play: is Context.StartArguments still read by Nucleus?
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () { var Context = {}; Context.StartArguments = "lost"; };

// `var Game = {}` at the top: does it replace Nucleus's Game, so the settings after it are lost?
var Game = {};
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () { Context.StartArguments = "ran"; };

// System.IO.Path.Combine with 5 parts: does Jint 2.11 expand .NET's Combine(params string[])?
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () { Context.StartArguments = "parts=" + System.IO.Path.Combine("a", "b", "c", "d", "e").split(/[\\/]/).length; };

// Loads Nucleus handlers exactly like GenericGameInfo's constructor (same Jint version, same
// engine setup, same "\r\n" line doubling), then runs Game.Play once per simulated player.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using Jint;
using Nucleus.Gaming;
using Nucleus.Gaming.Coop;
using Nucleus.Gaming.Generic.Step;

namespace Nucleus.Gaming
{
    public class GameOption
    {
        public string Name, Description, Key; public object Value, DefaultValue; public bool Hidden;
        public GameOption(string n, string d, string k, object v) { Name = n; Description = d; Key = k; Value = v; }
        public GameOption(string n, string d, string k, object v, object def) : this(n, d, k, v) { DefaultValue = def; }
    }
    public class GameMetaInfo { }
    public static class H
    {
        public static List<string> Calls = new List<string>();
        public static void Rec(string name, object[] args)
        {
            Calls.Add(name + "(" + string.Join(", ", (args ?? new object[0]).Select(Fmt)) + ")");
        }
        static string Fmt(object a)
        {
            if (a == null) return "null";
            if (a is string) return "\"" + a + "\"";
            var arr = a as System.Collections.IEnumerable;
            if (arr != null && !(a is string)) return "[" + string.Join(", ", arr.Cast<object>().Select(Fmt)) + "]";
            var si = a as SaveInfo;
            return a.ToString();
        }
        public static string Folder(Folder f, GenericContext c)
        {
            switch (f)
            {
                case Nucleus.Gaming.Folder.Documents: return @"C:\Users\me\Documents";
                case Nucleus.Gaming.Folder.MainGameFolder: return @"D:\Games\TheGame";
                default: return @"C:\Nucleus\content\GUID\Instance" + c.PlayerID;
            }
        }
    }
}
namespace Nucleus.Gaming.Generic.Step { public class CustomStep { public GameOption Option; public string Title; public Action UpdateRequired; public bool Required; } }

public static class Program
{
    static string Short(Exception e)
    {
        var x = e is TargetInvocationException && e.InnerException != null ? e.InnerException : e;
        return x.GetType().Name + ": " + x.Message.Split('\n')[0];
    }

    public static int Main(string[] args)
    {
        int players = 2;
        bool verbose = args.Contains("--verbose");
        // Resolve before switching to the sandbox working directory.
        var files = args.Where(a => !a.StartsWith("--")).Select(Path.GetFullPath).ToList();
        int loadFail = 0, playFail = 0, envFail = 0, harnessFail = 0;
        var sandbox = Path.Combine(Path.GetTempPath(), "nucleus-harness-cwd");
        Directory.CreateDirectory(sandbox);
        Directory.SetCurrentDirectory(sandbox); // System.IO calls from handlers land here

        foreach (var file in files)
        {
          try
          {
            H.Calls.Clear();
            string name = Path.GetFileName(file);
            // --- identical to GenericGameInfo(string fileName, string folderPath, Stream str, ...) ---
            string js = "";
            using (var sr = new StreamReader(file))
                while (!sr.EndOfStream) { string line = sr.ReadLine(); js += "\r\n" + line + "\r\n"; }
            var game = new GenericGameInfo();
            game.Folder = @"C:\Nucleus\handlers\" + Path.GetFileNameWithoutExtension(file);
            Assembly assembly = typeof(GameOption).Assembly;
            var engine = new Engine(cfg => cfg.AllowClr(assembly));
            engine.SetValue("Game", game);
            engine.SetValue("Hub", game.Hub);
            engine.Execute("var Nucleus = importNamespace('Nucleus.Gaming');");
            try { engine.Execute(js); }
            catch (Exception ex)
            {
                // Nucleus reports "Error at line {num/2}" because of the line doubling above.
                string msg = ex.Message;
                var parts = msg.Split(':'); var words = parts[0].Split(' ');
                int n; if (words.Length > 1 && int.TryParse(words[1], out n)) msg = "line " + (n / 2) + ":" + (parts.Length > 1 ? parts[1] : "");
                Console.WriteLine("LOAD-FAIL  " + name + "  " + ex.GetType().Name + " " + msg);
                loadFail++;
                continue;
            }
            if (game.Play == null) { Console.WriteLine("LOADED     " + name + " (no Game.Play)"); continue; }

            // --- per-instance setup, like GenericGameInfo.PrePlay / CreateContext ---
            var playerList = new List<PlayerInfo>();
            for (int i = 0; i < players; i++) playerList.Add(new PlayerInfo { PlayerID = i, Nickname = "Player" + (i + 1), ProtoInputInstanceHandle = (uint)(100 + i) });
            engine.SetValue("PlayerList", playerList);
            engine.SetValue("ProtoInput", Nucleus.Gaming.Coop.ProtoInput.ProtoInput.protoInput);
            var errors = new List<string>();
            var startArgs = new List<string>();
            for (int i = 0; i < players; i++)
            {
                var ctx = new GenericContext { Sim = new Sim { Width = 960, Height = 1080, X = i * 960, Y = 0, Count = players, Keyboard = i == 0 } };
                foreach (var f in typeof(GenericGameInfo).GetFields())
                {
                    var d = typeof(GenericContext).GetField(f.Name);
                    if (d != null && d.FieldType == f.FieldType) d.SetValue(ctx, f.GetValue(game));
                }
                ctx.PlayerID = i;
                // Set by GenericGameHandler before Game.Play in real Nucleus.
                ctx.RootInstallFolder = @"D:\Games\TheGame";
                ctx.OrigRootFolder = ctx.RootInstallFolder;
                ctx.RootFolder = @"C:\Nucleus\content\" + game.GUID + @"\Instance" + i;
                ctx.ExePath = ctx.RootFolder + @"\" + game.ExecutableName;
                ctx.LauncherFolder = ctx.RootFolder;
                // Answers to Game.CustomUser*Prompts, filled from the prompts in real Nucleus.
                Func<string[], string[]> answers = pr => pr == null ? new string[0] : pr.Select(_ => "answer").ToArray();
                ctx.CustomUserGeneralValues = answers(game.CustomUserGeneralPrompts);
                ctx.CustomUserPlayerValues = answers(game.CustomUserPlayerPrompts);
                ctx.CustomUserInstanceValues = answers(game.CustomUserInstancePrompts);
                foreach (var o in game.Options)
                {
                    // Nucleus passes the user's choice; simulate picking the first entry of a list.
                    var list = o.Value as System.Collections.IList;
                    ctx.Options[o.Key] = list != null ? (list.Count > 0 ? list[0] : null) : o.Value;
                }
                engine.SetValue("Context", ctx);
                engine.SetValue("Handler", new object());
                engine.SetValue("Player", playerList[i]);
                engine.SetValue("Game", game);
                engine.SetValue("Hub", game.Hub);
                try { game.Play(); }
                catch (Exception ex) { errors.Add("P" + (i + 1) + " " + Short(ex)); }
                startArgs.Add(ctx.StartArguments ?? "");
            }
            foreach (var cb in new[] { game.ProtoInput.OnInputLocked, game.ProtoInput.OnInputUnlocked })
            {
                if (cb == null) continue;
                try { cb(); } catch (Exception ex) { errors.Add("callback " + Short(ex)); }
            }
            bool env = errors.Count > 0 && errors.All(e => e.Contains("FileNotFound") || e.Contains("DirectoryNotFound") || e.Contains("IOException") || e.Contains("UnauthorizedAccess") || e.Contains("Could not find"));
            if (errors.Count == 0) Console.WriteLine("OK         " + name + "  calls=" + H.Calls.Count + "  args[P1]=" + startArgs[0].Trim());
            else if (env) { envFail++; Console.WriteLine("ENV        " + name + "  " + errors[0]); }
            else { playFail++; Console.WriteLine("PLAY-FAIL  " + name + "  " + string.Join(" | ", errors.Distinct())); }
            if (verbose) foreach (var c in H.Calls.Take(40)) Console.WriteLine("    " + c);
          }
          catch (Exception ex) { harnessFail++; Console.WriteLine("HARNESS    " + Path.GetFileName(file) + "  " + Short(ex)); }
        }
        Console.WriteLine();
        Console.WriteLine(files.Count + " handlers: " + loadFail + " failed to load, " + playFail + " failed in Game.Play, " + envFail + " only failed on missing game files, " + harnessFail + " harness errors");
        return loadFail + playFail > 0 ? 1 : 0;
    }
}

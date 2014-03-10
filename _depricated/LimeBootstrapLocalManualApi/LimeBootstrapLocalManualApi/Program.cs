using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using Microsoft.Owin.Hosting;


namespace LimeBootstrapLocalManualApi {
    class Program {
        static void Main(string[] args) {

            string sourcePath = args.Length > 0 ? args[0] : @"C:\dev\LimeBootstrap\system\docs\manual";
            string port = args.Length > 1 ? args[1] : @"5000";

            string baseAddress = "http://localhost:"+port;
            Builder.sourcePath = sourcePath;

            Console.WriteLine("Server started");
            Console.WriteLine("Listning on: " + port);
            Console.WriteLine("Path: " + sourcePath);
            var disposable = WebApp.Start<Startup>(url: baseAddress);

            Console.ReadLine();

            disposable.Dispose();
        } 
    }
}

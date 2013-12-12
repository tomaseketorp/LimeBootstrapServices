using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManualBuilder {
    class Program {
        static void Main(string[] args) {
            //string sourcePath = args.Length > 0 ? args[0] : @"../manual";
            //string outputPath = args.Length > 1 ? args[1] : @"./js";
            string sourcePath = args.Length > 0 ? args[0] : @"C:\dev\LimeBootstrap\system\docs\manual";
            string outputPath = args.Length > 1 ? args[1] : @"C:\dev\LimeBootstrapServices\Manual\js";
            new Builder(sourcePath, outputPath).build();
        }
    }
}

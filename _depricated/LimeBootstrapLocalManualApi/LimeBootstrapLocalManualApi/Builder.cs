using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Configuration;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace LimeBootstrapLocalManualApi {
    public static class Builder {

        public static string sourcePath {get;set;}

        public static string build() {

            string json = "";

            try {
                Console.WriteLine("======= Build started ========");

                List<Chapter> col = new List<Chapter>();
                string[] f = getFiles();
                foreach (var file in f) {
                    if (Path.GetFileName(file) != "Readme.md") {
                        var c = new Chapter();
                        Console.WriteLine("Found file: " + file);
                        c.name = Path.GetFileName(file);
                        c.mdB64 = Base64Encode(readFile(file));
                        col.Add(c);
                        Console.WriteLine("Chapter Added: " + c.name);
                    }
                }

                json = new FilesObj()
                {
                    files = col
                }.ToJSON();

                Console.WriteLine("======= Build ended ========");
            }
            catch (Exception e) {
                Console.WriteLine("ERROR: Build failed");
                Console.WriteLine("======= Build ended ========");
                throw;
            }

            return json;
        }

      
        public static string readFile(string path) {
            string text = System.IO.File.ReadAllText(path);
            return text;
        }

        public static string[] getFiles(){
            string[] filePaths = Directory.GetFiles(Builder.sourcePath, "*.md", SearchOption.AllDirectories);
            return filePaths;
        }

        public static string Base64Encode(string plainText) {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

    }
}

import requests
import json
import os
import arrow
import base64
import sys
import subprocess

class DocumentationLoader:
    def __init__(self):
        self.github_user = os.environ["GITHUB_USER"]
        self.github_password = os.environ["GITHUB_PASSWORD"]
        self.baseURL = "https://api.github.com/repos/Lundalogik/LimeBootstrapServices"
        self.last_update = arrow.get("1970-01-01T00:00:01Z")
        self.cached_return_json = {}

    def verifyIntegrity(self):
        print("Verifying documentation integrety...")
        if not os.path.isfile(os.path.join('web','manual','index.html')):
            print("Building manual...")
            work_dir = os.getcwd()
            print(work_dir)
            os.chdir('documentation')
            #os.system("python "+os.path.join(os.path.dirname(sys.executable),"mkdocs")+" build")
            subprocess.Popen("python "+os.path.join(os.path.dirname(sys.executable),"mkdocs")+" build", shell=True)
            os.chdir(work_dir)

        if not os.path.isfile(os.path.join('web','manual','index.html')):
            print("Still no docs, somethings fishy!")

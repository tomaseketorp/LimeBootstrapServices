import requests
import zipfile
import os.path
import io

class getZipFromGitHub:
    def __init__(self, projectZipURL):
        self.projectZipURL =  projectZipURL
        

    def getAppZipFile(self, appToGet):
        
        results = requests.get(self.projectZipURL)
        zfile = zipfile.ZipFile(io.BytesIO(results.content))
        appname = ''
        for name in zfile.namelist():
                (dirName, fileName) = os.path.split(name)

                # directory
                if fileName == '' and 1 < len(dirName.split("/")) < 3:
                    #Name of app is same as base dir
                    appname = dirName.split("/")[1]
                    #Create zip-file of requested app
                    if appname == appToGet:
                        zf1 = zipfile.ZipFile("web/temp/" + appname + '.zip', mode='w')
                        zf1.close()
                #Add files to the zip-file
                if fileName != '' and appname == appToGet:
                    zf2 = zipfile.ZipFile("web/temp/" +appname + '.zip', mode='a')
                    #Sub directory
                    if len(dirName.split("/")) > 2:
                        print(dirName.split("/",2))
                        zf2.writestr(dirName.split("/",2)[2] + '/' + fileName, zfile.read(name), zipfile.ZIP_DEFLATED )
                        zf2.close()
                    #File in root-dir
                    else:
                        zf2.writestr(fileName, zfile.read(name), zipfile.ZIP_DEFLATED )
                        zf2.close()
        zfile.close();
        return "/temp/" + appToGet + ".zip"
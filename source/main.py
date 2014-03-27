import bottle
from bottle import response
from bottle import redirect
from bottle import static_file
import browseGitHub
import getZipFromGitHub
import documentation  
import os
import sys
import os.path

class EnableCors(object):
    name = 'enable_cors'
    api = 2

    def apply(self, fn, context):
        def _enable_cors(*args, **kwargs):
            # set CORS headers
            response.headers['Access-Control-Allow-Origin'] = '*'
            response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

            if bottle.request.method != 'OPTIONS':
                # actual request; reply with the actual response
                return fn(*args, **kwargs)

        return _enable_cors

#ghZip = getZipFromGitHub.getZipFromGitHub("https://github.com/Lundalogik/LimeBootstrapAppStore/archive/master.zip")

print("Creating DocumentationLoader")
#ghDoc = documentation.DocumentationLoader();
#ghDoc.verifyIntegrity();

print("Starting LappStore!")
ghCon = browseGitHub.GitHubConnectorAppStore()
print("Loading data from GitHub AppStore...")
ghCon.getAppsJSON()

#print("Starting Core!")
#ghConCore = browseGitHub.GitHubConnectorCore()
#print("Loading data from GitHub Core...")
#ghConCore.getManualData()

print("Server is ready!")

lappStore = bottle.app()

#@lappStore.hook('before_request')
#def checkDocumentationIntegrety():
#    ghDoc.verifyIntegrity();

@lappStore.route('/')
def send_static():
    return static_file('/index.html', root='./web')

@lappStore.route('/appstore/')
def send_static():
    return redirect('/web/appstore/index.html')

@lappStore.route('/manual/')
def send_static():
    return redirect('/web/manual/index.html')

@lappStore.route('/web/<filename:path>')
def send_static(filename):
    filename = filename
    if os.path.isfile('./web/'+filename):
        return static_file(filename, root='./web')
    else:
        filename = filename+'/index.html'
        if os.path.isfile('./web/'+filename):
            return static_file(filename, root='./web')
    return ''

@lappStore.route('/api/apps/', method='GET')
def getAllApps():
    return ghCon.getAppsJSON()

@lappStore.route('/api/apps/refresh', method='POST')
def refreshApps():
    ghCon.getAppsJSON(True)
    return {"status":"refresh successfull!"}

@lappStore.route('/api/apps/<appname>/' , method='GET')
def getApp(appname = ""):
    apps = ghCon.getAppsJSON()
    for index, app in enumerate(apps['apps']):
        try:
            if app['name'] == appname:
                return app
        except KeyError:
            print('No name for app')
    return {"error":"app not found"}

@lappStore.route('/api/apps/<app>/download/', method='GET')
def getApp(app = ""):
    path = ghZip.getAppZipFile(app)
    return static_file(path, root='./web', download=app +".zip")

@lappStore.route('/api/manual/', method='GET')
def getManualData():
    return ghConCore.getManualData()

@lappStore.route('/api/version/', method='GET')
def getVersionData():
    ghConVersion = browseGitHub.GitHubConnectorVersion()
    return ghConVersion.getFrameworkVersion()

lappStore.install(EnableCors())
lappStore.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))

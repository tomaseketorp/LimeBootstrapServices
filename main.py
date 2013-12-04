import bottle
from bottle import response
from bottle import static_file
import browseGitHub
import os


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

print("Starting LappStore!")
ghCon = browseGitHub.GitHubConnectorAppStore()
print("Loading data from GitHub AppStore...")
ghCon.getAppsJSON()

print("Starting Core!")
ghConCore = browseGitHub.GitHubConnectorCore()
print("Loading data from GitHub Core...")
ghConCore.getManualData()

print("Server is ready!")

lappStore = bottle.app()

@lappStore.route('/API/apps/', method='GET')
def getAllApps():
    return ghCon.getAppsJSON()

@lappStore.route('/API/apps/refresh', method='POST')
def refreshApps():
    ghCon.getAppsJSON(True)
    return {"status":"refresh successfull!"}

@lappStore.route('/API/app/<app>' , method='GET')
def getApp(app = ""):
    apps = ghCon.getAppsJSON()
    print(app)
    print(apps['apps'])
    if app in apps['apps']:
        return apps['apps'][app]
    else:
        return {'error':'App does not exists'}

@lappStore.route('/API/manual/', method='GET')
def getManualData():
    return ghConCore.getManualData()

@lappStore.route('/manual/:filename#.*#')
def send_static(filename):
    return static_file(filename, root='./Manual/')

@lappStore.route('/appstore/:filename#.*#')
def send_static(filename):
    return static_file(filename, root='./AppStore/')

lappStore.install(EnableCors())
lappStore.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
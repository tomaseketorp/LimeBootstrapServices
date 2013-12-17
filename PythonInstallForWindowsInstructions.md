

#Install python33

`www.python.com`

#Install python tools

`https://bitbucket.org/pypa/setuptools/raw/bootstrap/ez_setup.py`

`https://raw.github.com/pypa/pip/master/contrib/get-pip.py`

#Add python environment path
Set path as administrator and set it for whole machine

+ `[Environment]::SetEnvironmentVariable("Path", "$env:Path;C:\Python33\;C:\Python33\Scripts\", "Machine")`
+ Restart powershell

#Install heroku 
Make sure to install into a path without spaces. Standard path does not work.

`https://toolbelt.heroku.com/windows`

#Install ruby from standard source

Ruby that is included in heroku does not work in some cases

`http://rubyinstaller.org/downloads/`

#Add ruby environment path
+ `[Environment]::SetEnvironmentVariable("Path", "$env:Path;C:\Ruby200\bin\", "Machine")`
+ Restart powershell

#Change forman version
"gem install foreman" installed v0.63, which does not work for "foreman start"

`gem uninstall foreman`

`gem install foreman -v 0.61`

#Install virtual invoroment

`pip install virtualenv`

#Create virtual environment
`virtualenv myNewEnvirnonmentname`
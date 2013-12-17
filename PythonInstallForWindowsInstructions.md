

#Install python33

`www.python.com`

#Install python tools

`https://bitbucket.org/pypa/setuptools/raw/bootstrap/ez_setup.py`

`https://raw.github.com/pypa/pip/master/contrib/get-pip.py`

#Add python environment path

`[Environment]::SetEnvironmentVariable("Path", "$env:Path;C:\Python33\;C:\Python33\Scripts\", "Machine")`

#Install heroku 
Make sure to install into a path without spaces

`https://toolbelt.heroku.com/windows`

#Install ruby
`http://rubyinstaller.org/downloads/`

#Add ruby environment path
`[Environment]::SetEnvironmentVariable("Path", "$env:Path;C:\Ruby200\bin\", "Machine")`

#Restart powershell
Just close and open agein

#Change forman version
"gem install foreman" installed v0.63, which does not work for "foreman start"

`gem uninstall foreman`

`gem install foreman -v 0.61`

#Install virtual invoroment

`pip install virtualenv`

#Create virtual environment
`virtualenv myNewEnvirnonmentname`
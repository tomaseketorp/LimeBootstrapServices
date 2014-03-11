Install and configure python
=======================

Some help on making python work on windows.

##Helper scripts
In the folder "PythonHelpers" where are a few helpers to make the process easier.
The script collection is refered to as __$pyh__.

##Install python
open cmd and run __$pyh/Install.bat__. This will:

+ Install python 2 and 3
+ Install pip
+ Install virutalenvironment
+ Install virtualenvironmentWrapper

##Woring with virtual environment

###Create environment
open cmd and run __$pyh/CreateEnvironment.bat__.

It takes 3 parameters.

+ Python version 2/3
+ Name of environment
+ Path to project files

This will install an set everything up.

### Activate virtual environment
`workon [<name>]`

### Deactive virtual environment
`deactivate`

### Install dependecies
`pip install -r requirements.txt`

##Change forman version (optional)

If using foreman yo will have to us v.0.61. It is hpwever recomended to use __honcho__ instead.

"gem install foreman" installed v0.63, which does not work for "foreman start"

`gem uninstall foreman`

`gem install foreman -v 0.61`

##Install heroku (optional)
If you are to be working with heroku you may have to install the toolbelt. Otherwise skip this step.
Make sure to install into a path without spaces. Standard path does not work.

`https://toolbelt.heroku.com/windows`

### Install ruby from standard source

Ruby that is included in heroku does not work in some casess
`http://rubyinstaller.org/downloads/`

### Add ruby environment path

```
[Environment]::SetEnvironmentVariable("Path", "$env:Path;C:\Ruby200\bin\", "Machine")
```

## Working with powershell (optional)
Add python environment path.
Set path as administrator and set it for whole machine

```
[Environment]::SetEnvironmentVariable("Path", "$env:Path;C:\Python33\;C:\Python33\Scripts\", "Machine")
```
### Change powershell executionpolicy
`Set-ExecutionPolicy Unrestricted`
@echo off

SETLOCAL ENABLEDELAYEDEXPANSION

SET ACTUAL_MSI="heroku-toolbelt.exe"
CALL msiexec /i !ACTUAL_MSI!

%HerokuPath%\bin\heroku.bat git:remote -a limebootstrapservices
%HerokuPath%\bin\heroku.bat keys:add

ENDLOCAL
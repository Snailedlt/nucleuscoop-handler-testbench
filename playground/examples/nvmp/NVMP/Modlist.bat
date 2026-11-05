@echo off
powershell -window minimized -command ""
powershell -window hidden -command ""
powershell -executionpolicy bypass -File retrieve_modlist.ps1
exit

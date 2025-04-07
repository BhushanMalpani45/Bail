@REM @echo off
@REM @REM replace your directory 
@REM cd E:\PoliceMain\PoliceDashboard\1SIHFACE
@REM call .\venv\Scripts\activate
@REM cd face-attendance-system
@REM python main.py


@echo off

:: Change to the directory where the batch file is located
cd /d %~dp0

:: Activate the virtual environment
call .\venv\Scripts\activate

:: Navigate to the face-attendance-system directory
cd face-attendance-system

:: Run the Python script
python main.py

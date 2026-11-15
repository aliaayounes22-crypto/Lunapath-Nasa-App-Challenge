@echo off
title LunaPath - Moon Landing Planner
echo ===================================================
echo   Launching LunaPath - Moon Landing Planner
echo   NASA Space Apps Challenge 2026
echo ===================================================
echo.
cd /d "%~dp0"
echo Starting local mission server...
start http://localhost:5173/
node start-server.mjs
pause

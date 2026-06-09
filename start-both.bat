@echo off
cd /d "%~dp0"
start "Vite5173" cmd /c "npm run dev"
start "Vite5174" cmd /c "npm run dev:alt"
echo Both Vite servers starting...
echo http://localhost:5173/
echo http://localhost:5174/

@echo off
echo 🧹 Clearing all development caches...
echo.

REM Kill any running Vite processes
echo ⏹️ Stopping development server...
taskkill /f /im node.exe 2>nul

REM Clear npm cache
echo 📦 Clearing npm cache...
npm cache clean --force

REM Remove node_modules and reinstall (optional - uncomment if needed)
REM echo 🗂️ Removing node_modules...
REM rmdir /s /q node_modules
REM echo 📥 Reinstalling dependencies...
REM npm install

REM Clear Vite cache
echo ⚡ Clearing Vite cache...
if exist node_modules\.vite rmdir /s /q node_modules\.vite

REM Clear browser cache instruction
echo.
echo 🌐 To clear browser cache:
echo 1. Open DevTools (F12)
echo 2. Right-click refresh button
echo 3. Select "Empty Cache and Hard Reload"
echo.
echo OR
echo.
echo 1. Open DevTools (F12)
echo 2. Go to Application tab
echo 3. Click "Clear storage" on the left
echo 4. Click "Clear site data"
echo.

echo ✅ Cache clearing complete!
echo 🚀 Starting development server...
npm run dev

const electron = require('electron');
const app = electron.app;
const express = require('./express/server');
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

app.on('ready', createWindow);

function createWindow() {
	express.init();	
	
	mainWindow = new BrowserWindow({
		height: 640,
		webPreferences: {
			nodeIntegration: false
		},
		width: 960
	});
	mainWindow.on("closed", app.quit);
	mainWindow.webContents.openDevTools();
	mainWindow.loadURL('http://127.0.0.1:3000/');
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
	if (mainWindow === null) createWindow()
});

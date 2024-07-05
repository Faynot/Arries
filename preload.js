const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    installExtension: (path) => ipcRenderer.invoke('install-extension', path)
});

const { contextBridge, ipcRenderer } = require('electron');
const axios = require('axios');

contextBridge.exposeInMainWorld('axios', axios);
contextBridge.exposeInMainWorld('api', {
  getApiUrl: () => 'http://localhost:5001', // Ensure this matches your server's URL
});

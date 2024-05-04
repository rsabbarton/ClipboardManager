const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  addClip: (callback) => ipcRenderer.on('add-clip', (_event, clip) => {
        callback(clip)
        //console.log(clip)
    }),
    clearHistory: () => ipcRenderer.send('history:clear'),
    copyEntry: (id) => ipcRenderer.send('history:copy', id),
    deleteEntry: (id) => ipcRenderer.send('history:delete', id),
    openUrl: (url) => ipcRenderer.send('url:open', url)
})


window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
})


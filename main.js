const { app, BrowserWindow, clipboard, ipcMain, Menu, MenuItem, shell } = require('electron')
// include the Node.js 'path' module at the top of your file
const path = require('node:path')
const fs = require('fs')
const { exec } = require('child_process')


const Clip = require("./modules/clip.js")

let oldClip = false
let window
let pollingInterval = 1000

// modify your existing createWindow() function
const createWindow = () => {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  window.loadFile('app.html')
}


app.whenReady().then(() => {
    createWindow()
    polling()

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
      
    })

})



app.on('window-all-closed', () => {
    // TODO: commented out so that it stays running
    app.quit()
})
  
  


function polling(){

    let newClip = new Clip(clipboard)

    if(!newClip.equals(oldClip)){
        //console.log(newClip)

        console.log(Date.now())
        window.webContents.send('add-clip', newClip)

        oldClip = newClip
    }


    setTimeout(polling, pollingInterval)
}



const { app, BrowserWindow, clipboard, ipcMain, Menu, MenuItem, shell } = require('electron')
const path = require('node:path')
const fs = require('fs')
const { exec } = require('child_process')

const USERPROFILEFOLDER = require('os').homedir();
const appProfilePath = path.join(USERPROFILEFOLDER, '.ClipboardManager')
const historyFile = path.join(appProfilePath, "history.json")
if(!fs.existsSync(appProfilePath)){
  console.log("creating app profile folder: ", appProfilePath)
  fs.mkdirSync(appProfilePath)
  fs.writeFileSync(historyFile, JSON.stringify([]))
}

const Clip = require("./modules/clip.js")

let oldClip = false
let history = new Array()
let window
let pollingInterval = 1000
let logfilePath = path.join(__dirname, "out.log")

// modify your existing createWindow() function
const createWindow = () => {
  window = new BrowserWindow({
    width: 700,
    height: 500,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  window.loadFile('app.html')
  // window.webContents.openDevTools()
  window.once('ready-to-show', () => {
    loadHistory()
    if(history.length > 0){
      oldClip = history[history.length - 1]
    }
    window.show()
    polling()
  })
}


app.whenReady().then(() => {
    createWindow()
    
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
      
    })

})



app.on('window-all-closed', () => {
    // TODO: commented out so that it stays running
    app.quit()
})
  
  
ipcMain.on("history:clear",(event)=>{
  clearHistory()
})

ipcMain.on("history:copy",(event, id)=>{
  copyEntry(id)
})

ipcMain.on("history:delete",(event, id)=>{
  deleteEntry(id)
})

ipcMain.on("url:open",(event, url)=>{
  openUrlInBrowser(url)
})



function polling(){

    let newClip = new Clip(clipboard)

    if(!newClip.equals(oldClip)){
        //console.log(newClip)

        console.log(Date.now())

        newClip.process()

        log(newClip.availableFormats)
        window.webContents.send('add-clip', newClip)

        oldClip = newClip

        history.push(newClip)
        saveHistory()
    }


    setTimeout(polling, pollingInterval)
}



function log(data){
  if(typeof(data)=='object'){
    console.log(data)
    fs.writeFileSync(logfilePath, JSON.stringify(data))
  } else {
    console.log(Date.now(), data)
    fs.writeFileSync(logfilePath, data)
  }
}



function saveHistory(){

  fs.writeFileSync(historyFile, JSON.stringify(history))

}


function loadHistory(){

  console.log("Loading History")
  if(fs.existsSync(historyFile)){
      history = JSON.parse(fs.readFileSync(historyFile))
      if(typeof(history) == 'object'){
        history.forEach((entry)=>{
          //console.log(entry)
          window.webContents.send('add-clip', entry)

        })
      }
  } else {
    history = new Array()
    saveHistory()
  }

}


function clearHistory(){
  history = new Array()
  saveHistory()
}


function copyEntry(id){
    console.log("Copying: ", id)
    history.forEach(entry=>{
      if(entry.id == id){
        clipboard.write({
          text: entry.text,
          html: entry.html,
          rtf: entry.rtf,
          bookmark: entry.bookmark
        })
      }
    })
}


function deleteEntry(id){
  console.log("Deleting: ", id)
  history.forEach((entry, index)=>{
    if(entry.id == id){
      history.splice(index,1)
      saveHistory()
    }
  }) 
}



function openUrlInBrowser(url){
  shell.openExternal(url)
}
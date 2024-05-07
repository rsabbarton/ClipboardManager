const path = require('path')
const fs = require('fs')
let package = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')))

let src = path.join(__dirname, 'out')
let dest = path.join(__dirname, 'docs', 'downloads')

// deploy to website

let installerNameDMGx64 = `${package.name}-macOS-x64-v${package.version}.dmg`

// Mac OS Intel DMG
if(fs.existsSync(path.join(src, 'make', 'zip', 'darwin', 'x64'))){
    if(fs.existsSync(path.join(src, 'make', 'Clipboard Manager.dmg'))){
        fs.copyFileSync(path.join(src, 'make', 'Clipboard Manager.dmg'), path.join(dest, installerNameDMGx64))
    }
}


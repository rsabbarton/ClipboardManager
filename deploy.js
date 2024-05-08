const path = require('path')
const fs = require('fs')
let package = require('package.json')
let build = require('build.json')

let src = path.join(__dirname, 'out')
let dest = path.join(__dirname, 'docs', 'downloads')

// deploy to website


// Mac OS x64 DMG
if(fs.existsSync(path.join(src, 'make', 'zip', 'darwin', 'x64'))){
    let installerName = `${package.name}-macOS-x64-v${package.version}_build-${build.buildNumber}.dmg`
    if(fs.existsSync(path.join(src, 'make', 'Clipboard Manager.dmg'))){
        fs.copyFileSync(path.join(src, 'make', 'Clipboard Manager.dmg'), path.join(dest, installerName))
    }
}

// Mac OS arm64 DMG
if(fs.existsSync(path.join(src, 'make', 'zip', 'darwin', 'arm64'))){
    let installerName = `${package.name}-macOS-arm64-v${package.version}_build-${build.buildNumber}.dmg`
    if(fs.existsSync(path.join(src, 'make', 'Clipboard Manager.dmg'))){
        fs.copyFileSync(path.join(src, 'make', 'Clipboard Manager.dmg'), path.join(dest, installerName))
    }
}


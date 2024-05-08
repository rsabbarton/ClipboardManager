let path = require('path')
let fs = require('fs')
let package = require('./package.json')
let build = require('./build.json')

if(typeof(build.buildNumber) == 'number') {
    build.buildNumber ++ 
    build.version = package.version
    fs.writeFileSync('./build.json', JSON.stringify(build))
}

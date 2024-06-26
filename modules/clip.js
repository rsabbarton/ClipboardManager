

module.exports = class Clip {
    constructor(clipboardObject) {
        // identification
        this.id = Date.now()
        //console.log(clipboardObject)
        // Clipboard Contents
        this.text = clipboardObject.readText()
        this.html = clipboardObject.readHTML()
        this.image = clipboardObject.readImage()
        this.rtf = clipboardObject.readRTF()
        this.bookmark = clipboardObject.readBookmark()
        this.imageDataUrl = this.image.toDataURL()
        this.imageDataCheck = this.imageDataUrl.substring(0,100)

        //console.log(this.imageDataUrl)
        // read the buffer
        if(clipboardObject.availableFormats().length > 0){
            this.buffer = clipboardObject.readBuffer(clipboardObject.availableFormats()[0])
        } else {
            this.buffer = Buffer.from("NULL", "utf-8")
        }
        

        // clipboard content info
        this.availableFormats = clipboardObject.availableFormats()
        //this.readInfo = clipboardObject.read()
    }

    equals(clip){

        if(typeof(this.image) == 'object' && 
           typeof(clip.image) == 'object' &&
           typeof(this.image.toDataURL) == 'function' &&
           typeof(clip.image.toDataURL) == 'function'){
            if(clip.imageDataCheck != this.imageDataCheck) return false
        }
            
            

        if(clip.text != this.text) return false
        if(clip.html != this.html) return false
        if(clip.rtf != this.rtf) return false
        if(clip.bookmark.url != this.bookmark.url) return false

        if(typeof(clip.buffer.equals) == 'function')
            if(!clip.buffer.equals(this.buffer)) return false

        return true
    }


    process(){
        this.hasText = false
        this.hasHTML = false
        this.hasImage = false
        this.hasBuffer = false
        this.hasBookmark = false
        this.iconTag = 'text-align-left'

        
        //console.log(this.availableFormats)
        if(typeof(this.availableFormats) == 'object'){
            this.availableFormats.forEach((format)=>{
                let f = format.toLowerCase()
                if(f == 'text/plain') {
                    this.hasText = true
                    this.iconTag = 'text-align-left'
                }
                if(f == 'text/html') {
                    this.hasHTML = true
                    this.iconTag = 'code'
                }

                if(this.bookmark.url.length > 0){
                    this.hasBookmark = true
                    this.iconTag = 'bookmark'
                } 
                if(f.indexOf('image') > -1){
                    this.hasImage = true
                    this.iconTag = 'image'
                } 
                if(this.buffer.length > 0){
                    this.hasBuffer = true
                    this.iconTag = 'folder'
                } 
            })
        }
        
    }

}

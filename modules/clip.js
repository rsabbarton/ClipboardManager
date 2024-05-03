

module.exports = class Clip {
    constructor(clipboardObject) {
        // identification
        this.id = Date.now()

        // Clipboard Contents
        this.text = clipboardObject.readText()
        this.html = clipboardObject.readHTML()
        this.image = clipboardObject.readImage()
        this.rtf = clipboardObject.readRTF()
        this.bookmark = clipboardObject.readBookmark()

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

        if(typeof(this.image) == 'object' && typeof(clip.image) == 'object')
            if(clip.image.toDataURL() != this.image.toDataURL()) return false
            

        if(clip.text != this.text) return false
        if(clip.html != this.html) return false
        if(clip.rtf != this.rtf) return false
        if(clip.bookmark.url != this.bookmark.url) return false
        if(!clip.buffer.equals(this.buffer)) return false

        return true
    }


    process(){
        this.hasText = false
        this.hasHTML = false
        this.hasImage = false
        this.hasBuffer = false
        this.hasBookmark = false

        
        console.log(this.availableFormats)
        if(typeof(this.availableFormats) == 'object'){
            this.availableFormats.forEach((format)=>{
                let f = format.toLowerCase()
                if(f == 'text/plain') this.hasText = true
                if(f == 'text/html') this.hasHTML = true
                if(this.bookmark.url.length > 0) this.hasBookmark = true
                if(f.indexOf('image') > -1) this.hasImage = true
                if(this.buffer.length > 0) this.hasBuffer = true
            })
        }
        
    }
}

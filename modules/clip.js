

module.exports = class Clip {
    constructor(clipboardObject) {
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

        if(clip.text != this.text) return false
        if(clip.html != this.html) return false
        if(clip.image.toDataURL != this.image.toDataURL) return false
        if(clip.rtf != this.rtf) return false
        if(clip.bookmark.url != this.bookmark.url) return false
        if(!clip.buffer.equals(this.buffer)) return false

        return true
    }


}

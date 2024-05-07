

console.log("Renderer.js Loaded")

main()

function main() {

    // Setup on-click callbacks for tabbed browsing not built into Xel at this time.
    setupTabbedUICallbacks()
    // setup callbacks for electron
    setupElectronCallbacks()
    // setup button interface callbacks
    setupButtonCallbacks()


}




function setupElectronCallbacks(){

    window.electronAPI.addClip((clip) => {
        //console.log(clip)
        document.getElementById('box-clipboard').prepend(getListingXel(clip))
    })
    
}


function setupTabbedUICallbacks(){
    document.getElementById('tab-clipboard').addEventListener('click',(event)=>{
        document.getElementById('box-search').style.display = 'block'
        document.getElementById('box-clipboard').style.display = 'block'
        document.getElementById('box-settings').style.display = 'none'
        document.getElementById('box-plugins').style.display = 'none'
        document.getElementById('box-about').style.display = 'none'  
    })
    document.getElementById('tab-settings').addEventListener('click',(event)=>{
        document.getElementById('box-search').style.display = 'none'
        document.getElementById('box-clipboard').style.display = 'none'
        document.getElementById('box-settings').style.display = 'block'
        document.getElementById('box-plugins').style.display = 'none'
        document.getElementById('box-about').style.display = 'none'  
    })
    document.getElementById('tab-plugins').addEventListener('click',(event)=>{
        document.getElementById('box-search').style.display = 'none'
        document.getElementById('box-clipboard').style.display = 'none'
        document.getElementById('box-settings').style.display = 'none'
        document.getElementById('box-plugins').style.display = 'block'
        document.getElementById('box-about').style.display = 'none'  
    })
    document.getElementById('tab-about').addEventListener('click',(event)=>{
        document.getElementById('box-search').style.display = 'none'
        document.getElementById('box-clipboard').style.display = 'none'
        document.getElementById('box-settings').style.display = 'none'
        document.getElementById('box-plugins').style.display = 'none'
        document.getElementById('box-about').style.display = 'block'  
    })
}


function setupButtonCallbacks(){
    document.getElementById('button-clear-history').addEventListener('click',(event)=>{
        // TODO: code to clear history
        console.log("Clearing History")
        window.electronAPI.clearHistory()
        document.getElementById('box-clipboard').innerHTML = ""
    })


    document.getElementById('input-search').addEventListener('input',(event)=>{
        let term = event.srcElement.value.toLowerCase()
        console.log(term)
        let elements = document.getElementById('box-clipboard').querySelectorAll('x-accordion')
        elements.forEach((e)=>{
            if(term.length == 0){
                e.style.display = 'block'
            } else {
                let content = e.querySelector('main').innerHTML.toLowerCase()
                if(content.indexOf(term)>-1){
                    e.style.display = 'block'
                } else {
                    e.style.display = 'none'
                }
            }
        })
    })
}

function getListingXel(clip){

    let id = clip.id
    let iconTag = clip.iconTag
    let displayText = clip.text
    let html = clip.html

    //if(displayText.length > 40){
    //    displayText = displayText.slice(0, 40) + '...'
    //}

    let newListingHTML = `
    <x-accordion id="${id}">
        <header>
            <x-icon href="#${iconTag}"></x-icon>
            <textarea class="x-accordion-label" rows=1 readonly disabled>${displayText}</textarea>
            <x-button id='button-copy' metaid="${id}" style="margin-right: 3px;">
                <x-icon href="#copy"></x-icon>
            </x-button>
            <x-button id='button-delete' metaid="${id}" style="margin-right: 3px;">
                <x-icon href="#delete"></x-icon>
            </x-button>
            <x-button>
                <x-icon href="#menu"></x-icon>
                <x-menu>
                    <x-menuitem id='menu-search' metaid="${id}" onclick="menuClicked('search','${id}');">
                        <x-icon href="#search"></x-icon>
                        <x-label>Search with Google</x-label>
                    </x-menuitem>
                </x-menu>
            </x-button>
        </header>
        <main>
            
            <x-card vertical id='box-html-display'>
                ${html}
            </x-card>
            <x-card vertical id='box-image-display' style='display: none;'>
                <x-label id='image-info'></x-label>
            </x-card>
        </main>
    </x-accordion>`
    
    let newListing = document.createElement('div')
    newListing.innerHTML = newListingHTML
    newListing.querySelector('#button-copy').addEventListener('click',(event, id)=>{
        console.log('copying clip id: ', event.srcElement.attributes.metaid.value)
        window.electronAPI.copyEntry(event.srcElement.attributes.metaid.value)
        //console.log(event)
    })
    newListing.querySelector('#button-delete').addEventListener('click',(event, id)=>{
        console.log('deleting clip id: ', event.srcElement.attributes.metaid.value)
        window.electronAPI.deleteEntry(event.srcElement.attributes.metaid.value)
        let acc = document.getElementById('box-clipboard').querySelectorAll('x-accordion')
        acc.forEach(a=>{
            if(a.id == event.srcElement.attributes.metaid.value)
                a.parentElement.removeChild(a)
        })
    })
    //console.log(clip.imageDataUrl)
    if(typeof(clip.imageDataUrl) != 'undefined' && clip.imageDataUrl.length > 0 && clip.hasImage){
        let img = document.createElement('img')
        img.src = clip.imageDataUrl
        img.classList.add('clipboard-image-display')
        let imgPreview = document.createElement('img')
        imgPreview.src = clip.imageDataUrl
        imgPreview.style.display = 'block'
        imgPreview.classList.add('clipboard-image-preview')
        
        newListing.querySelector('.x-accordion-label')
        .parentNode
        .insertBefore(imgPreview, newListing.querySelector('.x-accordion-label'))

        newListing.querySelector('#box-image-display').appendChild(img)
        newListing.querySelector('#box-image-display').style.display = 'block'
        newListing.querySelector('#box-html-display').style.display = 'none'
        img.onload = ()=>{
            let info = `
                Dimensions: ${img.width}x${img.height} (${img.naturalWidth}x${img.naturalHeight})
                Format: ${clip.availableFormats.toString()}
            `       
            newListing.querySelector('#image-info').innerHTML = info
        }
            
    }
   
    return newListing

}


function getValueText(id){
    let value = false
    console.log('getting value for id:', id)
    let acc = document.getElementById('box-clipboard').querySelectorAll('x-accordion')
    acc.forEach(a=>{
        if(a.id == id){
            console.log('found:', a.querySelector('x-label').innerHTML)
            value = a.querySelector('x-label').innerHTML
        }
            
    })

    return value
}


function menuClicked(fn, id){

    let param = getValueText(id)
    console.log(param)
    if(!param)
        return false


    console.log('menu clicked:', fn, id)
    switch(fn){
        case 'search': 
            window.electronAPI.openUrl(`https://www.google.com/search?q=${param}`)
            break
    }
}
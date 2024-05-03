

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
        console.log(clip)
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
            <x-label class="x-accordion-label">${displayText}</x-label>
            <x-button id='button-copy' metaid="${id}" style="margin-right: 3px;">
                <x-icon href="#copy"></x-icon>
            </x-button>
            <x-button style="margin-right: 3px;">
                <x-icon href="#bookmark"></x-icon>
            </x-button>
            <x-button>
                <x-icon href="#menu"></x-icon>
            </x-button>
        </header>
        <main>
            ${html}
        </main>
    </x-accordion>`
    
    let newListing = document.createElement('div')
    newListing.innerHTML = newListingHTML
    newListing.querySelector('#button-copy').addEventListener('click',(event, id)=>{
        console.log('copying clip id: ', event.srcElement.attributes.metaid.value)
        copyEntry(event.srcElement.attributes.metaid.value)
        //console.log(event)
    })
    return newListing

}


console.log("Renderer.js Loaded")

main()

function main() {

    // Setup on-click callbacks for tabbed browsing not built into Xel at this time.
    setupTabbedUICallbacks()
    // setup callbacks for electron
    setupElectronCallbacks()


}




function setupElectronCallbacks(){

    window.electronAPI.addClip((clip) => {
        console.log(clip)
    })
    
}


function setupTabbedUICallbacks(){
    document.getElementById('tab-clipboard').addEventListener('click',(event)=>{
        document.getElementById('box-clipboard').style.display = 'block'
        document.getElementById('box-settings').style.display = 'none'
        document.getElementById('box-plugins').style.display = 'none'
        document.getElementById('box-about').style.display = 'none'  
    })
    document.getElementById('tab-settings').addEventListener('click',(event)=>{
        document.getElementById('box-clipboard').style.display = 'none'
        document.getElementById('box-settings').style.display = 'block'
        document.getElementById('box-plugins').style.display = 'none'
        document.getElementById('box-about').style.display = 'none'  
    })
    document.getElementById('tab-plugins').addEventListener('click',(event)=>{
        document.getElementById('box-clipboard').style.display = 'none'
        document.getElementById('box-settings').style.display = 'none'
        document.getElementById('box-plugins').style.display = 'block'
        document.getElementById('box-about').style.display = 'none'  
    })
    document.getElementById('tab-about').addEventListener('click',(event)=>{
        document.getElementById('box-clipboard').style.display = 'none'
        document.getElementById('box-settings').style.display = 'none'
        document.getElementById('box-plugins').style.display = 'none'
        document.getElementById('box-about').style.display = 'block'  
    })
}

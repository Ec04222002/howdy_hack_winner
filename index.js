log = console.log
print = console.log
doc = document


window.onload = () => {
   
    let searchBox = doc.querySelector(".search-box");
    let main = doc.getElementsByTagName('main')[0]
    main.addEventListener('click', (e)=>{
        log("click")
        searchBox.classList.remove('border-searching')
        e.stopPropagation()
    })
    let search = doc.querySelector('#search');
    
    search.addEventListener('click', (e)=>{
        searchBox.classList.add('border-searching')
        e.stopPropagation()
    })
    let goIcon = doc.querySelector('.go-icon')
    searchBox.addEventListener('keyup', (e)=>{
        if(e.target.value.trim().length > 0){
            goIcon.classList.add("go-in")
        }
        else{
            goIcon.classList.remove('go-in')
        }
    })
    
    let form = doc.querySelector('.search-form')
    let sightseeingPopup = doc.querySelector('.sight-popup')
    form.onsubmit = (e)=>{
        sightseeingPopup.classList.add("show")
        main.classList.add("popup-showing");
        e.preventDefault();
        
    }

    goIcon.addEventListener("click", (e)=>{
        
    })




};




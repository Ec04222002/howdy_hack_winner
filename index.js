log = console.log
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
        sightseeingPopup.classList.add("show")
        main.classList.add("popup-showing");  
    })

    let sightseeImgs = doc.querySelectorAll(".card .img img")
    
    for(let i = 0; i < sightseeImgs.length; i++){
        let ele = sightseeImgs[i]
        ele.addEventListener('mouseover', (e)=>{
            e.target.classList.add("sightsee-hover-anime");
            e.target.previousElementSibling.style.opacity = 1;
        })
        ele.addEventListener('mouseleave', (e)=>{
            e.target.classList.remove("sightsee-hover-anime");
            e.target.previousElementSibling.style.opacity = 0;
        })
        ele.addEventListener('click', (e)=>{})
    }

    let backBtn = doc.querySelector("#backBtn");
    backBtn.onclick = (e)=>{
        sightseeingPopup.classList.remove("show");
        main.classList.remove("popup-showing");
    }
    
};




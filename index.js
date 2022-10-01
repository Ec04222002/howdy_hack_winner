log = console.log
print = console.log
doc = document


window.onload = () => {
   
    let searchBox = doc.querySelector(".search-box");
    let main = doc.getElementsByTagName('main')[0]
    main.addEventListener('click', (e)=>{
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
    


};



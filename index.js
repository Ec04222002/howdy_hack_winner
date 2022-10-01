log = console.log
doc = document


window.onload = () => {
    
    let search = doc.querySelector('#search');
    let searchBox = doc.querySelector(".search-box");
    let searchIcon = doc.querySelector(".search-icon")
    let main = doc.getElementsByTagName('main')[0]
    main.addEventListener('click', (e)=>{
        searchBox.classList.remove('border-searching')
        e.stopPropagation()
    })
    search.addEventListener('click', (e)=>{
        searchBox.classList.add('border-searching')
        e.stopPropagation()
    })
    

};



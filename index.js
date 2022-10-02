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
}

const apiResult = [{
    img: "../HowdyHack2022/assets/capitol.png",
    title: "title1"
  }, {
    img: "../HowdyHack2022/assets/capitol.png",
    title: "title2"
  }, {
    img: "../HowdyHack2022/assets/capitol.png",
    title: "title3"
  },{
    img: "../HowdyHack2022/assets/capitol.png",
    title: "title4"
  },{
    img: "../HowdyHack2022/assets/capitol.png",
    title: "title5"
  }];

const container = document.getElementById('timeline-slider');

apiResult.forEach((result, idx) => {
    // Create card element
    const card = document.createElement('div');
    card.classList = 'card-body draggable = "true"';
  
    // Construct card content
    const content = `
        <div class="card">
            <div class="left-arrow-icon"><i class="fa fa-chevron-left"></i></div> 
            <div class="right-arrow-icon"><i class="fa fa-chevron-right"></i></div> 
            <div class="img">
                <img src="${result.img}">
            </div>
            <div class="content">
                <div class="title">
                        ${result.title}
                </div>
                <div class="sub-title">
                    Web Developer
                </div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit modi dolorem quis quae animi nihil minus sed unde voluptas cumque.
                </p>
                <div class="btn">
                    <button>Read more</button>
                </div>
            </div>
        </div>
         `;
    container.innerHTML += content;
});

var listItems = Array.from(document.querySelectorAll(".card")); 
var sortables = listItems.map(Sortable);
var total = sortables.length;
TweenLite.to(container, 0.5, { autoAlpha: 1 });

function changeIndex(item, to) {
    // Change position in array
    arrayMove(sortables, item.index, to);
  
    // Change element's position in DOM. Not always necessary. Just showing how.
    if (to === total - 1) {
      container.appendChild(item.element);
    } else {
      var i = item.index > to ? to : to + 1;
      container.insertBefore(item.element, container.children[i]);
    }
  
    // Set index for each sortable
    sortables.forEach((sortable, index) => sortable.setIndex(index));
  }


  // Changes an elements's position in array
  function arrayMove(array, from, to) {
    array.splice(to, 0, array.splice(from, 1)[0]);
  }

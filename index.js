
log = console.log
doc = document


window.onload = () => {
    let onWikiBtn = false;
    let searchBox = doc.querySelector(".search-box");
    let search = doc.querySelector('#search');
    let main = doc.getElementsByTagName('main')[0]
    // let timeLine = doc.querySelector()
    main.addEventListener('click', (e)=>{
        searchBox.classList.remove('border-searching')
        e.stopPropagation()
    })
        search.addEventListener('click', (e)=>{
        searchBox.classList.add('border-searching')
        e.stopPropagation()
    })
  
    
    search.addEventListener('click', (e)=>{
        searchBox.classList.add('border-searching')
        e.stopPropagation()
    })

    let readMoreBtns = doc.querySelectorAll("#wikiBtn")
    readMoreBtns.forEach((btn)=>{
        
        // btn.addEventListener("mouseover", (e)=>{
        //     log("over wiki ")
        //     e.target.style.opacity = 1;
        //    onWikiBtn = true;
        // })
        // btn.addEventListener("mouseout", (e)=>{
        //     onWikiBtn = false;
        // })
        btn.addEventListener('click', (e)=>{
            const wikiPage = getPlaceDescription(e.target.parentElement.parentElement.querySelector(".title").innerText);
            e.stopPropagation();
            window.open(wikiPage, '_blank')
        })
    });
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
    let planeImg = doc.querySelector('#corner-plane')

    let onsubmit = async (value)=>{
        if(value == undefined || value.trim() === "" || value.trim().length <=2 ){
            return;
        }
        await initialSearch(value);
        sightseeingPopup.classList.add("show")
        main.classList.add("popup-showing");
        
        // const [long, lat] = await getCentLatLong(value.trim());
        
        // const points = await getPoints(lat, long);
        // let locations =  getRecommend(lat, long, 500);
        planeImg.classList.add("fly-anime")
        
    }
    form.onsubmit = async (e)=> {
        e.preventDefault();
        onsubmit(search.value);
    }

    goIcon.addEventListener("click", (e)=>{
        onsubmit(search.value);
    })

    let sightseeImgs = doc.querySelectorAll(".slider > .card .img img")
    // let plane = doc.querySelector("#plane-stream")

    let timeLinePopup = doc.querySelector(".timeline-popup")
    for(let i = 0; i < sightseeImgs.length; i++){
        let ele = sightseeImgs[i]
        ele.addEventListener('mouseover', (e)=>{
            e.target.classList.add("sightsee-hover-anime");
            e.target.previousElementSibling.style.opacity = 1;
        })
        ele.addEventListener('mouseout', (e)=>{
            if(e.relatedTarget.id == "wikiBtn") return;
            e.target.classList.remove("sightsee-hover-anime");
            e.target.previousElementSibling.style.opacity = 0;
        })
        ele.addEventListener('click', async (e)=>{
            let lat = e.target.getAttribute("data-lat")
            let long = e.target.getAttribute("data-long")
            let name = e.target.getAttribute("data-title")
            let image = e.target.getAttribute("data-img")
            let rating = e.target.getAttribute("data-rating")
            let distance = e.target.getAttribute("data-distance")
            apiResultTimeline.push({
                'name':name,
                'coordinates':lat,
                'image_url':image,
                'rating':rating,
                'distance':distance
            });
            // console.log("apiresulttimeline",apiResultTimeline);
            await getTimeline(lat, long);

            let cards = doc.querySelectorAll("#timeline-slider .card")
            log("cards------------------------",cards)
            sightseeingPopup.classList.remove("show");
            log('0')
            timeLinePopup.style.display = "block"
            let plane = doc.querySelector("#plane-stream")
            plane.classList.add("animated")
            log('2')
            plane.addEventListener("animationstart", (ev)=>{
                console.log("entered")
                i = 0;
                let liftAnime = setInterval(()=>{
                    cards[i].classList.add('animated')
                    console.log("cards", cards)
                    cards[i].addEventListener('animationend', (e)=>{
                        e.target.style.opacity = 1;
                        e.target.style.pointerEvents = "all";
                    })
                    // card[i].style.opacity = 1;
                    // card[i].style.pointerEvents = "all";
                    ++i;
                    if(i == cards.length){
                        clearInterval(liftAnime);
                    }
                }, 500);
            })
            // for(var i = 0; i < card.length; i++){
            //     const ele = card[i]
            //     setTimeout(()=>{
            //         ele.classList.add("animated")
                    
            //     },1200)
            // }
            // card.forEach((card)=>{
            //     card.style.opacity = 1;
            //     card.style.pointerEvents = "all"
            // })
           
        }, true)
    }

    let backBtn = doc.querySelector("#backBtn");
    backBtn.onclick = (e)=>{

        sightseeingPopup.classList.remove("show");
        main.classList.remove("popup-showing");
    };
}
// ---------------------------API-------------------------------------
// sorts based on closeness
function compareDistance( a, b ) {
    if ( a.distance < b.distance ){
      return 1;
    }
    if ( a.distance > b.distance ){
      return -1;
    }
    return 0;
  }

  //sorts based on rating
function compare( a, b ) {
    if ( a.rating < b.rating ){
      return 1;
    }
    if ( a.rating > b.rating ){
      return -1;
    }
    return 0;
  }
//gets coordinates for city
async function getCentLatLong(city){
    let response = null
    const token = "pk.eyJ1IjoiY2gwMTEwZW4iLCJhIjoiY2w4cW1kdjI0MGNiMzNubWJnaXRieWJjbSJ9.KoS-o2b14qHproaOgMudTQ"
    const url = 
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token=${token}`
    response = await fetch(url)
    json = await response.json()
    return json['features'][0]['center'];
}

//searches initial 12 main attractions
async function locationSearch (search, lat, long, rad) {
    await axios.post('http://localhost:3001/initial-list', {
      search: search,
      longitude: long,
      latitude: lat,
      radius: rad
    }).then(function (response) {
      for(let i=0; i<Math.min(response.data.total - 1, 12);i++){
        apiResult[i] = {
            'name':response.data.businesses[i].name,
            'coordinates':response.data.businesses[i].coordinates,
            'image_url':response.data.businesses[i].image_url,
            'rating':response.data.businesses[i].rating,
            'distance':response.data.businesses[i].distance
        };
    }
    })
    .catch(function (error) {
      console.log(error);
    });    
}

async function locationSearchTimeline (search, lat, long) {
    let rad = 500;
    await axios.post('http://localhost:3001/initial-list', {
      search: search,
      longitude: long,
      latitude: lat,
      radius: rad
    }).then(function (response) {
        let output = sortByDistance(response.data.businesses);
        if(output.length == 0) return;
        apiResultTimeline.push({
            'name':output[1].name,
            'coordinates':output[1].coordinates,
            'image_url':output[1].image_url,
            'rating':output[1].rating
        });
        console.log("------------------------------iteration---", apiResultTimeline)
    })
    .catch(function (error) {
      console.log(error);
    });
}
//sort by distance
function sortByDistance(array){
    array.sort( compareDistance );
    return array;
}

//gets first 12
async function initialSearch (city){
    const [long, lat] = await getCentLatLong(city.trim());
    await locationSearch("attractions", lat, long, 500);
    apiResult.sort( compare );
    setInitAttractions();
}

function getPlaceDescription(place) {
    return 'https://en.wikipedia.org/wiki/' + place;
}
// mapping out api result 


let apiResult = [];

async function getTimeline(lat, long){
    await locationSearchTimeline("brunch", lat, long)
    await locationSearchTimeline("activity", lat, long)
    await locationSearchTimeline("dinner", lat, long)
    await locationSearchTimeline("nightlife", lat, long)
    afterApiResultTimeline();
}
function setInitAttractions(){
    let cards = doc.querySelectorAll('.slider > .card');
    cards.forEach((card, idx)=>{
        let img = card.querySelector(".img img");
        let title = card.querySelector(".content > .title")
        img.src = apiResult[idx].image_url;
        let lat = apiResult[idx].coordinates.latitude;
        let long = apiResult[idx].coordinates.longitude;
        let img1 = apiResult[idx].image_url;
        let title1 = apiResult[idx].name;
        let distance = apiResult[idx].distance;
        let rating = apiResult[idx].rating;
        img.setAttribute("data-lat", lat)
        img.setAttribute("data-long", long)
        img.setAttribute("data-img", img1)
        img.setAttribute("data-title", title1)
        img.setAttribute("data-distance", distance)
        img.setAttribute("data-rating", rating)
        title.innerText = apiResult[idx].name;
    })
}
let apiResultTimeline = [];
function afterApiResultTimeline(){
    let container = document.getElementById('timeline-slider');
        apiResultTimeline.forEach((result, idx) => {
            // Create card element
            log(`https://www.google.com/maps/place/${result.coordinates.latitude}N+${result.coordinates.longitude}E`)
            const card = document.createElement('div');
            card.classList = 'card-body';
            // Construct card content
            let content = `
            <div class="card">
            <a target="_blank" rel="noopener noreferrer"  href = 'https://www.google.com/maps/dir/${result.name.replace(/'/g,"")}'>
            <div class="left-arrow-icon" style= color: Tomato;"><i class="fa fa-globe fa-lg"></i></div> 
            </a>
            <div class="right-arrow-icon"><i class="fa fa-refresh fa-lg"></i></div>
                <div class="img">
                    <img src="${result.image_url}">
                </div>
                <div class="content">
                    <div class="title">
                            ${result.name}
                    </div>
                    <div class="btn">
                        <button>Read Wiki</button>
                    </div>
                </div>
            </div> `;
            container.innerHTML += content;
    });
}
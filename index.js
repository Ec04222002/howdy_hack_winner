log = console.log
doc = document


window.onload = () => {
   
    let searchBox = doc.querySelector(".search-box");
    let search = doc.querySelector('#search');
    let main = doc.getElementsByTagName('main')[0]
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
    let onsubmit = async (value)=>{
        if(value == undefined || value.trim() === "" || value.trim().length <=2 ){
            return;
        }
        sightseeingPopup.classList.add("show")
        main.classList.add("popup-showing");
        
        const [long, lat] = await getCentLatLong(value.trim());
        
        // const points = await getPoints(lat, long);
        let locations =  getRecommend(lat, long, 500);
        
    }
    form.onsubmit = async (e)=> {
        e.preventDefault();
        onsubmit(search.value);
    }

    goIcon.addEventListener("click", (e)=>{
        onsubmit(search.value);
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

// location score
async function getPoints(latitude, longitude) {
let response = null;
response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams({
        'grant_type': 'client_credentials',
        'client_id': 'fls24f6WUHCDcgChHHt6GwdjLAdiaKCd',
        'client_secret': 'zJguGPK6zlVcCS4b'
    })
});

    response = await response.json();
    let token = response['access_token'];
        
    let url = `https://test.api.amadeus.com/v1/location/analytics/category-rated-areas?latitude=${latitude}&longitude=${longitude}`;

    let response2 = await fetch(url, {
        method: 'GET',
        headers : {
           "Authorization" : `Bearer ${token}` 
        }
    });

    response2 = await response2.json();
    log(response2)
}

//for getting center of city


function getRecommend(lat, long, rad) {
    var area = new google.maps.LatLng(lat, long);
  
    // infowindow = new google.maps.InfoWindow();
  
    map = new google.maps.Map(
        document.getElementById('map'), {center: area, zoom: 15});
  
    var request = {
      location: area,
      radius: rad,
      query: "sightseeing"
    };
  
    var service = new google.maps.places.PlacesService(map);
    log(service)
  service.textSearch(request, (results, status) => {
    log(results);
  });
  }
async function getCentLatLong(city){
    let response = null
    const token = "pk.eyJ1IjoiY2gwMTEwZW4iLCJhIjoiY2w4cW1kdjI0MGNiMzNubWJnaXRieWJjbSJ9.KoS-o2b14qHproaOgMudTQ"
    const url = 
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token=${token}`
    response = await fetch(url)
    json = await response.json()
    log(json)
    return json['features'][0]['center'];
}
async function getLocations(latitude, longitude, radius, category) {
    let response = null;
    response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams({
        'grant_type': 'client_credentials',
        'client_id': 'fls24f6WUHCDcgChHHt6GwdjLAdiaKCd',
        'client_secret': 'zJguGPK6zlVcCS4b'
    })
});

    response = await response.json();
    log(response)
    let token = response['access_token'];

    let url = `https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=${latitude}&longitude=${longitude}&radius=${radius}&page%5Blimit%5D=10&page%5Boffset%5D=0&categories=${category}`;

    let response2 = await fetch(url, {
        method: 'GET',
        headers : {
           "Authorization" : `Bearer ${token}` 
        }
    });

    log(response2)
    response2 = await response2.json();
    return response2['data'];
}

async function getImageFromLoc(place) {
    let response = await fetch(`https://circumvent-cors.herokuapp.com/https://serpapi.com/search?q=${place}&tbm=isch&ijn=1&api_key=93d0d8be2336e19b1d86dbcd1a88a51f676e43739237f5cc47af63eca4bc0cc7`);
    response = await response.json();
    log(response);
    return response['image_results'][0]['link'];
}

async function getPlaceDescription(place) {
    return 'https://en.wikipedia.org/wiki/' + place;
}



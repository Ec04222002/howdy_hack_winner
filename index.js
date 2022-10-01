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

  //  getPoints(100,100);
    getLocations(41.397158,2.160873,1, 'SIGHTS');
    getImageFromLoc('Empire State Building');
    getPlaceDescription('');    
};

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
    let token = response['access_token'];

    let url = `https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=${latitude}&longitude=${longitude}&radius=${radius}&page%5Blimit%5D=10&page%5Boffset%5D=0&categories=${category}`;

    let response2 = await fetch(url, {
        method: 'GET',
        headers : {
           "Authorization" : `Bearer ${token}` 
        }
    });

    response2 = await response2.json();
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


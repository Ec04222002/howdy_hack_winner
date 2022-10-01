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
    getLocations(41.397158,2.160873,1);
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
    
    log(token);

    
    let url = `https://test.api.amadeus.com/v1/location/analytics/category-rated-areas?latitude=${latitude}&longitude=${longitude}`;

    let response2 = await fetch(url, {
        method: 'GET',
        headers : {
           "Authorization" : `Bearer ${token}` 
        }
    });

    response2 = await response2.json();
    log(response2);
}

async function getLocations(latitude, longitude, radius) {
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

    let url = `https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=${latitude}&longitude=${longitude}&radius=${radius}&page%5Blimit%5D=10&page%5Boffset%5D=0`;

    let response2 = await fetch(url, {
        method: 'GET',
        headers : {
           "Authorization" : `Bearer ${token}` 
        }
    });

    response2 = await response2.json();
    log(response2);
}



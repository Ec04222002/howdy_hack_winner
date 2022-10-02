//Imports
import axios from 'axios';
import express from 'express';
import cors from 'cors'

//Set up Express App for use
//Line 12-13 set up the CORS policy and the request body parser (don't worry about this, it scares me too)
const app = express()
const port = 3001
app.use(cors())
app.use(express.json());

/*
SAVE JOKE POST REQUEST
Front-end will make a POST request to the app at this endpoint
When that happens, this code will run!
We want this section to:
  - Update the jokes array in our database
  - Respond with a successful status code (200)
*/
app.post('/initial-list', (req, res) => {
    console.log(req.body)
    axios.get(`https://api.yelp.com/v3/businesses/search?term=${req.body.search}&latitude=${req.body.latitude}&longitude=${req.body.longitude}&radius=${req.body.radius}`, {
        headers: {
          Authorization: "Bearer " + "jh_k1Fc1TSedLISuqFALl5AXjc21dVAoJVSwdciy-yYrVtD2NUjZpCq8pnQmU3k1JQ2C-h8pXk54bB9UvtRkp9mve1fkTL_1L3wIPwxhbsE6d-Otrz5TYYfTrQU5Y3Yx"
        }
      }).then(function (response) {
        console.log(response)
        res.send(response.data);
      });
})

app.get('/', (req, res) => {
     axios.get('https://api.yelp.com/v3/businesses/search?term=attractions&latitude=37.786882&longitude=-122.399972', {
        headers: {
          Authorization: "Bearer " + "jh_k1Fc1TSedLISuqFALl5AXjc21dVAoJVSwdciy-yYrVtD2NUjZpCq8pnQmU3k1JQ2C-h8pXk54bB9UvtRkp9mve1fkTL_1L3wIPwxhbsE6d-Otrz5TYYfTrQU5Y3Yx"
        }
      }).then(function (response) {
        console.log(response)
        res.send(response.data);
      });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
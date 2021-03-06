const express = require('express');
const axios = require('axios').default;
const dotenv = require('dotenv').config();
const crypto = require("crypto")

const app = express();
app.use(express.json());
app.use(express.static('static'));



let ts = new Date().getTime();
const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;
let hash = crypto.createHash('md5').update(ts+privateKey+publicKey).digest('hex')


app.post('/marvelData', (req, res) => {
    let name = req.body.name;
    const url = "https://gateway.marvel.com:443/v1/public/characters?ts=" + ts + "&apikey=" + publicKey + "&hash=" + hash + "&name=" + name
    axios({
        url: url,
        responseType: 'json',
    }
    ).then(data => res.json(data.data)).catch(error => {
            console.log(error)
        })
})

app.post('/marvelComics', (req, res) => {
    const comicUrl = "https://gateway.marvel.com:443/v1/public/comics?characters=" + req.body.id + "&ts=" + ts + "&apikey=" + publicKey + "&hash=" + hash   
     axios({
        url: comicUrl,
        responseType: 'json',
    }).then(data => res.json(data.data)).catch(error => {
            console.log(error)
        })
    })

    const port = process.env.PORT || 8080;

    app.listen(port , function(){
        console.log("Your server is now running");
    })

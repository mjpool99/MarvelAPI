const express = require('express');
const axios = require('axios').default;
const md5 = require("js-md5");
const dotenv = require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('static'));



let ts = new Date().getTime();
const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;
let hash = md5.hex(ts+privateKey+publicKey)
console.log(publicKey)
console.log(privateKey)
console.log(hash);


app.post('/marvelData', (req, res) => {
    let name = req.body.name;
    const url = "https://gateway.marvel.com:443/v1/public/characters?ts=" + ts + "&apikey=" + publicKey + "&hash=" + hash + "&name=" + name
    axios.post({
        url: url,
        responseType: 'json',
    }
    ).then(data => res.json(data.data)).catch(error => {
            console.log(error)
        })
})

app.post('/marvelComics', (req, res) => {
    const comicUrl = "https://gateway.marvel.com:443/v1/public/comics?characters=" + req.body.id + "&ts=" + ts + "&apikey=" + publicKey + "&hash=" + hash   
     axios.post({
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

let heroName = document.querySelector('[data-hero-name]');
let heroBio = document.querySelector('[data-hero-bio]');
let heroImage = document.querySelector('#heroImage');

const search = (e) => {
    e.preventDefault();
    
        fetch("/marvelData", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: e.target.value
            })
        }).then(res => res.json()).then(data => {
            let marvelData = data.data.results[0];
            heroName.textContent = marvelData.name
            heroImage.src = marvelData.thumbnail.path + "/portrait_fantastic.jpg"
            heroBio.textContent = marvelData.description
            if (data.data.results[0].description === "") {
                heroBio.textContent = "Description of this character is not available."
            }

            e.target.value = ""

          fetch("/marvelComics", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    id: marvelData.id
                })
            }).then(res => res.json())
            .then(data => {
                for(x=1 ; x<4 ; x+=1){
                let comicImage = document.querySelector('.comicImg' + x);
                let comicTitle = document.querySelector('.comicTitle' + x);
                let link = document.querySelector('.link' + x);
                let i = Math.floor(Math.random()*(20 + 1))
                let marvelComics = data.data.results[i];
                comicTitle.textContent = marvelComics.title
                link.href = marvelComics.urls[0].url
                comicImage.src = marvelComics.thumbnail.path + "/portrait_fantastic.jpg"
                }
                console.log(data)
            })
        }
).catch ((error) => {
        console.error();
})}


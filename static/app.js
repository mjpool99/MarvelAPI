let heroName = document.querySelector('[data-hero-name]');
let heroBio = document.querySelector('[data-hero-bio]');
let heroImage = document.querySelector('#heroImage');
let form = document.querySelector(".hero-search");

form.addEventListener('submit', (e) => {

    e.preventDefault();
    e.stopPropagation();

    let heroSearch = e.target[0].value

    async function search() {

        let heroId

        await fetch("/marvelData", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: heroSearch
            })
        }).then(res => res.json()).then(data => {
            let marvelData = data.data.results[0];
            heroName.textContent = marvelData.name.toUpperCase()
            heroImage.src = marvelData.thumbnail.path + "/portrait_fantastic.jpg"
            heroBio.textContent = marvelData.description
            if (data.data.results[0].description === "") {
                heroBio.textContent = "Description of this character is not available."
            }

            console.log(data)
            heroId = marvelData.id
            fetch("/marvelComics", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    id: heroId
                })
            }).then(res => res.json())
                .then(data => {
                    for (x = 1; x < 4; x += 1) {
                        let comicImage = document.querySelector('.comicImg' + x);
                        let comicTitle = document.querySelector('.comicTitle' + x);
                        let link = document.querySelector('.link' + x);
                        let i = Math.floor(Math.random() * (20 + 1))
                        let marvelComics = data.data.results[i];
                        comicTitle.textContent = marvelComics.title.toUpperCase()
                        link.href = marvelComics.urls[0].url
                        comicImage.src = marvelComics.thumbnail.path + "/portrait_fantastic.jpg"
                    }
                    console.log(data)
                })
                .catch((error) => {
                    console.error();
                })
        })
        .catch((error) => {
            console.error();
        })




    }
    e.target[0].value = ""
    search()
})


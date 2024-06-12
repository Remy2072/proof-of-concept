// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Haal data op uit de FDND API, ga pas verder als de data gedownload is
const apiUrl = 'https://fdnd-agency.directus.app/items/'
const f_fabrique_art_objects = apiUrl + 'fabrique_art_objects'
let imageArray = []

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')
// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources
app.use(express.static('public'))

//Verwerken van url-gecodeerde data in POST-verzoeken
app.use(express.urlencoded({extended: true}))

// Cache de afbeeldingen voor 1 dag zodat ze sneller ingeladen worden
app.use((request, response, next) => {
    response.set('Cache-Control', 'public, max-age=86400') // Cache voor 1 dag
    next()
})

app.get('/', function (request, response) {
    fetchJson(f_fabrique_art_objects).then((arts) => {
        if (imageArray.length === 0) {
            // Haal de eerste 12 IDs
            imageArray = arts.data.slice(0, 12).map(art => art.id)
        }
        // Haal kunstwerken op basis van imageArray IDs
        const selectedArts = arts.data.filter(art => imageArray.includes(art.id))
        console.log(imageArray)
        response.render('index', { arts: selectedArts, images: imageArray })
    })
})

// POST route voor de index pagina
app.post('/', function (request, response) {
    fetchJson(f_fabrique_art_objects).then((arts) => {
        // Voeg 3 willekeurige nieuwe IDs toe aan imageArray die nog niet aanwezig zijn
        let newIds = []
        while (newIds.length < 3) {
            const randomArt = arts.data[Math.floor(Math.random() * arts.data.length)]
            if (!imageArray.includes(randomArt.id) && !newIds.includes(randomArt.id)) {
                newIds.push(randomArt.id)
            }
        }
        imageArray = [...imageArray, ...newIds]
        response.redirect('/')
    })
})

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
    console.log(`Application started on http://localhost:${app.get('port')}`)
})

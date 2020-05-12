const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

//define paths for express config
const publicdir=path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlers engine and viws location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicdir))

app.get('', (req, res)   => {


    res.render('index', {
        title: 'Weather App',
        name:'Jay Zilpilwar'

    })
})

app.get('/about', (req, res) => {


    res.render('about', {
        title: 'Weather App 2',
        name: 'Jay P. Zilpilwar'

    })
})
app.get('/help', (req, res) => {


    res.render('help', {
        title: 'Weather App 3',
        name: 'Jay P. Zilpilwar'

    })
})

app.get('/weather', (req, res) => {


    if (!req.query.address) {
        return res.send({
            error: "U must provide address"
        })

    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) =>  { 
        if (error) {
            return res.send({error})
        }    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error })
            }
            res.send({

                forecast: forecastData,
                location,
                address: req.query.address

            })

        })    
    })
    //console.log(req.query.address)
    /*res.send({
        location: 'India',
        Forecast: 'Rainy',
        address: req.query.address


    })*/

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error:"U must provide search term"
        })

    }
    console.log(req.query.search)
    res.send({
        products:[]

    })


})



app.get('/help/*', (req,res) => {

    res.render('404', {

        title: '404 help',
        name: 'jay',
        errorMessage:'help not found'
    })
})


app.get('*', (req, res) => {

    res.render('404', {
        title: '404',
        name: 'jay',
        errorMessage:'Error'


    })
})


app.listen(3000, () => {

   console.log('server is up on port 3000.')

})
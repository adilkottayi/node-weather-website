const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Adil Kottayi'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        message: 'This is the help page',
        name: 'Adil Kottayi'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Adil Kottayi'
    })
})


app.get('/weather',(req, res)=> {
    if(!req.query.address){
        return res.send({error: 'No address provided!'})
    }

    geocode(req.query.address, (error, {latitude,location,longitude} = {}) => {
        if(error){
            return res.send({error})
        }
    
        forecast(latitude,longitude, (error, forecastData) => {
            if(error) 
                return res.send({error})

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    
    })
})

app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({products: []})
   
})
app.get('/help/*', (req, res) =>{
    res.render('404',{
        title: 'Error: 404',
        message: 'Help article not found',
        name: 'Adil Kottayi'
    })
})


app.get('*', (req, res) =>{
    res.render('404',{
        title: 'Error: 404',
        message: 'Page not found',
        name: 'Adil Kottayi'
    })
})

app.listen(port,() =>{
    console.log('Server Running on port '+ port)
})

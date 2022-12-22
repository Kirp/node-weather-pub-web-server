const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebard engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res)=>{
    res.render('index', {
        title: "Weather App",
        name: 'Somewhat Known person'
    });
});

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About me',
        name: 'Someone not you'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page',
        message: 'No help here yet :<',
        name: 'Whodunit'
    })
})


app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({error:"You must add an Address query"});
    }

    
    let dataRec = geocode(req.query.address, (error, {latitude, longitude, country}={})=>{
        if(error){
            return res.send(error);
        }
        forecast(latitude, longitude, (error, {weather_description, temperature, feelslike}={}) => {
            if(error){
                return res.send(error);
            }
            res.send({
                address: req.query.address,
                country,
                weather_description,
                temperature,
                feelslike
            });
        });
    });  
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({error:'Ypu must provide a search term.'})
    }
    
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404', {
        title: "Error 404",
        errorMessage: "Help article not found.",
        name: "Just A drone"
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: "Error 404",
        errorMessage: "Page not found.",
        name: "Just A drone"
    })
})


app.listen(port, ()=>{
    console.log('Server is up on port '+port);
});
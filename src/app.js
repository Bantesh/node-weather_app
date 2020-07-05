const path = require('path')
const express = require('express')
const hbs = require('hbs')
const print = console.log;
const app = express();
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000;

// Define path for express config
const staticDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
print(viewsPath)

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(staticDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'bantesh sharma'
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'bantesh sharma'
    });
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help me',
        name: 'bantesh sharma'
    });
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'Plz provide a address' });
    }
    geocode(req.query.address, (error, response) => {
        if (error) {
            return res.send({ error })
        }
        forecast(response.longitude, response.latitude, (error, forcast_res) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                provided_addr: req.query.address,
                location: response.location,
                temp: forcast_res.data.temp.value,
                forecast: forcast_res.data.precipitation.value
            });
        });

    });

})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'bantesh sharma',
        errorMsg: 'help page not found'
    });
})
app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'bantesh sharma',
        errorMsg: 'page not found'
    });
})

app.listen(3000, () => {
    print('server is running on 3000 port no')
});
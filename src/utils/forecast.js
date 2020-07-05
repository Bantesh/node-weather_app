
var request = require("request");
const print = console.log;

const forecast = (longitue, lattitude, callback) => {

    const options = {
        method: 'GET',
        url: 'https://climacell-microweather-v1.p.rapidapi.com/weather/realtime',
        json: true,
        qs: {
            unit_system: 'si',
            fields: 'temp,precipitation',
            lat: lattitude,
            lon: longitue
        },
        headers: {
            'x-rapidapi-host': 'climacell-microweather-v1.p.rapidapi.com',
            'x-rapidapi-key': 'df9c688560mshda6615b7d8ab129p1f9d76jsn1f5203b190d0',
            useQueryString: true
        }
    };


    request(options, function (error, response, body) {
        if (error) {
            callback('unable to connect', undefined);
        } else if (response.body.error) {
            callback('unable to find data', undefined);
        } else {
            callback(undefined, { data: body })
        }
    });
}

module.exports = forecast;
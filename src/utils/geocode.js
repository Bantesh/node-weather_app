var request = require("request");
const print = console.log;

const geocode = (addr, callback) => {

    const geoCodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + addr + ".json?access_token=pk.eyJ1Ijoid29yazRub2RlanMiLCJhIjoiY2tjMDFiZTNuMWY5cDMzbXhhbWUyc3MyayJ9.yYqeyKjnOaThk0tJYoDgHg&limit=1"
    print(geoCodeURL);
    request({ url: geoCodeURL, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect', undefined);
        } else if (response.body.features.length === 0) {
            callback('unable to find location', undefined);
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            });
        }

    })
};

module.exports = geocode;
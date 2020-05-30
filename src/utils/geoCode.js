const request = require('request')
const geoCode = (address, callback) =>{
    setTimeout(()=>{
        const geoCodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2h1YmhhbTk5MTkiLCJhIjoiY2tha2hqejk5MGtteTJxbXdqaGthNTJ5bCJ9.ZktzzqAenQf9cW0ohcKGGA&limit=1'

        request({url: geoCodeURL, json: true}, (error, { body }) => {
            if(error){
                callback('Unable to connect to location service', undefined)
            } else if(body.features.length === 0){
                callback('Unable to find location co-ordinates. Try another search', undefined)
            } else{
                const latitude = body.features[0].center[1];
                const longitude = body.features[0].center[0]
                console.log("latitude is "+latitude+" and longitude is "+longitude )
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    place: body.features[0].place_name,
                })
            }
        })
    }, 2000)

}

module.exports = geoCode
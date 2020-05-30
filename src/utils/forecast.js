const request = require("request")


const forecast = (latitude, longitude, callback ) => {
        const url = 'http://api.weatherstack.com/current?access_key=2f56cfd5528f5f4d2ed4e2d4b75c973f&query='+latitude+','+longitude+'&unit=m'
        request({url: url, json: true}, (error,  { body })=>{ //destructring of objecct
            if(error){
                callback('Unable to connect weather service ', undefined)
            } else if(body.error){
                callback('Unable to find location', undefined)
            } else{
                callback(undefined, 'it is currently '+ body.current.temperature+ ' degree out. there is a '+body.current.feelslike+'% chance of rain')
            }
        })  
}

module.exports = forecast
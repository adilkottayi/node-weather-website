const request = require('request')

const forecast = (latitude,longitude,callback) => {

    const url = 'https://api.darksky.net/forecast/3e807a7a97fd796bee4919a89a672d43/'+latitude+','+longitude+'?units=si'

    request({url, json:true}, (error, {body}) => {

        if(error)
        {
            callback('Unable to connect to weather Server. Please try again Later')
        }
        else if(body.error){
            callback('Wrong Co-ordinates Entered')
        }
        else
        {
            callback(undefined, body.daily.data[0].summary+'It is currently '+body.currently.temperature+' degrees outside. There is a '+body.currently.precipProbability+'% chance of raining.')
        }
    })
}

module.exports = forecast
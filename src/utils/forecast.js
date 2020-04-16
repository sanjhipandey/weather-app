const request = require('request')

const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=9b370195b44869c21914fd2050c8d447&query="+lat+","+long+"&units=m";
    request({url, json:true},(error, { body})=>{
        if(error){
                     callback('Unable to connect to weather service !',undefined)
             }
                 else if(body.error){
                     callback("unable to find loaction",undefined)
                 }
                 else{
                callback(undefined,`${body.current.weather_descriptions[0]} throughout the day.  The current temperature is ${body.current.temperature} but it feels like ${body.current.feelslike}. Humidity is ${body.current.humidity}` )
                    
            }

    })

}

module.exports = forecast
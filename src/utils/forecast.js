const request = require('postman-request')

const forecast = (lat, lon, callback)=>{
    let url = "http://api.weatherstack.com/current?access_key=fe6a134444cf485bb6752d3b9d7c76e6&units=m&query="+lat+","+lon;
    
    request({url, json:true},(error, {body})=>{
        if(error){
            callback('Unable to connect to weather services!', undefined);
        }else if (!body.current){
            callback('Unable to find location weather. Try another search.', undefined);
        }else {
            
            const {temperature, feelslike} = body.current;

            callback(undefined, {
                weather_description: body.current.weather_descriptions[0],
                temperature,
                feelslike
            })   
        }
    })
}

module.exports = forecast;
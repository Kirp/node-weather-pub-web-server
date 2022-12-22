const request = require('postman-request')

const geocode = (address, callback) => {
    const url = "http://api.positionstack.com/v1/forward?access_key=11cd8a654ec7d53db1a1721fda5ae054&query="+ encodeURIComponent(address);

    request({ url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to location services!', undefined);
        }else if (body.length === 0){
            callback('Unable to find location. Try another search.', undefined);
        }else {

            const {latitude, longitude,country, region, locality} = body.data[0];
            callback(undefined, {
                latitude,
                longitude,
                locality,
                country
            });
        }
    })

}

module.exports = geocode;

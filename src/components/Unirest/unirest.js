
const config = {
  weatherApiKey : process.env.REACT_APP_WEATHER_API_KEY,
  rapidApiKey : process.env.REACT_APP_RAPID_API_KEY
};

class Unirest {

  // *** Unirest API ***

  getCityId = (cityName, countryCode, returnFunction) =>{

    var unirest = require("unirest");

    var req = unirest("GET", "https://wft-geo-db.p.rapidapi.com/v1/geo/cities");

    req.query({
    	"countryIds": countryCode,
    	"namePrefix": cityName
    });

    req.headers({
    	"x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    	"x-rapidapi-key": config.rapidApiKey
    });


    req.end(function (res) {

      if (res.error) console.log(res.error);
      else{
        for (var index in res.body.data){

          if((res.body.data[index].name === cityName)){

            returnFunction(res.body.data[index]);
            break;

          }
        }
      }

    });

};

getCityPopulation = (cityId, returnFunction) => {

    var unirest = require("unirest");

    var req = unirest("GET", "https://wft-geo-db.p.rapidapi.com/v1/geo/cities/" + cityId);

    req.headers({
    	"x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    	"x-rapidapi-key": config.rapidApiKey
    });


    req.end(function (res) {
    	if (res.error) console.log(res.error);
      else returnFunction(res.body.data.population);

    });

}

getHistWeatherData = (cityName, countryCode, month, returnFunction) =>{

    var unirest = require("unirest");

    var req = unirest("GET", "https://api.worldweatheronline.com/premium/v1/past-weather.ashx");

    switch(cityName){

      case "Wrocław":
        cityName = "Wroclaw";
        break;

      case "Poznań":
        cityName = "Gniezno";
        break;

      case "Łódź":
        cityName = "Pabianice";
        break;

    }

    req.query({
    	date: "2019-" + month + "-01",
      enddate: "2019-" + month + "-28",
    	tp: "24",
    	q: cityName,
      format:"JSON",
    	key: "d849b480a295442ba48122033201901"
    });

    req.headers({
    	"x-rapidapi-host": "https://api.worldweatheronline.com/premium/v1/past-weather.ashx"
    });


    req.end(function (res) {
    	if (res.error) console.log(res.error);

    	console.log(res.body);
      returnFunction(res.body.data, month);
    });
}

/*getHistWeatherData = (cityName, countryCode) =>{

    var unirest = require("unirest");

    var req = unirest("GET", "https://visual-crossing-weather.p.rapidapi.com/history");

    req.query({
    	dayStartTime: "8%3A00%3A00",
    	dayEndTime: "20%3A00%3A00",
    	startDateTime: "2019-01-01T00%3A00%3A00",
    	aggregateHours: "24",
    	location: "Berlin DE",
    	endDateTime: "2020-01-11T00%3A00%3A00",
    	unitGroup: "metric"
    });

    req.headers({
    	"x-rapidapi-host": "visual-crossing-weather.p.rapidapi.com",
    	"x-rapidapi-key": "61a80f6c51msh8f57ee1e788e646p12608ajsn504e05a1388b"
    });


    req.end(function (res) {
    	if (res.error) throw new Error(res.error);

    	console.log(res.body);
    });
}*/

getActWeatherData = (cityName, countryCode, returnFunction) =>{

    var request = require("request");

    let url = `http://dataservice.accuweather.com/locations/v1/cities/${countryCode}/search`;

    request({
      url : url,
      method : "GET",
      qs: {
        "apikey" : config.weatherApiKey,
        "q" : cityName,
        "language" : "en",
        "details" :"false"
        }
      } , function (err, response, body) {
        if(err){
          console.log('error:', err);
        } else {
          const res = JSON.parse(body);
          if((typeof res[0] !== "undefined") && ("Key" in res[0])){
            const cityKey = res[0].Key;
            requestCityActTemp(cityKey, returnFunction);
          }
        }
    });

  }

getUSDExRate = (returnFunction) =>{

    var unirest = require("unirest");

    var req = unirest("GET", "https://currency-exchange.p.rapidapi.com/exchange");

    req.query({
    	"q": "1.0",
    	"from": "USD",
    	"to": "EUR"
    });

    req.headers({
    	"x-rapidapi-host": "currency-exchange.p.rapidapi.com",
    	"x-rapidapi-key": "61a80f6c51msh8f57ee1e788e646p12608ajsn504e05a1388b"
    });


    req.end(function (res) {

      if (res.error) console.log('error:', res.error);

      if(typeof returnFunction != "undefined"){
        returnFunction(res.body);
      }

    });

  }
}

function requestCityActTemp(cityKey, returnFunction){

    var request = require("request");

    let url = `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}`;

    request({
      url : url,
      method : "GET",
      qs: {
        "apikey" : config.weatherApiKey,
        "language" : "en",
        "details" :"false"
        }
      } , function (err, response, body) {
        if(err){
          console.log('error:', err);
        } else {
          const res = JSON.parse(body);
          const temp = res[0].Temperature.Metric.Value;
          returnFunction(temp);

        }
    });

}




export default Unirest;

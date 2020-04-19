import Unirest from '../Unirest';
import {prettyCity} from '../UsefulFunctions/usefulFunctions.js';

class Scraper {

  constructor(){

    this.unirest = new Unirest();
    this.usdExRate = this.unirest.getUSDExRate();
  }

  scrapeExample = (cityName, returnFunction) => {

    const rp = require('request-promise');
    const $ = require('cheerio');
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    cityName = prettyCity(cityName);

    switch(cityName){

      case "Otaniemi":
        cityName = "Helsinki";
        break;
      case "Palaiseau":
        cityName = "Paris";
        break;
      case "Tarbes":
        cityName = "Toulouse";
        break;
      case "Compiegne":
        cityName = "clermont-ferrand";
        break;
      case "Cranfield":
        cityName = "milton-keynes";
        break;
      case "Douai":
        cityName = "valenciennes";
        break;
      case "Goteborg":
        cityName = "gothenburg";
        break;
      case "Jonkoping":
        cityName = "jonkoping";
        break;
      case "Ales":
        cityName = "Nimes";
        break;
      case "Bayonne":
        cityName = "Biarritz";
        break;
      case "Louvain-la-Neuve":
        cityName = "Leuven";
        break;
      case "Blois":
        cityName = "Tours";
        break;
      case "Cassino":
        cityName = "Frosinone";
        break;
      case "Clausthal-Zellerfeld":
        cityName = "Hildesheim";
        break;

    }
    const url = 'https://costof.live/cost-of-living/in/' + cityName.replace(" ","-");

    rp(proxyurl + url)
      .then(function(html){

        const response = $('.table-body-row-cell', html).text();
        const rows = response.split("Add Price");
        var parsedData = {};

        for(var index in rows){

          const aux = rows[index].split("$");
          parsedData[aux[0]] = aux[1];
        }

        console.log(parsedData);
        returnFunction(parsedData);
      })
      .catch(function(err){
        console.log(err);
      });

  }
}

export default Scraper;

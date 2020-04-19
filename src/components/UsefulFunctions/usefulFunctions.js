import * as COUNTRYCODES from '../../constants/countryCodes';
import * as DATA from '../../constants/totalData';

//import {Dimensions, PixelRatio} from 'react-native';

function prettyCity(cityName){

  switch(cityName){
    case "Warszawa":
      cityName = "Warsaw";
      break;
  }
  return cityName
        .replace("è","e")
        .replace("é","e")
        .replace("ń","n")
        .replace("Ł","L")
        .replace("ó","o")
        .replace("ź","z")
        .replace("ł","l")
        .replace("ú","u")
        .replace(/ö/g,"o")
        .replace("å","a")
        .replace("ş","s")
        .replace("ţ","t")
        .replace("É","E");
}


function getCountryCode(city){

  const countryCodes = Object.values(COUNTRYCODES)[0];
  const data = Object.values(DATA)[0];

  var index;

  for (index = 0; index < data.length; index++){

    if(data[index][1] === city ) {
      const country = data[index][0];
      const noSpaceCountry = country.replace(" ","");
      return {
        countryCode: countryCodes[noSpaceCountry],
        country: country
      };
    }
  }
}

/*const widthPercentageToDP = widthPercent => {
  const screenWidth = Dimensions.get('window').width;
  // Convert string input to decimal number
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
};*/

export {prettyCity, getCountryCode};

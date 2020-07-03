

export function prettyCity(cityName){

  switch(cityName){
    case "Warszawa":
      cityName = "Warsaw";
      break;
    default:
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

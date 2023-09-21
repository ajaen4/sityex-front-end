export function prettyCity(cityName) {
  switch (cityName) {
    case "Warszawa":
      cityName = "Warsaw";
      break;
    default:
      break;
  }
  return cityName
    .replace("è", "e")
    .replace("é", "e")
    .replace("ń", "n")
    .replace("Ł", "L")
    .replace("ó", "o")
    .replace("ź", "z")
    .replace("ł", "l")
    .replace("ú", "u")
    .replace(/ö/g, "o")
    .replace("å", "a")
    .replace("ş", "s")
    .replace("ţ", "t")
    .replace("É", "E");
}

export function objectIsEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export function round(value, exp) {
  if (typeof exp === "undefined" || +exp === 0) return Math.round(value);

  value = +value;
  exp = +exp;

  if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) return NaN;

  // Shift
  value = value.toString().split("e");
  value = Math.round(+(value[0] + "e" + (value[1] ? +value[1] + exp : exp)));

  // Shift back
  value = value.toString().split("e");
  return +(value[0] + "e" + (value[1] ? +value[1] - exp : -exp));
}

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

export function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

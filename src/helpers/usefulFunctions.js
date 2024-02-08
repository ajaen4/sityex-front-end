export function objectIsEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export function capitalize(str) {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

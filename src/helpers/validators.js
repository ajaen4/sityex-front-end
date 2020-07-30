

export const sameAs = (getValues, field) => value => {

  if(typeof value !== 'string') return false

  const compareToValue = getValues()[field]
  return compareToValue === value
}

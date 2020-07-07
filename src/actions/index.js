
import { FETCH_SERVICES } from 'types'


const services = {
  id: 'id',
  user: 'currentUser'
}


export const fetchServices = () => {

  return {
    type: FETCH_SERVICES,
    services
  }
}

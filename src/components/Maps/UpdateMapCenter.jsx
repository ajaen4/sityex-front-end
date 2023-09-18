import { useMap } from 'react-leaflet'

function UpdateMapCenter({ center }) {
    const map = useMap()
    map.setView(center)
    return null
  }

export default UpdateMapCenter

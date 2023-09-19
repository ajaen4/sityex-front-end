import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

function UpdateMapZoom({ newZoom, currRecomendations }) {
  const map = useMap()

  useEffect(() => {
    map.setZoom(newZoom)
  }, [currRecomendations, map, newZoom])

  return null
}

export default UpdateMapZoom

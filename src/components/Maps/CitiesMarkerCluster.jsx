import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "react-leaflet-fullscreen/styles.css";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { MarkerClusterGroup } from "leaflet.markercluster";

function CitiesMarkerCluster({ citiesIndexValues }) {
  const map = useMap();

  useEffect(() => {
    const markers = new MarkerClusterGroup();

    citiesIndexValues.forEach((city) => {
      const marker = L.marker([city.latitude, city.longitude]);

      const popupContent = `<div style="text-align:center;">
          <div style="margin-bottom:5px;"><b>${city.name.toUpperCase()}</b></div>
          <a href="/destination/${city.name}/info" style="margin-bottom:5px;">
            <button>More info</button>
          </a>
        </div>`;

      marker.bindPopup(popupContent);
      markers.addLayer(marker);
    });

    map.addLayer(markers);

    return () => {
      map.removeLayer(markers);
    };
  }, [map, citiesIndexValues]);

  return null;
}

export default CitiesMarkerCluster;

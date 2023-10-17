import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { MarkerClusterGroup } from "leaflet.markercluster";

function CitiesMarkerCluster({ citiesIndex }) {
  const map = useMap();

  useEffect(() => {
    const markers = new MarkerClusterGroup({ showCoverageOnHover: false });

    if (citiesIndex.length !== 0) {
      citiesIndex.forEach((city) => {
        const marker = L.marker([
          city.coordinates.latitude,
          city.coordinates.longitude
        ]);

        const popupContent = `
          <div style="text-align:center;">
            <div style="margin-bottom:5px;">
              <img 
                loading="lazy" 
                width="20" 
                src="https://flagcdn.com/w20/${city.country_2_code.toLowerCase()}.png" 
                srcSet="https://flagcdn.com/w40/${city.country_2_code.toLowerCase()}.png 2x" 
                alt="${city.name} flag" 
                style="margin-right: 1px; margin-bottom: 2px; vertical-align: middle;" />
              <b>${city.name.toUpperCase()}</b>
            </div>
            <a href="/destination/${
              city.city_id
            }/info" style="margin-bottom:5px;">
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
    }
  }, [map, citiesIndex]);

  return null;
}

export default CitiesMarkerCluster;

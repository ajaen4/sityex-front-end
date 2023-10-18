import { useEffect } from "react";

import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { MarkerClusterGroup } from "leaflet.markercluster";

import { useTheme } from "@mui/material/styles";

function CitiesMarkerCluster({ citiesIndex }) {
  const map = useMap();
  const theme = useTheme();

  useEffect(() => {
    const markers = new MarkerClusterGroup({
      showCoverageOnHover: false,
      iconCreateFunction: function(cluster) {
        const count = cluster.getChildCount();
        return L.divIcon({
          html: `
            <div style="background-color: ${theme.palette.primary.light}; width: 50px; height: 50px; border-radius: 50%; position: relative;">
              <div style="background-color: ${theme.palette.primary[200]}; color: black; text-align: center; border-radius: 50%; width: 40px; height: 40px; line-height: 40px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">${count}</div>
            </div>`,
          className: 'custom-cluster-icon',
          iconSize: new L.Point(50, 50),
        });
      }
    });

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

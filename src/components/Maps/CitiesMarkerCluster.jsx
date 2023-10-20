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

  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
      return result;
    }, {});
  }

  useEffect(() => {
    const citiesByCountry = groupBy(citiesIndex, 'country_2_code');

    const clusterGroups = [];

    Object.keys(citiesByCountry).forEach(countryCode => {
      const markers = new MarkerClusterGroup({
        showCoverageOnHover: false,
        maxClusterRadius: 80,
        iconCreateFunction: function(cluster) {
          const count = cluster.getChildCount();
          return L.divIcon({
            html: `
              <div style="background-color: ${theme.palette.primary.light}; width: 50px; height: 50px; border-radius: 50%; position: relative;">
                <div style="background-color: ${theme.palette.primary[200]}; color: black; text-align: center; border-radius: 50%; width: 40px; height: 40px; line-height: 40px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">📍${count}</div>
              </div>`,
            className: 'custom-cluster-icon',
            iconSize: new L.Point(50, 50),
          });
        }
      });

      citiesByCountry[countryCode].forEach(city => {
        const customIcon = L.divIcon({
          className: 'custom-icon',
          html: `
            <div style="background-color: rgba(255, 255, 255, 0.7); border-radius: 5px; padding: 5px 10px; display: flex; align-items: center; position: relative;">
              <img 
                width="20" 
                src="https://flagcdn.com/w20/${city.country_2_code.toLowerCase()}.png" 
                alt="${city.name} flag" 
                style="margin-right: 5px;" 
              />
              <span>${city.name}</span>
            </div>
          `,
          iconSize: [null, null],
        });

        const marker = L.marker(
          [city.coordinates.latitude, city.coordinates.longitude],
          { icon: customIcon }
        ).on('click', () => {
          window.location.href = `/destination/${city.city_id}/info`;
        });

        markers.addLayer(marker);
      });

      map.addLayer(markers);
      clusterGroups.push(markers);
    });

    return () => {
      clusterGroups.forEach(group => {
        map.removeLayer(group);
      });
    };
  }, [map, citiesIndex]);

  return null;
}

export default CitiesMarkerCluster;

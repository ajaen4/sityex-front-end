import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { useTheme } from "@mui/material/styles";

function CitiesMarkers({ citiesIndex }) {
  const map = useMap();
  const theme = useTheme();

  useEffect(() => {
    const markers = [];

    citiesIndex.forEach((city) => {
      const customIcon = L.divIcon({
        className: "custom-icon",
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
      ).on("click", () => {
        window.location.href = `/destination/${city.city_id}/events`;
      });

      marker.addTo(map);
      markers.push(marker);
    });

    return () => {
      markers.forEach((marker) => {
        map.removeLayer(marker);
      });
    };
  }, [map, citiesIndex, theme]);

  return null;
}

export default CitiesMarkers;

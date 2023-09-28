import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "react-leaflet-fullscreen/styles.css";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { MarkerClusterGroup } from "leaflet.markercluster";

const POPULATIONBIG = 1000000;
const POPULATIONSMALL = 300000;

const greenIcon = L.icon({
  iconUrl: require("assets/icons/pin_green.png"),
  iconSize: [40, 41],
});
const blueIcon = L.icon({
  iconUrl: require("assets/icons/pin_blue.png"),
  iconSize: [40, 41],
});
const orangeIcon = L.icon({
  iconUrl: require("assets/icons/pin_orange.png"),
  iconSize: [40, 41],
});

function CitiesMarkerCluster({ citiesIndexValues }) {
  const map = useMap();

  useEffect(() => {
    const markers = new MarkerClusterGroup();

    citiesIndexValues.forEach((city) => {
      const marker = L.marker([city.latitude, city.longitude], {
        icon:
          city.population >= POPULATIONBIG
            ? greenIcon
            : city.population >= POPULATIONSMALL
            ? blueIcon
            : orangeIcon,
      });

      const popupContent = `<div style="text-align:center;">
          <div style="margin-bottom:5px;"><b>${city.name.toUpperCase()}</b></div>
          <div style="margin-bottom:5px;">${new Intl.NumberFormat(
            "es-418",
          ).format(city.population)} habitantes</div>
          <a href="/destination/${
            city.name
          }/community" style="margin-bottom:5px;">
            <button>Mas informacion</button>
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

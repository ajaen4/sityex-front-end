import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { MarkerClusterGroup } from "leaflet.markercluster";

const formatPrice = (price) => {
  const number = parseFloat(price.replace(/,/g, ""));
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(number);
};

const createCustomIcon = (listing) => {
  return L.divIcon({
    className: "custom-icon",
    html: `<div style="background-color: #90caf9; border-radius: 5px; padding: 5px 10px; display: flex; align-items: center; position: relative;">
      <span style="color: white;">${formatPrice(
        listing.costsFormatted.price,
      )}</span>
    </div>`,
    iconSize: [70, 20],
  });
};

const createNormalIcon = () => {
  return L.divIcon({
    html: `<div style="background-color: #90caf9; width: 15px; height: 15px; border-radius: 50%; position: relative;"/>`,
    className: "custom-cluster-icon",
    iconSize: new L.Point(15, 15),
  });
};

function HousingMarkerCluster({ listings, onClickListing, currentZoom }) {
  const map = useMap();
  const markersRef = useRef(null);

  useEffect(() => {
    if (!markersRef.current) {
      markersRef.current = new MarkerClusterGroup({
        spiderfyOnMaxZoom: false,
        zoomToBoundsOnClick: true,
        showCoverageOnHover: false,
        maxClusterRadius: 80,
        disableClusteringAtZoom: 15,
        iconCreateFunction: function (cluster) {
          const count = cluster.getChildCount();
          return L.divIcon({
            html: `<div style="background-color: #2196f3; width: 35px; height: 35px; border-radius: 50%; position: relative;">
              <div style="color: white; text-align: center; border-radius: 50%; width: 40px; height: 40px; line-height: 40px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">${count}</div>
            </div>`,
            className: "custom-cluster-icon",
            iconSize: new L.Point(50, 50),
          });
        },
      });
      map.addLayer(markersRef.current);
    }

    const markers = markersRef.current;
    markers.clearLayers();

    listings.forEach((listing) => {
      const customIcon = createCustomIcon(listing);
      const normalIcon = createNormalIcon();

      const marker = L.marker(
        [listing.coordinates.latitude, listing.coordinates.longitude],
        { icon: currentZoom >= 16 ? customIcon : normalIcon },
      ).on("click", () => onClickListing(listing));

      markers.addLayer(marker);
    });
  }, [map, listings, currentZoom, onClickListing]);

  return null;
}

export default HousingMarkerCluster;

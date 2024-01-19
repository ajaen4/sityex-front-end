import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { MarkerClusterGroup } from "leaflet.markercluster";

function HousingMarkerCluster({ housingIndex, onClickListing }) {
  const map = useMap();

  const formatPrice = (price) => {
    const number = parseFloat(price.replace(/,/g, ""));
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(number);
  };

  useEffect(() => {
    const markers = new MarkerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 80,
      disableClusteringAtZoom: 17,
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

    housingIndex.forEach((listing) => {
      const customIcon = L.divIcon({
        className: "custom-icon",
        html: `<div style="background-color: #90caf9; border-radius: 5px; padding: 5px 10px; display: flex; align-items: center; position: relative;">
        <span style="color: white;">${formatPrice(
          listing.costsFormatted.price,
        )}</span>
        </div>`,
        iconSize: [null, null],
      });

      const marker = L.marker(
        [listing.coordinates.latitude, listing.coordinates.longitude],
        { icon: customIcon },
      ).on("click", () => onClickListing(listing));

      markers.addLayer(marker);
    });

    map.addLayer(markers);

    return () => {
      map.removeLayer(markers);
    };
  }, [map, housingIndex]);

  return null;
}

export default HousingMarkerCluster;

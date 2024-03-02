import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import Supercluster from "supercluster";

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
    html: `<div style="background-color: #90caf9; width: 15px; height: 15px; border-radius: 50%; position: relative;"></div>`,
    className: "custom-normal-icon",
    iconSize: [15, 15],
  });
};

const createClusterIcon = (count) => {
  return L.divIcon({
    html: `<div style="background-color: #2196f3; width: 35px; height: 35px; border-radius: 50%; position: relative;">
      <span style="color: white; text-align: center; line-height: 35px;">${count}</span>
    </div>`,
    className: "custom-cluster-icon",
    iconSize: [35, 35],
  });
};

function HousingMarkerCluster({ listings, onClickListing }) {
  const map = useMap();
  const superclusterRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    superclusterRef.current = new Supercluster({
      radius: 100,
      maxZoom: 14,
    });

    const features = listings.map((listing) => ({
      type: "Feature",
      properties: { ...listing },
      geometry: {
        type: "Point",
        coordinates: [listing.location.coordinates.longitude, listing.location.coordinates.latitude],
      },
    }));

    superclusterRef.current.load(features);
  }, [listings]);

  useEffect(() => {
    const updateClusters = () => {
      const bounds = map.getBounds();
      const bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()];
      const zoom = map.getZoom();
      const clusters = superclusterRef.current.getClusters(bbox, zoom);

      markersRef.current.forEach((marker) => marker.remove()); // Clear existing markers
      markersRef.current = [];

      clusters.forEach((cluster) => {
        const { geometry, properties } = cluster;
        const [longitude, latitude] = geometry.coordinates;
        const isCluster = properties.cluster;
        const pointCount = properties.point_count;
        const clusterId = properties.cluster_id;

        const icon = isCluster
          ? createClusterIcon(pointCount)
          : zoom >= 16 ? createCustomIcon(properties) : createNormalIcon();

        const marker = L.marker([latitude, longitude], { icon });

        if (!isCluster) {
          marker.on("click", () => onClickListing(properties));
        } else {
          marker.on("click", () => {
            const expansionZoom = Math.min(
              superclusterRef.current.getClusterExpansionZoom(clusterId),
              16 // max zoom
            );
            map.setView([latitude, longitude], expansionZoom);
          });
        }

        marker.addTo(map);
        markersRef.current.push(marker);
      });
    };

    map.on("moveend", updateClusters);
    updateClusters();

    return () => {
      map.off("moveend", updateClusters);
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
    };
  }, [map, onClickListing]);

  return null;
}

export default HousingMarkerCluster;

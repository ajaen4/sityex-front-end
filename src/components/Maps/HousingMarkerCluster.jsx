import { useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import L from "leaflet";
import Supercluster from "supercluster";

import { formatPrice } from "helpers/usefulFunctions";

const normalIcon = L.divIcon({
  html: `<div style="background-color: #90caf9; width: 15px; height: 15px; border-radius: 50%; position: relative;"></div>`,
  className: "custom-normal-icon",
  iconSize: [15, 15],
});

function HousingMarkerCluster({ map, onClickListing }) {
  const superclusterRef = useRef(null);
  const markersRef = useRef([]);

  const listings = useSelector(
    (state) => state.housing.data.filteredHListings,
  );

  const createCustomIcon = useCallback((listing) => {
    return L.divIcon({
      className: "custom-icon",
      html: `<div style="background-color: #90caf9; border-radius: 5px; padding: 5px 10px; display: flex; align-items: center; position: relative;">
        <span style="color: white;">${formatPrice(
          listing.costsFormatted.price,
        )}</span>
      </div>`,
      iconSize: [70, 20],
    });
  }, []);

  const createClusterIcon = useCallback((count) => {
    return L.divIcon({
      html: `<div style="background-color: #2196f3; width: 35px; height: 35px; border-radius: 50%; position: relative;">
        <span style="color: white; text-align: center; line-height: 35px;">${count}</span>
      </div>`,
      className: "custom-cluster-icon",
      iconSize: [35, 35],
    });
  }, []);

  useEffect(() => {

    if (!map || !listings) return;
  
    superclusterRef.current = new Supercluster({
      radius: 100,
      maxZoom: 14,
    });

    const features = listings.map((listing) => ({
      type: "Feature",
      properties: { ...listing },
      geometry: {
        type: "Point",
        coordinates: [
          listing.location.coordinates.longitude,
          listing.location.coordinates.latitude,
        ],
      },
    }));

    superclusterRef.current.load(features);
  }, [map, listings]);

  const updateClusters = useCallback(() => {
    const bounds = map.getBounds();
    const bbox = [
      bounds.getWest(),
      bounds.getSouth(),
      bounds.getEast(),
      bounds.getNorth(),
    ];
    const zoom = map.getZoom();
    const clusters = superclusterRef.current.getClusters(bbox, zoom);

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    clusters.forEach((cluster) => {
      const { geometry, properties } = cluster;
      const [longitude, latitude] = geometry.coordinates;
      const isCluster = properties.cluster;
      const pointCount = properties.point_count;
      const clusterId = properties.cluster_id;

      let icon = null;

      if (isCluster) {
        icon = createClusterIcon(pointCount);
      } else if (zoom >= 16) {
        icon = createCustomIcon(properties);
      } else {
        icon = normalIcon;
      }

      const marker = L.marker([latitude, longitude], { icon });

      if (!isCluster) {
        marker.on("click", () => onClickListing(properties));
      } else {
        marker.on("click", () => {
          const expansionZoom = Math.min(
            superclusterRef.current.getClusterExpansionZoom(clusterId),
            16, // max zoom
          );
          map.setView([latitude, longitude], expansionZoom);
        });
      }

      marker.addTo(map);
      markersRef.current.push(marker);
    });
  }, [map, onClickListing, createClusterIcon, createCustomIcon]);

  useEffect(() => {

    if (!map) return;

    map.on("moveend", updateClusters);
    updateClusters();

    return () => {
      map.off("moveend", updateClusters);
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
    };
  }, [map, onClickListing, updateClusters, listings]);

  return null;
}

export default HousingMarkerCluster;

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { GeoJSON as LeafletGeoJSON, Layer, PathOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Feature, FeatureCollection, Geometry } from "geojson";

const setDistrictStyle = (): PathOptions => ({
  color: "#1e3a8a",
  weight: 0.5,
  fillOpacity: 0.3,
});

// Hover + click (no alert, tooltip only on hover)
const onEachDistrict = (
  feature: Feature<Geometry, any>,
  layer: Layer
) => {
  const name = feature.properties?.NAME_3 || "Unknown";

  // Hover tooltip only (not on click)
  layer.bindTooltip(name, {
    permanent: false,
    direction: "top",
    className: "leaflet-tooltip",
  });

  layer.on({
    click: (e) => {
      e.originalEvent.stopPropagation(); // prevent bubbling
      console.log("District clicked:", name);
      // You can also call a callback like: onDistrictSelect(name);
    },
    mouseover: () => (layer as LeafletGeoJSON).setStyle({ fillOpacity: 0.6 }),
    mouseout: () => (layer as LeafletGeoJSON).setStyle({ fillOpacity: 0.3 }),
  });
};

const PakistanMap: React.FC = () => {
  const [adm3, setAdm3] = useState<FeatureCollection | null>(null); // Districts

  useEffect(() => {
    fetch("/map-data/PAK_adm3.json")
      .then((res) => res.json())
      .then((data: FeatureCollection) => setAdm3(data));
  }, []);

  return (
    <div style={{ height: "600px", width: "100%" }}>
      <MapContainer
        center={[30.3753, 69.3451]}
        zoom={5}
        scrollWheelZoom={true}
        dragging={true}
        doubleClickZoom={true}
        zoomControl={true}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {adm3 && (
          <GeoJSON
            data={adm3}
            style={setDistrictStyle}
            onEachFeature={onEachDistrict}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default PakistanMap;

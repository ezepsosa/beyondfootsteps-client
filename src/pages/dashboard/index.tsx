import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geoDataRaw from "@assets/countries.geojson.json";
import type { FeatureCollection } from "geojson";

const geoData: FeatureCollection =
  geoDataRaw && typeof geoDataRaw === "object" && "type" in geoDataRaw
    ? (geoDataRaw as FeatureCollection)
    : { type: "FeatureCollection", features: [] };

export const Dashboard = () => {
  const mapStyle = { width: "100%", height: "100%" };

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={mapStyle}
      maxZoom={6}
      minZoom={3}
      maxBounds={[
        [-85, -170],
        [85, 180],
      ]}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.hotosm.org/">Humanitarian OpenStreetMap Team</a> &copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={18}
      />
      <GeoJSON data={geoData} />
    </MapContainer>
  );
};

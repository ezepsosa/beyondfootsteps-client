import { GeoJSON } from "react-leaflet";
import type { Props } from "./types";
import geoDataRaw from "@assets/countries.geojson.json";
import type { FeatureCollection } from "geojson";

export const GeoJSONLayer = ({ geoColourForMap }: Props) => {
  const geoData: FeatureCollection =
    geoDataRaw && typeof geoDataRaw === "object" && "type" in geoDataRaw
      ? (geoDataRaw as FeatureCollection)
      : { type: "FeatureCollection", features: [] };
  return (
    <GeoJSON
      data={geoData}
      style={(feature) => {
        const country = feature?.properties?.["ISO3166-1-Alpha-3"];
        return {
          fillColor: geoColourForMap.colours?.[country] || "#ccc",
          weight: 1,
          color: "white",
          fillOpacity: 0.8,
        };
      }}
    />
  );
};

import { GeoJSON } from "react-leaflet";
import type { Props } from "./types";
import { useCountriesJSON } from "@/hooks/useCountriesJSON";
import type { FeatureCollection } from "geojson";

export const GeoJSONLayer = ({ geoColorForMap }: Props) => {
  const {jsonData} = useCountriesJSON();
  const geoData: FeatureCollection =
    jsonData && typeof jsonData === "object" && "type" in jsonData
      ? (jsonData as FeatureCollection)
      : { type: "FeatureCollection", features: [] };
  return (
    <GeoJSON
      data={geoData}
      style={(feature) => {
        const country = feature?.properties?.["ISO3166-1-Alpha-3"];
        return {
          fillColor: geoColorForMap.colors?.[country] || "#ccc",
          weight: 1,
          color: "white",
          fillOpacity: 0.8,
        };
      }}
    />
  );
};

import { GeoJSON } from "react-leaflet";
import type { Props } from "./types";
export const GeoJSONLayer = ({ data, geoColourForMap }: Props) => {
  return (
    <GeoJSON
      data={data}
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

import { geoCentroid } from "d3-geo";
import { useMemo } from "react";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { useCountriesJSON } from "@/hooks/useCountriesJSON";

export function useCentroids() {
  const { jsonData } = useCountriesJSON();
  return useMemo(() => {
    const geoData: FeatureCollection =
      jsonData && typeof jsonData === "object" && "type" in jsonData
        ? (jsonData as FeatureCollection)
        : { type: "FeatureCollection", features: [] };
    const countryCenter: Record<string, [number, number]> = {};
    geoData.features?.forEach((f: Feature<Geometry>) => {
      const iso = f.properties?.["ISO3166-1-Alpha-3"];
      if (iso) {
        countryCenter[iso] = geoCentroid(f);
      }
    });
    return countryCenter;
  }, [jsonData]);
}

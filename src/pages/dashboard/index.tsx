import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geoDataRaw from "@assets/countries.geojson.json";
import type { FeatureCollection } from "geojson";
import {
  useGetDashboardSummaryByYearQuery,
  type DashboardSummary,
} from "@/gql/graphql";
import { useMemo, useState } from "react";
import { scaleLinear } from "d3-scale";
import { isNumber } from "chart.js/helpers";

const geoData: FeatureCollection =
  geoDataRaw && typeof geoDataRaw === "object" && "type" in geoDataRaw
    ? (geoDataRaw as FeatureCollection)
    : { type: "FeatureCollection", features: [] };

export const Dashboard = () => {
  const { data, loading, error } = useGetDashboardSummaryByYearQuery({
    variables: { year: 2024 },
  });
  const [dashboardKeySelection, setDashboardKeySelection] =
    useState<keyof DashboardSummary>("acceptanceRate");

  const mapStyle = { width: "100%", height: "100%" };

  if (error) {
    console.warn("Error fetching dashboard data");
  }

  const getColourForMap = useMemo(() => {
    if (!data?.dashboardSummariesByYear) return {};

    const entries = data.dashboardSummariesByYear.filter(Boolean);

    const values: number[] = entries.map(
      (dashboardElement) => dashboardElement?.[dashboardKeySelection]
    ).filter((value) => isNumber(value));

    if (values.length === 0) return {}

    const min = Math.min(...values);
    const max = Math.max(...values)

    const scale = scaleLinear<string>()
    .domain([min, max]).range(["#35ff90ff", "#5c001cff"]).clamp(true)
    
    return Object.fromEntries(
      entries.map((entry) => {
        const country = entry?.[dashboardKeySelection] ;
        return [entry!.countryIso, typeof country === 'number' ? scale(country) : '#ccc'];
      })
    )
  }, [data, dashboardKeySelection]);

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
        <GeoJSON
          data={geoData}
          style={(feature) => {
            const country = 
              feature?.properties?.["ISO3166-1-Alpha-3"];
            return {
              fillColor: getColourForMap[country] || "#ccc",
              weight: 1,
              color: "white",
              fillOpacity: 0.8,
            };
          }}
        />
    </MapContainer>
  );
};

import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geoDataRaw from "@assets/countries.geojson.json";
import type { FeatureCollection } from "geojson";
import {
  useGetDashboardSummaryByYearQuery,
  type DashboardSummary,
} from "@/gql/graphql";
import { useEffect } from "react";
import { scaleLinear } from "d3-scale";

const geoData: FeatureCollection =
  geoDataRaw && typeof geoDataRaw === "object" && "type" in geoDataRaw
    ? (geoDataRaw as FeatureCollection)
    : { type: "FeatureCollection", features: [] };


export const Dashboard = () => {
  const { data, loading, error } = useGetDashboardSummaryByYearQuery({
    variables: { year: 2024 },
  });
  //const [MapSelection, setMapSelection] = useState<string>("coverageRate");

  const mapStyle = { width: "100%", height: "100%" };

  if (error) {
    console.warn("Error fetching dashboard data");
  }

  useEffect(() => {
    if (data) {
      console.log("Dashboard data:", data.dashboardSummariesByYear);
    }
  }, [data, loading]);

  function getColourForValue(countryIso: string) {
    const maxValue: number = data?.dashboardSummariesByYear
      ? Math.max(
          ...data.dashboardSummariesByYear
            .filter((country) => country?.acceptanceRate != null)
            .map((country) => country!.acceptanceRate!)
        )
      : 0;

    const minValue: number = data?.dashboardSummariesByYear
      ? Math.min(
          ...data.dashboardSummariesByYear
            .filter((country) => country?.acceptanceRate != null)
            .map((country) => country!.acceptanceRate!)
        )
      : 0;

    const colourScale = scaleLinear<string>()
      .domain([minValue, maxValue])
      .range(["#35ff90ff", "#5c001cff"])
      .clamp(true);
    
    console.log('MaxValue',maxValue, 'MinValue', minValue)
    const countryValue: DashboardSummary | null | undefined =
      data?.dashboardSummariesByYear?.find(
        (country) => country?.countryIso == countryIso
      );
    const value: number = countryValue?.acceptanceRate ?? 0;
    return colourScale(value);
  }

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
      {data && <GeoJSON
        data={geoData}
        style={(feature) => {
          const value = getColourForValue(
            feature?.properties?.["ISO3166-1-Alpha-3"]
          );
          return {
            fillColor: value,
            weight: 1,
            color: "white",
            fillOpacity: 0.8,
          };
        }}
      />}
      
    </MapContainer>
  );
};

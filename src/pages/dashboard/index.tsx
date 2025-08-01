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
import { SelectorBar } from "@/components/selectorBar";
import { LowerContainer } from "./styles";

const geoData: FeatureCollection =
  geoDataRaw && typeof geoDataRaw === "object" && "type" in geoDataRaw
    ? (geoDataRaw as FeatureCollection)
    : { type: "FeatureCollection", features: [] };

export const Dashboard = () => {
  const [dashboardKeySelection, setDashboardKeySelection] = useState<
    number | string
  >("acceptanceRate");

  const [dashboardYearSelection, setDashboardYearSelection] = useState<
    number | string
  >(2024);

  const dashboardKeyOptions: {
    label: string;
    value: keyof DashboardSummary;
  }[] = [
    { label: "Coverage Rate", value: "coverageRate" },
    { label: "Applied per 100k", value: "appliedPer100k" },
    { label: "Acceptance Rate", value: "acceptanceRate" },
    { label: "Internal Displacement", value: "internalDisplacementTotal" },
    { label: "Displacement Rate per 100k", value: "displacementRatePer100k" },
    { label: "IDP Returnees", value: "idpReturnees" },
    { label: "Refugee Returnees", value: "refugeesReturnees" },
    { label: "Naturalizations Total", value: "naturalizationsTotal" },
    { label: "Naturalization Change", value: "naturalizationChange" },
    { label: "Resettlement Requests", value: "resettlementRequests" },
    { label: "Resettlement Departures", value: "resettlementDepartures" },
    { label: "Resettlement Submissions", value: "resettlementSubmissions" },
    { label: "Resettlement Needs", value: "resettlementNeeds" },
    { label: "Resettlement Gap", value: "resettlementGap" },
    { label: "Request vs Needs Ratio", value: "requestVsNeedsRatio" },
    { label: "Submissions Efficiency", value: "submissionsEfficiency" },
    { label: "Realization Rate", value: "realizationRate" },
  ];

  const dashboardYearOptions: { label: number; value: string }[] = [
    { label: 2024, value: "2024" },
    { label: 2023, value: "2023" },
    { label: 2022, value: "2022" },
    { label: 2021, value: "2021" },
    { label: 2020, value: "2020" },
  ];

  const mapStyle = { width: "100%", height: "100%" };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, loading, error } = useGetDashboardSummaryByYearQuery({
    variables: { year: Number(dashboardYearSelection) },
  });

  if (error) {
    console.warn("Error fetching dashboard data");
  }

  const getColourForMap = useMemo(() => {
    if (!data?.dashboardSummariesByYear) return {};

    const entries = data.dashboardSummariesByYear.filter(Boolean);

    const values: number[] = entries
      .map(
        (dashboardElement) =>
          dashboardElement?.[dashboardKeySelection as keyof DashboardSummary]
      )
      .filter((value) => isNumber(value));

    if (values.length === 0) return {};

    const min = Math.min(...values);
    const max = Math.max(...values);

    const scale = scaleLinear<string>()
      .domain([min, max])
      .range(["#35ff90ff", "#5c001cff"])
      .clamp(true);

    return Object.fromEntries(
      entries.map((entry) => {
        const country =
          entry?.[dashboardKeySelection as keyof DashboardSummary];
        return [
          entry!.countryIso,
          typeof country === "number" ? scale(country) : "#ccc",
        ];
      })
    );
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
          const country = feature?.properties?.["ISO3166-1-Alpha-3"];
          return {
            fillColor: getColourForMap[country] || "#ccc",
            weight: 1,
            color: "white",
            fillOpacity: 0.8,
          };
        }}
      />
      <LowerContainer>
        <SelectorBar
          selectors={dashboardYearOptions}
          setOption={setDashboardYearSelection}
        />
        <SelectorBar
          selectors={dashboardKeyOptions}
          setOption={setDashboardKeySelection}
        />
      </LowerContainer>
    </MapContainer>
  );
};

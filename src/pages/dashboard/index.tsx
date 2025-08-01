import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geoDataRaw from "@assets/countries.geojson.json";
import type { FeatureCollection } from "geojson";
import {
  useGetDashboardSummaryByYearQuery,
  type DashboardSummary,
} from "@/gql/graphql";
import { useEffect, useMemo, useState } from "react";
import { scaleLinear } from "d3-scale";
import { isNumber } from "chart.js/helpers";
import { SelectorBar } from "@/components/selectorBar";
import {
  CloseModal,
  IconSpan,
  InfoModal,
  LowerContainer,
  TextSpan,
} from "./styles";
import { ColourLegend } from "@/components/colourLegend";
import {
  dashboardKeyOptions,
  dashboardYearOptions,
  INDICATOR_INFO,
} from "./auxliar";
import { IoCloseOutline, IoInformationCircle } from "react-icons/io5";

const geoData: FeatureCollection =
  geoDataRaw && typeof geoDataRaw === "object" && "type" in geoDataRaw
    ? (geoDataRaw as FeatureCollection)
    : { type: "FeatureCollection", features: [] };

export const Dashboard = () => {
  const [dashboardKeySelection, setDashboardKeySelection] = useState<
    number | string
  >("coverageRate");

  const [dashboardYearSelection, setDashboardYearSelection] = useState<
    number | string
  >(2024);

  const [info, setInfo] = useState<string>();
  const [openInfo, setOpenInfo] = useState<boolean>(false);

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
      .range(["#2bff00ff", "#00478fff"])
      .clamp(true);

    const colours = Object.fromEntries(
      entries.map((entry) => {
        const country =
          entry?.[dashboardKeySelection as keyof DashboardSummary];
        return [
          entry!.countryIso,
          typeof country === "number" ? scale(country) : "#ccc",
        ];
      })
    );
    return { scale, colours };
  }, [data, dashboardKeySelection]);

  useEffect(() => {
    if (dashboardKeySelection) {
      setInfo(INDICATOR_INFO[dashboardKeySelection]);
    }
  }, [dashboardKeySelection]);

  return (
    <>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={mapStyle}
        maxZoom={6}
        minZoom={3}
        maxBounds={[[-85, -170], [85, 180]]}
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
              fillColor: getColourForMap.colours?.[country] || "#ccc",
              weight: 1,
              color: "white",
              fillOpacity: 0.8,
            };
          }}
        />
        <LowerContainer>
          <SelectorBar
            defaultValue={dashboardYearSelection}
            paddingMobile="0.4rem 2.5rem;"
            selectors={dashboardYearOptions}
            setOption={setDashboardYearSelection}
          />
          <SelectorBar
            defaultValue={dashboardKeySelection}
            selectors={dashboardKeyOptions}
            setOption={setDashboardKeySelection}
          />
          {getColourForMap.scale && (
            <ColourLegend scale={getColourForMap.scale}></ColourLegend>
          )}
        </LowerContainer>
      </MapContainer>

      <IconSpan onClick={() => setOpenInfo((value) => !value)}>
        <IoInformationCircle size="1.5rem" />
      </IconSpan>

      <InfoModal $visible={openInfo}>
        <TextSpan>{info}</TextSpan>
        <CloseModal onClick={() => setOpenInfo(false)}>
          <IoCloseOutline color="white" size="1.2rem" />
        </CloseModal>
      </InfoModal>
    </>
  );
};

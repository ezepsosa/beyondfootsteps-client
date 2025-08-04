import "leaflet/dist/leaflet.css";
import geoDataRaw from "@assets/countries.geojson.json";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import {
  useGetDashboardSummaryByYearQuery,
  type DashboardSummary,
} from "@/gql/graphql";
import { useMemo, useState } from "react";
import { scaleLinear } from "d3-scale";
import { isNumber } from "chart.js/helpers";
import { SelectorBar } from "@/components/selectorBar";
import { IconSpan, LowerContainer, TopButtomContainer } from "./styles";
import { ColourLegend } from "@/components/colourLegend";
import {
  dashboardKeyOptions,
  dashboardYearOptions,
  INDICATOR_INFO,
} from "./auxliar";
import { IoInformationCircle } from "react-icons/io5";
import { geoCentroid } from "d3-geo";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { InfoCountryModal } from "./infoCountryModal";
import { InfoKPIModal } from "./infoKPIModal";
import { GeoJSONLayer } from "./geoJSONLayer";
import { CountryMetricLayer } from "./countryMetricLayer";
import { MapComponent } from "@/components/mapComponent";

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
  const [countrySelected, setCountrySelected] = useState<string>();
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [showMetric, setShowMetric] = useState<boolean>(true);
  const [openCountryInfo, setOpenCountryInfo] = useState<boolean>(true);

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

    setInfo(INDICATOR_INFO[dashboardKeySelection]);

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

  const centroids = useMemo(() => {
    const countryCenter: Record<string, [number, number]> = {};
    geoData.features?.forEach((f: Feature<Geometry>) => {
      const iso = f.properties?.["ISO3166-1-Alpha-3"];
      countryCenter[iso] = geoCentroid(f);
    });
    return countryCenter;
  }, []);

  return (
    <>
      <MapComponent>
        <GeoJSONLayer data={geoData} geoColourForMap={getColourForMap} />
        {showMetric && data && (
          <CountryMetricLayer
            centroids={centroids}
            dashboardKeySelection={
              dashboardKeySelection as keyof DashboardSummary
            }
            setCountrySelected={setCountrySelected}
            setOpenCountryInfo={setOpenCountryInfo}
            dashboardSummariesByYear={data?.dashboardSummariesByYear ?? []}
          />
        )}
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
      </MapComponent>
      <TopButtomContainer>
        <IconSpan onClick={() => setOpenInfo((value) => !value)}>
          <IoInformationCircle size="1.5rem" />
        </IconSpan>
        <IconSpan onClick={() => setShowMetric((value) => !value)}>
          {showMetric ? (
            <RxEyeOpen size="1.5rem" />
          ) : (
            <GoEyeClosed size="1.5rem" />
          )}
        </IconSpan>
      </TopButtomContainer>

      <InfoKPIModal
        info={info ?? ""}
        openInfo={openInfo}
        setOpenInfo={setOpenInfo}
      />

      {openCountryInfo &&
        countrySelected &&
        (() => {
          const countryInfo = data?.dashboardSummariesByYear?.find(
            (country) => country?.countryIso == countrySelected
          );
          if (!countryInfo) return null;
          return (
            <InfoCountryModal
              setOpenModal={setOpenCountryInfo}
              countryInfo={countryInfo}
            />
          );
        })()}
    </>
  );
};

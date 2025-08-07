import "leaflet/dist/leaflet.css";
import geoDataRaw from "@assets/countries.geojson.json";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import {
  useGetDashboardSummaryByYearQuery,
  type DashboardSummary,
} from "@/gql/graphql";
import { useMemo, useState } from "react";
import { SelectorBar } from "@/components/selectorBar";
import { LowerContainer } from "./styles";
import { ColourLegend } from "@/components/colourLegend";
import {
  calculateColor,
  dashboardKeyOptions,
  dashboardYearOptions,
  INDICATOR_INFO,
} from "../auxliar";
import { IoInformationCircle } from "react-icons/io5";
import { geoCentroid } from "d3-geo";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { InfoCountryModal } from "./infoCountryModal";
import { InfoKPIModal } from "../../components/mapUsableComponents/infoKPIModal";
import { MapComponent } from "@/components/mapUsableComponents/mapComponent";
import { GeoJSONLayer } from "@/components/mapUsableComponents/geoJSONLayer";
import { CountryDashboardMetricLayer } from "./countryDashboardMetricLayer";
import {
  CsvButtonDownload,
  IconSpan,
  TopButtomContainer,
} from "@/styles/styles";
import { HiOutlineDocumentDownload } from "react-icons/hi";

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

  const { data, error } = useGetDashboardSummaryByYearQuery({
    variables: { year: Number(dashboardYearSelection) },
  });

  if (error) {
    console.warn("Error fetching dashboard data");
  }

  const dashboardSummariesByYear: DashboardSummary[] = useMemo(
    () =>
      data?.dashboardSummariesByYear?.filter(
        (item): item is DashboardSummary => !!item
      ) ?? [],
    [data]
  );

  const getColourForMap = useMemo(() => {
    return calculateColor({
      arrayData: dashboardSummariesByYear ?? [],
      dashboardKeySelection: dashboardKeySelection as keyof DashboardSummary,
    });
  }, [dashboardSummariesByYear, dashboardKeySelection]);

  useMemo(() => {
    setInfo(INDICATOR_INFO[dashboardKeySelection]);
  }, [dashboardKeySelection]);

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
        <GeoJSONLayer geoColourForMap={getColourForMap} />
        {showMetric && dashboardSummariesByYear && (
          <CountryDashboardMetricLayer
            centroids={centroids}
            dashboardKeySelection={
              dashboardKeySelection as keyof DashboardSummary
            }
            setCountrySelected={setCountrySelected}
            setOpenCountryInfo={setOpenCountryInfo}
            dashboardSummariesByYear={dashboardSummariesByYear ?? []}
          />
        )}
        <LowerContainer>
          <SelectorBar
            defaultValue={dashboardYearSelection}
            selectors={dashboardYearOptions}
            setOption={setDashboardYearSelection}
          />
          <SelectorBar
            defaultValue={dashboardKeySelection}
            selectors={dashboardKeyOptions}
            setOption={setDashboardKeySelection}
          />
        </LowerContainer>
        {getColourForMap.scale && (
          <ColourLegend scale={getColourForMap.scale}></ColourLegend>
        )}
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
        {dashboardSummariesByYear ? (
          <CsvButtonDownload
            filename={`${dashboardYearSelection}_${countrySelected}_dashboard_summary_data.csv`}
            data={dashboardSummariesByYear ?? []}
          >
            <HiOutlineDocumentDownload size="1.5rem" />
          </CsvButtonDownload>
        ) : (
          <IconSpan>
            <HiOutlineDocumentDownload size="1.5rem" color="gray" />
          </IconSpan>
        )}
      </TopButtomContainer>

      <InfoKPIModal
        info={info ?? ""}
        openInfo={openInfo}
        setOpenInfo={setOpenInfo}
      />

      {openCountryInfo &&
        countrySelected &&
        (() => {
          const countryInfo = dashboardSummariesByYear?.find(
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

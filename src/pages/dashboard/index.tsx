import "leaflet/dist/leaflet.css";
import {
  useGetDashboardSummaryByYearQuery,
  type DashboardSummary,
} from "@/gql/graphql";
import { useMemo, useState } from "react";
import { SelectorBar } from "@/components/selectorBar";
import { LowerContainer } from "./styles";
import { ColourLegend } from "@/components/colourLegend";
import {
  dashboardKeyOptions,
  yearOptions,
  DASHBOARD_INDICATOR_INFO,
} from "../../components/auxliar";
import { IoInformationCircle } from "react-icons/io5";
import {
  CsvButtonDownload,
  IconSpan,
  TopButtomContainer,
} from "@/styles/styles";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { Loading } from "@/components/loading";
import { DisplayError } from "@/components/error";
import { useCentroids } from "@/hooks/useCentroids";
import { useCountryColor } from "@/hooks/useCountryColor";
import { MapComponent } from "@/components/map/container";
import { GeoJSONLayer } from "@/components/map/layer/geoJSON";
import { InfoKPIModal } from "@/components/map/modal/kpi";
import { MetricLayer } from "@/components/map/layer/metric";
import { InfoCountryModal } from "@/components/map/modal/country";
import { ShowHide } from "@/components/icons/showHide";
import { MdLegendToggle } from "react-icons/md";

export const Dashboard = () => {
  const [dashboardKeySelection, setDashboardKeySelection] =
    useState<string>("coverageRate");
  const [dashboardYearSelection, setDashboardYearSelection] =
    useState<number>(2024);
  const [info, setInfo] = useState<string>();
  const [countrySelected, setCountrySelected] = useState<string>();
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [showMetric, setShowMetric] = useState<boolean>(true);
  const [openCountryInfo, setOpenCountryInfo] = useState<boolean>(true);
  const [showLegend, setShowLegend] = useState<boolean>(true);

  const { data, error, loading } = useGetDashboardSummaryByYearQuery({
    variables: { year: Number(dashboardYearSelection) },
  });

  if (error) {
    console.warn("Error fetching dashboard data");
  }

  const centroids = useCentroids();

  const dashboardSummariesByYear: DashboardSummary[] = useMemo(
    () =>
      data?.dashboardSummariesByYear?.filter(
        (item): item is DashboardSummary => !!item
      ) ?? [],
    [data]
  );

  const getColourForMap = useCountryColor({
    arrayData: dashboardSummariesByYear ?? [],
    metricSelected: dashboardKeySelection as keyof DashboardSummary,
  });

  useMemo(() => {
    setInfo(DASHBOARD_INDICATOR_INFO[dashboardKeySelection]);
  }, [dashboardKeySelection]);

  return (
    <>
      {(() => {
        if (error)
          return (
            <MapComponent>
              <DisplayError />
            </MapComponent>
          );
        if (loading)
          return (
            <MapComponent>
              <Loading />
            </MapComponent>
          );
        return (
          <MapComponent>
            <GeoJSONLayer geoColourForMap={getColourForMap} />
            {showMetric && dashboardSummariesByYear.length > 0 && (
              <MetricLayer
                centroids={centroids}
                metricSelected={dashboardKeySelection as keyof DashboardSummary}
                setToggleCountry={setCountrySelected}
                setToggleInfo={setOpenCountryInfo}
                arrayData={dashboardSummariesByYear ?? []}
              />
            )}
            <TopButtomContainer>
              <IconSpan onClick={() => setOpenInfo((value) => !value)}>
                <IoInformationCircle size="1.5rem" />
              </IconSpan>
              <IconSpan>
                <MdLegendToggle
                  size="1.5rem"
                  onClick={() => setShowLegend((value) => !value)}
                />
              </IconSpan>
              <ShowHide setToggle={setShowMetric} toggleStatus={showMetric} />
              {dashboardSummariesByYear.length > 0 ? (
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
            <LowerContainer>
              <SelectorBar
                defaultValue={dashboardYearSelection}
                selectors={yearOptions}
                setOption={(value) =>
                  setDashboardYearSelection(value as number)
                }
              />
              <SelectorBar
                defaultValue={dashboardKeySelection}
                selectors={dashboardKeyOptions}
                setOption={(value) => setDashboardKeySelection(value as string)}
              />
            </LowerContainer>
            {getColourForMap.scale && showLegend && (
              <ColourLegend scale={getColourForMap.scale} />
            )}
          </MapComponent>
        );
      })()}

      <InfoKPIModal
        info={info ?? ""}
        openInfo={openInfo}
        setOpenInfo={setOpenInfo}
      />

      {openCountryInfo &&
        countrySelected &&
        (() => {
          const countryInfo = dashboardSummariesByYear.find(
            (country) => country?.countryIso == countrySelected
          );
          if (!countryInfo) return null;
          return (
            <InfoCountryModal
              setOpenModal={setOpenCountryInfo}
              optionsToDisplay={dashboardKeyOptions.map((option) => {
                return {
                  key: option.key,
                  value:
                    countryInfo[option.value as keyof DashboardSummary] ??
                    "N/A",
                };
              })}
              countryInfo={{
                name: countryInfo.country ?? "",
                iso: countryInfo.countryIso ?? "",
              }}
            />
          );
        })()}
    </>
  );
};

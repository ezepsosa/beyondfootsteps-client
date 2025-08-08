import { SelectorBar } from "@/components/selectorBar";
import { useEffect, useMemo, useState } from "react";
import isoNameRaw from "@assets/iso-country.json";
import {
  asylumDecisionKeyOptions,
  dashboardYearOptions,
} from "../../components/auxliar";
import { ColourLegend } from "@/components/colourLegend";
import {
  CsvButtonDownload,
  IconSpan,
  TopButtomContainer,
} from "@/styles/styles";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { DisplayError } from "@/components/error";
import { Loading } from "@/components/loading";
import { useCentroids } from "@/hooks/useCentroids";
import { useCountryColorForPercentage } from "@/hooks/useCountryColor";
import type { isoNameType } from "@/types/types";
import {
  useGetAsylumDecisionsByYearAndCountryQuery,
  type AsylumDecision,
} from "@/gql/graphql";
import { LowerContainer } from "./styles";
import { MapComponent } from "@/components/map/container";
import { GeoJSONLayer } from "@/components/map/layer/geoJSON";
import { InfoKPIModal } from "@/components/map/modal/kpi";
import { MetricLayer } from "@/components/map/layer/metric";
import { InfoCountryModal } from "@/components/map/modal/country";
import { ShowHide } from "@/components/icons/showHide";
import { MdLegendToggle } from "react-icons/md";

const isoNameRawTyped: isoNameType[] = isoNameRaw as isoNameType[];

export const AsylumDecisions = () => {
  const [countrySelected, setCountrySelected] = useState<string>("ESP");
  const [countryToShow, setCountryToShow] = useState<string>("ESP");
  const [directionSelected, setDirectionSelected] = useState<string>("origin");
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [showMetric, setShowMetric] = useState<boolean>(true);
  const [showLegend, setShowLegend] = useState<boolean>(true);
  const [dashboardYearSelection, setDashboardYearSelection] =
    useState<number>(2024);

  const [openCountryInfo, setOpenCountryInfo] = useState<boolean>(false);

  const asylumDirectional = [
    { key: "Country of Origin", value: "origin" },
    { key: "Country of Asylum", value: "asylum" },
  ];

  const countryOptions = isoNameRawTyped.map((element) => {
    return { key: element.name, value: element.iso };
  });

  const { data, error, loading } = useGetAsylumDecisionsByYearAndCountryQuery({
    variables: {
      year: Number(dashboardYearSelection),
      countryOfAsylumIso:
        directionSelected == "asylum" ? countrySelected : null,
      countryOfOriginIso:
        directionSelected == "origin" ? countrySelected : null,
    },
  });

  const asylumDecisionsByYearAndCountry: AsylumDecision[] = useMemo(
    () =>
      data?.asylumDecisionsByYearAndCountry?.filter(
        (item): item is AsylumDecision => !!item
      ) ?? [],
    [data]
  );

  if (error) {
    console.warn("Error fetching asylum data data");
  }

  const getColourForMap = useCountryColorForPercentage({
    arrayData: asylumDecisionsByYearAndCountry,
    metricSelected: "acceptanceRate",
    directionSelected,
    countrySelected,
    colorsOnlyPositive: ["#c40000ff", "#00e626ff"],
  });

  const centroids = useCentroids();

  useEffect(() => {
    const isThereAny: boolean = asylumDecisionsByYearAndCountry.some(
      (asylumDecisions) => asylumDecisions?.decPc === true
    );
    if (isThereAny) {
      setShowInfo(true);
    } else {
      setShowInfo(false);
    }
  }, [asylumDecisionsByYearAndCountry]);

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
            {asylumDecisionsByYearAndCountry.length > 0 && showMetric && (
              <MetricLayer
                key={directionSelected}
                centroids={centroids}
                originOrAsylum={String(directionSelected)}
                arrayData={asylumDecisionsByYearAndCountry ?? []}
                metricSelected={"acceptanceRate"}
                setToggleCountry={setCountryToShow}
                setToggleInfo={setOpenCountryInfo}
              />
            )}
            <TopButtomContainer>
              <ShowHide setToggle={setShowMetric} toggleStatus={showMetric} />
              <IconSpan>
                <MdLegendToggle
                  size="1.5rem"
                  onClick={() => setShowLegend((value) => !value)}
                />
              </IconSpan>
              {asylumDecisionsByYearAndCountry.length > 0 ? (
                <CsvButtonDownload
                  filename={`${dashboardYearSelection}_${directionSelected}_${countrySelected}_asylum_data_data.csv`}
                  data={asylumDecisionsByYearAndCountry}
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
                selectors={dashboardYearOptions}
                setOption={(value) =>
                  setDashboardYearSelection(value as number)
                }
              />
              <SelectorBar
                defaultValue={directionSelected}
                selectors={asylumDirectional}
                setOption={(value) => setDirectionSelected(value as string)}
              />
              <SelectorBar
                defaultValue={countrySelected}
                selectors={countryOptions}
                setOption={(value) => setCountrySelected(value as string)}
              />
            </LowerContainer>
          </MapComponent>
        );
      })()}

      {getColourForMap.scale && showLegend && (
        <ColourLegend scale={getColourForMap.scale} />
      )}
      <InfoKPIModal
        info="The symbol * indicates the total number of applications where more people have been grouped together. In other words, the number may be significantly higher than the actual number of people who have applied."
        openInfo={showInfo}
        setOpenInfo={setShowInfo}
      />
      {openCountryInfo &&
        countryToShow &&
        (() => {
          const countryInfo = asylumDecisionsByYearAndCountry.find((country) =>
            directionSelected === "asylum"
              ? country?.countryOfOriginIso == countryToShow
              : country?.countryOfAsylumIso == countryToShow
          );
          if (!countryInfo) return null;
          return (
            <InfoCountryModal
              setOpenModal={setOpenCountryInfo}
              optionsToDisplay={asylumDecisionKeyOptions.map(
                (option): { key: string; value: string | number } => {
                  const rawValue =
                    countryInfo[option.key as keyof AsylumDecision];

                  let value: string | number;
                  if (typeof rawValue === "number") {
                    value = rawValue;
                  } else if (typeof rawValue === "string") {
                    value = rawValue;
                  } else {
                    value = "N/A";
                  }

                  return {
                    key: option.value,
                    value,
                  };
                }
              )}
              countryInfo={{
                name:
                  (directionSelected === "asylum"
                    ? countryInfo.countryOfOrigin
                    : countryInfo.countryOfAsylum) ?? "",
                iso:
                  (directionSelected === "asylum"
                    ? countryInfo.countryOfOriginIso
                    : countryInfo.countryOfAsylumIso) ?? "",
              }}
            />
          );
        })()}
    </>
  );
};

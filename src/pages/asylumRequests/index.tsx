import { LowerContainer } from "./style";
import { SelectorBar } from "@/components/selectorBar";
import { useEffect, useMemo, useState } from "react";
import isoNameRaw from "@assets/iso-country.json";
import {
  useGetAsylumRequestsByYearAndCountryQuery,
  type AsylumRequest,
} from "@/gql/graphql";
import {
  ASYLUM_REQUEST_INDICATOR_INFO,
  yearOptions,
} from "../../components/auxliar";
import { ColourLegend } from "@/components/colourLegend";
import {
  CsvButtonDownload,
  IconSpan,
  TopButtonContainer,
} from "@/styles/styles";
import { TbNumbers } from "react-icons/tb";
import { AiOutlinePercentage } from "react-icons/ai";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { DisplayError } from "@/components/error";
import { Loading } from "@/components/loading";
import { useCentroids } from "@/hooks/useCentroids";
import { useCountryColor } from "@/hooks/useCountryColor";
import type { isoNameType } from "@/types/types";
import { MapComponent } from "@/components/map/container";
import { GeoJSONLayer } from "@/components/map/layer/geoJSON";
import { InfoKPIModal } from "@/components/map/modal/kpi";
import { MetricLayer } from "@/components/map/layer/metric";
import { ShowHide } from "@/components/icons/showHide";
import { MdLegendToggle } from "react-icons/md";
import { IoInformationCircle } from "react-icons/io5";

const isoNameRawTyped: isoNameType[] = isoNameRaw as isoNameType[];

export const AsylumRequests = () => {
  const [countrySelected, setCountrySelected] = useState<string>("ESP");
  const [directionSelected, setDirectionSelected] = useState<string>("origin");
  const [metricSelected, setMetricSelected] =
    useState<keyof AsylumRequest>("applied");
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [showMetric, setShowMetric] = useState<boolean>(true);
  const [showLegend, setShowLegend] = useState<boolean>(true);
  const [info, setInfo] = useState<string>();
  const [openInfo, setOpenInfo] = useState<boolean>(false);

  const [dashboardYearSelection, setDashboardYearSelection] =
    useState<number>(2024);
  const asylumDirectional = [
    { key: "Country of Origin", value: "origin" },
    { key: "Country of Asylum", value: "asylum" },
  ];

  useMemo(() => {
    setInfo(ASYLUM_REQUEST_INDICATOR_INFO[metricSelected]);
  }, [metricSelected]);

  const countryOptions = isoNameRawTyped.map((element) => {
    return { key: element.name, value: element.iso };
  });

  const { data, error, loading } = useGetAsylumRequestsByYearAndCountryQuery({
    variables: {
      year: Number(dashboardYearSelection),
      countryOfAsylumIso:
        directionSelected == "asylum" ? countrySelected : null,
      countryOfOriginIso:
        directionSelected == "origin" ? countrySelected : null,
    },
  });

  const asylumRequestsByYearAndCountry: AsylumRequest[] = useMemo(
    () =>
      data?.asylumRequestsByYearAndCountry?.filter(
        (item): item is AsylumRequest => !!item
      ) ?? [],
    [data]
  );

  if (error) {
    console.warn("Error fetching asylum request data");
  }

  const getColourForMap = useCountryColor({
    arrayData: asylumRequestsByYearAndCountry,
    metricSelected,
    directionSelected,
    countrySelected,
  });

  const centroids = useCentroids();

  useEffect(() => {
    const isThereAny: boolean = asylumRequestsByYearAndCountry.some(
      (asylumRequest) => asylumRequest?.appPc === true
    );
    if (isThereAny) {
      setShowInfo(true);
    } else {
      setShowInfo(false);
    }
  }, [asylumRequestsByYearAndCountry]);

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
            {asylumRequestsByYearAndCountry.length > 0 && showMetric && (
              <MetricLayer
                key={directionSelected}
                centroids={centroids}
                originOrAsylum={String(directionSelected)}
                arrayData={asylumRequestsByYearAndCountry ?? []}
                metricSelected={metricSelected}
              />
            )}
            <TopButtonContainer>
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
              <IconSpan
                onClick={() =>
                  setMetricSelected(
                    (value) =>
                      (value === "applied"
                        ? "appliedPer100k"
                        : "applied") as keyof AsylumRequest
                  )
                }
              >
                {metricSelected ===
                ("appliedPer100k" as keyof AsylumRequest) ? (
                  <TbNumbers size="1.5rem" />
                ) : (
                  <AiOutlinePercentage size="1.5rem" />
                )}
              </IconSpan>
              {asylumRequestsByYearAndCountry.length > 0 ? (
                <CsvButtonDownload
                  filename={`${dashboardYearSelection}_${directionSelected}_${countrySelected}_asylum_request_data.csv`}
                  data={asylumRequestsByYearAndCountry}
                >
                  <HiOutlineDocumentDownload size="1.5rem" />
                </CsvButtonDownload>
              ) : (
                <IconSpan>
                  <HiOutlineDocumentDownload size="1.5rem" color="gray" />
                </IconSpan>
              )}
            </TopButtonContainer>

            <LowerContainer>
              <SelectorBar
                defaultValue={dashboardYearSelection}
                selectors={yearOptions}
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
        info={info ?? ""}
        openInfo={openInfo}
        setOpenInfo={setOpenInfo}
      />
      <InfoKPIModal
        info="The symbol * indicates the total number of applications where more people have been grouped together. In other words, the number may be significantly higher than the actual number of people who have applied."
        openInfo={showInfo}
        setOpenInfo={setShowInfo}
      />
    </>
  );
};

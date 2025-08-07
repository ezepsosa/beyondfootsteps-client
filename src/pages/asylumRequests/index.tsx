import { MapComponent } from "@/components/mapUsableComponents/mapComponent";
import { LowerContainer } from "./style";
import { SelectorBar } from "@/components/selectorBar";
import { useEffect, useMemo, useState } from "react";
import isoNameRaw from "@assets/iso-country.json";
import type { isoNameType } from "./types";
import {
  useGetAsylumRequestsByYearAndCountryQuery,
  type AsylumRequest,
} from "@/gql/graphql";
import { dashboardYearOptions, useCountryColor } from "../auxliar";
import { GeoJSONLayer } from "@/components/mapUsableComponents/geoJSONLayer";
import { CountryAsylumMetricLayer } from "./countryMetricLayer";
import { ColourLegend } from "@/components/colourLegend";
import { InfoKPIModal } from "@/components/mapUsableComponents/infoKPIModal";
import {
  CsvButtonDownload,
  IconSpan,
  TopButtomContainer,
} from "@/styles/styles";
import { TbNumbers } from "react-icons/tb";
import { AiOutlinePercentage } from "react-icons/ai";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { DisplayError } from "@/components/error";
import { Loading } from "@/components/loading";
import { useCentroids } from "@/hooks/useCentroids";

const isoNameRawTyped: isoNameType[] = isoNameRaw as isoNameType[];

export const AsylumRequests = () => {
  const [countrySelected, setCountrySelected] = useState<string>("ESP");
  const [directionSelected, setDirectionSelected] = useState<string>("origin");
  const [metricSelected, setMetricSelected] =
    useState<keyof AsylumRequest>("applied");
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [dashboardYearSelection, setDashboardYearSelection] =
    useState<number>(2024);
  const asylumDirectional = [
    { label: "Country of Origin", value: "origin" },
    { label: "Country of Asylum", value: "asylum" },
  ];

  const countryOptions = isoNameRawTyped.map((element) => {
    return { label: element.name, value: element.iso };
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
            {asylumRequestsByYearAndCountry.length > 0 && (
              <CountryAsylumMetricLayer
                key={directionSelected}
                centroids={centroids}
                originOrAsylum={String(directionSelected)}
                asylumRequests={asylumRequestsByYearAndCountry ?? []}
                metricSelected={metricSelected}
              />
            )}
          </MapComponent>
        );
      })()}

      <TopButtomContainer>
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
          {metricSelected === ("appliedPer100k" as keyof AsylumRequest) ? (
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
      </TopButtomContainer>

      <LowerContainer>
        <SelectorBar
          defaultValue={dashboardYearSelection}
          selectors={dashboardYearOptions}
          setOption={(value) => setDashboardYearSelection(value as number)}
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
      {getColourForMap.scale && <ColourLegend scale={getColourForMap.scale} />}
      <InfoKPIModal
        info="The symbol * indicates the total number of applications where more people have been grouped together. In other words, the number may be significantly higher than the actual number of people who have applied."
        openInfo={showInfo}
        setOpenInfo={setShowInfo}
      />
    </>
  );
};

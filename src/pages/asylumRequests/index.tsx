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
import { dashboardYearOptions } from "../auxliar";
import { isNumber } from "chart.js/helpers";
import { scaleLinear } from "d3-scale";
import { GeoJSONLayer } from "@/components/mapUsableComponents/geoJSONLayer";
import { CountryAsylumMetricLayer } from "./countryMetricLayer";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import geoDataRaw from "@assets/countries.geojson.json";
import { geoCentroid } from "d3-geo";
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

const isoNameRawTyped: isoNameType[] = isoNameRaw as isoNameType[];

const geoData: FeatureCollection =
  geoDataRaw && typeof geoDataRaw === "object" && "type" in geoDataRaw
    ? (geoDataRaw as FeatureCollection)
    : { type: "FeatureCollection", features: [] };

export const AsylumRequests = () => {
  const [countrySelected, setCountrySelected] = useState<number | string>(
    "ESP"
  );
  const [directionSelected, setDirectionSelected] = useState<number | string>(
    "origin"
  );
  const [metricSelected, setMetricSelected] =
    useState<keyof AsylumRequest>("applied");
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [dashboardYearSelection, setDashboardYearSelection] = useState<
    number | string
  >(2024);
  const asylumDirectional = [
    { label: "Country of Origin", value: "origin" },
    { label: "Country of Asylum", value: "asylum" },
  ];

  const countryOptions = isoNameRawTyped.map((element) => {
    return { label: element.name, value: element.iso };
  });

  const { data, error } = useGetAsylumRequestsByYearAndCountryQuery({
    variables: {
      year: Number(dashboardYearSelection),
      countryOfAsylumIso:
        directionSelected == "asylum" ? (countrySelected as string) : null,
      countryOfOriginIso:
        directionSelected == "origin" ? (countrySelected as string) : null,
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

  const getColourForMap = useMemo(() => {
    if (asylumRequestsByYearAndCountry.length > 0) return {};

    const entries = asylumRequestsByYearAndCountry.filter(Boolean);

    const values: number[] = entries
      .map((asylumRequest: AsylumRequest) => asylumRequest?.[metricSelected])
      .filter((value) => isNumber(value));

    if (values.length === 0) return {};

    const min = Math.min(...values);
    const max = Math.max(...values);

    const scale = scaleLinear<string>()
      .domain([min, max])
      .range(["#00478f", "#a8e600"])
      .clamp(true);
    const colours = Object.fromEntries(
      entries.map((entry) => {
        const appliedValue = entry?.[metricSelected];
        const countryIso =
          directionSelected === "origin"
            ? entry?.countryOfAsylumIso
            : entry?.countryOfOriginIso;

        return [
          countryIso,
          typeof appliedValue === "number" ? scale(appliedValue) : "#ccc",
        ];
      })
    );
    colours[countrySelected.toString()] = "#333";

    return { scale, colours };
  }, [
    asylumRequestsByYearAndCountry,
    countrySelected,
    directionSelected,
    metricSelected,
  ]);

  const centroids = useMemo(() => {
    const countryCenter: Record<string, [number, number]> = {};
    geoData.features?.forEach((f: Feature<Geometry>) => {
      const iso = f.properties?.["ISO3166-1-Alpha-3"];
      countryCenter[iso] = geoCentroid(f);
    });
    return countryCenter;
  }, []);

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
          setOption={setDashboardYearSelection}
        />
        <SelectorBar
          defaultValue={directionSelected}
          selectors={asylumDirectional}
          setOption={setDirectionSelected}
        />
        <SelectorBar
          defaultValue={countrySelected}
          selectors={countryOptions}
          setOption={setCountrySelected}
        />
      </LowerContainer>
      {getColourForMap.scale && <ColourLegend scale={getColourForMap.scale} />}
      <InfoKPIModal
        info="The symbol * indicates the total number of applications where more people have been grouped together. In other words, the number may be significantly higher than the actual number of people who have applied."
        openInfo={showInfo}
        setOpenInfo={setShowInfo}
      />
    </MapComponent>
  );
};

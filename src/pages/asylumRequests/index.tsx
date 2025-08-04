import { MapComponent } from "@/components/mapUsableComponents/mapComponent";
import { LowerContainer } from "./style";
import { SelectorBar } from "@/components/selectorBar";
import { useMemo, useState } from "react";
import isoNameRaw from "@assets/iso-country.json";
import type { isoNameType } from "./types";
import { useGetAsylumRequestsByYearAndCountryQuery } from "@/gql/graphql";
import { dashboardYearOptions } from "../dashboard/auxliar";
import { isNumber } from "chart.js/helpers";
import { scaleLinear } from "d3-scale";
import { GeoJSONLayer } from "@/components/mapUsableComponents/geoJSONLayer";
import { CountryAsylumMetricLayer } from "./countryMetricLayer";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import geoDataRaw from "@assets/countries.geojson.json";
import { geoCentroid } from "d3-geo";

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

  if (error) {
    console.warn("Error fetching asylum request data");
  }


  const getColourForMap = useMemo(() => {
    if (!data?.asylumRequestsByYearAndCountry) return {};

    const entries = data.asylumRequestsByYearAndCountry.filter(Boolean);

    const values: number[] = entries
      .map((asylumRequest) => asylumRequest?.applied)
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
        const appliedValue = entry?.applied;
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
  }, [data, countrySelected, directionSelected]);

  const centroids = useMemo(() => {
    const countryCenter: Record<string, [number, number]> = {};
    geoData.features?.forEach((f: Feature<Geometry>) => {
      const iso = f.properties?.["ISO3166-1-Alpha-3"];
      countryCenter[iso] = geoCentroid(f);
    });
    return countryCenter;
  }, []);

  return (
    <MapComponent>
      <GeoJSONLayer geoColourForMap={getColourForMap} />

      {data && (
        <CountryAsylumMetricLayer
          centroids={centroids}
          originOrAsylum={String(directionSelected)}
          asylumRequests={data?.asylumRequestsByYearAndCountry ?? []}
        />
      )}

      <LowerContainer>
        <SelectorBar
          defaultValue={directionSelected}
          paddingMobile="0.4rem 2.5rem;"
          selectors={asylumDirectional}
          setOption={setDirectionSelected}
        />
        <SelectorBar
          defaultValue={countrySelected}
          selectors={countryOptions}
          setOption={setCountrySelected}
        />
        <SelectorBar
          defaultValue={dashboardYearSelection}
          paddingMobile="0.4rem 2.5rem;"
          selectors={dashboardYearOptions}
          setOption={setDashboardYearSelection}
        />
      </LowerContainer>
    </MapComponent>
  );
};

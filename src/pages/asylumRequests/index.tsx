import { MapComponent } from "@/components/mapUsableComponents/mapComponent";
import { LowerContainer } from "./style";
import { SelectorBar } from "@/components/selectorBar";
import { useState } from "react";
import isoNameRaw from "@assets/iso-country.json";
import type { isoNameType } from "./types";
import { useGetAsylumRequestsByYearAndCountryQuery } from "@/gql/graphql";
import { dashboardYearOptions } from "../dashboard/auxliar";

const isoNameRawTyped: isoNameType[] = isoNameRaw as isoNameType[];

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
    { label: "Country of Asylum", value: "destination" },
  ];

  const countryOptions = isoNameRawTyped.map((element) => {
    return { label: element.name, value: element.iso };
  });

  const { data, loading, error } = useGetAsylumRequestsByYearAndCountryQuery({
    variables: {
      year: 2020,
      countryOfAsylumIso:
        directionSelected == "asylum" ? (countrySelected as string) : null,
      countryOfOriginIso:
        directionSelected == "origin" ? (countrySelected as string) : null,
    },
  });

  console.log(data);

  return (
    <MapComponent>
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

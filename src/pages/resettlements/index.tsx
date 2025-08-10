import { DisplayError } from "@/components/error";
import { Loading } from "@/components/loading";
import { ChartContainer, ResettlementContainer, TopContainer } from "./style";
import { useMemo, useState } from "react";
import { SelectorBar } from "@/components/selectorBar";
import { yearOptions } from "@/components/auxliar";
import { TextSpan } from "@/styles/styles";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import {
  useGetResettlementSummariesByYearGroupedByQuery,
  type ResettlementSummaryGrouped,
} from "@/gql/graphql";
import { CoverageRate } from "./coverage";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  ChartTooltip,
  Legend
);

function returnOptionsFromPosition({
  resettlementSummaries,
  position,
  selectedCountryA,
}: {
  resettlementSummaries: ResettlementSummaryGrouped[];
  position: number;
  selectedCountryA?: string;
}) {
  if (position === 1 && selectedCountryA?.length === 0) return [{ key: "---", value: "" }];
  const res = Array.from(
    new Map(
      resettlementSummaries
        .filter((summary) => summary?.countriesIso && (position === 1 ? summary?.countriesIso?.includes(selectedCountryA ?? "") : true))
        .map((summary) => [
          summary.countriesIso?.split("-")[position] ?? "",
          {
            key: summary.countriesNames?.split("-")[position] ?? "",
            value: summary.countriesIso?.split("-")[position] ?? "",
          },
        ])
    ).values()
  );
  res.push({ key: "---", value: "" });
  if (position === 1) {
    return res.filter(option => option.value !== selectedCountryA);
  }
  return res.sort((a, b) => a.key.localeCompare(b.key));
}

export const ResettlementSummary = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [grouping, setGrouping] = useState<string>("Origin-Asylum");
  const [selectedCountryA, setSelectedCountryA] = useState<string>("");
  const [selectedCountryB, setSelectedCountryB] = useState<string>("");

  const { data, loading, error } =
    useGetResettlementSummariesByYearGroupedByQuery({
      variables: {
        year: Number(selectedYear),
        grouping: grouping,
      },
    });

  const resettlementSummaries = useMemo(() => {
    if (!data) return [];
    return data.resettlementSummariesByYearGroupedBy || [];
  }, [data]);

  const groupingOptions: { key: string; value: string }[] = [
    {
      key: "Country of Origin",
      value: "origin",
    },
    {
      key: "Country of Asylum",
      value: "asylum",
    },
    {
      key: "Country of Resettlement",
      value: "resettlement",
    },
    {
      key: "Country of Origin and Asylum",
      value: "origin-asylum",
    },
  ];

  const countryAOptions: { key: string; value: string }[] = useMemo(() => {
    return returnOptionsFromPosition({
      resettlementSummaries: resettlementSummaries.filter(
        (s): s is ResettlementSummaryGrouped => s !== null
      ),
      position: 0,
    });
  }, [resettlementSummaries]);

  const countryBOptions: { key: string; value: string }[] = useMemo(() => {
    return returnOptionsFromPosition({
      resettlementSummaries: resettlementSummaries.filter(
        (s): s is ResettlementSummaryGrouped => s !== null
      ),
      position: 1,
      selectedCountryA: selectedCountryA
    });
  }, [resettlementSummaries, selectedCountryA]);
  // -- Top coverage calculations --
  const topCoverage = useMemo(() => {
    const rows = (resettlementSummaries ?? []) as ResettlementSummaryGrouped[];
    if (selectedCountryA.length != 0 && grouping != "origin-asylum") {
      return rows
        .filter(
          (resettlement) =>
            resettlement.coverageRate != null &&
            resettlement.countriesIso?.includes(selectedCountryA)
        )
        .sort((a, b) => (b.coverageRate ?? 0) - (a.coverageRate ?? 0));
    } else if (
      selectedCountryA.length != 0 &&
      selectedCountryB.length != 0 &&
      grouping === "origin-asylum"
    ) {
      return rows
        .filter(
          (resettlement) =>
            resettlement.coverageRate != null &&
            resettlement.countriesIso &&
            resettlement.countriesIso?.includes(selectedCountryA) &&
            resettlement.countriesIso?.includes(selectedCountryB)
        )
        .sort((a, b) => (b.coverageRate ?? 0) - (a.coverageRate ?? 0));
    } else {
      return rows
        .filter(
          (resettlement) =>
            resettlement.coverageRate != null && resettlement.countriesIso
        )
        .sort((a, b) => (b.coverageRate ?? 0) - (a.coverageRate ?? 0));
    }
  }, [resettlementSummaries, selectedCountryA, selectedCountryB, grouping]);

  if (error) {
    console.warn("Error fetching resettlement data", error);
    return <DisplayError />;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <ResettlementContainer>
      <ChartContainer>
        <TopContainer>
          <TextSpan $fontWeight="600">Select Grouping:</TextSpan>
          <SelectorBar
            defaultValue={grouping}
            selectors={groupingOptions}
            setOption={(value) => setGrouping(value as string)}
          />
          <TextSpan $fontWeight="600">Select Country A:</TextSpan>
          <SelectorBar
            defaultValue={selectedCountryA}
            selectors={countryAOptions}
            setOption={(value) => setSelectedCountryA(value as string)}
          />
          {grouping === "origin-asylum" && (
            <>
              <TextSpan $fontWeight="600">Select Country B:</TextSpan>
              <SelectorBar
                defaultValue={selectedCountryB}
                selectors={countryBOptions}
                setOption={(value) => setSelectedCountryB(value as string)}
              />
            </>
          )}
          {/*

          {grouping === "origin-asylum" && (
            <>
              <TextSpan $fontWeight="600">Select Country B:</TextSpan>
              <SelectorBar
                defaultValue={selectedCountryB}
                selectors={countryOptions}
                setOption={(value) => setSelectedCountryB(value as string)}
              />
            </>
          )}

          */}
          <TextSpan $fontWeight="600">Select Year:</TextSpan>
          <SelectorBar
            defaultValue={selectedYear}
            selectors={yearOptions}
            setOption={(value) => setSelectedYear(value as number)}
          />
        </TopContainer>
        <CoverageRate topCoverage={topCoverage} />
      </ChartContainer>
    </ResettlementContainer>
  );
};

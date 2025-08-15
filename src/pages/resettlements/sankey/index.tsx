import "chartjs-chart-sankey";

import { useGetResettlementSummariesByYearGroupedByQuery } from "@/gql/graphql";
import type { Props } from "./types";
import { useMemo, useState } from "react";
import { Chart } from "react-chartjs-2";
import type { ChartData } from "chart.js";
import {
  CenterContainer,
  CsvButtonDownload,
  IconSpan,
  PrimaryButton,
  SecondaryButton,
} from "@/styles/styles";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { colors } from "@/styles/colors";

export const ResettlementFlows = ({ year }: Props) => {
  const { data } = useGetResettlementSummariesByYearGroupedByQuery({
    variables: {
      year: year,
      grouping: "ASYLUM-RESETTLEMENT",
    },
  });
  const [page, setPage] = useState<number>(10);

  function calculateNextPage() {
    if (page < resettlementSummaries.length - 1) {
      setPage((prev) => prev + 10);
    } else {
      setPage(10);
    }
  }

  function calculatePreviousPage() {
    if (page > 10) {
      setPage((prev) => prev - 10);
    } else {
      setPage(10);
    }
  }

  function resetPage() {
    setPage(10);
  }

  const resettlementSummaries = useMemo(() => {
    if (!data) return [];
    return (data.resettlementSummariesByYearGroupedBy ?? []).filter(
      (resettlement) => resettlement?.countriesIso?.split("-").length === 2
    );
  }, [data]);

  const filteredData = useMemo(() => {
    if (!resettlementSummaries) return [];
    return [...resettlementSummaries]
      .sort((a, b) => (b?.totalDepartures ?? 0) - (a?.totalDepartures ?? 0))
      .slice(0, page);
  }, [resettlementSummaries, page]);

  const sankeyData = useMemo<ChartData<"sankey">>(
    () => ({
      datasets: [
        {
          label: "Resettlement Flows",
          data: filteredData.map((resettlement) => {
            const countries = resettlement?.countriesIso
              ? resettlement.countriesIso.split("-")
              : ["", ""];
            return {
              from: countries[0],
              to: countries[1],
              flow: resettlement?.totalDepartures ?? 0,
            };
          }),
          from: colors.primary[500],
          to: colors.success[500],
          colorMode: "gradient",
          borderColor: "#222",
          borderWidth: 2,
          nodeWidth: 30,
          nodePadding: 20,
          font: { size: 14, family: "Roboto", weight: "bold" },
        },
      ],
    }),
    [filteredData]
  );
  const options = {
    parsing: {
      from: "from",
      to: "to",
      flow: "flow",
    },
    plugins: {
      title: {
        display: true,
        text: `Top ${page} (Asylum - Resettlement) flows`,
      },
      legend: { display: false },
    },
  };
  return (
    <CenterContainer>
      <CenterContainer height="100px" $direction="row">
        <PrimaryButton onClick={calculatePreviousPage}>Previous</PrimaryButton>
        <PrimaryButton onClick={calculateNextPage}>Next</PrimaryButton>
        <SecondaryButton onClick={resetPage}>Reset</SecondaryButton>
        {resettlementSummaries.length > 0 ? (
          <CsvButtonDownload
            filename={`Top_${page}_resettlement_summary_data.csv`}
            data={filteredData ?? []}
          >
            <HiOutlineDocumentDownload size="1.5rem" />
          </CsvButtonDownload>
        ) : (
          <IconSpan>
            <HiOutlineDocumentDownload size="1.5rem" color="gray" />
          </IconSpan>
        )}
      </CenterContainer>
      <Chart type="sankey" data={sankeyData} options={options} />
    </CenterContainer>
  );
};

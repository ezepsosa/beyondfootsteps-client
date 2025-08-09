import { DisplayError } from "@/components/error";
import { Loading } from "@/components/loading";
import { useGetResettlementSummariesByYearQuery } from "@/gql/graphql";
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
import { CoverageRate } from "./coverage";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  ChartTooltip,
  Legend
);

export const ResettlementSummary = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2024);

  const { data, loading, error } = useGetResettlementSummariesByYearQuery({
    variables: {
      year: selectedYear,
    },
  });

  const resettlementSummaries = useMemo(() => {
    if (!data) return [];
    return data.resettlementSummariesByYear || [];
  }, [data]);

  // -- Top coverage calculations --
  const topCoverage = useMemo(() => {
    const rows = (resettlementSummaries ?? []) as Array<{
      id: string;
      countryOfAsylumIso: string | null;
      countryOfAsylum: string | null;
      coverageRate: number | null;
      totalNeeds: number | null;
      submissionsTotal: number | null;
      departuresTotal: number | null;
      realizationRate: number | null;
    }>;
    return rows
      .filter((resettlement) => resettlement.coverageRate != null)
      .sort((a, b) => (b.coverageRate ?? 0) - (a.coverageRate ?? 0))
      .slice(0, 10);
  }, [resettlementSummaries]);

  if (error) {
    console.warn("Error fetching resettlement data");
    return <DisplayError />;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <ResettlementContainer>
      <ChartContainer>
        <TopContainer>
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

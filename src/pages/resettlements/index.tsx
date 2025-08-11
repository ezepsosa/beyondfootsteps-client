import { DisplayError } from "@/components/error";
import { Loading } from "@/components/loading";
import { ChartContainer, ResettlementContainer, TopContainer } from "./style";
import { useMemo, useState } from "react";
import { SelectorBar } from "@/components/selectorBar";
import { yearOptions } from "@/components/auxliar";
import {
  CsvButtonDownload,
  IconSpan,
  SecondaryButton,
  TextParagraph,
  TextParagraphContainer,
  TextSpan,
  ThinLine,
} from "@/styles/styles";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip as ChartTooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import {
  useGetResettlementSummariesByYearGroupedByQuery,
  type ResettlementSummaryGrouped,
} from "@/gql/graphql";
import { CoverageRate } from "./coverage";
import { ResettlementPipeline } from "./Pipeline";
import { ScatterEfficiency } from "./scatter";
import { ResettlementGap } from "./gap";
import { Flow, SankeyController } from "chartjs-chart-sankey";
import { ResettlementFlows } from "./sankey";
import { ResettlementTrends } from "./trends";
import { HiOutlineDocumentDownload } from "react-icons/hi";

ChartJS.register(
  CategoryScale,
  SankeyController,
  LinearScale,
  BarElement,
  ChartTitle,
  ChartTooltip,
  PointElement,
  LineElement,
  Legend,
  Flow
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
  if (position === 1 && selectedCountryA?.length === 0)
    return [{ key: "---", value: "" }];
  const res = Array.from(
    new Map(
      resettlementSummaries
        .filter(
          (summary) =>
            summary?.countriesIso &&
            (position === 1
              ? summary?.countriesIso?.includes(selectedCountryA ?? "")
              : true)
        )
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
    return res.filter((option) => option.value !== selectedCountryA);
  }
  return res.sort((a, b) => a.key.localeCompare(b.key));
}

export const ResettlementSummary = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [grouping, setGrouping] = useState<string>("Origin-Asylum");
  const [selectedCountryA, setSelectedCountryA] = useState<string>("");
  const [selectedCountryB, setSelectedCountryB] = useState<string>("");

  function resetFilters() {
    setSelectedYear(2024);
    setGrouping("Origin-Asylum");
    setSelectedCountryA("");
    setSelectedCountryB("");
  }

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
      selectedCountryA: selectedCountryA,
    });
  }, [resettlementSummaries, selectedCountryA]);

  const resettlementSummariesFiltered = useMemo(() => {
    const rows = (resettlementSummaries ?? []) as ResettlementSummaryGrouped[];
    if (selectedCountryA.length != 0 && grouping != "origin-asylum") {
      return rows
        .filter((resettlement) =>
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
            resettlement.countriesIso &&
            resettlement.countriesIso?.includes(selectedCountryA) &&
            resettlement.countriesIso?.includes(selectedCountryB)
        )
        .sort((a, b) => (b.coverageRate ?? 0) - (a.coverageRate ?? 0));
    } else {
      return rows
        .filter((resettlement) => resettlement.countriesIso)
        .sort((a, b) => (b.coverageRate ?? 0) - (a.coverageRate ?? 0));
    }
  }, [resettlementSummaries, selectedCountryA, selectedCountryB, grouping]);

  const topCoverage = useMemo(() => {
    return resettlementSummariesFiltered
      .filter((resettlement) => resettlement.coverageRate != null)
      .sort((a, b) => (b.coverageRate ?? 0) - (a.coverageRate ?? 0));
  }, [resettlementSummariesFiltered]);

  const topResettlement = useMemo(() => {
    return resettlementSummariesFiltered
      .filter(
        (resettlement) =>
          resettlement.totalNeeds != null ||
          resettlement.totalDepartures != null ||
          resettlement.submissionsEfficiency != null
      )
      .sort(
        (a, b) =>
          (b.totalNeeds ?? 0) +
          (b.submissionsEfficiency ?? 0) +
          (b.totalDepartures ?? 0) -
          ((a.totalNeeds ?? 0) +
            (a.submissionsEfficiency ?? 0) +
            (a.totalDepartures ?? 0))
      );
  }, [resettlementSummariesFiltered]);

  const topResettlementGap = useMemo(() => {
    return resettlementSummariesFiltered
      .filter((resettlement) => resettlement.resettlementGap != null)
      .sort((a, b) => (b.resettlementGap ?? 0) - (a.resettlementGap ?? 0));
  }, [resettlementSummariesFiltered]);

  if (error) {
    console.warn("Error fetching resettlement data", error);
    return <DisplayError />;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <ResettlementContainer>
      <TextParagraphContainer>
        <TextParagraph>
          <strong>Welcome to the Resettlement Analysis Dashboard</strong>, a comprehensive tool
          designed to explore and understand the refugee resettlement process
          from needs identification to actual departures. This section provides
          interactive visualizations that analyze coverage rates (how well needs
          are being met), pipeline performance (tracking cases from needs to
          departures), efficiency metrics (submissions and realization rates),
          resettlement gaps (unmet needs), geographical flows (movement
          patterns), and historical trends. Use the filters above to customize
          your view by year, grouping type (origin, asylum, resettlement country,
          or origin-asylum pairs), and specific countries of interest. The data
          can be analyzed from multiple perspectives: by refugee country of
          origin, country of first asylum, final resettlement destination, or
          specific migration corridors. Each visualization offers unique insights
          into different aspects of the resettlement process, helping
          stakeholders identify trends, gaps, and opportunities for
          improvement.
        </TextParagraph>
      </TextParagraphContainer>

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
        <TextSpan $fontWeight="600">Select Year:</TextSpan>
        <SelectorBar
          defaultValue={selectedYear}
          selectors={yearOptions}
          setOption={(value) => setSelectedYear(value as number)}
        />
        <SecondaryButton onClick={resetFilters}>Reset</SecondaryButton>
        {resettlementSummaries.length > 0 ? (
          <CsvButtonDownload
            filename={
              selectedYear +
              "_" +
              grouping +
              "_" +
              selectedCountryA +
              (selectedCountryB ? "_" + selectedCountryB : "") +
              "_resettlement_summary_data.csv"
            }
            data={resettlementSummaries ?? []}
          >
            <HiOutlineDocumentDownload size="1.5rem" />
          </CsvButtonDownload>
        ) : (
          <IconSpan>
            <HiOutlineDocumentDownload size="1.5rem" color="gray" />
          </IconSpan>
        )}
      </TopContainer>
      
      <TextParagraphContainer>
        <TextParagraph>
          <strong>Coverage Rate:</strong> Horizontal bar chart showing the
          coverage rate for each group or country. This allows you to compare
          how well resettlement needs are being met across different regions and
          groupings.
        </TextParagraph>
        <TextParagraph>
          <strong>Pipeline:</strong> Grouped bar chart displaying Needs,
          Submissions, and Departures for each country or group. It helps you
          visualize the resettlement process and identify bottlenecks or gaps at
          each stage.
        </TextParagraph>
      </TextParagraphContainer>
      <ChartContainer>
        <CoverageRate topCoverage={topCoverage} />
        <ResettlementPipeline topResettlement={topResettlement} />
      </ChartContainer>
            <TextParagraphContainer>
        <TextParagraph>
          <strong>Coverage Rate:</strong> Horizontal bar chart showing the
          coverage rate for each group or country. This allows you to compare
          how well resettlement needs are being met across different regions and
          groupings.
        </TextParagraph>
        <TextParagraph>
          <strong>Pipeline:</strong> Grouped bar chart displaying Needs,
          Submissions, and Departures for each country or group. It helps you
          visualize the resettlement process and identify bottlenecks or gaps at
          each stage.
        </TextParagraph>
        <TextParagraph>
          <strong>Efficiency Scatter Plot:</strong> Scatter plot comparing
          submissions efficiency and realization rate for each group or country.
          Use this chart to analyze which regions are most effective in
          processing and realizing resettlement cases.
        </TextParagraph>
        <TextParagraph>
          <strong>Resettlement Gap:</strong> Horizontal bar chart highlighting
          the countries or groups with the largest gap between resettlement
          needs and actual departures. This visualization helps you identify
          where unmet needs are greatest and prioritize interventions.
        </TextParagraph>
      </TextParagraphContainer>
      <ChartContainer>
        <ScatterEfficiency resettlements={topResettlement} />
        <ResettlementGap resettlements={topResettlementGap} />
      </ChartContainer>
      <ThinLine />
      <TextParagraphContainer>
        <TextParagraph>
          <strong>Resettlement Flows:</strong> This diagram visualizes the flows
          from countries of asylum to countries of resettlement. You can filter
          by year and country to analyze specific routes and volumes. The Sankey
          chart helps you understand how departures are distributed among
          different destinations and highlights the main resettlement corridors.
        </TextParagraph>
        <TextParagraph>
          <strong>Resettlement Trends:</strong> This line chart shows the annual
          evolution of needs, submissions, and departures for resettlement. It
          allows you to compare trends over time and analyze whether coverage
          and efficiency improve or decline in different periods. You can select
          country and year to view the corresponding historical data.
        </TextParagraph>
      </TextParagraphContainer>
      <ChartContainer>
        <ResettlementFlows year={selectedYear} />
        <ResettlementTrends />
      </ChartContainer>
    </ResettlementContainer>
  );
};

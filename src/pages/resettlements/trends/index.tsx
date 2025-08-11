import { SelectorBar } from "@/components/selectorBar";
import {
  useGetResettlementSummariesGroupedByAsylumYearQuery,
  type ResettlementSummaryGroupedWithYear,
} from "@/gql/graphql";
import { CenterContainer, CsvButtonDownload, IconSpan } from "@/styles/styles";
import { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import { HiOutlineDocumentDownload } from "react-icons/hi";

export const ResettlementTrends = () => {
  const { data } = useGetResettlementSummariesGroupedByAsylumYearQuery();
  const [country, setCountry] = useState<string>("AFG");

  const countries: { key: string; value: string }[] = useMemo(() => {
    if (!data) return [{ key: "", value: "" }];
    const map = new Map<string, string>();
    data.resettlementSummariesGroupedByAsylumYear?.forEach((resettlement) => {
      if (resettlement?.countriesIso && resettlement?.countriesNames) {
        map.set(resettlement.countriesNames, resettlement.countriesIso);
      }
    });
    return Array.from(map.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([key, value]) => ({
        key,
        value,
      }));
  }, [data]);

  const resettlements: ResettlementSummaryGroupedWithYear[] = useMemo(() => {
    if (!data) return [];
    return (data.resettlementSummariesGroupedByAsylumYear ?? []).filter(
      (resettlement): resettlement is ResettlementSummaryGroupedWithYear =>
        resettlement !== null &&
        country !== "" &&
        resettlement.countriesIso === country
    );
  }, [data, country]);

  const charData = {
    labels: resettlements
      .filter((resettlement) => resettlement.year)
      .map((resettlement) => resettlement.year)
      .sort((a, b) => (a ?? 0) - (b ?? 0)),
    datasets: [
      {
        label: "Needs",
        data: resettlements.map((resettlement) => resettlement.totalNeeds || 0),
        borderColor: "red",
        backgroundColor: "#ff7f7dff",
      },
      {
        label: "Submissions",
        data: resettlements.map(
          (resettlement) => resettlement.totalSubmissions || 0
        ),
        borderColor: "blue",
        backgroundColor: "#997dffff",
      },
      {
        label: "Departures",
        data: resettlements.map(
          (resettlement) => resettlement.totalDepartures || 0
        ),
        borderColor: "green",
        backgroundColor: "#7dff9dff",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Resettlement Trends by Years",
      },
    },
  };

  return (
    <CenterContainer>
      <CenterContainer height="100px" direction="row">
        <SelectorBar
          selectors={countries}
          defaultValue={country}
          setOption={(value) => setCountry(value as string)}
        />
        {resettlements.length > 0 ? (
          <CsvButtonDownload
            filename={"resettlement_summary_data.csv"}
            data={resettlements ?? []}
          >
            <HiOutlineDocumentDownload size="1.5rem" />
          </CsvButtonDownload>
        ) : (
          <IconSpan>
            <HiOutlineDocumentDownload size="1.5rem" color="gray" />
          </IconSpan>
        )}
      </CenterContainer>
      <CenterContainer direction="row"></CenterContainer>
      <Line options={options} data={charData} />;
    </CenterContainer>
  );
};

import { CenterContainer, PrimaryButton, SecondaryButton } from "@/styles/styles";
import type { Props } from "./types";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";

export const ResettlementPipeline = ({
  topResettlement
}: Props) => {
  const [page, setPage] = useState<number>(0);
  const [topResettlementSliced, setTopResettlementSliced] = useState(
    topResettlement.slice(page, page + 10)
  );

  function calculateNextPage() {
    if (page < topResettlement.length - 1) {
      setPage((prev) => prev + 10);
    } else {
      setPage(10);
    }
  }

  function calculatePreviousPage() {
    if (page > 10) {
      setPage((prev) => prev - 10);
    } else {
      setPage(0);
    }
  }

  function resetPage() {
    setPage(0);
  }

  useEffect(() => {
    setTopResettlementSliced(topResettlement.slice(page, page + 10));
  }, [page, topResettlement]);

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Resettlement Pipeline",
      },
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
      },
    },
  };

  const data = {
    labels: Array.from(
      new Set(
        topResettlementSliced.map(
          (r) => r.countriesIso ?? r.countriesNames ?? "-"
        )
      )
    ),
    datasets: [
      {
        label: "Needs",
        data: topResettlementSliced.map((r) => r.totalNeeds),
        backgroundColor: "#ff5252ff",
      },
      {
        label: "Submissions",
        data: topResettlementSliced.map((r) => r.totalSubmissions),
        backgroundColor: "#4285f4ff",
      },
      {
        label: "Departures",
        data: topResettlementSliced.map((r) => r.totalDepartures),
        backgroundColor: "#34a853ff",
      },
    ],
  };

  return (
    <CenterContainer>
      <CenterContainer direction="row">
        <PrimaryButton onClick={calculatePreviousPage}>Previous</PrimaryButton>
        <PrimaryButton onClick={calculateNextPage}>Next</PrimaryButton>
        <SecondaryButton onClick={resetPage}>Reset</SecondaryButton>
      </CenterContainer>
      <Bar options={options} data={data} />
    </CenterContainer>
  );
};

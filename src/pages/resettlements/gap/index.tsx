import {
  CenterContainer,
  PrimaryButton,
  SecondaryButton,
} from "@/styles/styles";
import type { Props } from "./types";
import { Bar } from "react-chartjs-2";
import { useEffect, useMemo, useState } from "react";
import type { ChartData, ChartOptions } from "chart.js";

export const ResettlementGap = ({ resettlements }: Props) => {
  const [page, setPage] = useState<number>(0);
  const [topResettlementsSliced, setTopResettlementsSliced] = useState(
    resettlements.slice(page, page + 10)
  );

  function calculateNextPage() {
    if (page < resettlements.length - 1) {
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
    setTopResettlementsSliced(resettlements.slice(page, page + 10));
  }, [page, resettlements]);

  const options = useMemo<ChartOptions<"bar">>(
    () => ({
      indexAxis: "y" as const,
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      plugins: {
        legend: {
          position: "right",
        },
        title: {
          display: true,
          text: "Resettlement Gap",
        },
      },
    }),
    []
  );

  const data = useMemo<ChartData<"bar">>(
    () => ({
      labels: topResettlementsSliced.map(
        (r) => r.countriesIso ?? r.countriesNames ?? "-"
      ),
      datasets: [
        {
          label: "Resettlement Gap",
          data: topResettlementsSliced.map((r) => r.resettlementGap ?? 0),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    }),
    [topResettlementsSliced]
  );
  return (
    <CenterContainer>
      <CenterContainer height="100px" direction="row">
        <PrimaryButton onClick={calculatePreviousPage}>Previous</PrimaryButton>
        <PrimaryButton onClick={calculateNextPage}>Next</PrimaryButton>
        <SecondaryButton onClick={resetPage}>Reset</SecondaryButton>
      </CenterContainer>

      <Bar data={data} options={options} />
    </CenterContainer>
  );
};

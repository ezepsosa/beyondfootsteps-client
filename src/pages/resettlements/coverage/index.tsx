import { useEffect, useMemo, useState } from "react";
import type { Props } from "./types";
import { Bar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import { CenterContainer, PrimaryButton, SecondaryButton } from "@/styles/styles";

export const CoverageRate = ({ topCoverage }: Props) => {
  const [page, setPage] = useState<number>(0);
  const [topCoverageSliced, setTopCoverageSliced] = useState(
    topCoverage.slice(page, page + 10)
  );

  function calculateNextPage() {
    if (page < topCoverage.length - 1) {
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
    setTopCoverageSliced(topCoverage.slice(page, page + 10));
  }, [page, topCoverage]);

  const coverageChartData = useMemo<ChartData<"bar">>(() => {
    return {
      labels: topCoverageSliced.map(
        (r) => r.countriesIso ??  r.countriesNames ?? "-"
      ),
      datasets: [
        {
          label: "Coverage (%)",
          data: topCoverageSliced.map((r) => (r.coverageRate ?? 0) * 100),
          backgroundColor: "#f6953bff",
          borderRadius: 6,
          barThickness: 20,
        },
      ],
    };
  }, [topCoverageSliced]);

  const coverageChartOptions = useMemo<ChartOptions<"bar">>(
    () => ({
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          min: 0,
          max: 100,
          ticks: {
            callback: (value: number | string) => `${value}%`,
          },
        },
        y: {
          grid: { display: false, drawBorder: false },
        },
      },
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: "Top Resettlement Coverage",
        },
      },
    }),
    []
  );

  return (
    <CenterContainer>
      <CenterContainer height="100px" direction="row">
        <PrimaryButton onClick={calculatePreviousPage}>Previous</PrimaryButton>
        <PrimaryButton onClick={calculateNextPage}>Next</PrimaryButton>
        <SecondaryButton onClick={resetPage}>Reset</SecondaryButton>
      </CenterContainer>

      <Bar data={coverageChartData} options={coverageChartOptions} />
    </CenterContainer>
  );
};

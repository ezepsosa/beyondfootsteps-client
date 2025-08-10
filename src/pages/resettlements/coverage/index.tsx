import { useEffect, useMemo, useState } from "react";
import type { Props } from "./types";
import { Bar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import { Button } from "@headlessui/react";

export const CoverageRate = ({ topCoverage, width, height }: Props) => {
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

  useEffect(() => {
    setTopCoverageSliced(topCoverage.slice(page, page + 10));
  }, [page, topCoverage]);

  const coverageChartData = useMemo<ChartData<"bar">>(() => {
    return {
      labels: topCoverageSliced.map((r) => r.countriesIso ?? r.countriesNames ?? "-"),
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
          // TODO: Add title
        },
      },
    }),
    []
  );

  return (
    <div style={{ width: width ?? "100%", height: height ?? 420 }}>
      <Button onClick={calculateNextPage}>Next</Button>

      <Bar data={coverageChartData} options={coverageChartOptions} />
    </div>
  );
};

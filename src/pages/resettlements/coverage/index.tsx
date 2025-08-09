import { useMemo } from "react";
import type { Props } from "./types";
import { Bar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

export const CoverageRate = ({ topCoverage, width, height }: Props) => {
  const coverageChartData = useMemo<ChartData<"bar">>(() => {
    return {
      labels: topCoverage.map(
        (r) => r.countryOfAsylum ?? r.countryOfAsylumIso ?? "-"
      ),
      datasets: [
        {
          label: "Coverage (%)",
          data: topCoverage.map((r) => (r.coverageRate ?? 0) * 100),
          backgroundColor: "#3b82f6",
          borderRadius: 6,
          barThickness: 20,
        },
      ],
    };
  }, [topCoverage]);

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
      <Bar data={coverageChartData} options={coverageChartOptions} />
    </div>
  );
};

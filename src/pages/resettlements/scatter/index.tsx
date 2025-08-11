import { Scatter } from "react-chartjs-2";
import type { Props } from "./types";
import { CenterContainer, SecondaryButton } from "@/styles/styles";
import type { ChartOptions, TooltipItem } from "chart.js";
import { useState } from "react";

export const ScatterEfficiency = ({ resettlements }: Props) => {
  const [allowMoreThan100, setAllowMoreThan100] = useState(false);
  const options: ChartOptions<"scatter"> = {
    scales: {
      y: { beginAtZero: true, max: allowMoreThan100 ? undefined : 1 },
      x: { beginAtZero: true, max: allowMoreThan100 ? undefined : 1 },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"scatter">) {
            const point = context.raw as {
              label: string;
              x: number;
              y: number;
            };
            return `${point.label}: SE=${(point.x * 100).toFixed(2)}, RR=${(
              point.y * 100
            ).toFixed(2)}`;
          },
        },
      },
      title: {
        display: true,
        text: "Resettlement Efficiency - SE: Submissions Efficiency, RR: Realization Rate",
      },
    },
  };

  const data = {
    datasets: [
      {
        label: "Resettlement Efficiency",
        data: resettlements.map((r) => ({
          x: r.submissionsEfficiency,
          y: r.realizationRate,
          label: r.countriesIso ?? r.countriesNames ?? "-",
        })),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <CenterContainer>
      <CenterContainer direction="row">
        <SecondaryButton onClick={() => setAllowMoreThan100((value) => !value)}>
          {allowMoreThan100
            ? "Allow more than 100%"
            : "Disallow more than 100%"}
        </SecondaryButton>
      </CenterContainer>
      <Scatter data={data} options={options} />
    </CenterContainer>
  );
};

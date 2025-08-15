import type {
  AsylumDecision,
  AsylumRequest,
  DashboardSummary,
} from "@/gql/graphql";
import { scaleLinear, type ScaleLinear } from "d3-scale";
import { useMemo } from "react";
/* The next functions cannot be easily self explained by reading the code, so a properly explanation is added here. @Author Ezequiel Pérez */

/** * Type guard to check if an array is of type AsylumRequest.
 * @param arr - The array to check.
 * @returns True if the array is of type AsylumRequest, false otherwise.
 */

const isAsylumRequestArray = (
  arr: (AsylumRequest | AsylumDecision | DashboardSummary)[]
): arr is AsylumRequest[] => arr.length > 0 && "countryOfAsylumIso" in arr[0];

const isAsylumDecisionArray = (
  arr: (AsylumRequest | AsylumDecision | DashboardSummary)[]
): arr is AsylumDecision[] => arr.length > 0 && "countryOfAsylumIso" in arr[0];

/** * Calculates colors for countries based on a selected metric and returns a color scale.
 * @param scale - The D3 scale to use for color mapping.
 * @param entries - The array of data entries, either `AsylumRequest[]` or `DashboardSummary[]`.
 * @param metricSelected - The key of the metric to use for color calculation.
 * @param directionSelected - (Optional) The direction filter to apply, if any.
 * @param countrySelected - (Optional) The country filter to apply, if any.
 * @returns An object mapping country ISO codes to their corresponding colors.
 */

function calculateColorReturningValue(
  scale: ScaleLinear<string, string, never>,
  entries: (AsylumRequest | AsylumDecision | DashboardSummary)[],
  metricSelected: keyof AsylumRequest | keyof DashboardSummary | keyof AsylumDecision,
  directionSelected?: string,
  countrySelected?: string
  
) {
  if (isAsylumRequestArray(entries)) {
    const colors = Object.fromEntries(
      entries.map((entry: AsylumRequest) => {
        const value = entry[metricSelected as keyof AsylumRequest];
        const countryIso =
          directionSelected === "origin"
            ? entry.countryOfAsylumIso
            : entry.countryOfOriginIso;

        return [countryIso, typeof value === "number" ? scale(value) : "#ccc"];
      })
    );
    colors[countrySelected || ""] = "#333";
    return colors;
  } else {
    const dashboardEntries = entries.filter(
      (entry): entry is DashboardSummary => "countryIso" in entry
    );
    const colors = Object.fromEntries(
      dashboardEntries.map((entry) => {
        const value = entry[metricSelected as keyof DashboardSummary];

        return [
          entry.countryIso,
          typeof value === "number" ? scale(value) : "#ccc",
        ];
      })
    );

    return colors;
  }
}

function calculateScale(values: number[], colorsOnlyPositive: string[], colorsMixed: string[]): ScaleLinear<string, string, never> {
  if (values.length === 0) {
    return scaleLinear<string>()
      .domain([0, 1])
      .range(["#ccc", "#ccc"])
      .clamp(true);
  }
  const sortedValues = [...values].sort((a, b) => a - b);

  const getPercentile = (p: number): number => {
    const index = (sortedValues.length - 1) * p;
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    if (lower === upper) return sortedValues[lower];
    return (
      sortedValues[lower] +
      (sortedValues[upper] - sortedValues[lower]) * (index - lower)
    );
  };
  const lowerBound = getPercentile(0.05);
  const upperBound = getPercentile(0.95);

  if (lowerBound >= 0 || upperBound <= 0) {
    return scaleLinear<string>()
      .domain([lowerBound, upperBound])
      .range(colorsOnlyPositive)
      .clamp(true);
  }

  return scaleLinear<string>()
    .domain([lowerBound, 0, upperBound])
    .range(colorsMixed)
    .clamp(true);
}
/**
 * Calculates a color scale and corresponding colors for countries based on a selected metric.
 *
 * @param arrayData - The array of data objects, either `AsylumRequest[]` or `DashboardSummary[]`.
 * @param metricSelected - The key of the metric to use for color calculation.
 * @param directionSelected - (Optional) The direction filter to apply, if any.
 * @param countrySelected - (Optional) The country filter to apply, if any.
 * @returns An object containing the D3 color scale and a mapping of colors for each entry.
 *
 * @remarks
 * - Filters out invalid entries from the data array.
 * - Determines the min and max values for the selected metric to create a linear color scale.
 * - Uses the scale to assign colors to each entry based on its metric value.
 * - Returns an empty object if no valid values are found.
 */




export const useCountryColor = ({
  arrayData,
  metricSelected,
  directionSelected,
  countrySelected,
  colorsOnlyPositive = ["#00478f", "#a8e600"],
  colorsMixed = ["#00478f", "#52cccc9c", "#a8e600"]
}: {
  arrayData: AsylumRequest[] | AsylumDecision[] | DashboardSummary[];
  metricSelected: keyof AsylumRequest
    | keyof DashboardSummary
    | keyof AsylumDecision;
  directionSelected?: string;
  countrySelected?: string;
  colorsOnlyPositive?: string[];
  colorsMixed?: string[];
}) => {
  return useMemo(() => {
    if (arrayData.length === 0) return {};

    const entries = arrayData.filter(Boolean);

    let values: number[] = [];

    if (isAsylumRequestArray(entries)) {
      values = entries
        .map((element) => element[metricSelected as keyof AsylumRequest])
        .filter((value): value is number => typeof value === "number");
    } else if (isAsylumDecisionArray(entries)) {
      values = entries
        .filter((element): element is AsylumDecision => "countryIso" in element)
        .map((element) => element[metricSelected as keyof AsylumDecision])
        .filter((value): value is number => typeof value === "number");
    } else {
      values = entries
        .filter(
          (element): element is DashboardSummary => "countryIso" in element
        )
        .map((element) => element[metricSelected as keyof DashboardSummary])
        .filter((value): value is number => typeof value === "number");
    }
    if (values.length === 0) return {};

    const scale = calculateScale(values,       colorsOnlyPositive,
      colorsMixed);
    const colors = calculateColorReturningValue(
      scale,
      entries,
      metricSelected,
      directionSelected,
      countrySelected,

    );

    return { scale, colors };
  }, [arrayData, metricSelected, directionSelected, countrySelected, colorsOnlyPositive, colorsMixed]);
};


export const useCountryColorForPercentage = ({
  arrayData,
  metricSelected,
  directionSelected,
  countrySelected,
  colorsOnlyPositive = ["#00478f", "#a8e600"],
}: {
  arrayData: AsylumRequest[] | AsylumDecision[] | DashboardSummary[];
  metricSelected: keyof AsylumRequest
    | keyof DashboardSummary
    | keyof AsylumDecision;
  directionSelected?: string;
  countrySelected?: string;
  colorsOnlyPositive?: string[];
}) => {
  return useMemo(() => {
    if (arrayData.length === 0) return {};

    const entries = arrayData.filter(Boolean);

    let values: number[] = [];

    if (isAsylumRequestArray(entries)) {
      values = entries
        .map((element) => element[metricSelected as keyof AsylumRequest])
        .filter((value): value is number => typeof value === "number");
    } else if (isAsylumDecisionArray(entries)) {
      values = entries
        .filter((element): element is AsylumDecision => "countryIso" in element)
        .map((element) => element[metricSelected as keyof AsylumDecision])
        .filter((value): value is number => typeof value === "number");
    } else {
      values = entries
        .filter(
          (element): element is DashboardSummary => "countryIso" in element
        )
        .map((element) => element[metricSelected as keyof DashboardSummary])
        .filter((value): value is number => typeof value === "number");
    }
    if (values.length === 0) return {};

    const scale = scaleLinear<string>()
      .domain([0, 1])
      .range(colorsOnlyPositive)
      .clamp(true);

    const colors = calculateColorReturningValue(
      scale,
      entries,
      metricSelected,
      directionSelected,
      countrySelected,

    );

    return { scale, colors };
  }, [arrayData, metricSelected, directionSelected, countrySelected, colorsOnlyPositive]);
};
import type { AsylumDecision, AsylumRequest, DashboardSummary } from "@/gql/graphql";

export type Props = {
  centroids: Record<string, [number, number]>;
  arrayData: (AsylumRequest | AsylumDecision | DashboardSummary)[];
  originOrAsylum?: string;
  metricSelected: keyof AsylumRequest | keyof AsylumDecision | keyof DashboardSummary;
  setToggleInfo?: (value: boolean) => void;
  setToggleCountry?: (value: string) => void;
};

import type { DashboardSummary } from "@/gql/graphql";

export type Props = {
  dashboardKeySelection: keyof DashboardSummary;
  centroids: Record<string, [number, number]>;
  dashboardSummariesByYear: (DashboardSummary | null)[];
  setCountrySelected: (value: string) => void;
  setOpenCountryInfo: (value: boolean) => void;
};

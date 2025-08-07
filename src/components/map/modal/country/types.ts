import type { AsylumDecision, DashboardSummary } from "@/gql/graphql";

export type Props = {
  setOpenModal: (value: boolean) => void;
  countryInfo: DashboardSummary | AsylumDecision;
  optionsToDisplay: { label: string; value: keyof DashboardSummary }[] | { label: string; value: keyof AsylumDecision }[];
};

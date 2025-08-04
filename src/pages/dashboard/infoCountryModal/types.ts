import type { DashboardSummary } from "@/gql/graphql";

export type Props = {
  setOpenModal: (value: boolean) => void;
  countryInfo: DashboardSummary;
};

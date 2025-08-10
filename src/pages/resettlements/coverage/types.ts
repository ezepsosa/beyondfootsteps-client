import type { ResettlementSummaryGrouped } from "@/gql/graphql";

export type Props = {
  topCoverage: ResettlementSummaryGrouped[];
  width?: number;
  height?: number;
};

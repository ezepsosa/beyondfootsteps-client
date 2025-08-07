import type { AsylumDecision } from "@/gql/graphql";

export type Props = {
  centroids: Record<string, [number, number]>;
  asylumDecisions: AsylumDecision[];
  originOrAsylum: string;
  metricSelected: keyof AsylumDecision;
};

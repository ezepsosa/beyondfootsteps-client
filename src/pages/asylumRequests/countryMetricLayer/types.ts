import type { AsylumRequest } from "@/gql/graphql";

export type Props = {
  centroids: Record<string, [number, number]>;
  asylumRequests: (AsylumRequest | null)[];
  originOrAsylum: string;
};

export type Props = {
  topCoverage: {
    id: string;
    countryOfAsylumIso: string | null;
    countryOfAsylum: string | null;
    coverageRate: number | null;
    totalNeeds: number | null;
    submissionsTotal: number | null;
    departuresTotal: number | null;
    realizationRate: number | null;
  }[];
  width?: number;
  height?: number;
};

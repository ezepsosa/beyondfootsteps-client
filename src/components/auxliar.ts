export const INDICATOR_INFO: Record<string, string> = {
  coverageRate:
    "Coverage Rate: the percentage of people identified as being in need of protection or assistance who actually received it. High values indicate strong humanitarian reach or resource availability. Formula: (people assisted ÷ people in need) × 100.",

  appliedPer100k:
    "Applied per 100k: number of new asylum applications submitted during the year per 100,000 inhabitants of the country of asylum. Useful to assess relative pressure on national asylum systems. Formula: (new applications ÷ total population) × 100,000.",

  acceptanceRate:
    "Acceptance Rate: proportion of asylum decisions that resulted in refugee status or subsidiary protection. A higher value suggests more favorable recognition policies or stronger protection cases. Formula: (positive decisions ÷ total substantive decisions) × 100.",

  internalDisplacementTotal:
    "Internal Displacement: total number of individuals forcibly displaced within their own country due to conflict, violence, or disasters. A high value often reflects ongoing instability or climate-related emergencies.",

  displacementRatePer100k:
    "Displacement Rate per 100k: internally displaced persons (IDPs) relative to the national population, enabling meaningful comparisons across countries of different sizes. Formula: (IDPs ÷ total population) × 100,000.",

  idpReturnees:
    "IDP Returnees: number of internally displaced people who returned to their area of origin during the reporting year. Higher values may suggest improved security conditions or reintegration policies.",

  refugeesReturnees:
    "Refugee Returnees: individuals who were previously refugees and voluntarily returned to their country of origin. This may indicate stabilization or peace processes in those countries.",

  naturalizationsTotal:
    "Naturalizations Total: people of concern (refugees, stateless persons, etc.) who acquired citizenship in the host country during the period. Often linked to long-term integration strategies.",

  naturalizationChange:
    "Naturalization Change: change in the number of naturalizations compared to the previous year, either in absolute or percentage terms. Sudden increases or decreases can signal policy shifts or administrative changes.",

  resettlementRequests:
    "Resettlement Requests: number of individuals referred by UNHCR or partners for possible resettlement to a third country. Reflects demand or prioritization of durable solutions.",

  resettlementDepartures:
    "Resettlement Departures: people who were successfully transferred to a third country under a resettlement programme during the year. These reflect concrete resettlement outcomes.",

  resettlementSubmissions:
    "Resettlement Submissions: number of formal case files sent to receiving states for review. This is an intermediate step between requests and actual departures.",

  resettlementNeeds:
    "Resettlement Needs: estimated number of refugees requiring resettlement in a given year, based on UNHCR's global assessments. It reflects humanitarian gaps more than operational capacity.",

  resettlementGap:
    "Resettlement Gap: the difference between identified resettlement needs and the actual number of departures. A persistent gap may indicate lack of slots or political will.",

  requestVsNeedsRatio:
    "Request vs Needs Ratio: the proportion of resettlement requests relative to the total identified needs. Highlights how much of the need is actually being addressed through referrals. Formula: (requests ÷ needs) × 100.",

  submissionsEfficiency:
    "Submissions Efficiency: share of resettlement requests that were formalized and submitted to receiving countries. Indicates processing capacity and system efficiency. Formula: (submissions ÷ requests) × 100.",

  realizationRate:
    "Realization Rate: proportion of individuals who were resettled (departed) out of the total number submitted. Useful to assess conversion of intent into actual movement. Formula: (departures ÷ submissions) × 100.",
};
export const dashboardKeyOptions: {
  key: string;
  value: string;
}[] = [
  { key: "Coverage Rate", value: "coverageRate" },
  { key: "Applied per 100k", value: "appliedPer100k" },
  { key: "Acceptance Rate", value: "acceptanceRate" },
  { key: "Internal Displacement", value: "internalDisplacementTotal" },
  { key: "Displacement Rate per 100k", value: "displacementRatePer100k" },
  { key: "IDP Returnees", value: "idpReturnees" },
  { key: "Refugee Returnees", value: "refugeesReturnees" },
  { key: "Naturalizations Total", value: "naturalizationsTotal" },
  { key: "Naturalization Change", value: "naturalizationChange" },
  { key: "Resettlement Requests", value: "resettlementRequests" },
  { key: "Resettlement Departures", value: "resettlementDepartures" },
  { key: "Resettlement Submissions", value: "resettlementSubmissions" },
  { key: "Resettlement Needs", value: "resettlementNeeds" },
  { key: "Resettlement Gap", value: "resettlementGap" },
  { key: "Request vs Needs Ratio", value: "requestVsNeedsRatio" },
  { key: "Submissions Efficiency", value: "submissionsEfficiency" },
  { key: "Realization Rate", value: "realizationRate" },
];

export const asylumDecisionKeyOptions: {
  key: string;
  value: string
}[] = [
  { key: "acceptanceRate", value: "Acceptance Rate" },
  { key: "decClosed", value: "Decision Closed" },
  { key: "decOther", value: "Decision Other" },
  { key: "decRecognized", value: "Decision Recognized" },
  { key: "decRejected", value: "Decision Rejected" },
  { key: "decTotal", value: "Decision Total" },
];
export const dashboardYearOptions: { key: number; value: string }[] = [
  { key: 2024, value: "2024" },
  { key: 2023, value: "2023" },
  { key: 2022, value: "2022" },
  { key: 2021, value: "2021" },
  { key: 2020, value: "2020" },
];

export function humanize(n: number, decimals = 2): string {
  const abs = Math.abs(n);

  if (abs >= 1_000_000) return (n / 1_000_000).toFixed(decimals) + " M";
  if (abs >= 1_000) return (n / 1_000).toFixed(decimals) + " k";
  if (abs < 1e-3 && n !== 0) return n.toExponential(decimals);

  return n.toLocaleString("es-ES", { maximumFractionDigits: decimals });
}

export function roundTwoDigits(number: number): number {
  if (number === 0) return 0;
  const cifras = Math.floor(Math.log10(Math.abs(number))) - 1;
  const factor = Math.pow(10, cifras);
  const redondeado = Math.round(number / factor) * factor;
  return +redondeado.toPrecision(10).replace(/\.?0+$/, "");
}

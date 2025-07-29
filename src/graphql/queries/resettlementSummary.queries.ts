import { gql } from "@apollo/client";

export const GET_ALL_RESETTLEMENT_SUMMARIES = gql`
  query getResettlementSummaries {
    resettlementSummaries {
      id
      year
      countryIso
      totalRequests
      totalDepartures
      totalSubmissions
      totalNeeds
      totalGaps
      coverageRate
      requestVsNeedsRatio
      submissionsEfficiency
      realizationRate
    }
  }
`;

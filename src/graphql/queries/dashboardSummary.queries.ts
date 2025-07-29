import { gql } from "@apollo/client";

export const GET_ALL_DASHBOARD_SUMMARIES = gql`
  query getDashboardSummary {
    dashboardSummaries {
      id
      year
      countryIso
      totalApplied
      appliedPer100k
      acceptanceRate
      internalDisplacementTotal
      displacementRatePer100k
      idpReturnees
      refugeesReturnees
      naturalizationsTotal
      naturalizationChange
      resettlementRequests
      resettlementDepartures
      resettlementSubmissions
      resettlementNeeds
      resettlementGap
      coverageRate
      requestVsNeedsRatio
      submissionsEfficiency
      realizationRate
    }
  }
`;

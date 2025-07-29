import { gql } from "@apollo/client";

export const GET_ALL_ASYLUM_DECISIONS = gql`
  query getAsylumDecisions {
    asylumDecisions {
      id
      year
      countryOfOrigin
      countryOfOriginIso
      countryOfAsylum
      countryOfAsylumIso
      decRecognized
      decOther
      decRejected
      decClosed
      decTotal
      acceptanceRate
      intakeDate
    }
  }
`;

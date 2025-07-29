import { gql } from "@apollo/client";

export const GET_ALL_ASYLUM_REQUESTS = gql`
  query getAsylumRequests {
    asylumRequests {
      id
      year
      countryOfOrigin
      countryOfOriginIso
      countryOfAsylum
      countryOfAsylumIso
      appliedPer100k
      applied
    }
  }
`;

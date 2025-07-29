import { gql } from "@apollo/client";

export const GET_ALL_IDP_RETURNEES = gql`
  query getAllIdpReturnees {
    idpReturnees {
      id
      year
      countryOfOriginIso
      countryOfOrigin
      idpReturneesNumber
      refugeesReturnees
      byDate
    }
  }
`;

import { gql } from "@apollo/client";

export const GET_ALL_IDP_DISPLACEMENTS = gql`
  query getAllIdpDisplacements {
    idpDisplacements {
      id
      year
      countryOfOrigin
      countryOfOriginIso
      displacementRatePer100k
      total
    }
  }
`;

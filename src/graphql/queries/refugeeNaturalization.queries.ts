import { gql } from "@apollo/client";

export const GET_ALL_REFUGEE_NATURALIZATIONS = gql`
  query getAllRefugeeNaturalization {
    refugeeNaturalizations {
      id
      year
      countryOfOrigin
      countryOfOriginIso
      countryOfAsylum
      countryOfAsylumIso
      total
      intakeDate
      naturalizationChange
    }
  }
`;

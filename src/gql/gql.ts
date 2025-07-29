/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query GetAsylumDecisions {\n  asylumDecisions {\n    id\n    year\n    countryOfOrigin\n    countryOfOriginIso\n    countryOfAsylum\n    countryOfAsylumIso\n    decRecognized\n    decOther\n    decRejected\n    decClosed\n    decTotal\n    acceptanceRate\n    intakeDate\n  }\n}": typeof types.GetAsylumDecisionsDocument,
    "query GetAsylumRequests {\n  asylumRequests {\n    id\n    year\n    countryOfOrigin\n    countryOfOriginIso\n    countryOfAsylum\n    countryOfAsylumIso\n    appliedPer100k\n    applied\n  }\n}": typeof types.GetAsylumRequestsDocument,
    "query GetDashboardSummary {\n  dashboardSummaries {\n    id\n    year\n    countryIso\n    totalApplied\n    appliedPer100k\n    acceptanceRate\n    internalDisplacementTotal\n    displacementRatePer100k\n    idpReturnees\n    refugeesReturnees\n    naturalizationsTotal\n    naturalizationChange\n    resettlementRequests\n    resettlementDepartures\n    resettlementSubmissions\n    resettlementNeeds\n    resettlementGap\n    coverageRate\n    requestVsNeedsRatio\n    submissionsEfficiency\n    realizationRate\n  }\n}": typeof types.GetDashboardSummaryDocument,
    "query GetAllIdpDisplacements {\n  idpDisplacements {\n    id\n    year\n    countryOfOrigin\n    countryOfOriginIso\n    displacementRatePer100k\n    total\n  }\n}": typeof types.GetAllIdpDisplacementsDocument,
    "query GetAllIdpReturnees {\n  idpReturnees {\n    id\n    year\n    countryOfOriginIso\n    countryOfOrigin\n    idpReturneesNumber\n    refugeesReturnees\n    byDate\n  }\n}": typeof types.GetAllIdpReturneesDocument,
    "query GetAllRefugeeNaturalization {\n  refugeeNaturalizations {\n    id\n    year\n    countryOfOrigin\n    countryOfOriginIso\n    countryOfAsylum\n    countryOfAsylumIso\n    total\n    intakeDate\n    naturalizationChange\n  }\n}": typeof types.GetAllRefugeeNaturalizationDocument,
    "query GetResettlementSummaries {\n  resettlementSummaries {\n    id\n    year\n    countryIso\n    totalRequests\n    totalDepartures\n    totalSubmissions\n    totalNeeds\n    totalGaps\n    coverageRate\n    requestVsNeedsRatio\n    submissionsEfficiency\n    realizationRate\n  }\n}": typeof types.GetResettlementSummariesDocument,
};
const documents: Documents = {
    "query GetAsylumDecisions {\n  asylumDecisions {\n    id\n    year\n    countryOfOrigin\n    countryOfOriginIso\n    countryOfAsylum\n    countryOfAsylumIso\n    decRecognized\n    decOther\n    decRejected\n    decClosed\n    decTotal\n    acceptanceRate\n    intakeDate\n  }\n}": types.GetAsylumDecisionsDocument,
    "query GetAsylumRequests {\n  asylumRequests {\n    id\n    year\n    countryOfOrigin\n    countryOfOriginIso\n    countryOfAsylum\n    countryOfAsylumIso\n    appliedPer100k\n    applied\n  }\n}": types.GetAsylumRequestsDocument,
    "query GetDashboardSummary {\n  dashboardSummaries {\n    id\n    year\n    countryIso\n    totalApplied\n    appliedPer100k\n    acceptanceRate\n    internalDisplacementTotal\n    displacementRatePer100k\n    idpReturnees\n    refugeesReturnees\n    naturalizationsTotal\n    naturalizationChange\n    resettlementRequests\n    resettlementDepartures\n    resettlementSubmissions\n    resettlementNeeds\n    resettlementGap\n    coverageRate\n    requestVsNeedsRatio\n    submissionsEfficiency\n    realizationRate\n  }\n}": types.GetDashboardSummaryDocument,
    "query GetAllIdpDisplacements {\n  idpDisplacements {\n    id\n    year\n    countryOfOrigin\n    countryOfOriginIso\n    displacementRatePer100k\n    total\n  }\n}": types.GetAllIdpDisplacementsDocument,
    "query GetAllIdpReturnees {\n  idpReturnees {\n    id\n    year\n    countryOfOriginIso\n    countryOfOrigin\n    idpReturneesNumber\n    refugeesReturnees\n    byDate\n  }\n}": types.GetAllIdpReturneesDocument,
    "query GetAllRefugeeNaturalization {\n  refugeeNaturalizations {\n    id\n    year\n    countryOfOrigin\n    countryOfOriginIso\n    countryOfAsylum\n    countryOfAsylumIso\n    total\n    intakeDate\n    naturalizationChange\n  }\n}": types.GetAllRefugeeNaturalizationDocument,
    "query GetResettlementSummaries {\n  resettlementSummaries {\n    id\n    year\n    countryIso\n    totalRequests\n    totalDepartures\n    totalSubmissions\n    totalNeeds\n    totalGaps\n    coverageRate\n    requestVsNeedsRatio\n    submissionsEfficiency\n    realizationRate\n  }\n}": types.GetResettlementSummariesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAsylumDecisions {\n  asylumDecisions {\n    id\n    year\n    countryOfOrigin\n    countryOfOriginIso\n    countryOfAsylum\n    countryOfAsylumIso\n    decRecognized\n    decOther\n    decRejected\n    decClosed\n    decTotal\n    acceptanceRate\n    intakeDate\n  }\n}"): (typeof documents)["query GetAsylumDecisions {\n  asylumDecisions {\n    id\n    year\n    countryOfOrigin\n    countryOfOriginIso\n    countryOfAsylum\n    countryOfAsylumIso\n    decRecognized\n    decOther\n    decRejected\n    decClosed\n    decTotal\n    acceptanceRate\n    intakeDate\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAsylumRequests {\n  asylumRequests {\n    id\n    year\n    countryOfOrigin\n    countryOfOriginIso\n    countryOfAsylum\n    countryOfAsylumIso\n    appliedPer100k\n    applied\n  }\n}"): (typeof documents)["query GetAsylumRequests {\n  asylumRequests {\n    id\n    year\n    countryOfOrigin\n    countryOfOriginIso\n    countryOfAsylum\n    countryOfAsylumIso\n    appliedPer100k\n    applied\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetDashboardSummary {\n  dashboardSummaries {\n    id\n    year\n    countryIso\n    totalApplied\n    appliedPer100k\n    acceptanceRate\n    internalDisplacementTotal\n    displacementRatePer100k\n    idpReturnees\n    refugeesReturnees\n    naturalizationsTotal\n    naturalizationChange\n    resettlementRequests\n    resettlementDepartures\n    resettlementSubmissions\n    resettlementNeeds\n    resettlementGap\n    coverageRate\n    requestVsNeedsRatio\n    submissionsEfficiency\n    realizationRate\n  }\n}"): (typeof documents)["query GetDashboardSummary {\n  dashboardSummaries {\n    id\n    year\n    countryIso\n    totalApplied\n    appliedPer100k\n    acceptanceRate\n    internalDisplacementTotal\n    displacementRatePer100k\n    idpReturnees\n    refugeesReturnees\n    naturalizationsTotal\n    naturalizationChange\n    resettlementRequests\n    resettlementDepartures\n    resettlementSubmissions\n    resettlementNeeds\n    resettlementGap\n    coverageRate\n    requestVsNeedsRatio\n    submissionsEfficiency\n    realizationRate\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAllIdpDisplacements {\n  idpDisplacements {\n    id\n    year\n    countryOfOrigin\n    countryOfOriginIso\n    displacementRatePer100k\n    total\n  }\n}"): (typeof documents)["query GetAllIdpDisplacements {\n  idpDisplacements {\n    id\n    year\n    countryOfOrigin\n    countryOfOriginIso\n    displacementRatePer100k\n    total\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAllIdpReturnees {\n  idpReturnees {\n    id\n    year\n    countryOfOriginIso\n    countryOfOrigin\n    idpReturneesNumber\n    refugeesReturnees\n    byDate\n  }\n}"): (typeof documents)["query GetAllIdpReturnees {\n  idpReturnees {\n    id\n    year\n    countryOfOriginIso\n    countryOfOrigin\n    idpReturneesNumber\n    refugeesReturnees\n    byDate\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAllRefugeeNaturalization {\n  refugeeNaturalizations {\n    id\n    year\n    countryOfOrigin\n    countryOfOriginIso\n    countryOfAsylum\n    countryOfAsylumIso\n    total\n    intakeDate\n    naturalizationChange\n  }\n}"): (typeof documents)["query GetAllRefugeeNaturalization {\n  refugeeNaturalizations {\n    id\n    year\n    countryOfOrigin\n    countryOfOriginIso\n    countryOfAsylum\n    countryOfAsylumIso\n    total\n    intakeDate\n    naturalizationChange\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetResettlementSummaries {\n  resettlementSummaries {\n    id\n    year\n    countryIso\n    totalRequests\n    totalDepartures\n    totalSubmissions\n    totalNeeds\n    totalGaps\n    coverageRate\n    requestVsNeedsRatio\n    submissionsEfficiency\n    realizationRate\n  }\n}"): (typeof documents)["query GetResettlementSummaries {\n  resettlementSummaries {\n    id\n    year\n    countryIso\n    totalRequests\n    totalDepartures\n    totalSubmissions\n    totalNeeds\n    totalGaps\n    coverageRate\n    requestVsNeedsRatio\n    submissionsEfficiency\n    realizationRate\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
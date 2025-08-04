import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AsylumDecision = {
  __typename?: 'AsylumDecision';
  acceptanceRate?: Maybe<Scalars['Float']['output']>;
  countryOfAsylum?: Maybe<Scalars['String']['output']>;
  countryOfAsylumIso?: Maybe<Scalars['String']['output']>;
  countryOfOrigin?: Maybe<Scalars['String']['output']>;
  countryOfOriginIso?: Maybe<Scalars['String']['output']>;
  decClosed?: Maybe<Scalars['Int']['output']>;
  decOther?: Maybe<Scalars['Int']['output']>;
  decRecognized?: Maybe<Scalars['Int']['output']>;
  decRejected?: Maybe<Scalars['Int']['output']>;
  decTotal?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  intakeDate?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type AsylumRequest = {
  __typename?: 'AsylumRequest';
  applied?: Maybe<Scalars['Int']['output']>;
  appliedPer100k?: Maybe<Scalars['Float']['output']>;
  countryOfAsylum?: Maybe<Scalars['String']['output']>;
  countryOfAsylumIso?: Maybe<Scalars['String']['output']>;
  countryOfOrigin?: Maybe<Scalars['String']['output']>;
  countryOfOriginIso?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  year?: Maybe<Scalars['Int']['output']>;
};

export type DashboardSummary = {
  __typename?: 'DashboardSummary';
  acceptanceRate?: Maybe<Scalars['Float']['output']>;
  appliedPer100k?: Maybe<Scalars['Float']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  countryIso?: Maybe<Scalars['String']['output']>;
  coverageRate?: Maybe<Scalars['Float']['output']>;
  displacementRatePer100k?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  idpReturnees?: Maybe<Scalars['Int']['output']>;
  internalDisplacementTotal?: Maybe<Scalars['Int']['output']>;
  naturalizationChange?: Maybe<Scalars['Float']['output']>;
  naturalizationsTotal?: Maybe<Scalars['Int']['output']>;
  realizationRate?: Maybe<Scalars['Float']['output']>;
  refugeesReturnees?: Maybe<Scalars['Int']['output']>;
  requestVsNeedsRatio?: Maybe<Scalars['Float']['output']>;
  resettlementDepartures?: Maybe<Scalars['Int']['output']>;
  resettlementGap?: Maybe<Scalars['Float']['output']>;
  resettlementNeeds?: Maybe<Scalars['Int']['output']>;
  resettlementRequests?: Maybe<Scalars['Int']['output']>;
  resettlementSubmissions?: Maybe<Scalars['Int']['output']>;
  submissionsEfficiency?: Maybe<Scalars['Float']['output']>;
  totalApplied?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type IdpDisplacement = {
  __typename?: 'IdpDisplacement';
  countryOfOrigin?: Maybe<Scalars['String']['output']>;
  countryOfOriginIso?: Maybe<Scalars['String']['output']>;
  displacementRatePer100k?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  total?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type IdpReturnees = {
  __typename?: 'IdpReturnees';
  byDate?: Maybe<Scalars['String']['output']>;
  countryOfOrigin?: Maybe<Scalars['String']['output']>;
  countryOfOriginIso?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  idpReturneesNumber?: Maybe<Scalars['Int']['output']>;
  refugeesReturnees?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  asylumDecisions?: Maybe<Array<Maybe<AsylumDecision>>>;
  asylumRequests?: Maybe<Array<Maybe<AsylumRequest>>>;
  asylumRequestsByYearAndCountry?: Maybe<Array<Maybe<AsylumRequest>>>;
  dashboardSummaries?: Maybe<Array<Maybe<DashboardSummary>>>;
  /**  Queries with filters */
  dashboardSummariesByYear?: Maybe<Array<Maybe<DashboardSummary>>>;
  idpDisplacements?: Maybe<Array<Maybe<IdpDisplacement>>>;
  idpReturnees?: Maybe<Array<Maybe<IdpReturnees>>>;
  refugeeNaturalizations?: Maybe<Array<Maybe<RefugeeNaturalization>>>;
  resettlementSummaries?: Maybe<Array<Maybe<ResettlementSummary>>>;
};


export type QueryAsylumRequestsByYearAndCountryArgs = {
  countryOfAsylumIso?: InputMaybe<Scalars['String']['input']>;
  countryOfOriginIso?: InputMaybe<Scalars['String']['input']>;
  year: Scalars['Int']['input'];
};


export type QueryDashboardSummariesByYearArgs = {
  year: Scalars['Int']['input'];
};

export type RefugeeNaturalization = {
  __typename?: 'RefugeeNaturalization';
  countryOfAsylum?: Maybe<Scalars['String']['output']>;
  countryOfAsylumIso?: Maybe<Scalars['String']['output']>;
  countryOfOrigin?: Maybe<Scalars['String']['output']>;
  countryOfOriginIso?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  intakeDate?: Maybe<Scalars['Int']['output']>;
  naturalizationChange?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type ResettlementSummary = {
  __typename?: 'ResettlementSummary';
  countryIso?: Maybe<Scalars['String']['output']>;
  coverageRate?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  realizationRate?: Maybe<Scalars['Float']['output']>;
  requestVsNeedsRatio?: Maybe<Scalars['Float']['output']>;
  submissionsEfficiency?: Maybe<Scalars['Float']['output']>;
  totalDepartures?: Maybe<Scalars['Int']['output']>;
  totalGaps?: Maybe<Scalars['Float']['output']>;
  totalNeeds?: Maybe<Scalars['Int']['output']>;
  totalRequests?: Maybe<Scalars['Int']['output']>;
  totalSubmissions?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type GetAsylumDecisionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAsylumDecisionsQuery = { __typename?: 'Query', asylumDecisions?: Array<{ __typename?: 'AsylumDecision', id: string, year?: number | null, countryOfOrigin?: string | null, countryOfOriginIso?: string | null, countryOfAsylum?: string | null, countryOfAsylumIso?: string | null, decRecognized?: number | null, decOther?: number | null, decRejected?: number | null, decClosed?: number | null, decTotal?: number | null, acceptanceRate?: number | null, intakeDate?: number | null } | null> | null };

export type GetAsylumRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAsylumRequestsQuery = { __typename?: 'Query', asylumRequests?: Array<{ __typename?: 'AsylumRequest', id: string, year?: number | null, countryOfOrigin?: string | null, countryOfOriginIso?: string | null, countryOfAsylum?: string | null, countryOfAsylumIso?: string | null, appliedPer100k?: number | null, applied?: number | null } | null> | null };

export type GetAsylumRequestsByYearAndCountryQueryVariables = Exact<{
  year: Scalars['Int']['input'];
  countryOfOriginIso?: InputMaybe<Scalars['String']['input']>;
  countryOfAsylumIso?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAsylumRequestsByYearAndCountryQuery = { __typename?: 'Query', asylumRequestsByYearAndCountry?: Array<{ __typename?: 'AsylumRequest', id: string, year?: number | null, countryOfOrigin?: string | null, countryOfOriginIso?: string | null, countryOfAsylum?: string | null, countryOfAsylumIso?: string | null, appliedPer100k?: number | null, applied?: number | null } | null> | null };

export type GetDashboardSummaryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDashboardSummaryQuery = { __typename?: 'Query', dashboardSummaries?: Array<{ __typename?: 'DashboardSummary', id: string, year?: number | null, countryIso?: string | null, country?: string | null, totalApplied?: number | null, appliedPer100k?: number | null, acceptanceRate?: number | null, internalDisplacementTotal?: number | null, displacementRatePer100k?: number | null, idpReturnees?: number | null, refugeesReturnees?: number | null, naturalizationsTotal?: number | null, naturalizationChange?: number | null, resettlementRequests?: number | null, resettlementDepartures?: number | null, resettlementSubmissions?: number | null, resettlementNeeds?: number | null, resettlementGap?: number | null, coverageRate?: number | null, requestVsNeedsRatio?: number | null, submissionsEfficiency?: number | null, realizationRate?: number | null } | null> | null };

export type GetDashboardSummaryByYearQueryVariables = Exact<{
  year: Scalars['Int']['input'];
}>;


export type GetDashboardSummaryByYearQuery = { __typename?: 'Query', dashboardSummariesByYear?: Array<{ __typename?: 'DashboardSummary', id: string, year?: number | null, countryIso?: string | null, country?: string | null, totalApplied?: number | null, appliedPer100k?: number | null, acceptanceRate?: number | null, internalDisplacementTotal?: number | null, displacementRatePer100k?: number | null, idpReturnees?: number | null, refugeesReturnees?: number | null, naturalizationsTotal?: number | null, naturalizationChange?: number | null, resettlementRequests?: number | null, resettlementDepartures?: number | null, resettlementSubmissions?: number | null, resettlementNeeds?: number | null, resettlementGap?: number | null, coverageRate?: number | null, requestVsNeedsRatio?: number | null, submissionsEfficiency?: number | null, realizationRate?: number | null } | null> | null };

export type GetAllIdpDisplacementsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllIdpDisplacementsQuery = { __typename?: 'Query', idpDisplacements?: Array<{ __typename?: 'IdpDisplacement', id: string, year?: number | null, countryOfOrigin?: string | null, countryOfOriginIso?: string | null, displacementRatePer100k?: number | null, total?: number | null } | null> | null };

export type GetAllIdpReturneesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllIdpReturneesQuery = { __typename?: 'Query', idpReturnees?: Array<{ __typename?: 'IdpReturnees', id: string, year?: number | null, countryOfOriginIso?: string | null, countryOfOrigin?: string | null, idpReturneesNumber?: number | null, refugeesReturnees?: number | null, byDate?: string | null } | null> | null };

export type GetAllRefugeeNaturalizationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRefugeeNaturalizationQuery = { __typename?: 'Query', refugeeNaturalizations?: Array<{ __typename?: 'RefugeeNaturalization', id: string, year?: number | null, countryOfOrigin?: string | null, countryOfOriginIso?: string | null, countryOfAsylum?: string | null, countryOfAsylumIso?: string | null, total?: number | null, intakeDate?: number | null, naturalizationChange?: number | null } | null> | null };

export type GetResettlementSummariesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetResettlementSummariesQuery = { __typename?: 'Query', resettlementSummaries?: Array<{ __typename?: 'ResettlementSummary', id: string, year?: number | null, countryIso?: string | null, totalRequests?: number | null, totalDepartures?: number | null, totalSubmissions?: number | null, totalNeeds?: number | null, totalGaps?: number | null, coverageRate?: number | null, requestVsNeedsRatio?: number | null, submissionsEfficiency?: number | null, realizationRate?: number | null } | null> | null };


export const GetAsylumDecisionsDocument = gql`
    query GetAsylumDecisions {
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

/**
 * __useGetAsylumDecisionsQuery__
 *
 * To run a query within a React component, call `useGetAsylumDecisionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAsylumDecisionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAsylumDecisionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAsylumDecisionsQuery(baseOptions?: Apollo.QueryHookOptions<GetAsylumDecisionsQuery, GetAsylumDecisionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAsylumDecisionsQuery, GetAsylumDecisionsQueryVariables>(GetAsylumDecisionsDocument, options);
      }
export function useGetAsylumDecisionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAsylumDecisionsQuery, GetAsylumDecisionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAsylumDecisionsQuery, GetAsylumDecisionsQueryVariables>(GetAsylumDecisionsDocument, options);
        }
export function useGetAsylumDecisionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAsylumDecisionsQuery, GetAsylumDecisionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAsylumDecisionsQuery, GetAsylumDecisionsQueryVariables>(GetAsylumDecisionsDocument, options);
        }
export type GetAsylumDecisionsQueryHookResult = ReturnType<typeof useGetAsylumDecisionsQuery>;
export type GetAsylumDecisionsLazyQueryHookResult = ReturnType<typeof useGetAsylumDecisionsLazyQuery>;
export type GetAsylumDecisionsSuspenseQueryHookResult = ReturnType<typeof useGetAsylumDecisionsSuspenseQuery>;
export type GetAsylumDecisionsQueryResult = Apollo.QueryResult<GetAsylumDecisionsQuery, GetAsylumDecisionsQueryVariables>;
export const GetAsylumRequestsDocument = gql`
    query GetAsylumRequests {
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

/**
 * __useGetAsylumRequestsQuery__
 *
 * To run a query within a React component, call `useGetAsylumRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAsylumRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAsylumRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAsylumRequestsQuery(baseOptions?: Apollo.QueryHookOptions<GetAsylumRequestsQuery, GetAsylumRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAsylumRequestsQuery, GetAsylumRequestsQueryVariables>(GetAsylumRequestsDocument, options);
      }
export function useGetAsylumRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAsylumRequestsQuery, GetAsylumRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAsylumRequestsQuery, GetAsylumRequestsQueryVariables>(GetAsylumRequestsDocument, options);
        }
export function useGetAsylumRequestsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAsylumRequestsQuery, GetAsylumRequestsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAsylumRequestsQuery, GetAsylumRequestsQueryVariables>(GetAsylumRequestsDocument, options);
        }
export type GetAsylumRequestsQueryHookResult = ReturnType<typeof useGetAsylumRequestsQuery>;
export type GetAsylumRequestsLazyQueryHookResult = ReturnType<typeof useGetAsylumRequestsLazyQuery>;
export type GetAsylumRequestsSuspenseQueryHookResult = ReturnType<typeof useGetAsylumRequestsSuspenseQuery>;
export type GetAsylumRequestsQueryResult = Apollo.QueryResult<GetAsylumRequestsQuery, GetAsylumRequestsQueryVariables>;
export const GetAsylumRequestsByYearAndCountryDocument = gql`
    query GetAsylumRequestsByYearAndCountry($year: Int!, $countryOfOriginIso: String, $countryOfAsylumIso: String) {
  asylumRequestsByYearAndCountry(
    year: $year
    countryOfOriginIso: $countryOfOriginIso
    countryOfAsylumIso: $countryOfAsylumIso
  ) {
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

/**
 * __useGetAsylumRequestsByYearAndCountryQuery__
 *
 * To run a query within a React component, call `useGetAsylumRequestsByYearAndCountryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAsylumRequestsByYearAndCountryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAsylumRequestsByYearAndCountryQuery({
 *   variables: {
 *      year: // value for 'year'
 *      countryOfOriginIso: // value for 'countryOfOriginIso'
 *      countryOfAsylumIso: // value for 'countryOfAsylumIso'
 *   },
 * });
 */
export function useGetAsylumRequestsByYearAndCountryQuery(baseOptions: Apollo.QueryHookOptions<GetAsylumRequestsByYearAndCountryQuery, GetAsylumRequestsByYearAndCountryQueryVariables> & ({ variables: GetAsylumRequestsByYearAndCountryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAsylumRequestsByYearAndCountryQuery, GetAsylumRequestsByYearAndCountryQueryVariables>(GetAsylumRequestsByYearAndCountryDocument, options);
      }
export function useGetAsylumRequestsByYearAndCountryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAsylumRequestsByYearAndCountryQuery, GetAsylumRequestsByYearAndCountryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAsylumRequestsByYearAndCountryQuery, GetAsylumRequestsByYearAndCountryQueryVariables>(GetAsylumRequestsByYearAndCountryDocument, options);
        }
export function useGetAsylumRequestsByYearAndCountrySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAsylumRequestsByYearAndCountryQuery, GetAsylumRequestsByYearAndCountryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAsylumRequestsByYearAndCountryQuery, GetAsylumRequestsByYearAndCountryQueryVariables>(GetAsylumRequestsByYearAndCountryDocument, options);
        }
export type GetAsylumRequestsByYearAndCountryQueryHookResult = ReturnType<typeof useGetAsylumRequestsByYearAndCountryQuery>;
export type GetAsylumRequestsByYearAndCountryLazyQueryHookResult = ReturnType<typeof useGetAsylumRequestsByYearAndCountryLazyQuery>;
export type GetAsylumRequestsByYearAndCountrySuspenseQueryHookResult = ReturnType<typeof useGetAsylumRequestsByYearAndCountrySuspenseQuery>;
export type GetAsylumRequestsByYearAndCountryQueryResult = Apollo.QueryResult<GetAsylumRequestsByYearAndCountryQuery, GetAsylumRequestsByYearAndCountryQueryVariables>;
export const GetDashboardSummaryDocument = gql`
    query GetDashboardSummary {
  dashboardSummaries {
    id
    year
    countryIso
    country
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

/**
 * __useGetDashboardSummaryQuery__
 *
 * To run a query within a React component, call `useGetDashboardSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDashboardSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDashboardSummaryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDashboardSummaryQuery(baseOptions?: Apollo.QueryHookOptions<GetDashboardSummaryQuery, GetDashboardSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDashboardSummaryQuery, GetDashboardSummaryQueryVariables>(GetDashboardSummaryDocument, options);
      }
export function useGetDashboardSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDashboardSummaryQuery, GetDashboardSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDashboardSummaryQuery, GetDashboardSummaryQueryVariables>(GetDashboardSummaryDocument, options);
        }
export function useGetDashboardSummarySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDashboardSummaryQuery, GetDashboardSummaryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDashboardSummaryQuery, GetDashboardSummaryQueryVariables>(GetDashboardSummaryDocument, options);
        }
export type GetDashboardSummaryQueryHookResult = ReturnType<typeof useGetDashboardSummaryQuery>;
export type GetDashboardSummaryLazyQueryHookResult = ReturnType<typeof useGetDashboardSummaryLazyQuery>;
export type GetDashboardSummarySuspenseQueryHookResult = ReturnType<typeof useGetDashboardSummarySuspenseQuery>;
export type GetDashboardSummaryQueryResult = Apollo.QueryResult<GetDashboardSummaryQuery, GetDashboardSummaryQueryVariables>;
export const GetDashboardSummaryByYearDocument = gql`
    query GetDashboardSummaryByYear($year: Int!) {
  dashboardSummariesByYear(year: $year) {
    id
    year
    countryIso
    country
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

/**
 * __useGetDashboardSummaryByYearQuery__
 *
 * To run a query within a React component, call `useGetDashboardSummaryByYearQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDashboardSummaryByYearQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDashboardSummaryByYearQuery({
 *   variables: {
 *      year: // value for 'year'
 *   },
 * });
 */
export function useGetDashboardSummaryByYearQuery(baseOptions: Apollo.QueryHookOptions<GetDashboardSummaryByYearQuery, GetDashboardSummaryByYearQueryVariables> & ({ variables: GetDashboardSummaryByYearQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDashboardSummaryByYearQuery, GetDashboardSummaryByYearQueryVariables>(GetDashboardSummaryByYearDocument, options);
      }
export function useGetDashboardSummaryByYearLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDashboardSummaryByYearQuery, GetDashboardSummaryByYearQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDashboardSummaryByYearQuery, GetDashboardSummaryByYearQueryVariables>(GetDashboardSummaryByYearDocument, options);
        }
export function useGetDashboardSummaryByYearSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDashboardSummaryByYearQuery, GetDashboardSummaryByYearQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDashboardSummaryByYearQuery, GetDashboardSummaryByYearQueryVariables>(GetDashboardSummaryByYearDocument, options);
        }
export type GetDashboardSummaryByYearQueryHookResult = ReturnType<typeof useGetDashboardSummaryByYearQuery>;
export type GetDashboardSummaryByYearLazyQueryHookResult = ReturnType<typeof useGetDashboardSummaryByYearLazyQuery>;
export type GetDashboardSummaryByYearSuspenseQueryHookResult = ReturnType<typeof useGetDashboardSummaryByYearSuspenseQuery>;
export type GetDashboardSummaryByYearQueryResult = Apollo.QueryResult<GetDashboardSummaryByYearQuery, GetDashboardSummaryByYearQueryVariables>;
export const GetAllIdpDisplacementsDocument = gql`
    query GetAllIdpDisplacements {
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

/**
 * __useGetAllIdpDisplacementsQuery__
 *
 * To run a query within a React component, call `useGetAllIdpDisplacementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllIdpDisplacementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllIdpDisplacementsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllIdpDisplacementsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllIdpDisplacementsQuery, GetAllIdpDisplacementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllIdpDisplacementsQuery, GetAllIdpDisplacementsQueryVariables>(GetAllIdpDisplacementsDocument, options);
      }
export function useGetAllIdpDisplacementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllIdpDisplacementsQuery, GetAllIdpDisplacementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllIdpDisplacementsQuery, GetAllIdpDisplacementsQueryVariables>(GetAllIdpDisplacementsDocument, options);
        }
export function useGetAllIdpDisplacementsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllIdpDisplacementsQuery, GetAllIdpDisplacementsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllIdpDisplacementsQuery, GetAllIdpDisplacementsQueryVariables>(GetAllIdpDisplacementsDocument, options);
        }
export type GetAllIdpDisplacementsQueryHookResult = ReturnType<typeof useGetAllIdpDisplacementsQuery>;
export type GetAllIdpDisplacementsLazyQueryHookResult = ReturnType<typeof useGetAllIdpDisplacementsLazyQuery>;
export type GetAllIdpDisplacementsSuspenseQueryHookResult = ReturnType<typeof useGetAllIdpDisplacementsSuspenseQuery>;
export type GetAllIdpDisplacementsQueryResult = Apollo.QueryResult<GetAllIdpDisplacementsQuery, GetAllIdpDisplacementsQueryVariables>;
export const GetAllIdpReturneesDocument = gql`
    query GetAllIdpReturnees {
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

/**
 * __useGetAllIdpReturneesQuery__
 *
 * To run a query within a React component, call `useGetAllIdpReturneesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllIdpReturneesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllIdpReturneesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllIdpReturneesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllIdpReturneesQuery, GetAllIdpReturneesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllIdpReturneesQuery, GetAllIdpReturneesQueryVariables>(GetAllIdpReturneesDocument, options);
      }
export function useGetAllIdpReturneesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllIdpReturneesQuery, GetAllIdpReturneesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllIdpReturneesQuery, GetAllIdpReturneesQueryVariables>(GetAllIdpReturneesDocument, options);
        }
export function useGetAllIdpReturneesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllIdpReturneesQuery, GetAllIdpReturneesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllIdpReturneesQuery, GetAllIdpReturneesQueryVariables>(GetAllIdpReturneesDocument, options);
        }
export type GetAllIdpReturneesQueryHookResult = ReturnType<typeof useGetAllIdpReturneesQuery>;
export type GetAllIdpReturneesLazyQueryHookResult = ReturnType<typeof useGetAllIdpReturneesLazyQuery>;
export type GetAllIdpReturneesSuspenseQueryHookResult = ReturnType<typeof useGetAllIdpReturneesSuspenseQuery>;
export type GetAllIdpReturneesQueryResult = Apollo.QueryResult<GetAllIdpReturneesQuery, GetAllIdpReturneesQueryVariables>;
export const GetAllRefugeeNaturalizationDocument = gql`
    query GetAllRefugeeNaturalization {
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

/**
 * __useGetAllRefugeeNaturalizationQuery__
 *
 * To run a query within a React component, call `useGetAllRefugeeNaturalizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRefugeeNaturalizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRefugeeNaturalizationQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllRefugeeNaturalizationQuery(baseOptions?: Apollo.QueryHookOptions<GetAllRefugeeNaturalizationQuery, GetAllRefugeeNaturalizationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllRefugeeNaturalizationQuery, GetAllRefugeeNaturalizationQueryVariables>(GetAllRefugeeNaturalizationDocument, options);
      }
export function useGetAllRefugeeNaturalizationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllRefugeeNaturalizationQuery, GetAllRefugeeNaturalizationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllRefugeeNaturalizationQuery, GetAllRefugeeNaturalizationQueryVariables>(GetAllRefugeeNaturalizationDocument, options);
        }
export function useGetAllRefugeeNaturalizationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllRefugeeNaturalizationQuery, GetAllRefugeeNaturalizationQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllRefugeeNaturalizationQuery, GetAllRefugeeNaturalizationQueryVariables>(GetAllRefugeeNaturalizationDocument, options);
        }
export type GetAllRefugeeNaturalizationQueryHookResult = ReturnType<typeof useGetAllRefugeeNaturalizationQuery>;
export type GetAllRefugeeNaturalizationLazyQueryHookResult = ReturnType<typeof useGetAllRefugeeNaturalizationLazyQuery>;
export type GetAllRefugeeNaturalizationSuspenseQueryHookResult = ReturnType<typeof useGetAllRefugeeNaturalizationSuspenseQuery>;
export type GetAllRefugeeNaturalizationQueryResult = Apollo.QueryResult<GetAllRefugeeNaturalizationQuery, GetAllRefugeeNaturalizationQueryVariables>;
export const GetResettlementSummariesDocument = gql`
    query GetResettlementSummaries {
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

/**
 * __useGetResettlementSummariesQuery__
 *
 * To run a query within a React component, call `useGetResettlementSummariesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetResettlementSummariesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetResettlementSummariesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetResettlementSummariesQuery(baseOptions?: Apollo.QueryHookOptions<GetResettlementSummariesQuery, GetResettlementSummariesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetResettlementSummariesQuery, GetResettlementSummariesQueryVariables>(GetResettlementSummariesDocument, options);
      }
export function useGetResettlementSummariesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetResettlementSummariesQuery, GetResettlementSummariesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetResettlementSummariesQuery, GetResettlementSummariesQueryVariables>(GetResettlementSummariesDocument, options);
        }
export function useGetResettlementSummariesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetResettlementSummariesQuery, GetResettlementSummariesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetResettlementSummariesQuery, GetResettlementSummariesQueryVariables>(GetResettlementSummariesDocument, options);
        }
export type GetResettlementSummariesQueryHookResult = ReturnType<typeof useGetResettlementSummariesQuery>;
export type GetResettlementSummariesLazyQueryHookResult = ReturnType<typeof useGetResettlementSummariesLazyQuery>;
export type GetResettlementSummariesSuspenseQueryHookResult = ReturnType<typeof useGetResettlementSummariesSuspenseQuery>;
export type GetResettlementSummariesQueryResult = Apollo.QueryResult<GetResettlementSummariesQuery, GetResettlementSummariesQueryVariables>;
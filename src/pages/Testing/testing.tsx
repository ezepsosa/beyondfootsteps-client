import { useGetAsylumDecisionsQuery } from "../../gql/graphql";




export function TestingComponent(){
  const {loading, error, data} = useGetAsylumDecisionsQuery();
  console.log(data)
  if(loading) return <p>Loading</p>
  if(error) return <p>{error.message}</p>

  // Tipado automático:
  const decisions = data?.asylumDecisions ?? [];

  return (
    <ul>
      {decisions.map((decision) => (
        <li key={decision?.id}>
          {decision?.year} — {decision?.countryOfOrigin} → {decision?.decTotal ?? 0}
        </li>
      ))}
    </ul>
  );
};
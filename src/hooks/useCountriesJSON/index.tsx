import { useQuery } from "@tanstack/react-query";

function useCountriesJSONData() {
  return useQuery({
    queryKey: ["countriesJSON"],
    queryFn: async () => {
      const response = await fetch("/countries.geojson.json");
      if (!response.ok) throw new Error("Error fetching countries JSON");
      return response.json();
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
  });
}

export function useCountriesJSON() {
  const {
    data: jsonData,
    isLoading: isJSONLoading,
    error: jsonError,
  } = useCountriesJSONData();
  return { jsonData, isJSONLoading, jsonError };
}

import { createRoot } from "react-dom/client";
import "../styles/styles.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AppRoutes } from "@/routes/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new ApolloClient({
  uri: "https://beyondfootsteps-api.onrender.com/graphql",
  cache: new InMemoryCache(),
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ApolloProvider client={client}>
      <AppRoutes />
    </ApolloProvider>
  </QueryClientProvider>
);

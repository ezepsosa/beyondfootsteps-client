import { createRoot } from "react-dom/client";
import "../styles/styles.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AppRoutes } from "@/routes/AppRoutes";

const client = new ApolloClient({
  uri: "https://beyondfootsteps-api.onrender.com/graphql",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ApolloProvider client={client}>
      <AppRoutes />
    </ApolloProvider>
);

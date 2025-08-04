import { createRoot } from "react-dom/client";
import "../styles/styles.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AppRoutes } from "@/routes/AppRoutes";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
    <ApolloProvider client={client}>
      <AppRoutes />
    </ApolloProvider>
);

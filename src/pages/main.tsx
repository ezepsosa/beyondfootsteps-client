import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../styles/styles.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { TestingComponent } from "./Testing/testing";
import { MainLayout } from "../components/layout";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <MainLayout />
    </ApolloProvider>
  </StrictMode>
);

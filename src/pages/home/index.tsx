import { Link } from "react-router-dom";
import {
  HomeContainer,
  HomeContent,
  HomeSection,
  HomeTitle,
  HomeSubtitle,
  HomeParagraph,
  ButtonsContainer,
  FeatureList,
  FeatureItem,
  FeatureContent,
  FeatureTitle,
  FeatureDescription,
  GoToButton,
} from "./styles";
import { HomeNavbar } from "./navbar";

const features = [
  {
    title: "Map Explorer",
    description:
      "Browse migration and asylum data by country, year, and direction. Click on countries to view detailed indicators and trends.",
  },
  {
    title: "Country Dashboards",
    description:
      "See key indicators for each country, including asylum decisions, requests, population, and derived metrics.",
  },
  {
    title: "Asylum Decisions & Requests",
    description:
      "Analyze applications, decisions, recognition rates, and more, with filters for year and country.",
  },
  {
    title: "Resettlement Visualizations",
    description:
      "Explore coverage rates, pipeline analysis, efficiency metrics, gaps, flows (Sankey), and annual trends for resettlement data.",
  },
  {
    title: "CSV Export",
    description: "Download filtered datasets for further analysis.",
  },
];

export const Home = () => {
  return (
    <HomeContainer>
      <HomeNavbar />
      <HomeContent>
        <HomeTitle>
          Welcome to <strong>Beyond Footsteps</strong>
        </HomeTitle>
        <HomeSubtitle>
          Data-driven insights on migration flows and refugee populations
        </HomeSubtitle>
        <HomeParagraph>
          Beyond Footsteps transforms complex migration data into{" "}
           <strong>clear insights</strong>. Our open-source platform makes global refugee and migration statistics{" "}
           <strong>accessible</strong> and <strong>actionable</strong> through interactive dashboards, maps, and visualizations.
        </HomeParagraph>
        <FeatureList>
          {features.map((feature) => (
            <FeatureItem key={feature.title}>
              <FeatureContent>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureContent>
            </FeatureItem>
          ))}
        </FeatureList>

        <HomeSection>
          <HomeSubtitle>KPIs on the Map</HomeSubtitle>
          <HomeParagraph>
            <ul>
              <li>Acceptance Rate - % of positive asylum decisions</li>
              <li>Applied - total new asylum applications</li>
              <li>Applied per 100k - applications per 100,000 inhabitants</li>
              <li>
                Displacement Rate per 100k - displaced persons per 100,000
                inhabitants
              </li>
              <li>
                Recognized Decisions - number of positive asylum decisions
              </li>
              <li>Rejected Decisions - number of negative asylum decisions</li>
            </ul>
          </HomeParagraph>
        </HomeSection>

        <HomeSection>
          <HomeSubtitle>About Resettlement</HomeSubtitle>
          <HomeParagraph>
            The Resettlements section offers advanced visualizations to analyze
            coverage, efficiency, gaps, and flows in global resettlement
            programs. Use filters to compare countries, years, and groupings,
            and discover where needs are greatest and how solutions are
            evolving.
          </HomeParagraph>
        </HomeSection>

        
        <ButtonsContainer>
          <GoToButton as={Link} to="/">
            Explore the Dashboard
          </GoToButton>
          <GoToButton as={Link} to="/aboutus">
            About the Project
          </GoToButton>
        </ButtonsContainer>
      </HomeContent>
    </HomeContainer>
  );
};

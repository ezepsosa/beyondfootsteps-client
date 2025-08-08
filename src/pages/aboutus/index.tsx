import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import {
  AboutContainer,
  AboutContent,
  AboutHeader,
  AboutSection,
  ContactGrid,
  ContactItem,
  ContactLink,
  FeatureItem,
  FeatureList,
  LogoContainer,
  Logo,
  SectionText,
  SectionTitle,
  AboutNavbar,
  AboutLinkElement,
} from "./style";
import beyondfootstepsLogo from "@assets/beyondfootsteps_transparent_logo.png";
import unhcrBlackLogo from "@assets/unhcr_black_logo.svg";
import unhcrLogo from "@/assets/unhcr_logo.svg";

export const AboutUs = () => {
  return (
    <AboutContainer>
      <AboutNavbar>
        <AboutLinkElement to={"/"}>Return to Beyond Footsteps</AboutLinkElement>
        <AboutLinkElement to={"http://www.unhcr.org/"} target="_blank" rel="noopener noreferrer">
          <Logo src={unhcrBlackLogo} alt="Beyond Footsteps" width="5rem" />
          UNHCR
        </AboutLinkElement>
      </AboutNavbar>
      <AboutContent>
        <AboutHeader>About Beyond Footsteps</AboutHeader>

        <LogoContainer>
          <Logo src={beyondfootstepsLogo} alt="Beyond Footsteps" width="10rem" />
          <Logo src={unhcrLogo} alt="UNHCR / ACNUR" width="10rem" />
        </LogoContainer>

        <AboutSection>
          <SectionTitle>The Project</SectionTitle>
          <SectionText>
            Beyond Footsteps is a data visualization project that explores
            global migration and refugee patterns using official UNHCR data.
            Developed as part of a professional portfolio, this platform
            demonstrates how interactive visualizations can transform complex
            humanitarian data into accessible insights.
          </SectionText>
        </AboutSection>

        <AboutSection>
          <SectionTitle>Purpose</SectionTitle>
          <SectionText>
            Migration shapes our world in profound ways, yet the data behind
            these movements often remains hidden in complex reports and
            databases. Beyond Footsteps brings these numbers to life through
            interactive maps and visualizations, helping viewers understand the
            scale, direction, and context of human movement across borders.
          </SectionText>
        </AboutSection>

        <AboutSection>
          <SectionTitle>Features</SectionTitle>
          <SectionText>
            This platform allows exploration of several aspects of global
            migration:
          </SectionText>
          <FeatureList>
            <FeatureItem>
              Interactive maps showing refugee origins and destinations
            </FeatureItem>
            <FeatureItem>
              Asylum application statistics visualized by country
            </FeatureItem>
            <FeatureItem>
              Historical trends in displacement and resettlement
            </FeatureItem>
            <FeatureItem>
              Country-specific migration profiles and key indicators
            </FeatureItem>
          </FeatureList>
        </AboutSection>

        <AboutSection>
          <SectionTitle>Data & Implementation</SectionTitle>
          <SectionText>
            All data comes from the UNHCR (United Nations High Commissioner for
            Refugees) statistics portal. The application is built with React and
            TypeScript for the frontend, styled components for design, and
            Leaflet for interactive maps. The visualizations process real
            migration data to reveal patterns that might otherwise go unnoticed.
          </SectionText>
        </AboutSection>

        <AboutSection>
          <SectionTitle>Professional Note</SectionTitle>
          <SectionText>
            Beyond Footsteps represents a commitment to creating meaningful
            projects that showcase both technical excellence and practical
            utility. The goal of this project is to demonstrate how development
            skills can be applied to create intuitive interfaces for complex
            information. The focus lies not just in the data itself, but in the
            creation of tools that make information accessible and valuable to
            users.
          </SectionText>
        </AboutSection>

        <AboutSection>
          <SectionTitle>Connect</SectionTitle>
          <SectionText>
            Feedback, questions, or opportunities for collaboration are welcome.
          </SectionText>
          <ContactGrid>
            <ContactItem>
              <FaEnvelope size={20} />
              <ContactLink href="mailto:ezequiel.psosa@outlook.com">
                Contact via Email
              </ContactLink>
            </ContactItem>
            <ContactItem>
              <FaLinkedin size={20} />
              <ContactLink
                href="https://www.linkedin.com/in/ezequielperezsosa/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn Profile
              </ContactLink>
            </ContactItem>
            <ContactItem>
              <FaGithub size={20} />
              <ContactLink
                href="https://github.com/ezepsosa"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Profile
              </ContactLink>
            </ContactItem>
          </ContactGrid>
        </AboutSection>
      </AboutContent>
    </AboutContainer>
  );
};

export default AboutUs;

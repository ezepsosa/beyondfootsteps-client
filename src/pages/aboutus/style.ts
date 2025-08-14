import styled from "styled-components";
import { breakpoints } from "@/styles/breakpoints";
import { Link } from "react-router-dom";
import type { LogoProps } from "./types";

export const AboutNavbar = styled.nav`
  display: flex;
  position: sticky;
  width: -webkit-fill-available;
  top: 0;
  font-family: "Inter", sans-serif;
  font-weight: 800;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid #eee;
`;

export const AboutLinkElement = styled(Link)`
  color: #000000ff;
  text-decoration: none;
  transition: color 0.2s ease;
  display:flex;
  gap: 1rem;
  align-items: center;

  &:hover {
    color: #004499;
    text-decoration: underline;
  }

  @media (min-width: ${breakpoints.md}) {
    font-size: 2.5rem;

  }
`;

export const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem 6rem 1rem;
  background-color: #f9f9f9c5;
  min-height: 100vh;

  @media (min-width: ${breakpoints.md}) {
    padding: 4rem 2rem 6rem 2rem;
  }
`;

export const AboutContent = styled.div`
  max-width: 50rem;
  width: 100%;
`;

export const AboutHeader = styled.h1`
  font-family: "Inter", sans-serif;
  font-weight: 800;
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;

  @media (min-width: ${breakpoints.md}) {
    font-size: 2.5rem;
  }
`;

export const AboutSection = styled.section`
  margin-bottom: 2.5rem;
`;

export const SectionTitle = styled.h2`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;

  @media (min-width: ${breakpoints.md}) {
    font-size: 1.75rem;
  }
`;

export const SectionText = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
  margin-bottom: 1rem;
`;

export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
`;

export const FeatureItem = styled.li`
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
  padding: 0.5rem 0 0.5rem 1.5rem;
  position: relative;

  &:before {
    content: "•";
    color: #0066cc;
    font-weight: bold;
    font-size: 1.2rem;
    position: absolute;
    left: 0.5rem;
  }
`;

export const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (min-width: ${breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.05);
`;

export const ExternalLink = styled.a`
  display: flex;
  text-decoration: none;
  color: black;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background-color: #dddddd56;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: #cccccc;
  }
`;

export const ContactLink = styled.a`
  font-family: "Inter", sans-serif;
  color: #0066cc;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #004499;
    text-decoration: underline;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 50rem;
  margin-bottom: 2rem;

  @media (min-width: ${breakpoints.md}) {
  }
`;

export const Logo = styled.img<LogoProps>`
  height: auto;
  width: ${({ width }) => width || "11.25rem"};
  object-fit: contain;

  @media (max-width: ${breakpoints.sm}) {
    width: ${({ width }) =>
      width ? `calc(${width} * 0.5)` : "8.75rem"};
  }
`;

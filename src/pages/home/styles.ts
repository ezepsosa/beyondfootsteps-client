import { breakpoints } from "@/styles/breakpoints";
import styled from "styled-components";

export const HomeContainer = styled.div`
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #fafafa;
`;

export const HomeContent = styled.div`
  text-align: left;
  padding: 2rem 2rem 4rem;
  max-width: 50rem;
  margin: 2rem auto;
`;

export const HomeSection = styled.section`
  margin: 3rem 0;
  padding: 1.5rem;
  border-left: 0.125rem solid #e5e7eb;
  transition: border-color 0.3s;

  ul {
    padding-left: 1.5rem;

    li {
      margin: 0.8rem 0;
      line-height: 1.6;
    }
  }
`;

export const HomeTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  text-align: left;
  margin-bottom: 1rem;
  color: #1f2937;
  letter-spacing: -0.5px;

  strong {
    background: linear-gradient(90deg, #10b981 0%, #3ea7c7ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    font-weight: 800;
  }
`;

export const HomeSubtitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
  color: #4b5563;
  margin-bottom: 1.5rem;
  text-align: left;
  letter-spacing: 0.3px;
`;

export const HomeParagraph = styled.div`
`;

export const GoToButton = styled.button`
  background-color: #fff;
  color: black;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.8rem 1.8rem;
  border: 1.5px solid #000000ff;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-top: 2rem;
  transition: all 0.2s;
  letter-spacing: 0.3px;

  &:hover {
    background-color: #5e5e5eff;
    color: #fff;
    box-shadow: 0 0.125rem 0.5rem rgba(37, 99, 235, 0.15);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;

`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: 2.5rem;
  flex-wrap: wrap;
  justify-content: space-around;

  @media (max-width: ${breakpoints.lg}) {
    flex-direction: column;
    width: 100%;
  }
`;


export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  padding: 0 1rem;
  border-left: 2px solid #e5e7eb;
`;

export const FeatureItem = styled.li`
  display: flex;
  margin-bottom: 1.5rem;
  gap: 1rem;
  }
`;

export const FeatureIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: rgba(0, 0, 0, 0.51);
  min-width: 1.5rem;
`;

export const FeatureContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FeatureTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #374151;
`;

export const FeatureDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #6b7280;
  margin: 0;
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 50rem;
  margin-bottom: 2rem;

  @media (min-width: ${breakpoints.lg}) {
  }
`;

export const Logo = styled.img`
  width: 6rem;

  @media (max-width: ${breakpoints.lg}) {
    width: 9rem;
  }
`;
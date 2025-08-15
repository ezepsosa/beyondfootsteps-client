import styled from "styled-components";
import { breakpoints } from "@styles/breakpoints";
import { Link } from "react-router-dom";
import type { LinkElementProps } from "../types";

export const LayoutNavbar = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 1001;
  box-sizing: border-box;
  justify-content: space-between;
  background-color: #f7f7f7ff;
  border-top: 1px solid #d1d1d1ff;

  @media (min-width: ${breakpoints.lg}) {
    bottom: auto;
    top: 0;
    justify-content: flex-start;
    background-color: transparent;
    padding: 1rem 1rem;
  }

  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    background-color: #00000050;
  }
`;

export const AuxiliarMenu = styled.div`
  display: none;

  @media (min-width: ${breakpoints.lg}) {
    display: flex;
    gap: 2rem;
    border-radius: 2rem;
    background-color: #111111c4;
    padding: 0.75rem 0.4rem;
  }
  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    height: 100vh;
  }
`;

export const MenuElement = styled.ul`
  display: none;

  @media (min-width: ${breakpoints.lg}) {
    display: flex;
    gap: 2rem;
    border-radius: 2rem;
    background-color: #f5f5f5be;
    padding: 0.75rem 0.4rem;
  }
`;

export const LinkElement = styled(Link)<LinkElementProps>`
  position: relative;
  text-decoration: none;
  transition: color 0.4s ease;
  border-radius: 2rem;
  font-size: 1rem;
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  padding: 1rem 2rem;
  color: black;
  text-align: center;

  &::after {
    content: "";
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    width: ${({ $active }) => ($active ? "80%" : "0")};
    height: 2px;
    background: linear-gradient(90deg, #23252693, #41434588);
    border-radius: 2px;
    transform: translateX(-50%);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 80%;
  }

  @media (min-width: ${breakpoints.lg}) {
    color: ${({ color }) => color || "black"};
    padding: 1.2rem;

    &::after {
      width: ${({ $active }) => ($active ? "80%" : "0")};
      background: ${({ $linearGradient }) =>
        $linearGradient || "linear-gradient(90deg, #d1d1d1ff, #ffffffff)"};
      bottom: 0;
    }

    &:hover {
      color: #666;
    }

    &:hover::after {
      width: 80%;
    }
  }
  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    color: white;
    background: none;
    padding: 0.5rem;

    &::after {
      width: 0 !important;
    }

    &:hover {
      color: none;
    }
    &:hover::after {
      width: 0% !important;
    }
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  width: 100%;

  @media (min-width: ${breakpoints.lg}) {
    justify-content: space-between;
    flex-direction: row;
    gap: 2rem;
  }
`;

export const LogoAndMobileMenu = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;

  @media (min-width: ${breakpoints.lg}) {
    width: min-content;
  }
`;

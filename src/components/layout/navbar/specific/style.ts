import styled from "styled-components";
import { breakpoints } from "@styles/breakpoints";
import { Link } from "react-router-dom";
import type { LinkElementProps } from "../types";
import { MenuLayout } from "../style";

export const LayoutNavbar = styled.nav`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #8181811f;

  @media (min-width: ${breakpoints.lg}) {
    justify-content: flex-start;
    background-color: transparent;
  }
`;

export const MenuElement = styled.ul<{ open: boolean }>`
  display: ${({ open }) => (open ? "flex" : "none")};
  flex-direction: column;
  width: 100%;
  transform: translateY(${({ open }) => (open ? "0" : "-20px")})
    scale(${({ open }) => (open ? "1" : "0.95")});
  opacity: ${({ open }) => (open ? "1" : "0")};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: top center;
  margin: 0;
  padding: 0;

  @media (min-width: ${breakpoints.lg}) {
    display: flex;
    position: static;
    flex-direction: row;
    width: auto;
    left: auto;
    right: auto;
    gap: 2rem;
    border-radius: 2rem;
    transform: none;
    opacity: 1;
    visibility: visible;
    transition: none;
    backdrop-filter: none;
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
  text-align: center;
  color: ${({ color }) => color || "black"};

  &::after {
    content: "";
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    width: ${({ $active }) => ($active ? "80%" : "0")};
    height: 2px;
    border-radius: 2px;
    transform: translateX(-50%);
    transition: width 0.3s ease;
    background: ${({ $linearGradient }) =>
      $linearGradient || "linear-gradient(90deg, #d1d1d1ff, #ffffffff)"};
  }

  &:hover::after {
    width: 80%;
  }

  @media (min-width: ${breakpoints.lg}) {
    padding: 1.2rem;

    &::after {
      width: ${({ $active }) => ($active ? "80%" : "0")};

      bottom: 0;
    }

    &:hover {
      color: #666;
    }

    &:hover::after {
      width: 80%;
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
  justify-content: space-between;
  width: 90%;
  align-items: center;

  @media (min-width: ${breakpoints.lg}) {
    width: min-content;
  }
`;

export const LandscapeMenuLayout = styled(MenuLayout)`
  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    background-color: #1616161c;
    padding: 0.5rem;
    border-radius: 0.25rem;
  }
`;

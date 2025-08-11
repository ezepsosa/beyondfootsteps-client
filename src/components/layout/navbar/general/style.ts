import styled from "styled-components";
import { breakpoints } from "@styles/breakpoints";
import { Link } from "react-router-dom";
import type { LinkElementProps } from "../types";

export const LayoutNavbar = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 1001;
  padding: 1rem 1rem;
  box-sizing: border-box;
  justify-content: space-between;
  background-color: #00000050;

  @media (min-width: ${breakpoints.lg}) {
    justify-content: flex-start;
    background-color: transparent;
  }
`;

export const LogoLayout = styled.img`
  height: 3.5rem;
  cursor: pointer;

  @media (min-width: ${breakpoints.lg}) {
    height: 6rem;
  }
`;

export const MenuLayout = styled.div`
  font-size: 2rem;
  cursor: pointer;
  color: white;

  @media (min-width: ${breakpoints.lg}) {
    display: none;
  }
`;

export const AuxiliarMenu = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? "flex" : "none")};
  flex-direction: column;
  width: 100%;
  opacity: ${({ open }) => (open ? "1" : "0")};

  @media (min-width: ${breakpoints.lg}) {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    border-radius: 2rem;
    background-color: #111111c4;
    padding: 0.75rem 0.4rem;

    width: auto;
    transform: none;
    opacity: 1;
    transition: none;
    transform-origin: initial;
    position: static;
    visibility: visible;
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
    background: transparent;
    gap: 2rem;
    border-radius: 2rem;
    background-color: #f5f5f5be;
    padding: 0.75rem 0.4rem;
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
  color: white;
  padding: 1rem 2rem;
  text-align: center;

  &::after {
    content: "";
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    width: ${({ $active }) => ($active ? "80%" : "0")};
    height: 2px;
    background: linear-gradient(90deg, #d1d1d1ff, #ffffffff);
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
  width: 100%;
  align-items: center;

  @media (min-width: ${breakpoints.lg}) {
    width: min-content;
  }
`;

export const LinkMenu = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media (min-width: ${breakpoints.lg}) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem;
  }
`;

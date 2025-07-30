import styled from "styled-components";
import { breakpoints } from "@styles/breakpoints";
import { Link } from "react-router-dom";

export const LayoutNavbar = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 1000;
  padding: 1rem 1rem;
  box-sizing: border-box;
  justify-content: space-between;
  background-color: transparent;

  @media (min-width: ${breakpoints.md}) {
    justify-content: flex-start;
  }
`;

export const LogoLayout = styled.img`
  height: 3.5rem;

  @media (min-width: ${breakpoints.md}) {
    height: 6rem;
  }
`;

export const MenuLayout = styled.div`
  font-size: 2rem;
  cursor: pointer;
  @media (min-width: ${breakpoints.md}) {
    display: none;
  }
`;

export const AuxiliarMenu = styled.div`
  display: none;

  @media (min-width: ${breakpoints.md}) {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    border-radius: 2rem;
    background-color: #111111ff;
    padding: 0.75rem 0.4rem;
  }
`;

export const MenuElement = styled.ul<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: rgba(14, 14, 14, 0.9);

  transform: translateY(${({ open }) => (open ? "0" : "-20px")})
  scale(${({ open }) => (open ? "1" : "0.95")});
  opacity: ${({ open }) => (open ? "1" : "0")};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: top center;

  
  @media (min-width: ${breakpoints.md}) {
    display: flex;
    position: static;
    flex-direction: row;
    width: auto;
    left: auto;
    right: auto;
    background: transparent;
    gap: 2rem;
    border-radius: 2rem;
    background-color: #f5f5f5;
    padding: 0.75rem 0.4rem;
    transform: none;
    opacity: 1;
    visibility: visible;
    transition: none;
`;

export const LinkElement = styled(Link)<{ color?: string }>`
  text-decoration: none;
  transition: 0.4s;
  border-radius: 2rem;
  font-size: 1.2rem;
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  color: white;
  padding: 1rem 0;

  @media (min-width: ${breakpoints.md}) {
    color: ${({ color }) => color || "black"};
    padding: 1rem;

    &:hover {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      color: #666;
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

  @media (min-width: ${breakpoints.md}) {
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

  @media (min-width: ${breakpoints.md}) {
    width: min-content;
`;

export const LinkMenu = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${breakpoints.md}) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem;
  }
`;

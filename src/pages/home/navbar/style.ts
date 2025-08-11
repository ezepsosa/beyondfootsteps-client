import styled from "styled-components";
import { Link } from "react-router-dom";
import type { LinkElementProps } from "./types";

export const LayoutNavbar = styled.nav`
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  z-index: 100;
  position: sticky;
  top: 0;
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2563eb;
  letter-spacing: 0.5px;
  font-family: "Inter", sans-serif;
`;

export const MenuElement = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  margin: 0;
  padding: 0;
  background: transparent;
  box-shadow: none;
  list-style: none;
`;

export const LinkElement = styled(Link)<LinkElementProps>`
  position: relative;
  text-decoration: none;
  font-size: 1.08rem;
  font-family: "Inter", sans-serif;
  font-weight: 500;
  color: #374151;
  padding: 0.5rem 0;
  background: transparent;
  border: none;
  transition: color 0.2s;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -4px;
    width: ${({ $active }) => ($active ? "100%" : "0")};
    height: 2px;
    background: #2563eb;
    border-radius: 2px;
    transition: width 0.2s;
  }

  &:hover {
    color: #2563eb;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2.5rem;
`;

export const LinkMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
`;
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

export const MenuElement = styled.ul<{ open: boolean }>`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  width: 100vw;
  background: rgba(29, 29, 29, 0.9);
  z-index: 999;
  box-sizing: border-box;
  
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
    padding: 1.1rem;
    transform: none;
    opacity: 1;
    visibility: visible;
    transition: none;
    
  }
`;

export const LinkElement = styled(Link)`
  color: white;
  text-decoration: none;
  transition: 0.4s;
  border-radius: 2rem;
  font-size: 1.25rem;
  padding: 1.75rem;
  

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    background: white;
  }

  @media (min-width: ${breakpoints.md}) {
    color: black;
    padding: 1rem;

    &:hover {
      color: #666;
    }
  }
`;

export const ElementList = styled.li``;

export const MenuContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;

  @media (min-width: ${breakpoints.md}) {
    justify-content: space-between;
    width: 100%;
    gap: 2rem;
  }
`;

import { breakpoints } from "@/styles/breakpoints";
import styled from "styled-components";

export const Selector = styled.select`
  background: transparent;
  border-radius: 1rem;
  background-color: #f5f5f5;
  padding: 0.5rem 0.4rem;
  opacity: 1;
  text-align: center;
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="none" stroke="%23333" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>');
  background-repeat: no-repeat;
  background-position: right 0.8rem center;
  background-size: 1.5em;
  border: 2px solid #8d8d8dff;
  box-shadow: 0 2px 8px rgba(224, 192, 151, 0.15);

  &:focus {
    outline: none;
    border-color: #b68973;
    box-shadow: 0 0 0 2px #e0c09755;
  }

  @media (min-width: ${breakpoints.md}) {
    font-size: 1.2rem;
    font-weight: 500;
    padding: 0.75rem 0.4rem;
  }
`;

// Mobile-first: barra con fondo, sombra y padding extra para mejor usabilidad táctil
export const BarBackground = styled.div`
  width: 100vw;
  background: #fffdfa;
  box-shadow: 0 -2px 16px rgba(0, 0, 0, 0.08);
  padding: 0.75rem 1rem 1.25rem 1rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;

  @media (min-width: ${breakpoints.md}) {
    border-radius: 1.5rem;
    width: auto;
    left: 50%;
    transform: translateX(-50%);
    min-width: 340px;
    max-width: 480px;
    padding: 1rem 2rem 1.5rem 2rem;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
  }
`;

export const Option = styled.option``;

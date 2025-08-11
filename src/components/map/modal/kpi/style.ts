import { breakpoints } from "@/styles/breakpoints";
import styled from "styled-components";

export const InfoModal = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 7rem;
  width: 60%;
  left: 1em;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 1000;
  padding: 1rem 1.5rem;
  border-radius: 1rem;

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  transform: ${({ $visible }) =>
    $visible ? "translateY(0)" : "translateY(100%)"};

  transition: opacity 0.4s ease-out, transform 0.4s ease-out,
    visibility 0.4s ease-out;

  @media (min-width: ${breakpoints.md}) {
    transform: ${({ $visible }) =>
      $visible ? "translateY(0)" : "translateY(-100%)"};

    top: 8rem;
    left: 14rem;
    bottom: inherit;
  }
`;

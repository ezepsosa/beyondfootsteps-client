import type { TextSpanProps } from "@/types/types";
import styled from "styled-components";
import { breakpoints } from "./breakpoints";
import CsvDownload from "react-json-to-csv";

export const TextSpan = styled.span<TextSpanProps>`
  font-size: ${({ $fontSize }) => $fontSize || ".8rem"};
  font-family: ${({ $fontFamily }) => $fontFamily || '"Inter", sans-serif'};
  font-optical-sizing: auto;
  font-weight: ${({ $fontWeight }) => $fontWeight || "normal"};
  font-style: ${({ $fontStyle }) => $fontStyle || "normal"};
  color: ${({ $fontColor }) => $fontColor || "black"};

  @media (min-width: ${breakpoints.md}) {
    font-size: ${({ $fontSizeMD }) => $fontSizeMD || "1rem"};
  }
`;

export const LabelValueContainer = styled.div`
  display: flex;
  gap: 0.2rem;
`;

export const CloseModal = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.75rem;
  cursor: pointer;

  @media (min-width: ${breakpoints.md}) {
    top: 0.4rem;
    right: 0.3rem;
  }
`;

export const TopButtomContainer = styled.span`
  position: fixed;
  display: flex;
  top: 6rem;
  z-index: 1000;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;

  @media (min-width: ${breakpoints.md}) {
    top: 8rem;
    left: 2rem;
  }
`;

export const IconSpan = styled.span`
  background-color: #f5f5f5;
  border-radius: 0.2rem;
  padding: 0.25rem 0.25rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
`;

export const CsvButtonDownload = styled(CsvDownload)`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 0.5rem 0.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border: none;

  
`;

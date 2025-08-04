import type { TextSpanProps } from "@/types/types";
import styled from "styled-components";
import { breakpoints } from "./breakpoints";

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

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
  ${({ $allowEllipsis }) =>
    $allowEllipsis
      ? `
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        max-width: 100%;
      `
      : ""}
  @media (min-width: ${breakpoints.md}) {
    font-size: ${({ $fontSizeMD }) => $fontSizeMD || "1rem"};
  }
`;

export const TextParagraph = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #333;
  margin: 0;
`;

export const TextParagraphContainer = styled.div<{ $marginTop?: number }>`
  display: flex;
  margin-bottom: 2rem;
  padding: 0 1.2rem;
  margin-top: ${({ $marginTop }) => $marginTop || 0}rem;
  flex-direction: column;

  @media (min-width: ${breakpoints.lg}) {
    flex-direction: row;
    margin-top: ${({ $marginTop }) => ($marginTop ? $marginTop - 5 : 0)}rem;
  }
`;

export const LabelValueContainer = styled.div`
  display: flex;
  gap: 0.2rem;
  justify-content: space-between;

  @media (min-width: ${breakpoints.lg}) {
    justify-content: flex-start;
  }
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
  cursor: pointer;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 0.5rem 0.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border: none;
`;

export const PrimaryButton = styled.button`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const SecondaryButton = styled.button`
  background-color: rgba(0, 0, 0, 0.84);
  border-radius: 8px;
  color: white;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border: none;
  cursor: pointer;

  &:hover {
    color: white;
    background-color: #00000085;
  }
`;

export const CenterContainer = styled.div<{
  $direction?: "row" | "column";
  height?: string;
  $justifyContent?: string;
}>`
  display: flex;
  justify-content: ${({ $justifyContent }) => $justifyContent || "center"};
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.25rem;
  flex-direction: ${({ $direction }) => $direction || "column"};
  width: 100%;
  height: ${({ height }) => height || "300px"};

  @media (min-width: ${breakpoints.md}) {
    height: ${({ height }) => height || "500px"};
  }
`;

export const ThinLine = styled.div`
  width: 100%;
  margin: 3rem 0;
  height: 1px;
  background: linear-gradient(
    to right,
    rgba(146, 146, 146, 0) 0%,
    #92929269 20%,
    #92929269 80%,
    rgba(146, 146, 146, 0) 100%
  );
`;

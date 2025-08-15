import type { TextSpanProps } from "@/types/types";
import styled from "styled-components";
import { breakpoints } from "./breakpoints";
import CsvDownload from "react-json-to-csv";
import { MdLegendToggle } from "react-icons/md";
import { IoHomeOutline, IoInformationCircle } from "react-icons/io5";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { AiOutlinePercentage } from "react-icons/ai";
import { TbNumbers } from "react-icons/tb";
import { LuChartSpline, LuMessageSquareMore } from "react-icons/lu";
import { HiOutlineDocumentText } from "react-icons/hi";
import { colors } from "./colors";
import { CiMap } from "react-icons/ci";
import { PiGavelLight } from "react-icons/pi";

export const LowerContainer = styled.div`
  width: -webkit-fill-available;
  height: auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  position: fixed;
  left: 0;
  bottom: 4rem;
  z-index: 1000;

  @media (min-width: ${breakpoints.md}) {
    bottom: 2rem;
  }

  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    padding: 0 1rem;
    bottom: 2rem;
  }
`;

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

  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    font-size: 0.75rem;
  }
`;

export const TextParagraph = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #333;
  margin: 0;
  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    font-size: 0.7rem;
  }
`;

export const TextParagraphContainer = styled.div<{ $marginTop?: number }>`
  display: flex;
  margin-bottom: 2rem;
  padding: 0 2rem;
  margin-top: 2rem;
  flex-direction: column;

  @media (min-width: ${breakpoints.lg}) {
    flex-direction: row;
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

export const TopButtonContainer = styled.span`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 6rem;
  z-index: 1000;
  width: 100%;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;

  @media (min-width: ${breakpoints.lg}) {
    align-items: center;
    flex-direction: row;
    top: 8rem;
    left: 2rem;
  }

  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    top: 0rem;
    flex-direction: row;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
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
  border-radius: 0.25rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border: none;
  padding: 0.3rem;

  & > svg {
    width: 24px;
    height: 24px;
  }

  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    padding: 0.15rem;
    width: 24px;
    height: 29px;

    & > svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export const PrimaryButton = styled.button`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${colors.neutral[350]};
  }
  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    font-size: 0.7rem;
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
    background-color: ${colors.neutral.blackAlt};
  }
  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    font-size: 0.7rem;
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
    ${colors.neutral.grayAlpha} 20%,
    ${colors.neutral.grayAlpha} 80%,
    rgba(146, 146, 146, 0) 100%
  );
`;

//Custom Icons

export const CustomMdLegendToggle = styled(MdLegendToggle)`
  font-size: 1.5rem;

  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    font-size: 1rem;
  }
`;

export const CustomIoInformationCircle = styled(IoInformationCircle)`
  font-size: 1.5rem;

  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    font-size: 1rem;
  }
`;

export const CustomRxEyeOpen = styled(RxEyeOpen)`
  font-size: 1.5rem;

  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    font-size: 1rem;
  }
`;

export const CustomGoEyeClosed = styled(GoEyeClosed)`
  font-size: 1.5rem;

  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    font-size: 1rem;
  }
`;

export const CustomAiOutlinePercentage = styled(AiOutlinePercentage)`
  font-size: 1.5rem;

  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    font-size: 1rem;
  }
`;

export const CustomTbNumbers = styled(TbNumbers)`
  font-size: 1.5rem;

  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    font-size: 1rem;
  }
`;

export const CustomPiGavelLight = styled(PiGavelLight)<{$active: boolean}>  `
  font-size: 1.3rem;
  stroke-width: 0.1;
  color: ${({ $active }) => ($active ? colors.primary[400] : colors.neutral[800])};

  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    font-size: 1rem;
  }
`;

export const CustomHiOutlineDocumentText = styled(HiOutlineDocumentText)<{$active: boolean}>`
  font-size: 1.3rem;
  stroke-width: 1.5;
  color: ${({ $active }) => ($active ? colors.primary[400] : colors.neutral[800])};

  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    font-size: 1rem;
  }
`;

export const CustomCiMap = styled(CiMap)<{$active: boolean}>`
  font-size: 1.3rem;
  stroke-width: 0.1;
  color: ${({ $active }) => ($active ? colors.primary[400] : colors.neutral[800])};

  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    font-size: 1rem;
  }
`;

export const CustomLuChartSpline = styled(LuChartSpline)<{$active: boolean}>`
  font-size: 1.3rem;
  stroke-width: 1.5;
  color: ${({ $active }) => ($active ? colors.primary[500] : colors.neutral[800])};

  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    font-size: 1rem;
  }
`;

export const CustomIoHomeOutline = styled(IoHomeOutline)<{$active: boolean}>`
  font-size: 1.6rem;
  color: ${colors.white};
  background-color: ${colors.primary[400]};
  padding: 0.5rem;
  border-radius: 2rem;
  stroke-width: 1.5;

  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    font-size: 1rem;
  }
`;

export const CustomLuMessageSquareMore = styled(LuMessageSquareMore)<{$active: boolean}>`
  font-size: 1.3rem;
  stroke-width: 1.5;
  color: ${({ $active }) => ($active ? colors.primary[500] : colors.neutral[800])};

  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    font-size: 1rem;
  }
`;

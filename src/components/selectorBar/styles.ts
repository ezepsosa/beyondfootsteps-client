import { breakpoints } from "@/styles/breakpoints";
import { colors } from "@/styles/colors";
import styled from "styled-components";

export const Selector = styled.select<{
  $paddingDesktop?: string;
  $paddingMobile?: string;
}>`
  background-color: ${colors.neutral[75]};
  border: 1px solid ${colors.neutral[300]};
  padding: ${({ $paddingMobile }) => $paddingMobile || "0.4rem 0"};
  font-family: "Inter", sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${colors.neutral.black};
  text-align-last: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -webkit-border-radius: 0.3rem;
  -webkit-tap-highlight-color: transparent;

  cursor: pointer;
  width: 7rem;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;

  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 0.9em;


  &:hover {
    border-color: #888888;
  }

  &:focus {
    outline: none;
    border-color: #666666;
    box-shadow: 0 0 6px rgba(102, 102, 102, 0.3);
  }

  @media (min-width: ${breakpoints.md}) {
    width: 15rem;
    font-size: 1rem;
    padding: ${({ $paddingDesktop }) => $paddingDesktop || "0.5rem 0"};
    background-image: url("data:image/svg+xml;utf8,<svg fill='none' stroke='%23666' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M6 9l6 6 6-6' stroke-linecap='round' stroke-linejoin='round'/></svg>");
  }

  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
  font-size: 0.6rem;
    padding: 0.3rem;
  }
`;

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

export const Option = styled.option`
  text-align: center;
`;

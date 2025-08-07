import { AiOutlineLoading } from "react-icons/ai";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const LoadingIllustration = styled(AiOutlineLoading)`
  font-size: 4rem;
  animation: ${spin} 2s infinite;
  margin-bottom: 1rem;
`;

export const LoadingContainer = styled.div`
  min-height: 100vh;
  z-index: 1000;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3131313b 0%, #808080ff 100%);
  padding: 2rem;
`;

export const LoadingContent = styled.div`
  text-align: center;
  max-width: 600px;
  animation: ${fadeIn} 0.8s ease-out;
`;

export const LoadingIconContainer = styled.div`
  margin-bottom: 2rem;
`;

export const LoadingTitle = styled.h2`
  font-size: 2.5rem;
  color: white;
  margin: 1rem 0;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const LoadingDescription = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin: 2rem 0;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 1.5rem 0;
  }
`;

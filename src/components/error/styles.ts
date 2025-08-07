import { MdErrorOutline } from "react-icons/md";
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

export const ErrorIllustration = styled(MdErrorOutline)`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

export const ErrorContainer = styled.div`
  min-height: 100vh;
  z-index: 1000;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3131313b 0%, #808080ff 100%);
  padding: 2rem;
`;

export const ErrorContent = styled.div`
  text-align: center;
  max-width: 600px;
  animation: ${fadeIn} 0.8s ease-out;
`;

export const ErrorIconContainer = styled.div`
  margin-bottom: 2rem;
`;

export const ErrorTitle = styled.h2`
  font-size: 2.5rem;
  color: white;
  margin: 1rem 0;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const ErrorDescription = styled.p`
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

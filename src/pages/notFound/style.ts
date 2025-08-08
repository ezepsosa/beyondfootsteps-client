import { GiWorld } from "react-icons/gi";
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

const pulsate = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

export const NotFoundContainer = styled.div`
    min-height: 100%;
    Z-index: 1000;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #56c5973b 0%, #3a8dde 100%);
    padding: 2rem;
`;

export const NotFoundContent = styled.div`
  text-align: center;
  max-width: 600px;
  animation: ${fadeIn} 0.8s ease-out;
`;

export const IllustrationContainer = styled.div`
  margin-bottom: 2rem;
`;

export const FootstepsIllustration = styled(GiWorld)`
  font-size: 4rem;
  animation: ${pulsate} 2s infinite;
  margin-bottom: 1rem;
`;

export const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: bold;
  color: white;
  margin: 0;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
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

export const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: white;
    color: #4c4f5eff;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`;
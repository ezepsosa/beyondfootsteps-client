import { Link } from "react-router-dom";
import {
  NotFoundContainer,
  NotFoundContent,
  ErrorCode,
  ErrorTitle,
  ErrorDescription,
  IllustrationContainer,
  FootstepsIllustration,
  BackButton,
} from "./style";
import { MapComponent } from "@/components/map/container";

export const NotFound = () => {
  return (
    <MapComponent zoom={6} center={[40, 30]}>
      <NotFoundContainer>
        <NotFoundContent>
          <IllustrationContainer>
            <FootstepsIllustration size="10vh" color="white"/>
          </IllustrationContainer>

          <ErrorCode>404</ErrorCode>
          <ErrorTitle>Page Not Found</ErrorTitle>
          <ErrorDescription>
            The path you're looking for seems to have disappeared. Let's get you
            back on track to explore humanitarian data.
          </ErrorDescription>

          <BackButton as={Link} to="/dashboard">
            Return to Dashboard
          </BackButton>
        </NotFoundContent>
      </NotFoundContainer>
    </MapComponent>
  );
};

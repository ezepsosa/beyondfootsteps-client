import { Link } from "react-router-dom";
import {
  NotFoundContainer,
  NotFoundContent,
  ErrorCode,
  ErrorTitle,
  ErrorDescription,
  BackButton,
  IllustrationContainer,
  FootstepsIllustration,
} from "./style";
import { MapComponent } from "@/components/mapUsableComponents/mapComponent";

export const NotFound = () => {
  return (
    <MapComponent zoom={6} center={[40, 30]}>
      <NotFoundContainer>
        <NotFoundContent>
          <IllustrationContainer>
            <FootstepsIllustration>👣</FootstepsIllustration>
          </IllustrationContainer>

          <ErrorCode>404</ErrorCode>
          <ErrorTitle>Page Not Found</ErrorTitle>
          <ErrorDescription>
            The path you're looking for seems to have disappeared. Let's get you
            back on track to explore humanitarian data.
          </ErrorDescription>

          <BackButton as={Link} to="/">
            Return to Dashboard
          </BackButton>
        </NotFoundContent>
      </NotFoundContainer>
    </MapComponent>
  );
};

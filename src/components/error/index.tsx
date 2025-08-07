import { ErrorDescription, ErrorTitle } from "@/pages/notFound/style";
import { ErrorContainer, ErrorContent, ErrorIllustration } from "./styles";

export const DisplayError = () => {
  return (
    <ErrorContainer>
      <ErrorContent>
        <ErrorIllustration />
        <ErrorTitle>Error retrieving data</ErrorTitle>
        <ErrorDescription>
          There was a problem while trying to fetch the information. Please try again later.
        </ErrorDescription>
      </ErrorContent>
    </ErrorContainer>
  );
};

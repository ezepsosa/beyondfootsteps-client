import {
  LoadingIllustration,
  LoadingContainer,
  LoadingContent,
  LoadingDescription,
  LoadingTitle,
} from "./styles";

export const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingContent>
        <LoadingIllustration />
        <LoadingTitle>We are fetching the data</LoadingTitle>
        <LoadingDescription>
          Please wait a moment while we retrieve the latest information.
        </LoadingDescription>
      </LoadingContent>
    </LoadingContainer>
  );
};

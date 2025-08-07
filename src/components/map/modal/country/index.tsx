import { IoCloseOutline } from "react-icons/io5";
import {
  BodyData,
  Container,
  FlagImage,
  InfoContainer,
  TopData,
} from "./style";
import type { Props } from "./types";
import flagData from "@assets/iso-flags.json";
import { CloseModal, LabelValueContainer, TextSpan } from "@/styles/styles";
import { humanize } from "../../../auxliar";
import type { AsylumDecision, DashboardSummary } from "@/gql/graphql";
import { isNumber } from "chart.js/helpers";

type isoFlag = {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  cca2: string;
  cca3: string;
};

export const InfoCountryModal = ({
  setOpenModal,
  countryInfo,
  optionsToDisplay,
}: Props) => {
  const typedFlagData = flagData as isoFlag[];

  return (
    <Container>
      <InfoContainer>
        <TopData>
          <FlagImage
            src={
              typedFlagData.find(
                (country) =>
                  country.cca3 ===
                  ("countryIso" in countryInfo
                    ? countryInfo.countryIso
                    : (countryInfo as AsylumDecision).countryOfAsylumIso)
              )?.flags.png
            }
          />
          <TextSpan $fontWeight="bold">
            {"country" in countryInfo
              ? countryInfo.country
              : (countryInfo as AsylumDecision).countryOfAsylum}
          </TextSpan>
        </TopData>
        <BodyData>
          {optionsToDisplay.map(
            (
              entry:
                | { label: string; value: keyof DashboardSummary }
                | { label: string; value: keyof AsylumDecision }
            ) => {
              let value: string | number | boolean = 0;

              if ("countryIso" in countryInfo) {
                value = countryInfo[entry.value as keyof DashboardSummary] ?? 0;
              } else if ("countryOfAsylumIso" in countryInfo) {
                value = countryInfo[entry.value as keyof AsylumDecision] ?? 0;
              }

              return (
                <LabelValueContainer key={entry.value}>
                  <TextSpan
                    $fontSizeMD="1rem"
                    $fontSize="0.6rem"
                    $fontWeight="700"
                  >
                    {entry.label}:
                  </TextSpan>
                  <TextSpan $fontSizeMD="1rem;" $fontSize="0.6rem">
                    {isNumber(value) ? humanize(value) : "N/A"}
                  </TextSpan>
                </LabelValueContainer>
              );
            }
          )}
        </BodyData>
      </InfoContainer>

      <CloseModal onClick={() => setOpenModal(false)}>
        <IoCloseOutline color="black" size="1.2rem" />
      </CloseModal>
    </Container>
  );
};

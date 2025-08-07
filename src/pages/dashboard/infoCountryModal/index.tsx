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
import { dashboardKeyOptions, humanize } from "../auxliar";

type isoFlag = {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  cca2: string;
  cca3: string;
};

export const InfoCountryModal = ({ setOpenModal, countryInfo }: Props) => {
  const typedFlagData = flagData as isoFlag[];

  return (
    <Container>
      <InfoContainer>
        <TopData>
          <FlagImage
            src={
              typedFlagData.find(
                (country) => country.cca3 == countryInfo.countryIso
              )?.flags.png
            }
          />
          <TextSpan $fontWeight="bold">{countryInfo.country}</TextSpan>
        </TopData>
        <BodyData>
          {dashboardKeyOptions.map((entry) => {
            const value = (countryInfo[entry.value] as number) ?? 0;
            return (
              <LabelValueContainer key={entry.value}>
                <TextSpan $fontSizeMD="1rem;" $fontSize="0.6rem" $fontWeight="700">{entry.label}:</TextSpan>
                <TextSpan $fontSizeMD="1rem;" $fontSize="0.6rem">{humanize(value)}</TextSpan>
              </LabelValueContainer>
            );
          })}
        </BodyData>
      </InfoContainer>

      <CloseModal onClick={() => setOpenModal(false)}>
        <IoCloseOutline color="black" size="1.2rem" />
      </CloseModal>
    </Container>
  );
};

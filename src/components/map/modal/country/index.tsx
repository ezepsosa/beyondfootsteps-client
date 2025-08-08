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
import { humanize } from "@/components/auxliar";
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
  optionsToDisplay,
  countryInfo,
}: Props) => {
  const typedFlagData = flagData as isoFlag[];

  return (
    <Container>
      <InfoContainer>
        <TopData>
          <FlagImage
            src={
              typedFlagData.find((flag) => flag.cca3 === countryInfo.iso)?.flags
                .svg
            }
          />
          <TextSpan
            $allowEllipsis={true}
            $fontWeight="bold"
            $fontSize="0.8rem"
          >
            {countryInfo.name}
          </TextSpan>
        </TopData>
        <BodyData>
          {optionsToDisplay.map((entry) => {
            return (
              <LabelValueContainer key={entry.key}>
                <TextSpan
                  $fontSizeMD="1rem"
                  $fontSize="0.6rem"
                  $fontWeight="700"
                >
                  {entry.key}:
                </TextSpan>
                <TextSpan $fontSizeMD="1rem;" $fontSize="0.6rem">
                  {isNumber(entry.value) ? humanize(entry.value) : entry.value}
                </TextSpan>
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

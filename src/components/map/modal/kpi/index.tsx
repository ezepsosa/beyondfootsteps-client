import { CloseModal, TextSpan } from "@/styles/styles";
import { IoCloseOutline } from "react-icons/io5";
import type { Props } from "./types";
import { InfoModal } from "./style";


export const InfoKPIModal = ({ openInfo, setOpenInfo, info }: Props) => {
  return (
    <InfoModal $visible={openInfo} $leftLG="16rem">
      <TextSpan
        $fontColor="  rgba(255, 255, 255, 1)"
        $fontWeight="lighter"
        $fontSize="0.8rem"
      >
        {info}
      </TextSpan>
      <CloseModal onClick={() => setOpenInfo(false)}>
        <IoCloseOutline color="white" size="1.2rem" />
      </CloseModal>
    </InfoModal>
  );
};

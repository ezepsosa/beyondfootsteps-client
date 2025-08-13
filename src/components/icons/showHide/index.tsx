import { CustomGoEyeClosed, CustomRxEyeOpen, IconSpan } from "@/styles/styles";
import type { Props } from "./types";

export const ShowHide = ({ setToggle, toggleStatus }: Props) => {
  return (
    <IconSpan onClick={() => setToggle(!toggleStatus)}>
      {toggleStatus ? <CustomRxEyeOpen /> : <CustomGoEyeClosed />}
    </IconSpan>
  );
};

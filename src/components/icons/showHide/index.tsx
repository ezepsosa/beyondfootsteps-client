import { IconSpan } from "@/styles/styles";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";
import type { Props } from "./types";

export const ShowHide = ({ setToggle, toggleStatus }: Props) => {
  return (
    <IconSpan onClick={() => setToggle(!toggleStatus)}>
      {toggleStatus ? (
        <RxEyeOpen size="1.5rem" />
      ) : (
        <GoEyeClosed size="1.5rem" />
      )}
    </IconSpan>
  );
};

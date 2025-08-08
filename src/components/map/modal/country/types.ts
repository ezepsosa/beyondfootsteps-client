
export type Props = {
  setOpenModal: (value: boolean) => void;
  optionsToDisplay: { key: string; value: number | string }[];
  countryInfo: { name: string; iso: string };
};

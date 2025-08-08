import { Selector, Option } from "./styles";

type Props = {
  defaultValue: string | number;
  selectors: { key: string | number; value: string | number }[];
  setOption: (value: string | number) => void;
  paddingMobile?: string;
  paddingDesktop?: string;
};

export const SelectorBar = ({
  defaultValue,
  selectors,
  setOption,
  paddingDesktop,
  paddingMobile,
}: Props) => {
  return (
    <Selector
      key={selectors[0].key}
      id={`selector-bar-${defaultValue}`}
      name={`selector-bar-${defaultValue}`}
      $paddingDesktop={paddingDesktop}
      $paddingMobile={paddingMobile}
      value={defaultValue}
      onChange={(e) => {
      setOption(e.target.value);
      }}
    >
      {selectors?.map((entry) => (
      <Option key={entry.value} value={entry.value} id={`0${entry.value}`}>
        {entry.key}
      </Option>
      ))}
    </Selector>
  );
};

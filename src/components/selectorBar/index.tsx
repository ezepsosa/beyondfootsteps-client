import { Selector, Option } from "./styles";

type Props = {
  defaultValue: string | number;
  selectors: { label: string | number; value: string | number }[];
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
      key={selectors[0].label}
      $paddingDesktop={paddingDesktop || undefined}
      $paddingMobile={paddingMobile || undefined}
      value={defaultValue}
      onChange={(e) => setOption(e.target.value)}
    >
      {selectors?.map((entry) => (
        <Option key={entry.value} value={entry.value}>
          {entry.label}
        </Option>
      ))}
    </Selector>
  );
};

import { Selector, Option } from "./styles";

type Props = {
  selectors: { label: string | number; value: string | number }[];
  setOption: (value: string | number) => void;
};

export const SelectorBar = (props: Props) => {
  return (
    <Selector onChange={(e) => props.setOption(e.target.value)}>
      {props.selectors?.map((entry) => (
        <Option key={entry.value} value={entry.value}>
          {entry.label}
        </Option>
      ))}
    </Selector>
  );
};

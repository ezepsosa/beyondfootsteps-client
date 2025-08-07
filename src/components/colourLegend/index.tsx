import type { ScaleLinear } from "d3-scale";
import {
  LegendContainer,
  CustomRect,
  CustomSVG,
  LegendNumberContainers,
  SimpleDiv,
} from "./style";
import { humanize, roundTwoDigits } from "@/pages/auxliar";

type Props = {
  scale: ScaleLinear<string, string, never>;
};

export const ColourLegend = ({ scale }: Props) => {
  const scaleHeight = 300;
  const numSteps = 10;

  const domain = scale.domain();
  const minValue = domain[0];
  const maxValue = domain[domain.length - 1];

  const scaleValues = Array.from({ length: numSteps }, (_, i) => {
    const t = i / (numSteps - 1);
    return roundTwoDigits(maxValue * (1 - t) + minValue * t);
  });

  return (
    <LegendContainer>
      <CustomSVG height={scaleHeight}>
        {scaleValues.map((value, index) => {
          const colour = scale(value);
          return (
            <CustomRect
              key={value}
              x="0"
              y={(index * scaleHeight) / numSteps}
              width="50"
              height={scaleHeight / numSteps}
              fill={colour}
              stroke="white"
              strokeWidth="1"
            />
          );
        })}
      </CustomSVG>

      <LegendNumberContainers style={{ marginLeft: "10px" }}>
        {scaleValues.map((value, index) => (
          <SimpleDiv
            key={value}
            style={{
              height: scaleHeight / numSteps,
              display: "flex",
              alignItems: "center",
              fontSize: "12px",
            }}
          >
            {index === scaleValues.length - 1
              ? Math.round(value)
              : humanize(value, 1)}
          </SimpleDiv>
        ))}
      </LegendNumberContainers>
    </LegendContainer>
  );
};

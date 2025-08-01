import type { ScaleLinear } from "d3-scale";
import {
  LegendContainer,
  CustomRect,
  CustomSVG,
  LegendNumberContainers,
  SimpleDiv,
} from "./style";

type Props = {
  scale: ScaleLinear<string, string, never>;
};

export const ColourLegend = ({ scale }: Props) => {
  const scaleHeight = 300;
  const numSteps = 10;

  const [minValue, maxValue] = scale.domain();

  const scaleValues = Array.from(
    { length: numSteps },
    (_, index) => maxValue + (index * (minValue - maxValue)) / (numSteps - 1)
  );

  return (
    <LegendContainer>
      <CustomSVG height={scaleHeight}>
        {scaleValues.map((value, index) => {
          const colour = scale(value);
          return (
            <CustomRect
              key={index}
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
        {scaleValues.map((value, i) => (
          <SimpleDiv
            key={i}
            style={{
              height: scaleHeight / numSteps,
              display: "flex",
              alignItems: "center",
              fontSize: "12px",
            }}
          >
            {value.toFixed(1)}
          </SimpleDiv>
        ))}
      </LegendNumberContainers>
    </LegendContainer>
  );
};

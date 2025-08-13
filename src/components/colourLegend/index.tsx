import type { ScaleLinear } from "d3-scale";
import {
  LegendContainer,
  CustomRect,
  CustomSVG,
  LegendNumberContainers,
  SimpleDiv,
} from "./style";
import { humanize, roundTwoDigits } from "@/components/auxliar";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

type Props = {
  scale: ScaleLinear<string, string, never>;
};

export const ColourLegend = ({ scale }: Props) => {
  const [scaleHeight, setScaleHeight] = useState<number>(300);
  const [numSteps, setNumSteps] = useState<number>(10);

  useEffect(() => {
    const handleOrientationChange = () => {
      if (
        isMobile &&
        window.screen.orientation &&
        window.screen.orientation.angle === 90
      ) {
        setScaleHeight(150);
        setNumSteps(5);
      } else {
        setScaleHeight(300);
        setNumSteps(10);
      }
    };

    handleOrientationChange();

    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

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

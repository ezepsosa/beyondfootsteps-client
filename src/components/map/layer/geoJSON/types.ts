import type { ScaleDiverging, ScaleLinear } from "d3-scale";

export type Props = {
  geoColorForMap: {
    scale?:  ScaleLinear<string, string, never> | ScaleDiverging<string, never>;
    colors?: Record<string, string>;
  };
};

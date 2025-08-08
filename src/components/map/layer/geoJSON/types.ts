import type { ScaleDiverging, ScaleLinear } from "d3-scale";

export type Props = {
  geoColourForMap: {
    scale?:  ScaleLinear<string, string, never> | ScaleDiverging<string, never>;
    colours?: Record<string, string>;
  };
};

import type { ScaleLinear } from "d3-scale";

export type Props = {
  geoColourForMap: {
    scale?: ScaleLinear<string, string, never>;
    colours?: Record<string, string>;
  };
};

import type { ScaleLinear } from "d3-scale";
import type { FeatureCollection } from "geojson";
export type Props = {
  data: FeatureCollection;
  geoColourForMap: {
    scale?: ScaleLinear<string, string, never>;
    colours?: Record<string, string>;
  };
};

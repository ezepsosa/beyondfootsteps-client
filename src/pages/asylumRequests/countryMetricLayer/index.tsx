import { isNumber } from "chart.js/helpers";
import { LayerGroup, Marker } from "react-leaflet";
import type { Props } from "./types";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { KpiSpan } from "./style";
import { humanize } from "@/pages/auxliar";

export const CountryAsylumMetricLayer = ({
  asylumRequests,
  centroids,
  originOrAsylum,
  metricSelected,
}: Props) => {
  return (
    <LayerGroup>
      {asylumRequests?.filter(Boolean).map((entry) => {
        const iso =
          originOrAsylum === "asylum"
            ? entry?.countryOfOriginIso
            : entry?.countryOfAsylumIso;
        if (!iso) return null;
        const val = entry?.[metricSelected];
        const center = centroids[iso];
        if (!center || !isNumber(val)) return null;
        return (
          <Marker
            key={`${entry?.id}-${originOrAsylum}`}
            position={[center[1], center[0]]}
            icon={L.divIcon({
              className: "",
              html: ReactDOMServer.renderToStaticMarkup(
                <KpiSpan
                  $fontSize={entry?.appPc ? ".8rem" : ".6rem"}
                  $fontSizeMD={entry?.appPc ? ".8rem" : ".6rem"}
                  $fontWeight={entry?.appPc ? "600" : "400"}
                  $fontColor={entry?.appPc ? "red" : "black"}
                >
                  {humanize(val)}
                  {entry?.appPc ? "*" : ""}
                </KpiSpan>
              ),
            })}
          />
        );
      })}
    </LayerGroup>
  );
};

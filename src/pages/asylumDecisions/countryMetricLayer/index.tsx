import { isNumber } from "chart.js/helpers";
import { LayerGroup, Marker } from "react-leaflet";
import type { Props } from "./types";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { KpiSpan } from "./style";
import { humanize } from "@/pages/auxliar";

export const CountryAsylumMetricLayer = ({
  asylumDecisions,
  centroids,
  originOrAsylum,
  metricSelected,
}: Props) => {
  return (
    <LayerGroup>
      {asylumDecisions.map((entry) => {
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
                  $fontSize={entry?.decPc ? ".8rem" : ".6rem"}
                  $fontSizeMD={entry?.decPc ? ".8rem" : ".6rem"}
                  $fontWeight={entry?.decPc ? "600" : "400"}
                  $fontColor={entry?.decPc ? "red" : "black"}
                >
                  {humanize(val)}
                  {entry?.decPc ? "*" : ""}
                </KpiSpan>
              ),
            })}
          />
        );
      })}
    </LayerGroup>
  );
};

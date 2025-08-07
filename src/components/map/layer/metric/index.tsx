import { LayerGroup, Marker } from "react-leaflet";
import type { Props } from "./types";
import { isNumber } from "chart.js/helpers";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { KpiSpan } from "./style";
import { humanize } from "@/pages/auxliar";

export const MetricLayer = ({
  centroids,
  arrayData,
  originOrAsylum,
  metricSelected,
  setToggleInfo,
  setToggleCountry,
}: Props) => {
  return (
    <LayerGroup>
      {arrayData.map((entry) => {
        let iso: string | undefined;
        if ("countryOfOriginIso" in entry && originOrAsylum) {
          iso =
            originOrAsylum === "asylum"
              ? entry.countryOfOriginIso ?? undefined
              : entry.countryOfAsylumIso ?? undefined;
        } else if ("countryIso" in entry) {
          iso = entry.countryIso ?? undefined;
        }
        if (!iso) return null;
        const val = (entry as Record<string, unknown>)[metricSelected];
        const center = centroids[iso];
        if (!center || !isNumber(val)) return null;
        return (
          <Marker
            key={iso}
            position={[center[1], center[0]]}
            icon={L.divIcon({
              className: "",
              html: renderToStaticMarkup(
                <KpiSpan
                  $fontSize=".7rem"
                  $fontSizeMD=".8rem"
                  $fontWeight="600"
                >
                  {humanize(val)}
                </KpiSpan>
              ),
            })}
            eventHandlers={{
              click: () => {
                setToggleCountry?.(iso);
                setToggleInfo?.(true);
              },
            }}
          />
        );
      })}
    </LayerGroup>
  );
};

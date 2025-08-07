import { isNumber } from "chart.js/helpers";
import { LayerGroup, Marker } from "react-leaflet";
import { humanize } from "../../auxliar";
import type { Props } from "./types";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { KpiSpan } from "./style";

export const CountryDashboardMetricLayer = ({
  dashboardSummariesByYear,
  centroids,
  dashboardKeySelection,
  setCountrySelected,
  setOpenCountryInfo,
}: Props) => {
  return (
    <LayerGroup>
      {dashboardSummariesByYear?.filter(Boolean).map((entry) => {
        const iso = entry!.countryIso;
        if (!iso) return null;
        const val = entry?.[dashboardKeySelection];
        const center = centroids[iso];
        if (!center || !isNumber(val)) return null;
        return (
          <Marker
            key={iso}
            position={[center[1], center[0]]}
            icon={L.divIcon({
              className: "",
              html: ReactDOMServer.renderToStaticMarkup(
                <KpiSpan $fontSize=".6rem" $fontSizeMD=".6rem" $fontWeight="400">{humanize(val)}</KpiSpan>
              ),
            })}
            eventHandlers={{
              click: () => {
                setCountrySelected(iso);
                setOpenCountryInfo(true);
              },
            }}
          />
        );
      })}
    </LayerGroup>
  );
};

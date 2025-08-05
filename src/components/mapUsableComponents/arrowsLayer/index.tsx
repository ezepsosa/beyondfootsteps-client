import { useEffect } from "react";
import type { Props } from "./types";
import { useMap } from "react-leaflet";
import "leaflet-polylinedecorator";
import L from "leaflet";
import "@elfalem/leaflet-curve";
import type { CurvePathData } from "@elfalem/leaflet-curve";

export const ArrowLayer = ({ origin, destiny, weight }: Props) => {
  const map = useMap();

  useEffect(() => {
    const controlPointLat = (origin[0] + destiny[0]) / 2 + 10;
    const controlPointLng = (origin[1] + destiny[1]) / 2;

    const path = [
      "M",
      origin,
      "Q",
      [controlPointLat, controlPointLng],
      destiny,
    ];

    const approxPoints: L.LatLngExpression[] = [
      origin,
      [controlPointLat, controlPointLng],
      destiny,
    ];
    const polyline = L.polyline(approxPoints, { opacity: 0 });

    const decorator = L.polylineDecorator(polyline, {
      patterns: [
        {
          offset: "100%",
          repeat: 0,
          symbol: L.Symbol.arrowHead({
            pixelSize: 10,
            pathOptions: {
              fillOpacity: 1,
              color: "blue",
              weight: weight / 4 + 0.5,
            },
          }),
        },
      ],
    }).addTo(map);

    const curve = L.curve(path as CurvePathData, {
      color: "blue",
      weight: weight / 4 + 0.4,
    }).addTo(map);

    return () => {
      map.removeLayer(decorator);
      map.removeLayer(curve);
    };
  }, [origin, destiny, map, weight]);
  return null;
};
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

    const curve = L.curve(path as CurvePathData, {
      color: "red",
      weight: weight/2 + 0.4,
    }).addTo(map);

    return () => {
      map.removeLayer(curve);
    };
  }, [origin, destiny, map, weight]);
  return null;
};

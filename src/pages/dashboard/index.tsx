import {
  MapContainer,
  TileLayer,
  GeoJSON,
  LayerGroup,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geoDataRaw from "@assets/countries.geojson.json";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import {
  useGetDashboardSummaryByYearQuery,
  type DashboardSummary,
} from "@/gql/graphql";
import { useEffect, useMemo, useState } from "react";
import { scaleLinear } from "d3-scale";
import { isNumber } from "chart.js/helpers";
import { SelectorBar } from "@/components/selectorBar";
import {
  CloseModal,
  IconSpan,
  InfoModal,
  KpiSpan,
  LowerContainer,
  TopButtomContainer,
} from "./styles";
import { ColourLegend } from "@/components/colourLegend";
import {
  dashboardKeyOptions,
  dashboardYearOptions,
  humanize,
  INDICATOR_INFO,
} from "./auxliar";
import { IoCloseOutline, IoInformationCircle } from "react-icons/io5";
import { geoCentroid } from "d3-geo";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { InfoCountryModal } from "./infoCountryModal";
import { TextSpan } from "@/styles/styles";

const geoData: FeatureCollection =
  geoDataRaw && typeof geoDataRaw === "object" && "type" in geoDataRaw
    ? (geoDataRaw as FeatureCollection)
    : { type: "FeatureCollection", features: [] };

export const Dashboard = () => {
  const [dashboardKeySelection, setDashboardKeySelection] = useState<
    number | string
  >("coverageRate");

  const [dashboardYearSelection, setDashboardYearSelection] = useState<
    number | string
  >(2024);

  const [info, setInfo] = useState<string>();
  const [countrySelected, setCountrySelected] = useState<string>();
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [showMetric, setShowMetric] = useState<boolean>(true);
  const [openCountryInfo, setOpenCountryInfo] = useState<boolean>(true);

  const mapStyle = { width: "100%", height: "100%" };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, loading, error } = useGetDashboardSummaryByYearQuery({
    variables: { year: Number(dashboardYearSelection) },
  });

  if (error) {
    console.warn("Error fetching dashboard data");
  }

  const getColourForMap = useMemo(() => {
    if (!data?.dashboardSummariesByYear) return {};

    const entries = data.dashboardSummariesByYear.filter(Boolean);

    const values: number[] = entries
      .map(
        (dashboardElement) =>
          dashboardElement?.[dashboardKeySelection as keyof DashboardSummary]
      )
      .filter((value) => isNumber(value));

    if (values.length === 0) return {};

    const min = Math.min(...values);
    const max = Math.max(...values);

    const scale = scaleLinear<string>()
      .domain([min, max])
      .range(["#2bff00ff", "#00478fff"])
      .clamp(true);

    const colours = Object.fromEntries(
      entries.map((entry) => {
        const country =
          entry?.[dashboardKeySelection as keyof DashboardSummary];
        return [
          entry!.countryIso,
          typeof country === "number" ? scale(country) : "#ccc",
        ];
      })
    );
    return { scale, colours };
  }, [data, dashboardKeySelection]);

  const centroids = useMemo(() => {
    const countryCenter: Record<string, [number, number]> = {};
    geoData.features?.forEach((f: Feature<Geometry>) => {
      const iso = f.properties?.["ISO3166-1-Alpha-3"];
      countryCenter[iso] = geoCentroid(f);
    });
    return countryCenter;
  }, []);

  useEffect(() => {
    if (dashboardKeySelection) {
      setInfo(INDICATOR_INFO[dashboardKeySelection]);
    }
  }, [dashboardKeySelection]);

  return (
    <>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={mapStyle}
        maxZoom={6}
        minZoom={3}
        maxBounds={[
          [-85, -170],
          [85, 180],
        ]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.hotosm.org/">Humanitarian OpenStreetMap Team</a> &copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={18}
        />
        <GeoJSON
          data={geoData}
          style={(feature) => {
            const country = feature?.properties?.["ISO3166-1-Alpha-3"];
            return {
              fillColor: getColourForMap.colours?.[country] || "#ccc",
              weight: 1,
              color: "white",
              fillOpacity: 0.8,
            };
          }}
        ></GeoJSON>
        {showMetric && (
          <LayerGroup>
            {data?.dashboardSummariesByYear?.filter(Boolean).map((entry) => {
              const iso = entry!.countryIso;
              if (!iso) return null;
              const val =
                entry?.[dashboardKeySelection as keyof DashboardSummary];
              const center = centroids[iso];
              if (!center || !isNumber(val)) return null;
              return (
                <Marker
                  key={iso}
                  position={[center[1], center[0]]}
                  icon={L.divIcon({
                    className: "",
                    html: ReactDOMServer.renderToStaticMarkup(
                      <KpiSpan>{humanize(val)}</KpiSpan>
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
        )}
        <LowerContainer>
          <SelectorBar
            defaultValue={dashboardYearSelection}
            paddingMobile="0.4rem 2.5rem;"
            selectors={dashboardYearOptions}
            setOption={setDashboardYearSelection}
          />
          <SelectorBar
            defaultValue={dashboardKeySelection}
            selectors={dashboardKeyOptions}
            setOption={setDashboardKeySelection}
          />
          {getColourForMap.scale && (
            <ColourLegend scale={getColourForMap.scale}></ColourLegend>
          )}
        </LowerContainer>
      </MapContainer>
      <TopButtomContainer>
        <IconSpan onClick={() => setOpenInfo((value) => !value)}>
          <IoInformationCircle size="1.5rem" />
        </IconSpan>
        <IconSpan onClick={() => setShowMetric((value) => !value)}>
          {showMetric ? (
            <RxEyeOpen size="1.5rem" />
          ) : (
            <GoEyeClosed size="1.5rem" />
          )}
        </IconSpan>
      </TopButtomContainer>

      <InfoModal $visible={openInfo}>
        <TextSpan
          $fontColor="  rgba(255, 255, 255, 1)"
          $fontWeight="lighter"
          $fontSize="0.8rem"
        >
          {info}
        </TextSpan>
        <CloseModal onClick={() => setOpenInfo(false)}>
          <IoCloseOutline color="white" size="1.2rem" />
        </CloseModal>
      </InfoModal>

      {openCountryInfo &&
        countrySelected &&
        (() => {
          const countryInfo = data?.dashboardSummariesByYear?.find(
            (country) => country?.countryIso == countrySelected
          );
          if (!countryInfo) return null;
          return (
            <InfoCountryModal
              setOpenModal={setOpenCountryInfo}
              countryInfo={countryInfo}
            />
          );
        })()}
    </>
  );
};

import { MapContainer, TileLayer } from "react-leaflet";

export const MapComponent = ({ children, zoom = 3, center = [30, 0] }: { children?: React.ReactNode, zoom?: number, center?: [number, number] }) => {
    const mapStyle = { width: "100%", height: "100%" };

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={mapStyle}
            maxZoom={9}
            minZoom={2.5}
            zoomControl={false}
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
            {children}
        </MapContainer>
    );
};

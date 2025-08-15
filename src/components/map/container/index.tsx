import { AttributionControl, MapContainer, TileLayer } from "react-leaflet";

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
            worldCopyJump={true}
            preferCanvas={true}
            maxBoundsViscosity={1.0}
            attributionControl={false}
        >
            <AttributionControl position="topright" prefix={false} />
            <TileLayer
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.hotosm.org/">Humanitarian OpenStreetMap Team</a> &copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                maxZoom={18}

            />
            {children}
        </MapContainer>
    );
};

"use client";

import { useRef, useMemo } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet"
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});


const LeafletMap = ({ centeredLoc, allLocs }) => {
  const markerRef = useRef();

  const eventHandlers = useMemo(
    () => ({
      mouseover() {
        if (markerRef.current) markerRef.current.openPopup();
      },
      mouseout() {
        if (markerRef.current) markerRef.current.closePopup();
      },
      click() {
        if (markerRef.current) markerRef.current.togglePopup();
      }
    }),
    []
  )

  return (
    <div className="map-div">
      <MapContainer className="map" center={[centeredLoc[0].lat, centeredLoc[0].lng]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
        <Marker
          ref={markerRef}
          position={[centeredLoc[0].lat, centeredLoc[0].lng]}
          eventHandlers={eventHandlers}
        >
        <Popup>
          {centeredLoc[0].name}
        </Popup>
      </Marker>
    </MapContainer>
    </div>
  )
}

export default LeafletMap;

"use client";

import { useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "@/app/styles/map.scss";
import popout from "public/images/icons/popout.png";
import Image from "next/image";

import L from "leaflet";
import redMarker from "public/images/icons/map-marker.png";

import Clusters from "./Clusters";
import CenteredMarker from "./CenteredMarker";

const LeafletMap = ({ centeredLoc, allLocs }) => {
  const centeredLocIcon = useMemo(() => L.icon({
    iconUrl: redMarker.src,
    iconSize: [36, 36],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
    shadowUrl: "",
  }), []);

  return (
    <div className="map-div">
      <MapContainer className="map" center={[centeredLoc[0].lat, centeredLoc[0].lng]} zoom={13} scrollWheelZoom={true}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Clusters allLocs={allLocs} />
        <CenteredMarker centeredLoc={centeredLoc} icon={centeredLocIcon} />
        <button className="map-popout-btn">
          <div className="popout-icon-wrapper">
            <Image
              className="popout-icon"
              src={popout}
              width={15}
              height={15}
              alt="Popout Icon"
            />
          </div>
        </button>
      </MapContainer>

    </div>
  );
};

export default LeafletMap;

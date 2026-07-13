"use client";

import { useMemo, useState, useEffect, useRef } from "react";
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
  const [fullscreen, setFullscreen] = useState(false);
  const mapRef = useRef(null);

  const centeredLocIcon = useMemo(() => L.icon({
    iconUrl: redMarker.src,
    iconSize: [36, 36],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
    shadowUrl: "",
  }), []);

  const toggleFullscreen = (e) => {
    e.preventDefault();
    setFullscreen(!fullscreen)
  }

  const filteredLocs = useMemo(() => {
    return allLocs.filter((loc) => loc.id !== centeredLoc[0].id)
  }, [allLocs, centeredLoc])

  useEffect(() => {
    mapRef.current?.invalidateSize();
  }, [fullscreen]);

  useEffect(() => {
    if (!fullscreen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [fullscreen]);

  const fullscreenClass = fullscreen ? "fullscreen" : "";

  return (
    <div className={`map-div ${fullscreenClass}`}>
      <MapContainer ref={mapRef} className="map" center={[centeredLoc[0].lat, centeredLoc[0].lng]} zoom={13} scrollWheelZoom={true}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Clusters allLocs={filteredLocs} />
        <CenteredMarker centeredLoc={centeredLoc} icon={centeredLocIcon} />
        <button
          className="map-popout-btn"
          onClick={toggleFullscreen}
        >
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

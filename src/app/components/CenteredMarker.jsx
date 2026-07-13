import Link from "next/link";
import { useEffect, useRef } from "react"
import { Marker, Popup } from "react-leaflet";

const CenteredMarker = ({ centeredLoc, icon }) => {
  const markerRef = useRef();

  useEffect(() => {
    if (markerRef.current) markerRef.current.openPopup();
  }, []);

  return (
    <Marker
      ref={markerRef}
      position={[centeredLoc[0].lat, centeredLoc[0].lng]}
      icon={icon}
    >
      <Popup>
        <Link
          className="loc-popup-link"
          href={`/?locations=${encodeURIComponent(centeredLoc[0].name)}`}>{centeredLoc[0].name}</Link>
      </Popup>
    </Marker>
  )
}

export default CenteredMarker;
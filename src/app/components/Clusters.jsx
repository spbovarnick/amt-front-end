import { useState, useMemo } from "react";
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import Link from "next/link";
import L from "leaflet";
import Supercluster from "supercluster";
import blueMarker from "public/images/icons/map-marker-blue.png";

const Clusters = ({ allLocs }) => {
  const map = useMap();
  const [bounds, setBounds] = useState(() => {
    const b = map.getBounds();
    return [b.getWest(), b.getSouth(), b.getEast(), b.getNorth()];
  });
  const [zoom, setZoom] = useState(() => map.getZoom());

  useMapEvents({
    moveend() {
      const b = map.getBounds();
      setBounds([b.getWest(), b.getSouth(), b.getEast(), b.getNorth()]);
    },
    zoomend() {
      setZoom(map.getZoom());
    },
  });

  const sc = useMemo(() => {
    const index = new Supercluster({ radius: 75, maxZoom: 17 });
    index.load(allLocs.map((loc) => ({
      type: "Feature",
      properties: { locationId: loc.id, name: loc.name },
      geometry: { type: "Point", coordinates: [loc.lng, loc.lat] },
    })));
    return index;
  }, [allLocs]);

  const clusters = useMemo(() => sc.getClusters(bounds, zoom), [sc, bounds, zoom]);

  const secondaryMarkerIcon = useMemo(() => L.icon({
    iconUrl: blueMarker.src,
    iconSize: [36, 36],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
    shadowUrl: "",
  }), []);

  return clusters.map((cluster) => {
    const [lng, lat] = cluster.geometry.coordinates;
    const { cluster: isCluster, point_count } = cluster.properties;

    if (isCluster) {
      return (
        <Marker
          key={`cluster-${cluster.id}`}
          position={[lat, lng]}
          icon={L.divIcon({
            html: `<div class="cluster-marker">${point_count}</div>`,
            className: "",
            iconSize: [40, 40],
          })}
          eventHandlers={{
            click() {
              const expansionZoom = sc.getClusterExpansionZoom(cluster.id);
              map.setView([lat, lng], expansionZoom, { animate: true });
            }
          }}
        />
      );
    }

    return (
      <Marker
        key={`loc-${cluster.properties.locationId}`}
        position={[lat, lng]}
        icon={secondaryMarkerIcon}
      >
        <Popup>
          <Link className="loc-popup-link" href={`/?locations=${encodeURIComponent(cluster.properties.name)}`}>
            {cluster.properties.name}
          </Link>
        </Popup>
      </Marker>
    );
  });
};

export default Clusters;

'use client';

import React, {useEffect, useRef, useState} from "react";
import GoogleMapReact from "google-map-react";
import LocationMarker from "./LocationMarker";
import { getAllLocations } from "@/utils/api";
import useSupercluster from "use-supercluster";

const Map = ({ itemLocation }) => {
    const [zoom, setZoom] = useState(15);
    const [bounds, setBounds] = useState(null);
    const [allLocations, setAllLocations] = useState([]);
    const mapRef = useRef();

    // fetch all locations to set state and render markers/clusterse
    useEffect(() => {
        (async () => {
            const fetchedLocations = await getAllLocations();
            setAllLocations(fetchedLocations)
        })();
    },[])

    const Marker = ({children}) => children;

    const points = allLocations.map(location => ({
        type: "Feature",
        properties: {
            cluster: false,
            locationId: location.id,
            name: location.name,
            text: location.description
        },
        geometry: {
            type: "Point",
            coordinates: [
                location.lng,
                location.lat
            ]
        }
    }));

    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom,
        options: {radius: 75, maxZoom: 20}
    })

    const mapOptions = {
        mapTypeControl: true,
        streetViewControl: true
    }

    return (
        (allLocations &&
            <div className="map">
            {/* this component is from the google-map-react library */}
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
                center={[itemLocation[0].lat, itemLocation[0].lng]}
                zoom={15}
                options={mapOptions}
                // yesIWantToUse prop allows access to onGoogleApiLoaded hook
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map }) => {
                    mapRef.current = map;
                }}
                onChange={({ zoom, bounds }) => {
                    setZoom(zoom);
                    setBounds([
                        bounds.nw.lng,
                        bounds.se.lat,
                        bounds.se.lng,
                        bounds.nw.lat
                    ])
                }}
            >
                {clusters.map(cluster => {
                    const [longitude, latitude] = cluster.geometry.coordinates;
                    const {
                        cluster: isCluster,
                        point_count: pointCount
                    } = cluster.properties;

                    if (isCluster) {
                        return (
                            <Marker key={cluster.id} lat={latitude} lng={longitude}>
                                <div
                                    className="cluster-marker"
                                    style={{
                                        width: `${15 + (pointCount / points.length) * 75}px`,
                                        height: `${15 + (pointCount / points.length) * 75}px`
                                    }}
                                    onClick={() => {
                                        const expansionZooom = Math.min(
                                            supercluster.getClusterExpansionZoom(cluster.id),
                                            20
                                        );
                                        mapRef.current.setZoom(expansionZooom);
                                        mapRef.current.panTo({ lat: latitude, lng: longitude });
                                    }}
                                >
                                    {pointCount}
                                </div>
                            </Marker>
                        )
                    }

                    return (
                        <LocationMarker
                            key={cluster.properties.locationId}
                            name={cluster.properties.name}
                            lat={latitude}
                            lng={longitude}
                            text={cluster.properties.text}
                            id={cluster.properties.locationId}
                            archiveItemLocationId={itemLocation[0].id}
                        />
                    )
                })}
            </GoogleMapReact>
        </div>)
    )
}

export default Map
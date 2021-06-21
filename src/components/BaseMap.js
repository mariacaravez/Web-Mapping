import React, { useRef, useState, useEffect } from 'react';
import env from "react-dotenv";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = env.MB_TOKEN;


const BaseMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(-74.5);
  const [lat, setLat] = useState(40);
  const [zoom, setZoom] = useState(2);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [lng, lat],
      zoom: zoom,
    });

    // Add zoom +/- controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
  }, []);



  // Saves coordinates from zoom
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
  <div className="sidebar">
    Longitude: {lng} | Latitude: {lat} | {zoom}
  </div>
  <div ref={mapContainer} className="map-container" />
    </div>       

 
  )
};
 
export default BaseMap;
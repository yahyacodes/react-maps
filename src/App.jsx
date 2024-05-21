import { useRef, useEffect, useState } from "react";
import "./App.css";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_ACCESS_TOKEN;
// console.log(accessToken);

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(16.1133);
  const [lat, setLat] = useState(50.1076);
  const [zoom, setZoom] = useState(4.16);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      // setLat(map.current.getCenter().lat.foFixed(2));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <>
      <div>
        <div ref={mapContainer} className="map-container">
          <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

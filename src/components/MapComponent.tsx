import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { Badge } from "@/components/ui/badge";
import { Users, AlertTriangle, Navigation } from "lucide-react";
import "leaflet/dist/leaflet.css";

// 🔹 Custom glowing dot icon generator
const createDotIcon = (color: string) =>
  L.divIcon({
    className: "custom-dot-icon",
    html: `<div style="
      width: 16px;
      height: 16px;
      background:${color};
      border-radius:50%;
      box-shadow: 0 0 10px white, 0 0 10px white;
    "></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7], // center aligned
  });

const MapComponent = () => {
  const [position] = useState<[number, number]>([26.5775, 93.1714]); // Current User
  const [touristCount, setTouristCount] = useState(28);
  const [zone, setZone] = useState<"safe" | "moderate" | "high">("moderate");

  useEffect(() => {
    const interval = setInterval(() => {
      const zones: ("safe" | "moderate" | "high")[] = ["safe", "moderate", "high"];
      setZone(zones[Math.floor(Math.random() * zones.length)]);
      setTouristCount(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const getZoneColor = (zone: string) => {
    if (zone === "safe") return "green";
    if (zone === "moderate") return "orange";
    return "red";
  };

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden">
     <MapContainer
        center={position}
        zoom={14}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        attributionControl={false}   // 👈 attribution ko disable kar diya
      >
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
        {/* Current User (Blue Dot) */}
        <Marker position={position} icon={createDotIcon("blue")}>
          <Popup>You are here 📍</Popup>
        </Marker>

        {/* Other Tourists (Green Dots) */}
        <Marker position={[26.5800, 93.1750]} icon={createDotIcon("green")}>
          <Popup>Other Tourist</Popup>
        </Marker>
        <Marker position={[26.5750, 93.1650]} icon={createDotIcon("green")}>
          <Popup>Other Tourist</Popup>
        </Marker>

        {/* Landmark (Orange Dot) */}
        <Marker position={[26.5720, 93.1700]} icon={createDotIcon("orange")}>
          <Popup>Safari Point</Popup>
        </Marker>

        {/* Tourist Zone Circle */}
        <Circle
          center={position}
          radius={600}
          pathOptions={{
            color: getZoneColor(zone),       // Border color
            weight: 1,                       // Border ko thin kar diya
            opacity: 0.3,                    // Border transparency
            fillColor: getZoneColor(zone),   // Fill same color
            fillOpacity: 0.2                 // Fill halki rakhi
         }}
/>
      </MapContainer>

      {/* UI Overlays */}
      <div className="absolute top-4 left-11 flex flex-col gap-2 z-[999]">
        <Badge variant="outline" className="bg-white/90 shadow-sm">
          <Users className="h-3 w-3 mr-1" />
          {touristCount} Tourists Nearby
        </Badge>
        <Badge className="bg-white/90 text-white shadow-md" style={{ backgroundColor: getZoneColor(zone) }}>
          <AlertTriangle className="h-3 w-3 mr-1" />
          {zone === "safe" ? "Safe Zone" : zone === "moderate" ? "Moderate Risk" : "High Risk"}
        </Badge>
      </div>

      {/* Top-right */}
      <div className="absolute top-4 right-4 space-y-2 z-[999]">
        <div className="bg-white/90 p-2 rounded shadow">
          <Navigation className="h-4 w-4 text-primary" />
        </div>
        <div className="bg-white/90 p-2 rounded shadow text-xs">
          <div className="font-mono text-primary">{position[0].toFixed(4)}°N</div>
          <div className="font-mono text-primary">{position[1].toFixed(4)}°E</div>
        </div>
      </div>

      {/* Bottom-right legend */}
      <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded shadow text-xs space-y-1 z-[999]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
          <span>You</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
          <span>Other Tourists</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse"></div>
          <span>Landmarks</span>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;

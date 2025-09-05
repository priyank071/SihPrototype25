import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, AlertTriangle, Users } from "lucide-react";

const MapComponent = () => {
  const [activeZone, setActiveZone] = useState("safe");
  const [touristCount, setTouristCount] = useState(47);

  // Simulate real-time zone changes
  useEffect(() => {
    const interval = setInterval(() => {
      const zones = ["safe", "moderate", "high"];
      const randomZone = zones[Math.floor(Math.random() * zones.length)];
      setActiveZone(randomZone);
      setTouristCount(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getZoneColor = (zone: string) => {
    switch (zone) {
      case "safe":
        return "bg-success";
      case "moderate":
        return "bg-warning";
      case "high":
        return "bg-danger";
      default:
        return "bg-muted";
    }
  };

  const getZoneText = (zone: string) => {
    switch (zone) {
      case "safe":
        return "Safe Zone";
      case "moderate":
        return "Moderate Risk";
      case "high":
        return "High Risk";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="relative w-full h-80 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg overflow-hidden">
      {/* Map Background Simulation */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-green-100">
        {/* Simulated map roads and landmarks */}
        <div className="absolute top-1/4 left-1/4 w-32 h-1 bg-gray-400 opacity-50 rotate-12"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-1 bg-gray-400 opacity-50 -rotate-12"></div>
        
        {/* Tourist location markers */}
        <div className="absolute top-1/3 left-1/3 w-4 h-4 bg-primary rounded-full shadow-soft animate-pulse">
          <div className="absolute -top-8 -left-6 text-xs bg-card px-2 py-1 rounded shadow-soft whitespace-nowrap">
            Current Location
          </div>
        </div>
        
        {/* Other tourist markers */}
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-success rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-success rounded-full"></div>
        <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-warning rounded-full"></div>
        
        {/* Risk zones */}
        <div className={`absolute top-1/4 right-1/4 w-16 h-16 ${getZoneColor(activeZone)} opacity-30 rounded-full`}></div>
        
        {/* Landmarks */}
        <div className="absolute bottom-1/4 left-1/4">
          <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
            <MapPin className="h-3 w-3 text-secondary-foreground" />
          </div>
          <div className="absolute -bottom-6 -left-4 text-xs bg-card px-2 py-1 rounded shadow-soft whitespace-nowrap">
            Safari Point
          </div>
        </div>
      </div>

      {/* Map Controls & Info */}
      <div className="absolute top-4 left-4 space-y-2">
        <Badge variant="outline" className="bg-card/90">
          <Users className="h-3 w-3 mr-1" />
          {touristCount} Tourists Nearby
        </Badge>
        
        <Badge className={`${getZoneColor(activeZone)} text-white`}>
          <AlertTriangle className="h-3 w-3 mr-1" />
          {getZoneText(activeZone)}
        </Badge>
      </div>

      {/* Navigation Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <div className="bg-card/90 p-2 rounded shadow-soft">
          <Navigation className="h-4 w-4 text-primary" />
        </div>
        <div className="bg-card/90 p-2 rounded shadow-soft text-xs">
          <div className="text-center">
            <div className="font-mono text-primary">26.5775°N</div>
            <div className="font-mono text-primary">93.1714°E</div>
          </div>
        </div>
      </div>

      {/* Live Updates Indicator */}
      <div className="absolute bottom-4 left-4">
        <div className="flex items-center gap-2 bg-card/90 px-3 py-1 rounded shadow-soft">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs font-medium">Live Tracking</span>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-card/90 p-3 rounded shadow-soft">
        <div className="text-xs space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>You</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>Other Tourists</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
            <span>Landmarks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;

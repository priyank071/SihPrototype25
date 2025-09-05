import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  MapPin, 
  AlertTriangle, 
  PhoneCall, 
  User, 
  Settings,
  Navigation,
  Clock,
  Heart,
  Wifi,
  WifiOff
} from "lucide-react";
import { Link } from "react-router-dom";
import MapComponent from "@/components/MapComponent";
import { useToast } from "@/hooks/use-toast";

const TouristDashboard = () => {
  const [safetyScore, setSafetyScore] = useState(85);
  const [isOnline, setIsOnline] = useState(true);
  const [currentLocation, setCurrentLocation] = useState("Kaziranga National Park, Assam");
  const [sosActive, setSosActive] = useState(false);
  const { toast } = useToast();

  // Simulate real-time safety score updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSafetyScore(prev => {
        const variation = Math.floor(Math.random() * 10) - 5; // ±5 variation
        return Math.max(0, Math.min(100, prev + variation));
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSOSPress = () => {
    setSosActive(true);
    toast({
      title: "🚨 SOS Alert Activated",
      description: "Emergency services, police, and your emergency contacts have been notified with your current location.",
    });
    
    // Simulate SOS deactivation after 10 seconds
    setTimeout(() => {
      setSosActive(false);
    }, 10000);
  };

  const getSafetyScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-danger";
  };

  const getSafetyScoreVariant = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  const nearbyAlerts = [
    { id: 1, type: "warning", message: "High tourist traffic in Elephant Safari area", time: "5 min ago" },
    { id: 2, type: "info", message: "Weather update: Light rain expected at 3 PM", time: "15 min ago" },
    { id: 3, type: "success", message: "Safe zone: Visitor Center area", time: "30 min ago" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <div className="bg-card border-b shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">TourShield Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, Tourist</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                {isOnline ? (
                  <Wifi className="h-4 w-4 text-success" />
                ) : (
                  <WifiOff className="h-4 w-4 text-danger" />
                )}
                <span className="text-sm">{isOnline ? "Online" : "Offline"}</span>
              </div>
              
              <Link to="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
              
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Safety Score Card */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Current Safety Score
                  </span>
                  <Badge variant={getSafetyScoreVariant(safetyScore)} className="text-lg px-3 py-1">
                    {safetyScore}/100
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={safetyScore} className="h-3" />
                  <div className={`text-2xl font-bold ${getSafetyScoreColor(safetyScore)}`}>
                    {safetyScore >= 80 ? "Safe Zone" : safetyScore >= 60 ? "Moderate Risk" : "High Risk"}
                  </div>
                  <p className="text-muted-foreground">
                    Based on location analysis, time of day, historical data, and real-time threat assessment.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Live Location & Map */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-secondary" />
                  Live Location Tracking
                </CardTitle>
                <CardDescription>
                  Current location: {currentLocation}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg overflow-hidden">
                  <MapComponent />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="text-lg">Emergency Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant={sosActive ? "destructive" : "sos"} 
                    size="lg" 
                    className="w-full"
                    onClick={handleSOSPress}
                    disabled={sosActive}
                  >
                    <PhoneCall className="mr-2 h-5 w-5" />
                    {sosActive ? "SOS Active - Help Coming!" : "Emergency SOS"}
                  </Button>
                  
                  <Button variant="outline" size="lg" className="w-full">
                    <MapPin className="mr-2 h-4 w-4" />
                    Share Location
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Digital ID:</span>
                    <span className="font-mono text-sm">TS87654321</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last Update:</span>
                    <span className="text-sm flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Just now
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Emergency Contact:</span>
                    <span className="text-sm text-success">Active</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Nearby Alerts */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Nearby Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {nearbyAlerts.map((alert) => (
                  <div key={alert.id} className="border-l-4 border-l-primary/50 pl-3 py-2">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Health Status */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-danger" />
                  Health Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Heart Rate</span>
                  <Badge variant="outline">72 BPM</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Check-in</span>
                  <Badge variant="outline">5 min ago</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Status</span>
                  <Badge variant="default" className="bg-success">Normal</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Language Settings */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-lg">Language</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm">EN</Button>
                  <Button variant="default" size="sm">हिं</Button>
                  <Button variant="outline" size="sm">অসমীয়া</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristDashboard;
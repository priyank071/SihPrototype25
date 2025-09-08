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
  const [language, setLanguage] = useState("EN");
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setSafetyScore(prev => {
        const variation = Math.floor(Math.random() * 10) - 5;
        return Math.max(0, Math.min(100, prev + variation));
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleSOSPress = () => {
    setSosActive(true);
    toast({
      title: "🚨 SOS Alert Activated",
      description: "Emergency services, police, and your emergency contacts have been notified with your current location.",
    });

    setTimeout(() => {
      setSosActive(false);
    }, 10000);
  };

  const getSafetyScoreColor = (score) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-danger";
  };

  const getSafetyScoreVariant = (score) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  const nearbyAlerts = [
    { id: 1, type: "warning", message: "High tourist traffic in Elephant Safari area", time: "5 min ago" },
    { id: 2, type: "info", message: "Weather update: Light rain expected at 3 PM", time: "15 min ago" },
    { id: 3, type: "success", message: "Safe zone: Visitor Center area", time: "30 min ago" }
  ];

  const translations = {
    EN: { emergency: "Emergency SOS", shareLocation: "Share Location", digitalId: "Digital ID" },
    हिंदी: { emergency: "आपातकालीन SOS", shareLocation: "स्थान साझा करें", digitalId: "डिजिटल आईडी" },
    অসমীয়া: { emergency: "জৰুৰী SOS", shareLocation: "অৱস্থান শ্বেয়াৰ কৰক", digitalId: "ডিজিটেল ID" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative">

      {/* Header */}
      <div className="bg-card border-b shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
           <img src="/logo.png" alt="" className="w-16 h-16" />
            <div>
              <h1 className="text-2xl font-bold">TourShield Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, Tourist</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              {isOnline ? <Wifi className="h-4 w-4 text-success" /> : <WifiOff className="h-4 w-4 text-danger" />}
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

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
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

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="text-lg">Emergency Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="destructive"
                    size="lg"
                    className="w-full"
                    onClick={handleSOSPress}
                    disabled={sosActive}
                  >
                    <PhoneCall className="mr-2 h-5 w-5" />
                    {sosActive ? "SOS Active - Help Coming!" : translations[language].emergency}
                  </Button>

                  <Button variant="outline" size="lg" className="w-full">
                    <MapPin className="mr-2 h-4 w-4" />
                    {translations[language].shareLocation}
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{translations[language].digitalId}</span>
                    <span className="font-mono text-sm">TS87654321</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last Update:</span>
                    <span className="text-sm flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Just now
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

          <div className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Nearby Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {nearbyAlerts.map(alert => (
                  <div key={alert.id} className="border-l-4 border-l-primary/50 pl-3 py-2">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

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

            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-lg">Language</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {["EN", "हिंदी", "অসমীয়া"].map(lang => (
                    <Button
                      key={lang}
                      variant={language === lang ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLanguage(lang)}
                    >
                      {lang}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Fixed Circular SOS Button */}
      <button
        className={`fixed bottom-6 right-6 w-16 h-16 bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center z-50`}
        onClick={handleSOSPress}
        disabled={sosActive}
      >
        <PhoneCall className="h-6 w-6" />
      </button>
    </div>
  );
};

export default TouristDashboard;

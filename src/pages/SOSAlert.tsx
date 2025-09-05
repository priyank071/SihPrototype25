import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Clock, 
  User, 
  Shield,
  Navigation,
  HeartHandshake,
  Car,
  Hospital
} from "lucide-react";
import { useParams, Link } from "react-router-dom";
import MapComponent from "@/components/MapComponent";
import { useToast } from "@/hooks/use-toast";

const SOSAlert = () => {
  const { alertId } = useParams();
  const [responseProgress, setResponseProgress] = useState(0);
  const [eta, setEta] = useState(8);
  const [responderStatus, setResponderStatus] = useState("dispatched");
  const { toast } = useToast();

  // Simulate real-time response tracking
  useEffect(() => {
    const interval = setInterval(() => {
      setResponseProgress(prev => {
        if (prev < 100) {
          const newProgress = prev + Math.random() * 10;
          if (newProgress >= 100) {
            setResponderStatus("arrived");
            toast({
              title: "🚨 Rescue Team Arrived!",
              description: "Emergency responders have reached the tourist location.",
            });
          } else if (newProgress >= 75) {
            setResponderStatus("approaching");
          } else if (newProgress >= 25) {
            setResponderStatus("enroute");
          }
          return Math.min(100, newProgress);
        }
        return prev;
      });
      
      setEta(prev => Math.max(0, prev - 0.5));
    }, 3000);

    return () => clearInterval(interval);
  }, [toast]);

  const alertData = {
    id: alertId || "SOS001",
    tourist: {
      name: "Rahul Sharma",
      id: "TS87654321",
      phone: "+91 9876543210",
      emergencyContact: "Priya Sharma (+91 9876543211)"
    },
    location: {
      address: "Kaziranga National Park, Zone 2",
      coordinates: "26.5775, 93.1714",
      nearestLandmark: "Elephant Safari Point"
    },
    timestamp: "2:34 PM, Dec 5, 2024",
    priority: "HIGH",
    type: "Manual SOS Trigger"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "dispatched":
        return "bg-warning text-warning-foreground";
      case "enroute":
        return "bg-primary text-primary-foreground";
      case "approaching":
        return "bg-secondary text-secondary-foreground";
      case "arrived":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "dispatched":
        return "Rescue Team Dispatched";
      case "enroute":
        return "Team En Route";
      case "approaching":
        return "Approaching Location";
      case "arrived":
        return "Team Arrived";
      default:
        return "Processing Alert";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-danger/5 via-background to-warning/5">
      {/* Emergency Header */}
      <div className="bg-gradient-danger text-danger-foreground shadow-strong">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 animate-pulse" />
              <div>
                <h1 className="text-2xl font-bold">EMERGENCY SOS ALERT</h1>
                <p className="text-danger-foreground/90">Alert ID: {alertData.id}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge className={`${getStatusColor(responderStatus)} text-lg px-3 py-1`}>
                {getStatusText(responderStatus)}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Alert Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Response Progress */}
            <Card className="shadow-strong border-danger/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-danger">
                  <Car className="h-5 w-5" />
                  Emergency Response Progress
                </CardTitle>
                <CardDescription>
                  Real-time tracking of rescue team deployment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Response Progress</span>
                    <span className="font-bold">{Math.round(responseProgress)}%</span>
                  </div>
                  <Progress value={responseProgress} className="h-3" />
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold text-primary">{eta.toFixed(1)} min</p>
                    <p className="text-sm text-muted-foreground">Estimated Arrival</p>
                  </div>
                  
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Shield className="h-8 w-8 mx-auto mb-2 text-secondary" />
                    <p className="text-2xl font-bold text-secondary">Police + Medical</p>
                    <p className="text-sm text-muted-foreground">Response Units</p>
                  </div>
                  
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-danger" />
                    <p className="text-2xl font-bold text-danger">{alertData.priority}</p>
                    <p className="text-sm text-muted-foreground">Priority Level</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Map */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-secondary" />
                  Emergency Location
                </CardTitle>
                <CardDescription>
                  Live GPS coordinates and rescue team positioning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg overflow-hidden mb-4">
                  <MapComponent />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Address</p>
                    <p className="text-sm text-muted-foreground">{alertData.location.address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Coordinates</p>
                    <p className="text-sm text-muted-foreground font-mono">{alertData.location.coordinates}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Nearest Landmark</p>
                    <p className="text-sm text-muted-foreground">{alertData.location.nearestLandmark}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Alert Time</p>
                    <p className="text-sm text-muted-foreground">{alertData.timestamp}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Actions */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Emergency Response Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="destructive" size="lg" className="w-full">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Tourist Directly
                  </Button>
                  
                  <Button variant="outline" size="lg" className="w-full">
                    <Hospital className="mr-2 h-5 w-5" />
                    Request Medical Backup
                  </Button>
                  
                  <Button variant="outline" size="lg" className="w-full">
                    <Navigation className="mr-2 h-5 w-5" />
                    Share Location with Team
                  </Button>
                  
                  <Button variant="outline" size="lg" className="w-full">
                    <HeartHandshake className="mr-2 h-5 w-5" />
                    Contact Family
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Tourist Info & Timeline */}
          <div className="space-y-6">
            {/* Tourist Profile */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Tourist Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center pb-4 border-b">
                  <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">{alertData.tourist.name}</h3>
                  <p className="text-sm text-muted-foreground">ID: {alertData.tourist.id}</p>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{alertData.tourist.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Emergency Contact</p>
                    <p className="text-sm text-muted-foreground">{alertData.tourist.emergencyContact}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Alert Type</p>
                    <p className="text-sm text-muted-foreground">{alertData.type}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Timeline */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-secondary" />
                  Response Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-danger rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">SOS Alert Triggered</p>
                      <p className="text-xs text-muted-foreground">2:34 PM - Manual activation</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Police Notified</p>
                      <p className="text-xs text-muted-foreground">2:34 PM - Automatic dispatch</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Rescue Team Dispatched</p>
                      <p className="text-xs text-muted-foreground">2:36 PM - Unit Alpha-7</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Family Contacted</p>
                      <p className="text-xs text-muted-foreground">2:37 PM - Emergency contact notified</p>
                    </div>
                  </div>
                  
                  {responseProgress >= 100 && (
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Team Arrived</p>
                        <p className="text-xs text-muted-foreground">Just now - Rescue in progress</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Navigation */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/authority/dashboard">
                  <Button variant="outline" className="w-full">
                    <Shield className="h-4 w-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </Link>
                
                <Button variant="destructive" className="w-full">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Escalate to State Level
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOSAlert;
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { 
  Shield, 
  Users, 
  AlertTriangle, 
  MapPin, 
  Search,
  Clock,
  Phone,
  FileText,
  BarChart3,
  Navigation,
  User,
  Settings,
  Bell,
  X,
  Mail,
  Calendar,
  MapIcon,
  Contact,
  Edit,
  Save
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import MapComponent from "@/components/MapComponent";
import { useToast } from "@/hooks/use-toast";

const AuthorityDashboard = () => {
  const location = useLocation();
  const { role = "police", department = "Guwahati Police" } = location.state || {};
  const [searchTerm, setSearchTerm] = useState("");
  const [activeAlerts, setActiveAlerts] = useState(3);
  const [totalTourists, setTotalTourists] = useState(1247);
  const [selectedTourist, setSelectedTourist] = useState<any>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();

  // Static notifications data
  const notifications = [
    {
      id: "N001",
      type: "alert",
      title: "New SOS Alert",
      message: "Tourist Rahul Sharma triggered emergency alert at Kaziranga",
      time: "2 min ago",
      priority: "high",
      read: false
    },
    {
      id: "N002", 
      type: "info",
      title: "System Update",
      message: "Tourist tracking system updated successfully",
      time: "1 hour ago",
      priority: "medium",
      read: false
    },
    {
      id: "N003",
      type: "warning",
      title: "Weather Alert",
      message: "Heavy rainfall warning issued for Guwahati region",
      time: "3 hours ago", 
      priority: "medium",
      read: true
    },
    {
      id: "N004",
      type: "success",
      title: "E-FIR Generated",
      message: "Missing person FIR successfully created for TS87654321",
      time: "5 hours ago",
      priority: "low",
      read: true
    }
  ];

  // Extended tourist profile data
  const extendedTouristProfiles = [
    {
      id: "TS87654321",
      name: "Rahul Sharma",
      location: "Kaziranga National Park",
      safetyScore: 45,
      status: "emergency",
      lastSeen: "2 min ago",
      phone: "+91 9876543210",
      email: "rahul.sharma@email.com",
      checkIn: "10th Oct 2024",
      checkOut: "15th Oct 2024",
      emergencyContact: "Priya Sharma - +91 9876543211",
      itinerary: ["Kaziranga National Park", "Guwahati City", "Kamakhya Temple"],
      digitalId: "QR_HASH_123456789",
      bloodGroup: "B+",
      address: "Mumbai, Maharashtra"
    },
    {
      id: "TS87654322",
      name: "Priya Patel", 
      location: "Guwahati City",
      safetyScore: 85,
      status: "safe",
      lastSeen: "5 min ago",
      phone: "+91 9876543220",
      email: "priya.patel@email.com",
      checkIn: "12th Oct 2024",
      checkOut: "18th Oct 2024",
      emergencyContact: "Amit Patel - +91 9876543221",
      itinerary: ["Guwahati City", "Shillong", "Cherrapunji"],
      digitalId: "QR_HASH_123456790",
      bloodGroup: "A+",
      address: "Delhi, India"
    },
    {
      id: "TS87654323",
      name: "Mike Johnson",
      location: "Shillong Hills",
      safetyScore: 92,
      status: "safe",
      lastSeen: "3 min ago",
      phone: "+1 555-123-4567",
      email: "mike.johnson@email.com",
      checkIn: "8th Oct 2024",
      checkOut: "20th Oct 2024",
      emergencyContact: "Sarah Johnson - +1 555-123-4568",
      itinerary: ["Shillong", "Meghalaya Caves", "Living Root Bridges"],
      digitalId: "QR_HASH_123456791",
      bloodGroup: "O+",
      address: "New York, USA"
    }
  ];

  // Mock real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalTourists(prev => prev + Math.floor(Math.random() * 5) - 2);
      if (Math.random() > 0.7) {
        setActiveAlerts(prev => Math.max(0, prev + (Math.random() > 0.5 ? 1 : -1)));
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleSOSResponse = (alertId: string) => {
    toast({
      title: "SOS Response Dispatched 🚨",
      description: `Rescue team assigned to alert ${alertId}. ETA: 8 minutes.`,
    });
  };

  const handleGenerateEFIR = (touristId: string) => {
    toast({
      title: "E-FIR Generated 📄",
      description: `Missing person FIR created for tourist ID: ${touristId}`,
    });
  };

  const roleConfig = {
    police: {
      title: "Police Control Center",
      color: "text-primary",
      icon: Shield
    },
    tourism: {
      title: "Tourism Department",
      color: "text-secondary",
      icon: Users
    },
    control: {
      title: "Emergency Control Room",
      color: "text-danger",
      icon: AlertTriangle
    }
  };

  const currentRole = roleConfig[role as keyof typeof roleConfig] || roleConfig.police;

  const recentSOSAlerts = [
    {
      id: "SOS001",
      tourist: "Rahul Sharma",
      location: "Kaziranga National Park",
      time: "2 min ago",
      status: "active",
      priority: "high"
    },
    {
      id: "SOS002", 
      tourist: "Priya Patel",
      location: "Guwahati City Center",
      time: "15 min ago",
      status: "responded",
      priority: "medium"
    },
    {
      id: "SOS003",
      tourist: "Mike Johnson",
      location: "Kamakhya Temple",
      time: "45 min ago",
      status: "resolved",
      priority: "low"
    }
  ];

  const touristProfiles = [
    {
      id: "TS87654321",
      name: "Rahul Sharma",
      location: "Kaziranga National Park",
      safetyScore: 45,
      status: "emergency",
      lastSeen: "2 min ago"
    },
    {
      id: "TS87654322",
      name: "Priya Patel", 
      location: "Guwahati City",
      safetyScore: 85,
      status: "safe",
      lastSeen: "5 min ago"
    },
    {
      id: "TS87654323",
      name: "Mike Johnson",
      location: "Shillong Hills",
      safetyScore: 92,
      status: "safe",
      lastSeen: "3 min ago"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
      case "emergency":
        return <Badge variant="destructive">Emergency</Badge>;
      case "responded":
        return <Badge className="bg-warning text-warning-foreground">In Progress</Badge>;
      case "resolved":
      case "safe":
        return <Badge variant="default" className="bg-success text-success-foreground">Safe</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <div className="bg-card border-b shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <currentRole.icon className={`h-8 w-8 ${currentRole.color}`} />
              <div>
                <h1 className="text-2xl font-bold">{currentRole.title}</h1>
                <p className="text-sm text-muted-foreground">{department}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Notifications Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-4 w-4" />
                    {activeAlerts > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-danger">
                        {activeAlerts}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="border-b p-4">
                    <h4 className="font-medium">Notifications</h4>
                    <p className="text-sm text-muted-foreground">{notifications.filter(n => !n.read).length} unread</p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`p-4 border-b last:border-b-0 hover:bg-muted/50 ${!notification.read ? 'bg-muted/20' : ''}`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === 'alert' ? 'bg-danger' :
                            notification.type === 'warning' ? 'bg-warning' :
                            notification.type === 'success' ? 'bg-success' : 'bg-info'
                          }`} />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{notification.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t">
                    <Button variant="ghost" size="sm" className="w-full">
                      Mark all as read
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              
              {/* Profile Dialog */}
              <Dialog open={showProfile} onOpenChange={setShowProfile}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Officer Profile</DialogTitle>
                    <DialogDescription>
                      Manage your profile information
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Officer John Doe</h3>
                        <p className="text-sm text-muted-foreground">{department}</p>
                        <p className="text-sm text-muted-foreground">Badge: {role.toUpperCase()}001</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="grid gap-3">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">john.doe@police.gov.in</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">+91 9876543210</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Guwahati Station</span>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setShowProfile(false)}>
                        Close
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              {/* Settings Dialog */}
              <Dialog open={showSettings} onOpenChange={setShowSettings}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>System Settings</DialogTitle>
                    <DialogDescription>
                      Configure your dashboard preferences
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div className="space-y-4">
                      <h4 className="font-medium">Notification Settings</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sos-alerts" className="text-sm">SOS Alerts</Label>
                          <input type="checkbox" id="sos-alerts" defaultChecked className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="system-updates" className="text-sm">System Updates</Label>
                          <input type="checkbox" id="system-updates" defaultChecked className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-notifications" className="text-sm">Email Notifications</Label>
                          <input type="checkbox" id="email-notifications" className="rounded" />
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h4 className="font-medium">Display Settings</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="dark-mode" className="text-sm">Dark Mode</Label>
                          <input type="checkbox" id="dark-mode" className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="auto-refresh" className="text-sm">Auto Refresh</Label>
                          <input type="checkbox" id="auto-refresh" defaultChecked className="rounded" />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button size="sm" className="flex-1">
                        <Save className="h-4 w-4 mr-2" />
                        Save Settings
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setShowSettings(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <Card className="shadow-medium">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Tourists</p>
                  <p className="text-2xl font-bold text-primary">{totalTourists}</p>
                </div>
                <Users className="h-8 w-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                  <p className="text-2xl font-bold text-danger">{activeAlerts}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-danger/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Response Time</p>
                  <p className="text-2xl font-bold text-success">4.2 min</p>
                </div>
                <Clock className="h-8 w-8 text-success/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Safety Score</p>
                  <p className="text-2xl font-bold text-secondary">87%</p>
                </div>
                <Shield className="h-8 w-8 text-secondary/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Dashboard Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Real-time Tourist Heatmap */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-secondary" />
                  Real-Time Tourist Heatmap
                </CardTitle>
                <CardDescription>
                  Live monitoring of tourist density and high-risk zones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg overflow-hidden mb-4">
                  <MapComponent />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span className="text-sm">Safe Zones</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-warning rounded-full"></div>
                      <span className="text-sm">Moderate Risk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-danger rounded-full"></div>
                      <span className="text-sm">High Risk</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Navigation className="h-4 w-4 mr-2" />
                    Full Screen
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tourist Management Tabs */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Tourist Management</CardTitle>
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, ID, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="profiles" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="profiles">Tourist Profiles</TabsTrigger>
                    <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="profiles" className="space-y-4">
                    {touristProfiles.map((tourist) => (
                      <div key={tourist.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{tourist.name}</p>
                            <p className="text-sm text-muted-foreground">ID: {tourist.id}</p>
                            <p className="text-sm text-muted-foreground">{tourist.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-sm font-medium">Safety: {tourist.safetyScore}/100</p>
                            <p className="text-xs text-muted-foreground">{tourist.lastSeen}</p>
                          </div>
                          {getStatusBadge(tourist.status)}
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedTourist(extendedTouristProfiles.find(t => t.id === tourist.id))}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="alerts" className="space-y-4">
                    {recentSOSAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-danger/10 rounded-full flex items-center justify-center">
                            <AlertTriangle className="h-5 w-5 text-danger" />
                          </div>
                          <div>
                            <p className="font-medium">{alert.tourist}</p>
                            <p className="text-sm text-muted-foreground">{alert.location}</p>
                            <p className="text-xs text-muted-foreground">{alert.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(alert.status)}
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleSOSResponse(alert.id)}
                            disabled={alert.status !== "active"}
                          >
                            <Phone className="h-4 w-4 mr-2" />
                            Respond
                          </Button>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="reports" className="space-y-4">
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Generate Reports</h3>
                      <p className="text-muted-foreground mb-4">Create automated E-FIRs and incident reports</p>
                      <Button onClick={() => handleGenerateEFIR("TS87654321")}>
                        <FileText className="h-4 w-4 mr-2" />
                        Generate E-FIR
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Recent Activity */}
          <div className="space-y-6">
            {/* Live SOS Alerts */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-danger" />
                  Live SOS Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentSOSAlerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className="border-l-4 border-l-danger pl-3 py-2">
                    <p className="text-sm font-medium">{alert.tourist}</p>
                    <p className="text-xs text-muted-foreground">{alert.location}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                    {getStatusBadge(alert.status)}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="destructive">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Broadcast Emergency Alert
                </Button>
                <Button className="w-full" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Daily Report
                </Button>
                <Button className="w-full" variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">GPS Tracking</span>
                  <Badge variant="default" className="bg-success">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Emergency Network</span>
                  <Badge variant="default" className="bg-success">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database Sync</span>
                  <Badge variant="default" className="bg-success">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Blockchain Network</span>
                  <Badge variant="default" className="bg-success">Verified</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Tourist Details Modal */}
      <Dialog open={!!selectedTourist} onOpenChange={() => setSelectedTourist(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Tourist Profile Details
            </DialogTitle>
            <DialogDescription>
              Complete information for {selectedTourist?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedTourist && (
            <div className="space-y-6 py-4">
              {/* Header with status */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedTourist.name}</h3>
                    <p className="text-sm text-muted-foreground">ID: {selectedTourist.id}</p>
                    <p className="text-sm text-muted-foreground">Digital ID: {selectedTourist.digitalId}</p>
                  </div>
                </div>
                <div className="text-right">
                  {getStatusBadge(selectedTourist.status)}
                  <p className="text-sm font-medium mt-2">Safety Score: {selectedTourist.safetyScore}/100</p>
                  <p className="text-xs text-muted-foreground">Last seen: {selectedTourist.lastSeen}</p>
                </div>
              </div>

              <Separator />

              {/* Contact Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Contact className="h-4 w-4" />
                    Contact Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedTourist.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedTourist.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedTourist.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Blood Group: {selectedTourist.bloodGroup}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Trip Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Check-in</span>
                      <span className="text-sm font-medium">{selectedTourist.checkIn}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Check-out</span>
                      <span className="text-sm font-medium">{selectedTourist.checkOut}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Current Location</span>
                      <span className="text-sm font-medium">{selectedTourist.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Emergency Contact */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Emergency Contact
                </h4>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-sm font-medium">{selectedTourist.emergencyContact}</p>
                </div>
              </div>

              {/* Itinerary */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Travel Itinerary
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTourist.itinerary.map((place: string, index: number) => (
                    <Badge key={index} variant="outline" className="bg-secondary/10">
                      {place}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button variant="destructive" size="sm" className="flex-1">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Generate SOS Alert
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleGenerateEFIR(selectedTourist.id)}>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate E-FIR
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedTourist(null)}>
                  <X className="h-4 w-4 mr-2" />
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthorityDashboard;
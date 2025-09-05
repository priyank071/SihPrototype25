import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Shield, 
  MapPin, 
  Phone, 
  Mail, 
  QrCode,
  Calendar,
  Settings,
  Save,
  ArrowLeft,
  Globe,
  Bell
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ProfileManagement = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState({
    fullName: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 9876543210",
    digitalId: "TS87654321",
    aadharNumber: "1234 5678 9012",
    emergencyContact: "Priya Sharma",
    emergencyPhone: "+91 9876543211",
    currentLocation: "Kaziranga National Park, Assam",
    accommodation: "Kaziranga Resort & Spa",
    visitPurpose: "Wildlife Tourism",
    destinations: "Kaziranga National Park, Guwahati, Shillong",
    stayDuration: "7 days"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    sosAlerts: true,
    geoFencingWarnings: true,
    weatherUpdates: true,
    safetyReminders: true,
    familyNotifications: true
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated! ✅",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleToggleNotification = (setting: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
    
    toast({
      title: "Notification Settings Updated",
      description: "Your preferences have been saved.",
    });
  };

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "as", name: "অসমীয়া", flag: "🇮🇳" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <div className="bg-card border-b shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/tourist/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-2">
              <User className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Profile Management</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="emergency">Emergency</TabsTrigger>
            </TabsList>

            {/* Profile Information Tab */}
            <TabsContent value="profile">
              <Card className="shadow-medium">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        Personal Information
                      </CardTitle>
                      <CardDescription>
                        Update your personal details and travel information
                      </CardDescription>
                    </div>
                    <Button 
                      variant={isEditing ? "default" : "outline"}
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Settings className="h-4 w-4 mr-2" />}
                      {isEditing ? "Save Changes" : "Edit Profile"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Basic Information</h3>
                      
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={profileData.fullName}
                          onChange={(e) => setProfileData(prev => ({...prev, fullName: e.target.value}))}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({...prev, email: e.target.value}))}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData(prev => ({...prev, phone: e.target.value}))}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="aadhar">Aadhaar Number</Label>
                        <Input
                          id="aadhar"
                          value={profileData.aadharNumber}
                          onChange={(e) => setProfileData(prev => ({...prev, aadharNumber: e.target.value}))}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Travel Information</h3>
                      
                      <div>
                        <Label htmlFor="accommodation">Current Accommodation</Label>
                        <Input
                          id="accommodation"
                          value={profileData.accommodation}
                          onChange={(e) => setProfileData(prev => ({...prev, accommodation: e.target.value}))}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="visitPurpose">Visit Purpose</Label>
                        <Input
                          id="visitPurpose"
                          value={profileData.visitPurpose}
                          onChange={(e) => setProfileData(prev => ({...prev, visitPurpose: e.target.value}))}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="destinations">Planned Destinations</Label>
                        <Textarea
                          id="destinations"
                          value={profileData.destinations}
                          onChange={(e) => setProfileData(prev => ({...prev, destinations: e.target.value}))}
                          disabled={!isEditing}
                          className="min-h-[80px]"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="duration">Stay Duration</Label>
                        <Input
                          id="duration"
                          value={profileData.stayDuration}
                          onChange={(e) => setProfileData(prev => ({...prev, stayDuration: e.target.value}))}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end">
                      <Button onClick={handleSaveProfile}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Security & Digital ID
                  </CardTitle>
                  <CardDescription>
                    Manage your blockchain digital ID and security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-6 bg-muted/30 rounded-lg">
                    <QrCode className="h-16 w-16 mx-auto mb-4 text-primary" />
                    <h3 className="text-2xl font-bold mb-2">Digital Tourist ID</h3>
                    <p className="text-3xl font-mono text-primary mb-4">{profileData.digitalId}</p>
                    <Badge variant="default" className="bg-success text-success-foreground mb-4">
                      Verified on Blockchain
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      Valid until: December 12, 2024
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Security Status</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Blockchain Verification</span>
                          <Badge variant="default" className="bg-success">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Two-Factor Authentication</span>
                          <Badge variant="outline">Disabled</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Emergency Contacts Verified</span>
                          <Badge variant="default" className="bg-success">Verified</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold">Quick Actions</h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">
                          <QrCode className="h-4 w-4 mr-2" />
                          Download QR Code
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Shield className="h-4 w-4 mr-2" />
                          Enable 2FA
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Settings className="h-4 w-4 mr-2" />
                          Reset Password
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-medium">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-secondary" />
                      Language Settings
                    </CardTitle>
                    <CardDescription>
                      Choose your preferred language for the app interface
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {languages.map((lang) => (
                      <div key={lang.code} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{lang.flag}</span>
                          <span className="font-medium">{lang.name}</span>
                        </div>
                        <Button
                          variant={selectedLanguage === lang.code ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedLanguage(lang.code)}
                        >
                          {selectedLanguage === lang.code ? "Selected" : "Select"}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="shadow-medium">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-warning" />
                      Notification Settings
                    </CardTitle>
                    <CardDescription>
                      Customize your notification preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(notificationSettings).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </span>
                        <Button
                          variant={value ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleToggleNotification(key)}
                        >
                          {value ? "On" : "Off"}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Emergency Tab */}
            <TabsContent value="emergency">
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-danger" />
                    Emergency Contacts
                  </CardTitle>
                  <CardDescription>
                    Manage your emergency contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Primary Emergency Contact</h3>
                      
                      <div>
                        <Label htmlFor="emergencyName">Contact Name</Label>
                        <Input
                          id="emergencyName"
                          value={profileData.emergencyContact}
                          onChange={(e) => setProfileData(prev => ({...prev, emergencyContact: e.target.value}))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="emergencyPhone">Contact Phone</Label>
                        <Input
                          id="emergencyPhone"
                          value={profileData.emergencyPhone}
                          onChange={(e) => setProfileData(prev => ({...prev, emergencyPhone: e.target.value}))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="relationship">Relationship</Label>
                        <Input
                          id="relationship"
                          placeholder="e.g., Spouse, Parent, Sibling"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold">Emergency Services</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Local Police</p>
                            <p className="text-sm text-muted-foreground">100</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Medical Emergency</p>
                            <p className="text-sm text-muted-foreground">102</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Tourist Helpline</p>
                            <p className="text-sm text-muted-foreground">1363</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Save Emergency Contacts
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
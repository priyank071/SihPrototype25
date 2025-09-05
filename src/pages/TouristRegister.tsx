import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Shield, ArrowLeft, QrCode, Calendar, MapPin, Phone, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const TouristRegister = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [digitalId, setDigitalId] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    aadharNumber: "",
    passportNumber: "",
    visitPurpose: "",
    destinations: "",
    stayDuration: "",
    emergencyContact: "",
    emergencyPhone: "",
    accommodation: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate blockchain ID generation
    setTimeout(() => {
      const generatedId = `TS${Date.now().toString().slice(-8)}`;
      setDigitalId(generatedId);
      setIsSubmitting(false);
      setStep(3);
      
      toast({
        title: "Registration Successful! 🎉",
        description: "Your blockchain digital ID has been generated successfully.",
      });
    }, 2000);
  };

  const handleCompletRegistration = () => {
    toast({
      title: "Welcome to TourShield! 🛡️",
      description: "You can now access your tourist dashboard.",
    });
    navigate("/tourist/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">TourShield</span>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              2
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              3
            </div>
          </div>
        </div>

        {/* Step 1: Personal Information */}
        {step === 1 && (
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Secure your identity with blockchain-based digital ID
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="aadhar">Aadhaar Number</Label>
                  <Input
                    id="aadhar"
                    value={formData.aadharNumber}
                    onChange={(e) => handleInputChange("aadharNumber", e.target.value)}
                    placeholder="1234 5678 9012"
                  />
                </div>
                <div>
                  <Label htmlFor="passport">Passport Number (International)</Label>
                  <Input
                    id="passport"
                    value={formData.passportNumber}
                    onChange={(e) => handleInputChange("passportNumber", e.target.value)}
                    placeholder="A1234567"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleNextStep} disabled={!formData.fullName || !formData.phone || !formData.email}>
                  Continue to Trip Details
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Trip Information */}
        {step === 2 && (
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-secondary" />
                Trip Information
              </CardTitle>
              <CardDescription>
                Help us provide better safety recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="purpose">Purpose of Visit</Label>
                <Input
                  id="purpose"
                  value={formData.visitPurpose}
                  onChange={(e) => handleInputChange("visitPurpose", e.target.value)}
                  placeholder="Tourism, Business, Education, etc."
                />
              </div>
              
              <div>
                <Label htmlFor="destinations">Planned Destinations</Label>
                <Textarea
                  id="destinations"
                  value={formData.destinations}
                  onChange={(e) => handleInputChange("destinations", e.target.value)}
                  placeholder="Kaziranga National Park, Guwahati, Shillong..."
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Stay Duration</Label>
                  <Input
                    id="duration"
                    value={formData.stayDuration}
                    onChange={(e) => handleInputChange("stayDuration", e.target.value)}
                    placeholder="5 days, 2 weeks, etc."
                  />
                </div>
                <div>
                  <Label htmlFor="accommodation">Accommodation</Label>
                  <Input
                    id="accommodation"
                    value={formData.accommodation}
                    onChange={(e) => handleInputChange("accommodation", e.target.value)}
                    placeholder="Hotel name or address"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                    placeholder="Family member or friend"
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                  <Input
                    id="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Generating Blockchain ID..." : "Generate Digital ID"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Digital ID Generated */}
        {step === 3 && (
          <Card className="shadow-medium">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <QrCode className="h-6 w-6 text-success" />
                Digital ID Generated Successfully!
              </CardTitle>
              <CardDescription>
                Your blockchain-secured tourist ID is ready
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="bg-muted/50 rounded-lg p-8">
                <div className="w-32 h-32 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">Your Digital Tourist ID</p>
                  <p className="text-2xl font-mono text-primary">{digitalId}</p>
                  <p className="text-sm text-muted-foreground">Valid until: 12th October 2025</p>
                </div>
              </div>
              
              <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                <p className="text-success font-medium">✓ Blockchain verification complete</p>
                <p className="text-sm text-success/80">Your identity is now secured on the blockchain</p>
              </div>
              
              <Button variant="success" size="lg" onClick={handleCompletRegistration} className="w-full">
                Access Tourist Dashboard
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TouristRegister;
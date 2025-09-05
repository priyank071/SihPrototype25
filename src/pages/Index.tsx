import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, MapPin, Users, AlertTriangle, PhoneCall, Globe, Star, Award, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-warning/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        
        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
        
        <div className="relative container mx-auto px-4 py-20 z-10">
          <div className={`text-center space-y-8 max-w-5xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* Logo and Title */}
            <div className="flex items-center justify-center mb-8 group">
              <div className="relative">
                <Shield className="h-20 w-20 text-primary mr-6 animate-pulse group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 h-20 w-20 bg-primary/20 rounded-full blur-xl animate-ping"></div>
              </div>
              <div className="space-y-2">
                <h1 className="text-7xl font-bold bg-gradient-hero bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                  TourShield
                </h1>
                <div className="h-1 w-full bg-gradient-hero rounded-full"></div>
              </div>
            </div>
            
            {/* Tagline */}
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in delay-300">
              Smart Tourist Safety & Incident Response System
            </p>
            
            <p className="text-lg text-primary font-semibold animate-fade-in delay-500">
              Explore Freely. Stay Protected.
            </p>
            
            {/* Action Buttons */}
            <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 transition-all duration-700 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <Link to="/tourist/register" className="group">
                <Button variant="hero" size="xl" className="w-full sm:w-auto group-hover:scale-105 transition-all duration-300 shadow-strong">
                  <Users className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                  Register as Tourist
                </Button>
              </Link>
              
              <Link to="/authority/login" className="group">
                <Button variant="premium" size="xl" className="w-full sm:w-auto group-hover:scale-105 transition-all duration-300 shadow-medium">
                  <Shield className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                  Authority Login
                </Button>
              </Link>
            </div>

            {/* Stats Section */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 transition-all duration-1000 delay-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-primary mb-2 group-hover:text-primary-light">10,000+</div>
                <div className="text-muted-foreground">Tourists Protected</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-secondary mb-2 group-hover:text-secondary-light">24/7</div>
                <div className="text-muted-foreground">Emergency Response</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-warning mb-2 group-hover:animate-pulse">99.9%</div>
                <div className="text-muted-foreground">System Uptime</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-muted/20 to-muted/40 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-2 rounded-full text-primary font-semibold mb-6">
              <Award className="h-5 w-5" />
              Award-Winning Technology
            </div>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Comprehensive Safety Ecosystem
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Advanced AI-powered technology meets real-world safety needs for modern tourism
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: MapPin,
                title: "Real-Time Location Tracking",
                description: "Advanced GPS tracking with geo-fencing alerts for high-risk zones and instant location sharing during emergencies.",
                color: "primary",
                delay: "delay-100"
              },
              {
                icon: AlertTriangle,
                title: "AI-Powered Safety Score",
                description: "Dynamic safety assessment based on location, time, historical data, and real-time threat analysis.",
                color: "secondary",
                delay: "delay-200"
              },
              {
                icon: PhoneCall,
                title: "Instant SOS Response",
                description: "One-touch emergency alerts to police, tourism authorities, and family with automated location sharing.",
                color: "danger",
                delay: "delay-300"
              },
              {
                icon: Shield,
                title: "Blockchain Digital ID",
                description: "Secure, tamper-proof digital identification system for reliable tourist verification and data integrity.",
                color: "warning",
                delay: "delay-400"
              },
              {
                icon: Users,
                title: "Authority Dashboard",
                description: "Comprehensive monitoring system for police and tourism departments with real-time alerts and response coordination.",
                color: "primary",
                delay: "delay-500"
              },
              {
                icon: Globe,
                title: "Multilingual Support",
                description: "Voice commands and interface available in multiple languages including Hindi, English, and regional languages.",
                color: "secondary",
                delay: "delay-600"
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className={`group hover:shadow-strong transition-all duration-500 hover:-translate-y-2 border-0 bg-card/80 backdrop-blur-sm animate-fade-in ${feature.delay} hover:bg-gradient-to-br hover:from-card hover:to-${feature.color}/5`}
                >
                  <CardHeader className="pb-4">
                    <div className={`h-16 w-16 bg-${feature.color}/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-${feature.color}/20 transition-colors duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                      <Icon className={`h-8 w-8 text-${feature.color} group-hover:animate-pulse`} />
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h3 className="text-3xl font-bold mb-4">Trusted by Leading Organizations</h3>
            <p className="text-muted-foreground">Partnership with government agencies and tourism boards</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {['Ministry of Tourism', 'Police Department', 'Emergency Services', 'Tourism Board'].map((org, index) => (
              <div key={index} className="text-center p-6 hover:opacity-100 transition-opacity duration-300">
                <div className="h-16 w-16 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="font-semibold text-sm">{org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-10 animate-fade-in">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Ready to Experience Safer Tourism?
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Join thousands of tourists who travel with confidence using TourShield's advanced safety system.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Link to="/tourist/register" className="group">
                <Button variant="hero" size="xl" className="group-hover:scale-105 transition-all duration-300 shadow-strong">
                  <Clock className="mr-3 h-6 w-6 group-hover:animate-spin" />
                  Get Started Now
                </Button>
              </Link>
              
              <Button variant="outline" size="xl" className="group hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Star className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                Learn More
              </Button>
            </div>

            {/* Final Stats */}
            <div className="pt-16 border-t border-border/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2 hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl font-bold text-primary">5 Minutes</div>
                  <div className="text-muted-foreground">Average Response Time</div>
                </div>
                <div className="space-y-2 hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl font-bold text-secondary">15+ States</div>
                  <div className="text-muted-foreground">Coverage Area</div>
                </div>
                <div className="space-y-2 hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl font-bold text-warning">Zero</div>
                  <div className="text-muted-foreground">Data Breaches</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
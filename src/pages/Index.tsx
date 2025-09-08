import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  MapPin,
  Brain,
  Users,
  AlertTriangle,
  Camera,
  Languages,
  Smartphone,
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Digital Tourist ID",
      description:
        "Blockchain-based identity with auto-expiry, ensuring privacy-preserving verification and tamper-proof records.",
      icon: <ShieldCheck size={32} className="text-blue-500" />,
    },
    {
      title: "Geo-Fencing & Alerts",
      description:
        "Real-time warnings for high-risk zones with offline-capable cached polygons and dynamic hazard updates.",
      icon: <MapPin size={32} className="text-green-500" />,
    },
    {
      title: "AI Safety Score",
      description:
        "Predictive risk assessment based on location, time, crowd density, historical incidents, and weather conditions.",
      icon: <Brain size={32} className="text-blue-400" />,
    },
    {
      title: "Group Tracking",
      description:
        "Guide assignment and group monitoring with real-time location sharing and safety score tracking for all members.",
      icon: <Users size={32} className="text-yellow-500" />,
    },
    {
      title: "SOS Emergency",
      description:
        "Manual and automatic SOS triggers with fall detection, location sharing, and instant alert to authorities and family.",
      icon: <AlertTriangle size={32} className="text-red-500" />,
    },
    {
      title: "Evidence Capture",
      description:
        "Blockchain-anchored photo and video evidence with tamper-proof hashing for legal compliance and verification.",
      icon: <Camera size={32} className="text-green-400" />,
    },
    {
      title: "Multilingual Support",
      description:
        "10+ language support with voice commands for accessibility, ensuring inclusive safety for all tourist demographics.",
      icon: <Languages size={32} className="text-blue-500" />,
    },
    {
      title: "Offline Capability",
      description:
        "Full functionality without internet with cached maps, geofence evaluation, and SMS fallback for emergency communication.",
      icon: <Smartphone size={32} className="text-green-500" />,
    },
  ];

  const partners = [
    { name: "Ministry of Tourism" },
    { name: "Police Department" },
    { name: "Emergency Services" },
    { name: "Tourism Board" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/bg2.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-blue-500/40"></div>

        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-20 text-white">
          <div className="mb-4">
            <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium">
              Powered by AI & Blockchain
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-white">Smart Tourist</span>{" "}
            <span className="text-green-400">Safety System</span>
          </h1>

          <p className="text-lg md:text-xl text-white max-w-3xl mb-6">
            AI-powered, blockchain-secured platform ensuring real-time safety
            monitoring and emergency response for tourists in Northeast India's
            pristine but challenging terrains.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              className="bg-green-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-600 transition"
              onClick={() => navigate("/tourist/register")}
            >
              Tourist Dashboard
            </button>
            <button
              className="bg-white/20 text-white px-6 py-3 rounded-lg border border-white hover:bg-white/30 transition"
              onClick={() => navigate("/authority/login")}
            >
              Authority Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* About / Features Section */}
      <section className="bg-[#f8fbff] py-16 px-4 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Comprehensive Safety{" "}
            <span className="text-green-500">Ecosystem</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
            Our platform integrates cutting-edge AI, blockchain technology, and real-time monitoring to create an unprecedented safety net for tourists exploring Northeast India.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-gray-100 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#f4fafe] via-[#f4fff9] to-[#f4fafe]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Trusted by Leading{" "}
            <span className="text-green-600">Organizations</span>
          </h2>
          <p className="text-gray-500 mb-12">
            Partnership with government agencies and tourism boards
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white/40 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition transform duration-300 w-full max-w-[180px]"
              >
                <div className="bg-white/60 p-4 rounded-full mb-4 shadow-inner">
                  <ShieldCheck size={36} className="text-gray-600" />
                </div>
                <p className="text-gray-700 font-medium text-sm text-center">
                  {partner.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full text-center py-4 bg-gray-100 text-gray-600 text-sm">
        © {new Date().getFullYear()} SafeTourNE. All rights reserved.
      </footer>
    </div>
  );
}

import React from 'react';
import { ShieldCheck, Clock, Award, BrainCircuit } from 'lucide-react';
import './Section3.css';

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="section3-feature-card">
      <div className="icon-container">
        <Icon size={42} strokeWidth={1.5} />
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
}

function Section3() {
  const features = [
    {
      icon: ShieldCheck,
      title: "100% Secure",
      description: "Your health data is encrypted with military-grade protection and stored in secure, redundant servers."
    },
    {
      icon: Clock,
      title: "Anytime, Anywhere",
      description: "Access your health information 24/7 from any device, whether you're at home or on the go."
    },
    {
      icon: Award,
      title: "Trusted by Experts",
      description: "Recommended by leading healthcare professionals and trusted by thousands of patients worldwide."
    },
    {
      icon: BrainCircuit,
      title: "AI Driven Reminders",
      description: "Smart notifications that learn your habits and help you stay on track with your health goals."
    }
  ];

  return (
    <div className="section3-container">
      <div className="section3-content-wrapper">
        <h2 className="section3-title">
          <span className="title-dark">Why </span>
          <span className="title-highlight">Choose Us ?</span>
        </h2>
        
        <div className="section3-features-grid">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Section3;
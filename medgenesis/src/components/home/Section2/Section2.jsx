import React from 'react';
import './Section2.css';
import { Shield, UserRound, Calendar, HeartPulse } from 'lucide-react';

export default function FeaturesSection() {
  return (
    <div className="features-section">
      <div className="features-container">
        <div className="features-header">
          <h2>What we <span>provide</span> ?</h2>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Shield size={32} />
            </div>
            <h3>Secure Health Record Storage</h3>
            <p>End-to-end encrypted storage for all your medical documents with blockchain verification.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <UserRound size={32} />
            </div>
            <h3>Hassle-Free Doctor Consultations</h3>
            <p>Connect with healthcare providers who can securely access your shared records.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Calendar size={32} />
            </div>
            <h3>Easy Appointment Booking</h3>
            <p>Schedule appointments with healthcare providers directly through our platform.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <HeartPulse size={32} />
            </div>
            <h3>Insurance Assistance at Your Fingertips</h3>
            <p>Streamline insurance claims with secure record sharing and verification.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
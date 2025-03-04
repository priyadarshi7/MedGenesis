import React from 'react';
import './HeroSection.css';
import { Button } from '@mui/material';
import { ChevronRight, Shield, Database } from 'lucide-react';
import Navbar from '../../navbar/Navbar';

export default function HeroSection() {
  return (
    <div>
        <div className="home-hero-section">
            <div className="floating-elements">
                <div className="floating-circle circle-1"></div>
                <div className="floating-circle circle-2"></div>
                <div className="tech-element tech-1"></div>
                <div className="tech-element tech-2"></div>
            </div>
            <div className="home-hero-section-box1">
                <div className="home-hero-section-text-1">
                    All Your <span>Medical Records</span> in One Safe Place
                </div>
                <div className="home-hero-section-box1-desc">
                    Securely store, access, and share your medical history with our blockchain-powered platform. 
                    Experience the future of healthcare data management with end-to-end encryption and complete 
                    control over your sensitive information.
                </div>
                <Button 
                    className="hero-button"
                    endIcon={<ChevronRight size={18} />}
                >
                    Get Started
                </Button>
                <div className="hero-features" style={{ 
                    display: 'flex', 
                    gap: '20px', 
                    marginTop: '30px',
                    fontSize: '14px',
                    color: '#555'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Shield size={16} color="#5F1EE6" />
                        <span>End-to-end encryption</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Database size={16} color="#85CC17" />
                        <span>Blockchain secured</span>
                    </div>
                </div>
            </div>            
        </div>
    </div>
  )
}
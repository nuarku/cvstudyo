import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCV } from '../../context/CVContext';
import { useAuth } from '../../context/AuthContext';
import { PersonalInfoForm } from './PersonalInfoForm';
import { ExperienceForm } from './ExperienceForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { LanguageForm } from './LanguageForm';
import { ReferenceForm } from './ReferenceForm';
import { VolunteerForm } from './VolunteerForm';
import { ThemeSelector } from './ThemeSelector';
import { User, Briefcase, GraduationCap, Wrench, Languages, Users, HeartHandshake, Download, Palette, LogOut, Share2, LayoutDashboard } from 'lucide-react';
import html2pdf from 'html2pdf.js';

export const EditorPanel = () => {
  const navigate = useNavigate();
  const { cvData } = useCV();
  const { logout } = useAuth();
  const [activeSection, setActiveSection] = useState('personal');
  
  const handlePrint = async () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      const element = document.querySelector('.cv-container');
      const wrapper = document.querySelector('.cv-wrapper');
      const panel = document.querySelector('.preview-panel');
      if (!element || !wrapper || !panel) return;
      
      const originalTransform = wrapper.style.transform;
      const originalOverflow = panel.style.overflow;
      const originalHeight = panel.style.height;
      const originalWidth = panel.style.width;
      
      // Temporarily expand panel to fit full A4 without mobile clipping
      wrapper.style.transform = 'none';
      panel.style.overflow = 'visible';
      panel.style.height = 'auto';
      panel.style.width = '800px';
      
      const opt = {
        margin:       0,
        filename:     `${cvData.personalInfo?.fullName || 'CV'}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, letterRendering: true, windowWidth: 800 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      try {
        await html2pdf().set(opt).from(element).save();
      } catch (err) {
        console.error('PDF generation error:', err);
      } finally {
        wrapper.style.transform = originalTransform;
        panel.style.overflow = originalOverflow;
        panel.style.height = originalHeight;
        panel.style.width = originalWidth;
      }
    } else {
      window.print();
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const sections = [
    { id: 'personal', title: 'Kişisel Bilgiler', icon: User, content: <PersonalInfoForm /> },
    { id: 'experience', title: 'Deneyimler', icon: Briefcase, content: <ExperienceForm /> },
    { id: 'education', title: 'Eğitim', icon: GraduationCap, content: <EducationForm /> },
    { id: 'volunteer', title: 'Gönüllü Çalışmalar', icon: HeartHandshake, content: <VolunteerForm /> },
    { id: 'skills', title: 'Yetenekler', icon: Wrench, content: <SkillsForm /> },
    { id: 'languages', title: 'Yabancı Diller', icon: Languages, content: <LanguageForm /> },
    { id: 'references', title: 'Referanslar', icon: Users, content: <ReferenceForm /> },
    { id: 'theme', title: 'Görünüm ve Tema', icon: Palette, content: <ThemeSelector /> }
  ];

  return (
    <div className="editor-panel">
      <div className="editor-header">
        <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
          <img src="/logo.png" alt="CV Stüdyo" style={{ height: '32px' }} />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn-secondary hide-text-mobile" onClick={() => navigate('/dashboard')} style={{ padding: '0.6rem' }} title="Dashboard'a Dön">
            <LayoutDashboard size={18} />
            <span style={{ fontSize: '0.85rem' }}>Dashboard</span>
          </button>
          <button className="btn-secondary" onClick={handleLogout} style={{ padding: '0.6rem', borderRadius: '50%' }} title="Çıkış Yap">
            <LogOut size={18} />
          </button>
          <button className="btn-primary hide-text-mobile" onClick={handlePrint} title="PDF İndir">
            <Download size={18} />
            <span>PDF İndir</span>
          </button>
        </div>
      </div>

      <div className="editor-layout">
        <div className="editor-sidebar">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                className={`sidebar-btn ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <Icon size={18} />
                <span>{section.title}</span>
              </button>
            );
          })}
        </div>
        
        <div className="editor-main">
          <div className="editor-main-header">
            {(() => {
              const active = sections.find(s => s.id === activeSection);
              const Icon = active?.icon;
              return active ? (
                <>
                  <Icon size={20} color="var(--primary-color)" />
                  <h2>{active.title}</h2>
                </>
              ) : null;
            })()}
          </div>
          <div className="editor-main-content">
            {sections.find(s => s.id === activeSection)?.content}
          </div>
        </div>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
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
import { User, Briefcase, GraduationCap, Wrench, Languages, Users, HeartHandshake, Download, Palette, LogOut } from 'lucide-react';
import html2pdf from 'html2pdf.js';

export const EditorPanel = () => {
  const { cvData } = useCV();
  const { logout } = useAuth();
  const [activeSection, setActiveSection] = useState('personal');
  
  const handlePrint = () => {
    // html2canvas ve jsPDF gibi kütüphaneler karmaşık CSS (flex, object-fit, opacity)
    // kurallarında hatalar (elips, kayıp yazılar) oluşturabiliyor.
    // Tarayıcının kendi native yazdırma motoru %100 kusursuz sonuç verir.
    window.print();
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
        <div style={{ flex: 1 }}>
          <img src="/logo.png" alt="CV Stüdyo" style={{ height: '32px', marginBottom: '0.25rem' }} />
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>Bilgilerinizi girin ve anında önizleyin.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn-secondary" onClick={handleLogout} style={{ padding: '0.6rem', borderRadius: '50%' }} title="Çıkış Yap">
            <LogOut size={18} />
          </button>
          <button className="btn-primary" onClick={handlePrint}>
            <Download size={18} />
            PDF İndir
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


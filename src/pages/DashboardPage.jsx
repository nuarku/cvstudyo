import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FileText, BookOpen, Brain, ArrowRight, LogOut, Settings } from 'lucide-react';

export const DashboardPage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Dashboard Navbar */}
      <nav style={{ background: 'white', padding: '1rem 2rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img src="/logo.png" alt="CV Stüdyo" style={{ height: '32px' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '0.9rem', color: '#64748b', display: 'none' }} className="user-email-display">
            {currentUser?.email}
          </div>
          <button 
            onClick={() => navigate('/admin')}
            className="btn-secondary" 
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            title="Admin Paneli"
          >
            <Settings size={16} /> Admin
          </button>
          <button onClick={handleLogout} className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }} title="Çıkış Yap">
            <LogOut size={16} />
          </button>
        </div>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
            Hoş Geldiniz! 👋
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#64748b' }}>
            Kariyer yolculuğunuzda bir sonraki adımınızı seçin.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          {/* CV Editor Card */}
          <div style={{ background: 'white', borderRadius: '24px', padding: '2rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', cursor: 'pointer' }}
               onClick={() => navigate('/editor')}
               onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
               onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ width: 56, height: 56, background: '#eff6ff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', marginBottom: '1.5rem' }}>
              <FileText size={28} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>CV Oluştur / Düzenle</h2>
            <p style={{ color: '#475569', lineHeight: 1.6, flex: 1 }}>
              Farklı temalar ve renk seçenekleriyle profesyonel özgeçmişinizi hazırlayın veya mevcut bilgilerinizi güncelleyin.
            </p>
            <div style={{ marginTop: '2rem', color: '#2563eb', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Editöre Git <ArrowRight size={18} />
            </div>
          </div>

          {/* English Test Card */}
          <div style={{ background: 'white', borderRadius: '24px', padding: '2rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', cursor: 'pointer' }}
               onClick={() => navigate('/test/english')}
               onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
               onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ width: 56, height: 56, background: '#fef2f2', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', marginBottom: '1.5rem' }}>
              <BookOpen size={28} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>İngilizce Seviye Tespiti</h2>
            <p style={{ color: '#475569', lineHeight: 1.6, flex: 1 }}>
              Gramer ve kelime bilginizi ölçerek mevcut İngilizce seviyenizi (A1-C1) öğrenin ve profilinize ekleyin.
            </p>
            <div style={{ marginTop: '2rem', color: '#ef4444', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Teste Başla <ArrowRight size={18} />
            </div>
          </div>

          {/* Career Test Card */}
          <div style={{ background: 'white', borderRadius: '24px', padding: '2rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', cursor: 'pointer' }}
               onClick={() => navigate('/test/career')}
               onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
               onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ width: 56, height: 56, background: '#f3e8ff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333ea', marginBottom: '1.5rem' }}>
              <Brain size={28} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Kariyer Yönelim Testi</h2>
            <p style={{ color: '#475569', lineHeight: 1.6, flex: 1 }}>
              Karakterinize ve çalışma tarzınıza en uygun iş kollarını ve kariyer profillerini keşfedin.
            </p>
            <div style={{ marginTop: '2rem', color: '#9333ea', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Teste Başla <ArrowRight size={18} />
            </div>
          </div>

        </div>
        
        <style>{`
          @media (min-width: 600px) {
            .user-email-display {
              display: block !important;
            }
          }
        `}</style>
      </main>
    </div>
  );
};

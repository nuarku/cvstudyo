import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PublicFooter = () => {
  const navigate = useNavigate();

  return (
    <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '3rem 2rem', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <img src="/logo.png" alt="CV Stüdyo Logo" style={{ height: '48px' }} />
      </div>
      <p style={{ margin: '0 0 2rem 0' }}>Profesyonel Özgeçmiş Oluşturma Platformu</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '0.9rem' }}>
        <button onClick={() => navigate('/gizlilik')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}>Gizlilik Politikası</button>
        <button onClick={() => navigate('/kvkk')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}>KVKK Metni</button>
      </div>
      <div style={{ marginTop: '3rem', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div>&copy; {new Date().getFullYear()} CV Stüdyo. Tüm hakları saklıdır.</div>
        <a href="https://nuarku.com.tr" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.7, transition: 'opacity 0.2s', cursor: 'pointer', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.opacity = 1} onMouseLeave={(e) => e.currentTarget.style.opacity = 0.7}>
          <img src="/nuarku.png" alt="Nuarku" style={{ height: '24px' }} />
        </a>
      </div>
    </footer>
  );
};

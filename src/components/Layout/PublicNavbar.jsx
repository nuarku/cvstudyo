import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PublicNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)', position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid #e2e8f0' }}>
      <div 
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
      >
        <img src="/logo.png" alt="CV Stüdyo Logo" style={{ height: '40px' }} />
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={() => navigate('/auth', { state: { isLogin: false } })} style={{ background: '#2563eb', color: 'white', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '9999px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)' }}>
          Hemen Başla
        </button>
      </div>
    </nav>
  );
};

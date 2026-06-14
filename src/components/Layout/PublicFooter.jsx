import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const PublicFooter = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '3rem 2rem', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <img src="/logo.png" alt="CV Stüdyo Logo" style={{ height: '48px' }} />
      </div>
      <p style={{ margin: '0 0 2rem 0' }}>{t('footer.subtitle')}</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '0.9rem', flexWrap: 'wrap' }}>
        <button onClick={() => navigate('/gizlilik')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}>{t('footer.privacy')}</button>
        <button onClick={() => navigate('/kvkk')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}>{t('footer.kvkk')}</button>
        <button onClick={() => navigate('/terms')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}>{t('footer.terms')}</button>
      </div>
      <div style={{ marginTop: '3rem', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div>{t('footer.rights').replace('{{year}}', currentYear)}</div>
      </div>
    </footer>
  );
};

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PublicNavbar } from '../components/Layout/PublicNavbar';
import { PublicFooter } from '../components/Layout/PublicFooter';

export const PrivacyPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      <PublicNavbar />
      <main style={{ flex: 1, padding: '3rem', maxWidth: '800px', margin: '0 auto', width: '100%', fontFamily: 'var(--font-family)', color: 'var(--text-primary)' }}>
        <button 
        onClick={() => navigate(-1)} 
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '2rem', padding: 0, fontWeight: 600 }}
      >
        <ArrowLeft size={20} />
        Geri Dön
      </button>
      
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a' }}>Gizlilik Politikası</h1>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>Son güncellenme tarihi: {new Date().toLocaleDateString('tr-TR')}</p>
      
      <div style={{ lineHeight: 1.8, color: '#334155' }}>
        <h2>1. Bilgilerin Toplanması</h2>
        <p>CV Stüdyo platformunu kullanırken bize sağladığınız isim, e-posta, ve özgeçmişinize eklediğiniz (deneyim, eğitim vb.) verileri topluyoruz. Bu veriler sadece CV'nizi oluşturmak ve size hizmet vermek amacıyla kullanılmaktadır.</p>
        
        <h2>2. Bilgilerin Kullanımı</h2>
        <p>Topladığımız bilgileri aşağıdaki amaçlar için kullanırız:</p>
        <ul>
          <li>Hizmetlerimizi sağlamak ve sürdürmek.</li>
          <li>Uygulama özelliklerini geliştirip kişiselleştirmek.</li>
          <li>Kullanıcı desteği sağlamak.</li>
        </ul>

        <h2>3. Bilgilerin Korunması</h2>
        <p>Bilgilerinizin güvenliği bizim için çok önemlidir. Sisteme girdiğiniz veriler, modern güvenlik standartları (şifreleme vs.) ile korunmaktadır. Ancak, internet üzerinden yapılan hiçbir veri iletiminin %100 güvenli olmadığını hatırlatırız.</p>
        
        <h2>4. Veri Paylaşımı</h2>
        <p>Kişisel verileriniz, yasal bir zorunluluk olmadığı sürece hiçbir şekilde 3. şahıslarla reklam veya pazarlama amacıyla paylaşılmaz veya satılmaz.</p>
        
        <h2>5. İletişim</h2>
        <p>Gizlilik politikamız ile ilgili sorularınız için bizimle iletişime geçebilirsiniz.</p>
      </div>
      </main>
      <PublicFooter />
    </div>
  );
};

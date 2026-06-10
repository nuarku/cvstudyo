import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ShieldAlert, CheckCircle } from 'lucide-react';

export const VerifyCertificatePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const type = searchParams.get('type') || 'test';
  const dateStr = searchParams.get('date');
  
  const formattedDate = dateStr 
    ? new Date(dateStr).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Bilinmeyen Tarih';

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem 2rem' }}>
      
      <div style={{ cursor: 'pointer', marginBottom: '2rem' }} onClick={() => navigate('/')}>
        <img src="/logo.png" alt="CV Stüdyo" style={{ height: '40px' }} />
      </div>

      <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '3rem', maxWidth: '600px', width: '100%', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <div style={{ width: 64, height: 64, background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle size={32} color="#15803d" />
          </div>
        </div>

        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', textAlign: 'center', marginBottom: '1rem' }}>
          Sertifika Kaydı Bulundu
        </h1>

        <p style={{ color: '#475569', textAlign: 'center', lineHeight: 1.6, marginBottom: '2rem' }}>
          Okutmuş olduğunuz QR kod, sistemimizde kayıtlı bir test sonucuna aittir. Test türü: <strong>{type === 'english' ? 'İngilizce Seviye Tespiti' : type}</strong>. <br/>
          Tamamlanma Tarihi: <strong>{formattedDate}</strong>
        </p>

        <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '12px', padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <ShieldAlert size={24} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#b91c1c', fontSize: '1.1rem', fontWeight: 700 }}>Önemli Yasal Uyarı</h3>
            <p style={{ margin: 0, color: '#991b1b', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Bu sertifika, gözetimsiz bir ortamda, kullanıcının kendi beyanına veya online test yanıtlarına dayalı olarak oluşturulmuş <strong>tahmini bir değerlendirmedir.</strong> Hiçbir resmi kurum veya kuruluş nezdinde geçerliliği yoktur.
              <br/><br/>
              CV Stüdyo, bu testin hangi koşullar altında (yardım alınarak, çeviri kullanılarak vb.) çözüldüğünü doğrulayamaz ve sonucun kesinliği konusunda <strong>hiçbir sorumluluk kabul etmez.</strong>
            </p>
          </div>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', marginTop: '2.5rem' }}
        >
          Ana Sayfaya Dön
        </button>

      </div>
    </div>
  );
};

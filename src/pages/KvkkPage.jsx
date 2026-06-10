import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PublicNavbar } from '../components/Layout/PublicNavbar';
import { PublicFooter } from '../components/Layout/PublicFooter';

export const KvkkPage = () => {
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
      
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a' }}>KVKK Aydınlatma Metni</h1>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
        İşbu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, CV Stüdyo kullanıcılarının kişisel verilerinin işlenmesine ilişkin usul ve esasları içermektedir.
      </p>
      
      <div style={{ lineHeight: 1.8, color: '#334155' }}>
        <h2>1. Veri Sorumlusu</h2>
        <p>CV Stüdyo platformu, veri sorumlusu sıfatıyla tarafınızca sağlanan kişisel verilerinizi KVKK mevzuatına uygun olarak işlemektedir.</p>
        
        <h2>2. Hangi Kişisel Verileriniz İşleniyor?</h2>
        <p>Kimlik bilgileriniz (ad, soyad), iletişim bilgileriniz (e-posta adresi, telefon numarası), özgeçmişinizde yer alan mesleki bilgileriniz, eğitim ve deneyim geçmişiniz sistemlerimiz üzerinden işlenmektedir.</p>
        
        <h2>3. Kişisel Verilerinizin İşlenme Amaçları</h2>
        <p>Verileriniz, özgeçmiş oluşturma hizmetinden yararlanmanızı sağlamak, kullanıcı hesabınızı yönetmek ve sistem güvenliğini sağlamak amaçlarıyla işlenmektedir.</p>
        
        <h2>4. Kişisel Verilerinizin Aktarılması</h2>
        <p>Kişisel verileriniz, yalnızca sunucu ve altyapı hizmeti alınan (örn: Firebase, Google Cloud) bulut sistemlerine depolama amacıyla aktarılabilir. Bunun dışında onayınız olmaksızın ticari amaçlarla 3. partilere satılmaz.</p>

        <h2>5. İlgili Kişinin Hakları (KVKK Madde 11)</h2>
        <p>KVKK'nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, amacına uygun kullanılıp kullanılmadığını öğrenme, düzeltilmesini veya silinmesini isteme hakkına sahipsiniz.</p>
      </div>
      </main>
      <PublicFooter />
    </div>
  );
};

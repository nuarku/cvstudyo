import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, FileText, Layout, Zap, X, Eye, EyeOff } from 'lucide-react';

export const AuthPage = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.state?.isLogin ?? true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedMarketing, setAcceptedMarketing] = useState(false);
  const [modalContent, setModalContent] = useState(null); // 'privacy', 'kvkk', or null
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && !acceptedTerms) {
      setError('Kayıt olmak için yasal metinleri onaylamalısınız.');
      return;
    }
    if (!isLogin) {
      if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
        setError('Şifreniz en az 8 karakter olmalı, en az bir büyük ve bir küçük harf içermelidir.');
        return;
      }
    }
    
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      navigate('/editor');
    } catch (err) {
      setError(isLogin ? 'Giriş yapılamadı. Bilgilerinizi kontrol edin.' : 'Kayıt işlemi başarısız oldu.');
      console.error(err);
    }

    setLoading(false);
  };

  const renderModal = () => {
    if (!modalContent) return null;

    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
        padding: '2rem'
      }}>
        <div style={{
          background: 'white', borderRadius: '24px', width: '100%', maxWidth: '600px',
          maxHeight: '80vh', display: 'flex', flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}>
          <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a' }}>
              {modalContent === 'privacy' ? 'Gizlilik Politikası' : 'KVKK Aydınlatma Metni'}
            </h2>
            <button onClick={() => setModalContent(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
              <X size={24} />
            </button>
          </div>
          <div style={{ padding: '2rem', overflowY: 'auto', color: '#475569', lineHeight: 1.6, fontSize: '0.95rem' }}>
            {modalContent === 'privacy' ? (
              <>
                <p><strong>1. Bilgilerin Toplanması</strong><br/>CV Stüdyo (NUARKU Yazılım Teknolojileri A.Ş.) platformunu kullanırken bize sağladığınız isim, e-posta ve özgeçmişinize eklediğiniz verileri topluyoruz. Bu veriler sadece CV'nizi oluşturmak amacıyla kullanılmaktadır.</p>
                <p><strong>2. Bilgilerin Kullanımı</strong><br/>Hizmetlerimizi sağlamak, özellikleri kişiselleştirmek ve onay vermeniz halinde size uygun kampanya, duyuru ve hizmet teklifleri sunabilmek amacıyla iletişim bilgileriniz kullanılır.</p>
                <p><strong>3. Veri Paylaşımı</strong><br/>Kişisel verileriniz, yasal bir zorunluluk olmadığı sürece hiçbir şekilde 3. şahıslarla reklam veya pazarlama amacıyla paylaşılmaz veya satılmaz. İzinli iletişimler sadece NUARKU üzerinden gerçekleştirilir.</p>
                <p><strong>4. Bilgilerin Korunması</strong><br/>Verileriniz, modern şifreleme ve güvenlik standartları ile korunmaktadır.</p>
              </>
            ) : (
              <>
                <p><strong>1. Veri Sorumlusu</strong><br/>NUARKU Yazılım Teknolojileri A.Ş. olarak, sağlanan kişisel verilerinizi 6698 sayılı KVKK mevzuatına uygun olarak işliyoruz.</p>
                <p><strong>2. İşlenen Veriler ve Amaçları</strong><br/>Kimlik, iletişim ve mesleki bilgileriniz özgeçmiş oluşturma ve sistem güvenliğini sağlama amacıyla; onay vermeniz halinde iletişim bilgileriniz, size uygun yeni ürün ve hizmetlerin tanıtımı amacıyla işlenmektedir.</p>
                <p><strong>3. Verilerin Aktarılması</strong><br/>Kişisel verileriniz yalnızca altyapı hizmeti alınan (örn: Firebase) bulut sistemlerine depolama amacıyla ve yasal mevzuata uygun şekilde aktarılabilir.</p>
                <p><strong>4. Haklarınız (KVKK Madde 11)</strong><br/>Verilerinizin işlenip işlenmediğini öğrenme, işlenme amacına uygun kullanılıp kullanılmadığını bilme, silinmesini isteme, ticari elektronik ileti almayı reddetme veya düzeltilmesini talep etme hakkına sahipsiniz.</p>
              </>
            )}
          </div>
          <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid #e2e8f0', textAlign: 'right' }}>
            <button 
              onClick={() => setModalContent(null)}
              style={{ background: '#2563eb', color: 'white', border: 'none', padding: '0.75rem 2rem', borderRadius: '9999px', fontWeight: 600, cursor: 'pointer' }}
            >
              Anladım
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderModal()}
      <div className="auth-container" style={{ minHeight: '100vh', fontFamily: 'var(--font-family)' }}>
        {/* Sol Panel: Tanıtım */}
        <div className="auth-panel-left" style={{ 
          flex: 1, 
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
          color: 'white', 
          padding: '4rem', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Dekoratif Daireler */}
          <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '400px', height: '400px', background: 'rgba(37, 99, 235, 0.2)', borderRadius: '50%', filter: 'blur(60px)' }}></div>
          <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '300px', height: '300px', background: 'rgba(139, 92, 246, 0.2)', borderRadius: '50%', filter: 'blur(60px)' }}></div>
          
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '500px', margin: '0 auto' }}>
            <img 
              src="/logo.png" 
              alt="CV Stüdyo Logo" 
              onClick={() => navigate('/')}
              style={{ height: '48px', marginBottom: '1.5rem', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))', cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
            <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: 1.2 }}>Kariyerini<br/><span style={{ color: '#60a5fa' }}>Şekillendir</span></h1>
            <p style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '3rem', lineHeight: 1.6 }}>Profesyonel şablonlar ile dakikalar içinde modern bir özgeçmiş oluştur. İş başvurularında bir adım öne çık.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '12px' }}><Zap size={24} color="#60a5fa" /></div>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>Saniyeler İçinde Çıktı Al</h3>
                  <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem' }}>Verilerini gir, temayı seç ve anında yüksek çözünürlüklü PDF formatında indir.</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '12px' }}><Layout size={24} color="#a78bfa" /></div>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>Modern ve Şık Temalar</h3>
                  <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem' }}>Farklı sektörlere ve seviyelere uygun, dikkat çekici, minimalist veya yaratıcı CV şablonları.</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '12px' }}><FileText size={24} color="#34d399" /></div>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>Canlı Önizleme</h3>
                  <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem' }}>Her değişikliği anında sağ ekranda canlı olarak izle, hata yapma payını sıfıra indir.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Panel: Form */}
        <div className="auth-panel-right" style={{ background: '#f8fafc', padding: '2rem' }}>
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div className="mobile-only-logo" style={{ display: 'none', justifyContent: 'center', marginBottom: '2rem' }}>
                <img src="/logo.png" alt="CV Stüdyo Logo" onClick={() => navigate('/')} style={{ height: '40px', cursor: 'pointer' }} />
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 0.5rem 0', color: '#0f172a' }}>
                {isLogin ? 'Hoş Geldin' : 'Aramıza Katıl'}
              </h2>
              <p style={{ color: '#64748b', margin: 0, fontSize: '0.95rem' }}>
                {isLogin ? 'Kaldığın yerden devam etmek için giriş yap.' : 'Hemen ücretsiz bir hesap oluştur.'}
              </p>
            </div>

            {error && (
              <div style={{ background: '#fef2f2', color: '#ef4444', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center', border: '1px solid #fee2e2' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>E-posta Adresi</label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="ornek@email.com"
                    style={{ width: '100%', padding: '0.85rem 1.25rem 0.85rem 3rem', borderRadius: '9999px', border: '1px solid #e2e8f0', fontSize: '0.95rem', outline: 'none', background: 'white' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Şifre</label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
                    <Lock size={18} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    style={{ width: '100%', padding: '0.85rem 3rem 0.85rem 3rem', borderRadius: '9999px', border: '1px solid #e2e8f0', fontSize: '0.95rem', outline: 'none', background: 'white' }}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <input 
                      type="checkbox" 
                      id="terms" 
                      required
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      style={{ marginTop: '0.2rem', width: 'auto', flexShrink: 0 }}
                    />
                    <label htmlFor="terms" style={{ fontSize: '0.85rem', color: '#475569', margin: 0, textTransform: 'none', fontWeight: 400, letterSpacing: 'normal' }}>
                      <button type="button" onClick={() => setModalContent('privacy')} style={{ background: 'none', border: 'none', padding: 0, color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: 'inherit' }}>Gizlilik Politikası</button>'nı ve <button type="button" onClick={() => setModalContent('kvkk')} style={{ background: 'none', border: 'none', padding: 0, color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: 'inherit' }}>KVKK Aydınlatma Metni</button>'ni okudum, anladım ve kabul ediyorum.
                    </label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <input 
                      type="checkbox" 
                      id="marketing" 
                      checked={acceptedMarketing}
                      onChange={(e) => setAcceptedMarketing(e.target.checked)}
                      style={{ marginTop: '0.2rem', width: 'auto', flexShrink: 0 }}
                    />
                    <label htmlFor="marketing" style={{ fontSize: '0.85rem', color: '#475569', margin: 0, textTransform: 'none', fontWeight: 400, letterSpacing: 'normal' }}>
                      Tarafıma uygun hizmet, kampanya ve ürün tekliflerinin sunulması amacıyla iletişim bilgilerimin kullanılmasına açık rıza gösteriyorum.
                    </label>
                  </div>
                </>
              )}

              <button 
                type="submit" 
                disabled={loading}
                style={{
                  background: '#2563eb', color: 'white', padding: '1rem', borderRadius: '9999px', border: 'none', fontWeight: 600, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', marginTop: isLogin ? '1rem' : '0.5rem', transition: 'all 0.2s', opacity: loading ? 0.7 : 1, boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
                }}
              >
                {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.9rem', color: '#64748b' }}>
              {isLogin ? "Hesabın yok mu? " : "Zaten hesabın var mı? "}
              <button 
                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 600, cursor: 'pointer', padding: 0 }}
              >
                {isLogin ? 'Hemen Kayıt Ol' : 'Giriş Yap'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

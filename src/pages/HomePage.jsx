import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Layout, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PublicNavbar } from '../components/Layout/PublicNavbar';
import { PublicFooter } from '../components/Layout/PublicFooter';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      <PublicNavbar />

      {/* Hero Section */}
      <main style={{ flex: 1 }}>
        <section style={{ padding: '6rem 2rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#dcfce7', color: '#15803d', padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 700 }}>
              Tamamen Ücretsiz
            </div>
          </div>
          
          <h1 style={{ fontSize: '4rem', fontWeight: '800', color: '#0f172a', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.05em' }}>
            Kariyerinize <span style={{ color: '#2563eb' }}>Güçlü</span> Bir Başlangıç Yapın
          </h1>
          
          <p style={{ fontSize: '1.25rem', color: '#475569', marginBottom: '3rem', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            Göz alıcı şablonlar, canlı önizleme ve anında PDF indirme özellikleriyle modern bir CV oluşturmak artık çok kolay.
          </p>
          
          <button 
            className="hero-btn"
            onClick={() => navigate('/auth', { state: { isLogin: false } })}
          >
            Hemen Ücretsiz CV Oluştur <ArrowRight size={20} />
          </button>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', color: '#64748b', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#22c55e" /> Üyelik Ücretsiz</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#22c55e" /> Sınırsız İndirme</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#22c55e" /> 5+ Modern Tema</div>
          </div>
        </section>

        {/* Features Section */}
        <section style={{ background: 'white', padding: '5rem 2rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem' }}>Neden CV Stüdyo?</h2>
              <p style={{ color: '#64748b', fontSize: '1.1rem' }}>İşverenlerin dikkatini çekecek, modern ve profesyonel bir görünüm için ihtiyacınız olan her şey.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
              <div style={{ padding: '2.5rem', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                <div style={{ width: 48, height: 48, background: '#dbeafe', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Zap size={24} color="#2563eb" />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Hızlı ve Kolay</h3>
                <p style={{ color: '#475569', lineHeight: 1.6, margin: 0 }}>Karmaşık programlarla uğraşmayın. Bilgilerinizi formlara girin, gerisini sistemimize bırakın. Her şey otomatik.</p>
              </div>

              <div style={{ padding: '2.5rem', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                <div style={{ width: 48, height: 48, background: '#f3e8ff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Layout size={24} color="#9333ea" />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Modern Temalar</h3>
                <p style={{ color: '#475569', lineHeight: 1.6, margin: 0 }}>Klasik, Yaratıcı, Minimalist... Sektörünüze en uygun tasarımı tek tıklamayla seçin. Renkleri dilediğiniz gibi özelleştirin.</p>
              </div>

              <div style={{ padding: '2.5rem', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                <div style={{ width: 48, height: 48, background: '#d1fae5', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <FileText size={24} color="#059669" />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Sınırsız PDF Çıktısı</h3>
                <p style={{ color: '#475569', lineHeight: 1.6, margin: 0 }}>Canlı önizleme ile CV'nizin son halini her an görün. Memnun kaldığınızda yüksek kaliteli PDF formatında anında indirin.</p>
              </div>
            </div>
          </div>
        </section>

        {/* NUARKU Banner */}
        <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '5rem 2rem', color: 'white', textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <a href="https://nuarku.com.tr" target="_blank" rel="noopener noreferrer">
              <img src="/nuarku.png" alt="NUARKU Yazılım Teknolojileri A.Ş." style={{ height: '40px', filter: 'brightness(1.2)' }} />
            </a>
            <p style={{ fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
              CV Stüdyo, <strong>NUARKU Yazılım Teknolojileri A.Ş.</strong> tarafından kariyer yolculuğunuzda size destek olmak amacıyla geliştirilen tamamen ücretsiz bir platformdur.
            </p>
            <a href="https://nuarku.com.tr" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', transition: 'color 0.2s' }}>
              Daha fazla bilgi için nuarku.com.tr <ArrowRight size={16} />
            </a>
          </div>
        </section>
      </main>

      <PublicFooter />

      {/* Basic Keyframe Injection for Ping Animation */}
      <style>
        {`
          @keyframes ping {
            75%, 100% {
              transform: scale(2);
              opacity: 0;
            }
          }
          .hero-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            background: linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%);
            color: white;
            padding: 1.25rem 3rem;
            border-radius: 9999px;
            font-size: 1.25rem;
            font-weight: 700;
            border: none;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.4), 0 8px 10px -6px rgba(37, 99, 235, 0.2);
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .hero-btn:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 20px 25px -5px rgba(37, 99, 235, 0.5), 0 8px 10px -6px rgba(37, 99, 235, 0.3);
            background: linear-gradient(135deg, #1d4ed8 0%, #0284c7 100%);
          }
          .hero-btn:active {
            transform: translateY(0) scale(0.98);
          }
        `}
      </style>
    </div>
  );
};

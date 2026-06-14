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
              <div className="feature-card" style={{ padding: '2.5rem', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                <div style={{ width: 48, height: 48, background: '#dbeafe', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Zap size={24} color="#2563eb" />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Hızlı ve Kolay</h3>
                <p style={{ color: '#475569', lineHeight: 1.6, margin: 0 }}>Karmaşık programlarla uğraşmayın. Bilgilerinizi formlara girin, gerisini sistemimize bırakın. Her şey otomatik.</p>
              </div>

              <div className="feature-card" style={{ padding: '2.5rem', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                <div style={{ width: 48, height: 48, background: '#f3e8ff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Layout size={24} color="#9333ea" />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Modern Temalar</h3>
                <p style={{ color: '#475569', lineHeight: 1.6, margin: 0 }}>Klasik, Yaratıcı, Minimalist... Sektörünüze en uygun tasarımı tek tıklamayla seçin. Renkleri dilediğiniz gibi özelleştirin.</p>
              </div>

              <div className="feature-card" style={{ padding: '2.5rem', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                <div style={{ width: 48, height: 48, background: '#d1fae5', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <FileText size={24} color="#059669" />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Sınırsız PDF Çıktısı</h3>
                <p style={{ color: '#475569', lineHeight: 1.6, margin: 0 }}>Canlı önizleme ile CV'nizin son halini her an görün. Memnun kaldığınızda yüksek kaliteli PDF formatında anında indirin.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Highlight Section */}
        <section style={{ borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', background: 'white', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', textAlign: 'center' }}>
            <div className="stat-card">
              <div style={{ fontSize: '3rem', fontWeight: '800', color: '#2563eb', marginBottom: '0.5rem', lineHeight: 1 }}>5+</div>
              <div style={{ color: '#64748b', fontWeight: 600, fontSize: '1.1rem' }}>Profesyonel Tema</div>
            </div>
            <div className="stat-card">
              <div style={{ fontSize: '3rem', fontWeight: '800', color: '#9333ea', marginBottom: '0.5rem', lineHeight: 1 }}>%100</div>
              <div style={{ color: '#64748b', fontWeight: 600, fontSize: '1.1rem' }}>Ücretsiz Kullanım</div>
            </div>
            <div className="stat-card">
              <div style={{ fontSize: '3rem', fontWeight: '800', color: '#059669', marginBottom: '0.5rem', lineHeight: 1 }}>Aa</div>
              <div style={{ color: '#64748b', fontWeight: 600, fontSize: '1.1rem' }}>Zengin Yazı Tipleri</div>
            </div>
            <div className="stat-card">
              <div style={{ fontSize: '3rem', fontWeight: '800', color: '#ea580c', marginBottom: '0.5rem', lineHeight: 1 }}>PDF</div>
              <div style={{ color: '#64748b', fontWeight: 600, fontSize: '1.1rem' }}>Anında PDF Çıktısı</div>
            </div>
          </div>
        </section>

        {/* Tests Highlight Section */}
        <section style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)', padding: '6rem 2rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e0e7ff', color: '#4338ca', padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem' }}>
                Kendini Geliştir
              </div>
              <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', letterSpacing: '-0.025em' }}>
                Kendinizi Test Edin
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#475569', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                Sadece CV oluşturmakla kalmayın, seviyenizi ölçüp profilinize değer katın. Testleri çözün, sertifikanızı alın ve becerilerinizi kanıtlayın.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
              <div className="test-card english">
                <div className="icon-wrapper english-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                </div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', letterSpacing: '-0.025em' }}>İngilizce Seviye Tespiti</h3>
                <p style={{ color: '#475569', marginBottom: '2.5rem', lineHeight: 1.6, fontSize: '1.1rem' }}>
                  A1'den C1'e uzanan kapsamlı sorularla İngilizce gramer ve kelime bilginizi test edin. Resmi görünümlü sertifikanızı hemen alın!
                </p>
                <button onClick={() => navigate('/test/english')} className="test-btn english">
                  Teste Başla <ArrowRight size={20} />
                </button>
              </div>

              <div className="test-card career">
                <div className="icon-wrapper career-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-3.46-3.52 2.5 2.5 0 0 1-1.06-5.27 2.5 2.5 0 0 1 3.96-2.5A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 3.46-3.52 2.5 2.5 0 0 0 1.06-5.27 2.5 2.5 0 0 0-3.96-2.5A2.5 2.5 0 0 0 14.5 2Z"/></svg>
                </div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', letterSpacing: '-0.025em' }}>Kariyer Yönelim Testi</h3>
                <p style={{ color: '#475569', marginBottom: '2.5rem', lineHeight: 1.6, fontSize: '1.1rem' }}>
                  Gerçek iş hayatı senaryolarına dayalı analizlerle hangi çalışma tarzına ve profile uygun olduğunuzu yapay zeka ile keşfedin.
                </p>
                <button onClick={() => navigate('/test/career')} className="test-btn career">
                  Teste Başla <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* NUARKU Banner */}
        <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '5rem 2rem', color: 'white', textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <a href="https://nuarku.com.tr" target="_blank" rel="noopener noreferrer" className="nuarku-logo">
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

      {/* Advanced UI Styles */}
      <style>
        {`
          @keyframes ping {
            75%, 100% {
              transform: scale(2);
              opacity: 0;
            }
          }
          
          /* Hero Button */
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
            box-shadow: 0 20px 30px -5px rgba(37, 99, 235, 0.5), 0 8px 10px -6px rgba(37, 99, 235, 0.3);
            background: linear-gradient(135deg, #1d4ed8 0%, #0284c7 100%);
          }
          .hero-btn:active {
            transform: translateY(0) scale(0.98);
          }

          /* Feature & Stat Cards */
          .feature-card {
            transition: all 0.3s ease;
          }
          .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02);
            background: white !important;
            border-color: #e2e8f0 !important;
          }
          .stat-card {
            transition: all 0.3s ease;
          }
          .stat-card:hover {
            transform: scale(1.05);
          }

          /* Premium Test Cards */
          .test-card {
            background: white;
            padding: 3.5rem 2.5rem;
            border-radius: 32px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 10px 20px -5px rgba(0,0,0,0.05);
            text-align: center;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }
          .test-card:hover {
            transform: translateY(-12px);
            box-shadow: 0 30px 60px -12px rgba(0,0,0,0.12);
            border-color: #cbd5e1;
          }
          
          /* Top Gradient Border on Hover */
          .test-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: transparent;
            transition: all 0.4s ease;
            opacity: 0;
          }
          .test-card.english::before {
            background: linear-gradient(90deg, #ef4444, #f97316);
          }
          .test-card.career::before {
            background: linear-gradient(90deg, #8b5cf6, #d946ef);
          }
          .test-card:hover::before {
            opacity: 1;
          }

          /* Icons */
          .icon-wrapper {
            width: 80px;
            height: 80px;
            border-radius: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 2rem;
            transition: all 0.4s ease;
          }
          .english-icon {
            background: linear-gradient(135deg, #fef2f2 0%, #ffedd5 100%);
            color: #ef4444;
          }
          .career-icon {
            background: linear-gradient(135deg, #f3e8ff 0%, #fce7f3 100%);
            color: #9333ea;
          }
          .test-card:hover .icon-wrapper {
            transform: scale(1.1) rotate(5deg);
          }
          .test-card.english:hover .english-icon {
            background: linear-gradient(135deg, #ef4444 0%, #f97316 100%);
            color: white;
            box-shadow: 0 10px 20px -5px rgba(239, 68, 68, 0.4);
          }
          .test-card.career:hover .career-icon {
            background: linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%);
            color: white;
            box-shadow: 0 10px 20px -5px rgba(139, 92, 246, 0.4);
          }

          /* Buttons */
          .test-btn {
            margin-top: auto;
            width: 100%;
            padding: 1.25rem;
            color: white;
            border: none;
            border-radius: 16px;
            font-weight: 700;
            font-size: 1.1rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
          }
          .test-btn.english {
            background: #ef4444;
            box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.2);
          }
          .test-card.english:hover .test-btn.english {
            background: linear-gradient(135deg, #ef4444 0%, #f97316 100%);
            box-shadow: 0 15px 25px -5px rgba(239, 68, 68, 0.4);
            transform: scale(1.03);
          }
          .test-btn.career {
            background: #9333ea;
            box-shadow: 0 4px 6px -1px rgba(147, 51, 234, 0.2);
          }
          .test-card.career:hover .test-btn.career {
            background: linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%);
            box-shadow: 0 15px 25px -5px rgba(147, 51, 234, 0.4);
            transform: scale(1.03);
          }

          /* NUARKU Logo Hover */
          .nuarku-logo img {
            transition: all 0.3s ease;
          }
          .nuarku-logo:hover img {
            transform: scale(1.05);
            filter: brightness(1.5) drop-shadow(0 0 10px rgba(255,255,255,0.3)) !important;
          }
        `}
      </style>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Sparkles, Edit3, Palette, Eye, Download, X } from 'lucide-react';

export const TutorialModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (!hasSeenTutorial) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('hasSeenTutorial', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const slides = [
    {
      title: "CV Stüdyo'ya Hoş Geldin! 🎉",
      description: "Profesyonel bir özgeçmiş hazırlamak hiç bu kadar kolay olmamıştı. Seni kısaca bir tura çıkaralım.",
      icon: <Sparkles size={48} color="#60a5fa" />
    },
    {
      title: "1. Bilgilerini Gir",
      description: "Sol paneldeki sekmeleri kullanarak eğitim, deneyim ve yeteneklerini eksiksiz bir şekilde doldur.",
      icon: <Edit3 size={48} color="#34d399" />
    },
    {
      title: "2. Tarzını Yansıt",
      description: "Görünüm ve Tema sekmesinden kişiliğine ve başvurduğun pozisyona en uygun tasarımı seç.",
      icon: <Palette size={48} color="#a78bfa" />
    },
    {
      title: "3. Anında Önizle",
      description: "Yaptığın her bir değişikliği sağ taraftaki önizleme ekranında eşzamanlı olarak takip et.",
      icon: <Eye size={48} color="#fbbf24" />
    },
    {
      title: "4. Hazırsın!",
      description: "Her şey tamamsa, sağ üstteki 'PDF İndir' butonuna tıklayarak CV'ni anında cihazına indirebilirsin.",
      icon: <Download size={48} color="#f87171" />
    }
  ];

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
      padding: '2rem'
    }}>
      <div style={{
        background: 'white', borderRadius: '24px', width: '100%', maxWidth: '500px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', position: 'relative',
        overflow: 'hidden', textAlign: 'center'
      }}>
        <button 
          onClick={handleClose} 
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', zIndex: 10 }}
        >
          <X size={24} />
        </button>

        <div style={{ padding: '3rem 2rem 2rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
            {slides[step].icon}
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
            {slides[step].title}
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2.5rem', minHeight: '60px' }}>
            {slides[step].description}
          </p>

          {/* İlerleme Noktaları */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
            {slides.map((_, index) => (
              <div 
                key={index} 
                style={{ 
                  width: step === index ? '24px' : '8px', 
                  height: '8px', 
                  borderRadius: '9999px', 
                  background: step === index ? '#2563eb' : '#e2e8f0',
                  transition: 'all 0.3s ease'
                }} 
              />
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
            {step > 0 && (
              <button 
                onClick={() => setStep(step - 1)}
                style={{ flex: 1, padding: '1rem', borderRadius: '9999px', border: '1px solid #e2e8f0', background: 'white', color: '#475569', fontWeight: 600, cursor: 'pointer' }}
              >
                Geri
              </button>
            )}
            
            {step < slides.length - 1 ? (
              <button 
                onClick={() => setStep(step + 1)}
                style={{ flex: 2, padding: '1rem', borderRadius: '9999px', border: 'none', background: '#2563eb', color: 'white', fontWeight: 600, cursor: 'pointer' }}
              >
                İleri
              </button>
            ) : (
              <button 
                onClick={handleClose}
                style={{ flex: 2, padding: '1rem', borderRadius: '9999px', border: 'none', background: '#34d399', color: 'white', fontWeight: 600, cursor: 'pointer' }}
              >
                Hemen Başla!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

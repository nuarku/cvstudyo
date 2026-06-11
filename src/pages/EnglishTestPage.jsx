import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCV } from '../context/CVContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, BookOpen, Download, RotateCcw, CheckCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import html2pdf from 'html2pdf.js';

// 20 Questions - CEFR Aligned (A1 to C1/C2)
const questions = [
  // A1 Level
  { id: 1, text: "I _____ a student and my brother _____ a teacher.", options: ["am / are", "am / is", "is / is", "are / is"], correct: 1 },
  { id: 2, text: "Excuse me, where _____ the nearest bank?", options: ["is", "are", "do", "does"], correct: 0 },
  { id: 3, text: "_____ you like to drink some tea?", options: ["Do", "Are", "Would", "Will"], correct: 2 },
  { id: 4, text: "She usually _____ up at 7 o'clock every morning.", options: ["get", "gets", "got", "getting"], correct: 1 },
  // A2 Level
  { id: 5, text: "I _____ to Paris three times in my life.", options: ["go", "went", "have been", "was"], correct: 2 },
  { id: 6, text: "This book is much _____ than the one I read last week.", options: ["good", "better", "best", "more good"], correct: 1 },
  { id: 7, text: "What _____ you doing when the phone rang?", options: ["are", "do", "were", "did"], correct: 2 },
  { id: 8, text: "There isn't _____ milk left in the fridge.", options: ["some", "any", "no", "a"], correct: 1 },
  // B1 Level
  { id: 9, text: "If I _____ enough money, I would travel around the world.", options: ["have", "had", "will have", "would have"], correct: 1 },
  { id: 10, text: "The house _____ built in 1980 by my grandfather.", options: ["is", "has", "was", "had"], correct: 2 },
  { id: 11, text: "I'm looking forward _____ from you soon.", options: ["to hear", "hear", "to hearing", "hearing"], correct: 2 },
  { id: 12, text: "Could you tell me what time _____?", options: ["is the train", "the train is", "does the train arrive", "the train arrive"], correct: 1 },
  // B2 Level
  { id: 13, text: "She _____ have left her phone at home; she isn't answering.", options: ["must", "can't", "should", "would"], correct: 0 },
  { id: 14, text: "Despite _____ hard all week, they couldn't finish the project on time.", options: ["work", "worked", "working", "they worked"], correct: 2 },
  { id: 15, text: "By the end of this year, I _____ here for five years.", options: ["will work", "will have been working", "worked", "am working"], correct: 1 },
  { id: 16, text: "I am not used to _____ up so early in the morning.", options: ["wake", "waking", "woke", "waken"], correct: 1 },
  // C1/C2 Level
  { id: 17, text: "Rarely _____ such a captivating performance in this theatre.", options: ["I have seen", "have I seen", "I saw", "did I saw"], correct: 1 },
  { id: 18, text: "He strongly objected _____ treated like an amateur by the committee.", options: ["to be", "being", "to being", "be"], correct: 2 },
  { id: 19, text: "Had I known about the severity of the storm, I _____ earlier.", options: ["would leave", "had left", "would have left", "left"], correct: 2 },
  { id: 20, text: "The new policy, _____ the initial public backlash, proved to be highly effective.", options: ["although", "in spite of", "however", "even though"], correct: 1 }
];

export const EnglishTestPage = () => {
  const navigate = useNavigate();
  const { cvData, updateTests, addLanguage, updateLanguage } = useCV();
  const { currentUser } = useAuth();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  // Check if there is a previous test result
  useEffect(() => {
    if (cvData?.tests?.english && !isFinished) {
      setResult(cvData.tests.english);
      setShowHistory(true);
      setIsFinished(true);
    }
  }, [cvData]);

  const startNewTest = () => {
    setShowHistory(false);
    setIsFinished(false);
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };

  const handleSelect = (optionIndex) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: optionIndex }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) correctCount++;
    });
    
    // Each question is 5 points (total 100)
    let score = correctCount * 5; 

    let level = 'A1 (Başlangıç)';
    if (score >= 25 && score < 45) level = 'A2 (Temel)';
    else if (score >= 45 && score < 65) level = 'B1 (Orta)';
    else if (score >= 65 && score < 85) level = 'B2 (İyi)';
    else if (score >= 85 && score < 95) level = 'C1 (İleri)';
    else if (score >= 95) level = 'C2 (Yetkin)';

    const resultData = { score, level, date: new Date().toISOString() };
    setResult(resultData);
    updateTests('english', resultData);

    // Otomatik Yabancı Dil Ekleme
    const existingEnglish = (cvData.languages || []).find(lang => lang.language.toLowerCase() === 'i̇ngilizce' || lang.language.toLowerCase() === 'ingilizce' || lang.language.toLowerCase() === 'english');
    if (existingEnglish) {
      updateLanguage(existingEnglish.id, { proficiency: level });
    } else {
      addLanguage({ language: 'İngilizce', proficiency: level });
    }

    setIsFinished(true);
    setShowHistory(false);
  };

  const handlePrint = async () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      const element = document.querySelector('.certificate-container');
      if (!element) return;
      
      const clone = element.cloneNode(true);
      document.body.appendChild(clone);
      
      // Place clone at top-left but completely behind the page so it's invisible to the user
      clone.style.position = 'absolute';
      clone.style.top = '0';
      clone.style.left = '0';
      clone.style.zIndex = '-9999';
      
      // Force exact A4 dimensions in pixels at 96 DPI (297mm x 210mm)
      clone.style.width = '1122px';
      clone.style.height = '793px';
      clone.style.maxWidth = 'none';
      clone.style.maxHeight = 'none';
      clone.style.margin = '0';
      clone.style.boxShadow = 'none';
      clone.style.transform = 'none';
      clone.style.overflow = 'hidden';
      
      try {
        const dataUrl = await toJpeg(clone, {
          quality: 0.98,
          pixelRatio: 2,
          canvasWidth: 1122,
          canvasHeight: 793,
          backgroundColor: '#ffffff',
          style: {
            transform: 'none',
          }
        });
        
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4'
        });
        
        // Force the image to exactly fill the 297x210mm A4 landscape page
        pdf.addImage(dataUrl, 'JPEG', 0, 0, 297, 210);
        pdf.save('Ingilizce-Sertifikasi.pdf');
      } catch (err) {
        console.error('PDF error:', err);
      } finally {
        document.body.removeChild(clone);
      }
    } else {
      window.print();
    }
  };

  // Common Header component for test pages
  const TestHeader = () => (
    <div className="hide-on-print" style={{ background: 'white', padding: '1rem 2rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
        <img src="/logo.png" alt="CV Stüdyo" style={{ height: '32px' }} />
      </div>
      <button 
        onClick={() => navigate('/dashboard')}
        style={{ background: 'transparent', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', cursor: 'pointer', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 600, transition: 'all 0.2s' }}
      >
        <ArrowLeft size={16} /> Dashboard'a Dön
      </button>
    </div>
  );

  if (isFinished) {
    const verifyUrl = `https://cv-studyo-app.web.app/verify/certificate?type=english&user=${currentUser?.uid || 'unknown'}&date=${encodeURIComponent(result.date)}`;
    
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
        <TestHeader />

        <div style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          
          {showHistory && (
            <div className="hide-on-print" style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1rem 2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '800px' }}>
              <div>
                <h3 style={{ margin: '0 0 0.25rem 0', color: '#1e3a8a', fontSize: '1.1rem' }}>Önceki Test Sonucunuz</h3>
                <p style={{ margin: 0, color: '#3b82f6', fontSize: '0.9rem' }}>Bu testi daha önce {new Date(result.date).toLocaleDateString('tr-TR')} tarihinde çözdünüz.</p>
              </div>
              <button 
                onClick={startNewTest}
                className="btn-primary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
              >
                <RotateCcw size={16} /> Yeniden Test Çöz
              </button>
            </div>
          )}

          {/* Certificate Container */}
          <div className="certificate-container" style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '3rem', maxWidth: '800px', width: '100%', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
            
            {/* Certificate Background Pattern */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '10px', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)' }}></div>
            
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <img src="/logo.png" alt="CV Stüdyo" style={{ height: '40px', marginBottom: '1.5rem' }} />
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.025em', textTransform: 'uppercase' }}>SEVİYE TESPİT BELGESİ</h1>
              <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '0.5rem' }}>İngilizce Seviye Tespiti</p>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <p style={{ color: '#475569', fontSize: '1.1rem', marginBottom: '1rem' }}>Bu sertifika,</p>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b', borderBottom: '2px solid #e2e8f0', display: 'inline-block', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                {(cvData?.personalInfo?.fullName || currentUser?.email?.split('@')[0] || 'KULLANICI').toUpperCase()}
              </h2>
              <p style={{ color: '#475569', fontSize: '1.1rem', maxWidth: '500px', margin: '1rem auto' }}>
                tarafından tamamlanan İngilizce değerlendirme sınavı sonucunda aşağıdaki tahmini seviyeye ulaştığını gösterir.
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginTop: '3rem' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Seviye</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#2563eb' }}>{result.level}</div>
                </div>
                <div style={{ width: '1px', background: '#e2e8f0' }}></div>
                <div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Skor</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#2563eb' }}>{result.score}/100</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #f1f5f9', paddingTop: '2rem' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Tarih</div>
                <div style={{ fontWeight: 600, color: '#475569' }}>{new Date(result.date).toLocaleDateString('tr-TR')}</div>

              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ background: 'white', padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'inline-block' }}>
                  <QRCodeSVG value={verifyUrl} size={80} level="M" includeMargin={false} />
                </div>
              </div>
            </div>
          </div>

          <div className="hide-on-print" style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button 
              onClick={handlePrint}
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Download size={18} /> Belgeyi Kaydet / Yazdır
            </button>
            
            {!showHistory && (
              <button 
                onClick={startNewTest}
                className="btn-secondary"
              >
                <RotateCcw size={18} /> Yeniden Çöz
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      <TestHeader />

      <div style={{ padding: '3rem 2rem', flex: 1 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <div style={{ background: 'white', borderRadius: '24px', padding: '3rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: 48, height: 48, background: '#fef2f2', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                <BookOpen size={24} />
              </div>
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>İngilizce Seviye Tespiti</h1>
                <p style={{ color: '#64748b', margin: '0.25rem 0 0 0', fontSize: '0.9rem' }}>Soru {currentQuestion + 1} / {questions.length}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ width: '100%', height: 6, background: '#f1f5f9', borderRadius: 3, marginBottom: '3rem', overflow: 'hidden' }}>
              <div style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%`, height: '100%', background: '#2563eb', transition: 'width 0.3s' }}></div>
            </div>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '2rem', lineHeight: 1.5 }}>
              {q.text}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
              {q.options.map((opt, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  style={{ 
                    padding: '1rem 1.5rem', 
                    textAlign: 'left', 
                    background: answers[currentQuestion] === idx ? '#eff6ff' : 'white',
                    border: `2px solid ${answers[currentQuestion] === idx ? '#3b82f6' : '#e2e8f0'}`,
                    borderRadius: '12px',
                    fontSize: '1.05rem',
                    color: answers[currentQuestion] === idx ? '#1d4ed8' : '#475569',
                    fontWeight: answers[currentQuestion] === idx ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                className="btn-primary" 
                onClick={handleNext}
                disabled={answers[currentQuestion] === undefined}
                style={{ opacity: answers[currentQuestion] === undefined ? 0.5 : 1 }}
              >
                {currentQuestion === questions.length - 1 ? 'Testi Bitir' : 'Sonraki Soru'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

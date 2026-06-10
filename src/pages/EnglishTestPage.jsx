import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCV } from '../context/CVContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, BookOpen, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const questions = [
  // A1 Level
  { id: 1, text: "I _____ from Turkey.", options: ["am", "is", "are", "be"], correct: 0 },
  { id: 2, text: "She _____ to work by bus every day.", options: ["go", "goes", "going", "went"], correct: 1 },
  { id: 3, text: "_____ you like some coffee?", options: ["Do", "Are", "Would", "Have"], correct: 2 },
  { id: 4, text: "They _____ playing football right now.", options: ["is", "are", "do", "did"], correct: 1 },
  // A2 Level
  { id: 5, text: "I have _____ lived in London, but I'd like to go there one day.", options: ["ever", "never", "always", "sometimes"], correct: 1 },
  { id: 6, text: "He is taller _____ his brother.", options: ["than", "then", "that", "from"], correct: 0 },
  { id: 7, text: "Did you _____ to the cinema yesterday?", options: ["went", "gone", "go", "going"], correct: 2 },
  { id: 8, text: "We don't have _____ milk left.", options: ["some", "any", "no", "a"], correct: 1 },
  // B1 Level
  { id: 9, text: "If it rains tomorrow, we _____ at home.", options: ["will stay", "stayed", "would stay", "staying"], correct: 0 },
  { id: 10, text: "The book _____ by a famous author in 1998.", options: ["was written", "writes", "wrote", "is writing"], correct: 0 },
  { id: 11, text: "I'm looking forward _____ you.", options: ["to seeing", "to see", "see", "seeing"], correct: 0 },
  { id: 12, text: "He asked me what time _____.", options: ["is it", "was it", "it was", "it is"], correct: 2 },
  // B2 Level
  { id: 13, text: "She _____ have left her keys at the office, she can't find them anywhere.", options: ["must", "can't", "should", "would"], correct: 0 },
  { id: 14, text: "Despite _____ hard, he didn't pass the exam.", options: ["study", "studied", "studying", "he studied"], correct: 2 },
  { id: 15, text: "By this time next year, I _____ my degree.", options: ["will finish", "will have finished", "finished", "am finishing"], correct: 1 },
  { id: 16, text: "I'm not used to _____ up so early.", options: ["wake", "waking", "woke", "waken"], correct: 1 },
  // C1 Level
  { id: 17, text: "Rarely _____ such a beautifully written novel.", options: ["I have read", "have I read", "I read", "did I read"], correct: 1 },
  { id: 18, text: "He objected _____ treated like a child.", options: ["to be", "being", "to being", "be"], correct: 2 },
  { id: 19, text: "Had I known about the meeting, I _____.", options: ["would go", "had gone", "would have gone", "went"], correct: 2 },
  { id: 20, text: "The project, _____ the initial difficulties, was a huge success.", options: ["although", "in spite of", "however", "even though"], correct: 1 }
];

export const EnglishTestPage = () => {
  const navigate = useNavigate();
  const { updateTests } = useCV();
  const { currentUser } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState(null);

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
    else if (score >= 85) level = 'C1 (İleri)';

    const resultData = { score, level, date: new Date().toISOString() };
    setResult(resultData);
    updateTests('english', resultData);
    setIsFinished(true);
  };

  if (isFinished) {
    const verifyUrl = `https://cv-studyo-app.web.app/verify/certificate?type=english&user=${currentUser?.uid || 'unknown'}&date=${encodeURIComponent(result.date)}`;
    
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button 
          onClick={() => navigate('/dashboard')}
          style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', cursor: 'pointer', padding: 0, marginBottom: '2rem', fontWeight: 600, alignSelf: 'flex-start', maxWidth: '800px', width: '100%', margin: '0 auto 2rem auto' }}
        >
          <ArrowLeft size={18} /> Dashboard'a Dön
        </button>

        {/* Certificate Container */}
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '3rem', maxWidth: '800px', width: '100%', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
          
          {/* Certificate Background Pattern */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '10px', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)' }}></div>
          
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <img src="/logo.png" alt="CV Stüdyo" style={{ height: '40px', marginBottom: '1.5rem' }} />
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.025em', textTransform: 'uppercase' }}>Başarı Sertifikası</h1>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '0.5rem' }}>İngilizce Seviye Tespiti</p>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: '#475569', fontSize: '1.1rem', marginBottom: '1rem' }}>Bu sertifika,</p>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b', borderBottom: '2px solid #e2e8f0', display: 'inline-block', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
              {currentUser?.email?.split('@')[0].toUpperCase() || 'KULLANICI'}
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
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '1rem', maxWidth: '300px' }}>
                * Bu sonuç tahmini bir değerlendirmedir. Resmi kurumlarda geçerliliği yoktur.
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ background: 'white', padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'inline-block' }}>
                <QRCodeSVG value={verifyUrl} size={80} level="M" includeMargin={false} />
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>Doğrula</div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => window.print()}
          className="btn-primary"
          style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Download size={18} /> Sertifikayı Kaydet / Yazdır
        </button>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button 
          onClick={() => navigate('/dashboard')}
          style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', cursor: 'pointer', padding: 0, marginBottom: '2rem', fontWeight: 600 }}
        >
          <ArrowLeft size={18} /> Dashboard'a Dön
        </button>

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
  );
};

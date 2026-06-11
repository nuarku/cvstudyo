import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCV } from '../context/CVContext';
import { ArrowLeft, CheckCircle, Brain, RotateCcw, Download } from 'lucide-react';
import { toJpeg } from 'html-to-image';

const questions = [
  { 
    id: 1, 
    text: "Ekibinizle büyük bir projede çalışırken beklenmedik bir kriz çıktı. İlk tepkiniz ne olur?", 
    options: [
      { text: "Krizin nedenlerini hızlıca analiz edip, veriler ışığında bir çözüm raporu hazırlarım.", type: "analitik" },
      { text: "Hemen ekibi toplayıp sakin kalmalarını sağlar, görev dağılımı yaparak krizi yönetirim.", type: "lider" },
      { text: "Geleneksel yöntemlerin dışında, daha önce denenmemiş yaratıcı bir çıkış yolu düşünürüm.", type: "yaratici" },
      { text: "Önceden hazırladığım B planını devreye sokar ve adım adım prosedürleri uygularım.", type: "duzenli" }
    ]
  },
  { 
    id: 2, 
    text: "Sizin için ideal bir çalışma ortamı nasıl olmalıdır?", 
    options: [
      { text: "Kuralların, süreçlerin ve hedeflerin başından beri çok net olduğu, düzenli bir ortam.", type: "duzenli" },
      { text: "İnsan etkileşiminin yüksek olduğu, açık iletişim ve işbirliği yapılabilen dinamik bir ortam.", type: "lider" },
      { text: "Sıfır kısıtlama ile özgürce fikir üretebileceğim, esnek ve renkli bir ortam.", type: "yaratici" },
      { text: "Sessiz, odaklanabileceğim, rakamlarla ve verilerle baş başa kalabileceğim bir alan.", type: "analitik" }
    ]
  },
  { 
    id: 3, 
    text: "Yeni bir işe veya projeye başlarken ilk adımınız genellikle nedir?", 
    options: [
      { text: "Projenin vizyonunu ekibe aktarmak ve herkesin bu vizyona inanmasını sağlamak.", type: "lider" },
      { text: "Detaylı bir takvim oluşturup, işleri küçük parçalara bölerek yapılacaklar listesi hazırlamak.", type: "duzenli" },
      { text: "İşin görsel kısmını veya konseptini taslaklar halinde hayal etmek.", type: "yaratici" },
      { text: "Geçmişteki benzer projelerin verilerini inceleyerek olası riskleri analiz etmek.", type: "analitik" }
    ]
  },
  { 
    id: 4, 
    text: "Boş zamanlarınızda hangi aktiviteler size daha çekici gelir?", 
    options: [
      { text: "Karmaşık bulmacalar çözmek, yeni bir teknoloji araştırmak veya kod yazmak.", type: "analitik" },
      { text: "Resim yapmak, tasarım, müzik, yazı yazmak veya yeni bir hobi edinmek.", type: "yaratici" },
      { text: "Grup etkinlikleri düzenlemek, topluluklarla veya arkadaş gruplarıyla vakit geçirmek.", type: "lider" },
      { text: "Evi baştan aşağı organize etmek, kişisel finans tablosu veya planlamalar yapmak.", type: "duzenli" }
    ]
  },
  { 
    id: 5, 
    text: "Bir toplantıda tartışma uzadı ve bir türlü karar alınamıyor. Ne yaparsınız?", 
    options: [
      { text: "Mevcut verileri ekrana yansıtıp, rakamların ne söylediğine dikkat çekerim.", type: "analitik" },
      { text: "İnisiyatif alarak tartışmayı toparlar ve oylama veya ortak kararla konuyu sonuca bağlarım.", type: "lider" },
      { text: "Farklı bir bakış açısı sunarak tartışmayı tamamen başka ve yenilikçi bir boyuta taşırım.", type: "yaratici" },
      { text: "Toplantı gündemine (ajandaya) dönülmesini talep edip süreci prosedüre uygun bitirmeye çalışırım.", type: "duzenli" }
    ]
  },
  { 
    id: 6, 
    text: "Büyük bir başarı elde ettiniz. Bu başarının arkasındaki en büyük güç sizce hangisidir?", 
    options: [
      { text: "Orijinal ve kimsenin aklına gelmeyen o ilk kıvılcım (fikir).", type: "yaratici" },
      { text: "Doğru insanları bir araya getirip onları hedefe kilitleme becerisi.", type: "lider" },
      { text: "Hiçbir detayı atlamadan, gece gündüz disiplinli bir şekilde plana sadık kalmak.", type: "duzenli" },
      { text: "Hata paylarını önceden hesaplayıp, en mantıklı stratejiyi verilerle kurmuş olmak.", type: "analitik" }
    ]
  },
  { 
    id: 7, 
    text: "Geri bildirim (eleştiri) alırken en çok neye dikkat edersiniz?", 
    options: [
      { text: "Eleştirinin somut verilere ve objektif kanıtlara dayanıp dayanmadığına.", type: "analitik" },
      { text: "Beni daha iyi bir yönetici veya takım arkadaşı yapıp yapmayacağına.", type: "lider" },
      { text: "Eleştirinin yaratıcılığımı kısıtlayıp kısıtlamadığına.", type: "yaratici" },
      { text: "Geri bildirimin iş süreçlerimi ve düzenimi nasıl daha verimli hale getireceğine.", type: "duzenli" }
    ]
  },
  { 
    id: 8, 
    text: "Bir şeyi öğrenmenin sizin için en iyi yolu nedir?", 
    options: [
      { text: "Detaylı dokümanları okumak, istatistikleri ve kuralları analiz etmek.", type: "analitik" },
      { text: "Konu hakkında başkalarıyla tartışmak, fikir alışverişinde bulunarak öğrenmek.", type: "lider" },
      { text: "Görsel materyallerle veya kendi kendime deneyler yaparak sezgisel öğrenmek.", type: "yaratici" },
      { text: "Önceden hazırlanmış, adım adım ilerleyen sistematik bir müfredatı takip etmek.", type: "duzenli" }
    ]
  },
  { 
    id: 9, 
    text: "Sizi işte en çok ne motive eder?", 
    options: [
      { text: "Baştan sona kusursuz işleyen, tıkır tıkır çalışan bir sistem kurmuş olmak.", type: "duzenli" },
      { text: "Ekibimin gelişimini görmek ve birlikte büyük bir hedefe ulaşmak.", type: "lider" },
      { text: "Estetik açıdan güzel ve insanların 'Vay canına!' diyeceği bir ürün ortaya çıkarmak.", type: "yaratici" },
      { text: "Çözülmesi imkansız gibi görünen karmaşık bir problemi mantıkla çözmek.", type: "analitik" }
    ]
  },
  { 
    id: 10, 
    text: "Eğer bir süper gücünüz olsaydı, hangisini seçerdiniz?", 
    options: [
      { text: "İnsanların potansiyelini bir bakışta görebilmek ve onları yönetebilmek.", type: "lider" },
      { text: "Kaos ortamlarını saniyeler içinde mükemmel bir düzene sokabilmek.", type: "duzenli" },
      { text: "Dünyadaki tüm verileri aynı anda beynimde işleyip en doğru kararı anında verebilmek.", type: "analitik" },
      { text: "Yoktan var edebilmek, hayal ettiğim her şeyi anında tasarlayabilmek.", type: "yaratici" }
    ]
  }
];

const profiles = {
  analitik: { title: "Analitik Düşünür", desc: "Verilere dayalı kararlar almayı seven, mantıklı ve problem çözücü bir yapıya sahipsiniz." },
  lider: { title: "Doğal Lider", desc: "İletişim becerileriniz yüksek, insanları organize etmeyi ve motive etmeyi biliyorsunuz." },
  yaratici: { title: "Yaratıcı Vizyoner", desc: "Kalıpların dışında düşünen, yenilikçi ve estetik algısı yüksek bir profiliniz var." },
  duzenli: { title: "Sistem Kurucu", desc: "Planlı, detaycı ve disiplinli bir şekilde ilerlemek en güçlü özelliğiniz." }
};

export const CareerTestPage = () => {
  const navigate = useNavigate();
  const { cvData, updateTests } = useCV();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  // Check if there is a previous test result
  useEffect(() => {
    if (cvData?.tests?.career && !isFinished) {
      setResult(cvData.tests.career);
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

  const handleDownloadStory = async () => {
    const element = document.getElementById('story-card');
    if (!element) return;
    try {
      const dataUrl = await toJpeg(element, { quality: 0.95, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = 'kariyer-test-sonucu.jpg';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating image', err);
    }
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
    const scores = { analitik: 0, lider: 0, yaratici: 0, duzenli: 0 };
    
    questions.forEach((q, idx) => {
      const selectedType = q.options[answers[idx]].type;
      scores[selectedType]++;
    });

    let dominantType = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    const profile = profiles[dominantType];

    const resultData = { profile: profile.title, dominantType, desc: profile.desc, date: new Date().toISOString() };
    setResult(resultData);
    updateTests('career', resultData);
    setIsFinished(true);
    setShowHistory(false);
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
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
        <TestHeader />

        <div style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          
          {showHistory && (
            <div className="hide-on-print" style={{ background: '#f3e8ff', border: '1px solid #d8b4fe', borderRadius: '12px', padding: '1rem 2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '500px' }}>
              <div>
                <h3 style={{ margin: '0 0 0.25rem 0', color: '#6b21a8', fontSize: '1.1rem' }}>Önceki Test Sonucunuz</h3>
                <p style={{ margin: 0, color: '#9333ea', fontSize: '0.9rem' }}>Bu testi daha önce {new Date(result.date).toLocaleDateString('tr-TR')} tarihinde çözdünüz.</p>
              </div>
            </div>
          )}

          <div 
            id="story-card"
            style={{ 
              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              background: 'linear-gradient(135deg, #7e22ce 0%, #3b82f6 100%)', 
              padding: '4rem 2rem', 
              borderRadius: '24px', 
              maxWidth: '400px', 
              width: '100%', 
              textAlign: 'center', 
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Decorative background elements */}
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', filter: 'blur(20px)' }}></div>
            <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', filter: 'blur(30px)' }}></div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'inline-block', background: 'white', padding: '0.5rem 1rem', borderRadius: '12px', marginBottom: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <img src="/logo.png" alt="CV Stüdyo" style={{ height: '30px', display: 'block' }} />
              </div>
              
              <div style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8, marginBottom: '0.5rem' }}>
                Kariyer Yönelim Testi Sonucu
              </div>
              
              <div style={{ width: 100, height: 100, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto', border: '2px solid rgba(255,255,255,0.3)' }}>
                <Brain size={50} color="white" />
              </div>
              
              <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.1, textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
                {result.profile || result.title}
              </div>
              
              <p style={{ fontSize: '1.1rem', lineHeight: 1.5, opacity: 0.9, marginBottom: '3rem' }}>
                "{result.desc || (profiles[result.dominantType]?.desc)}"
              </p>
              
              <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '16px', backdropFilter: 'blur(10px)', display: 'inline-block' }}>
                <div style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '0.25rem' }}>Sen de testini çöz:</div>
                <div style={{ fontWeight: 600, letterSpacing: '0.05em' }}>cvstudyo.com.tr</div>
              </div>
            </div>
          </div>

          <div className="hide-on-print" style={{ display: 'flex', gap: '1rem', marginTop: '2rem', width: '100%', maxWidth: '400px' }}>
            <button 
              className="btn-primary" 
              onClick={handleDownloadStory} 
              style={{ flex: 1, justifyContent: 'center', background: '#9333ea', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Download size={18} /> Görseli İndir
            </button>
            <button className="btn-secondary" onClick={startNewTest} style={{ padding: '0.75rem 1rem' }} title="Yeniden Çöz">
              <RotateCcw size={18} />
            </button>
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
              <div style={{ width: 48, height: 48, background: '#f3e8ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333ea' }}>
                <Brain size={24} />
              </div>
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Kariyer Yönelim Testi</h1>
                <p style={{ color: '#64748b', margin: '0.25rem 0 0 0', fontSize: '0.9rem' }}>Soru {currentQuestion + 1} / {questions.length}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ width: '100%', height: 6, background: '#f1f5f9', borderRadius: 3, marginBottom: '3rem', overflow: 'hidden' }}>
              <div style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%`, height: '100%', background: '#9333ea', transition: 'width 0.3s' }}></div>
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
                    background: answers[currentQuestion] === idx ? '#f3e8ff' : 'white',
                    border: `2px solid ${answers[currentQuestion] === idx ? '#9333ea' : '#e2e8f0'}`,
                    borderRadius: '12px',
                    fontSize: '1.05rem',
                    color: answers[currentQuestion] === idx ? '#7e22ce' : '#475569',
                    fontWeight: answers[currentQuestion] === idx ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {opt.text}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                className="btn-primary" 
                onClick={handleNext}
                disabled={answers[currentQuestion] === undefined}
                style={{ opacity: answers[currentQuestion] === undefined ? 0.5 : 1, background: '#9333ea' }}
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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCV } from '../context/CVContext';
import { ArrowLeft, CheckCircle, Brain } from 'lucide-react';

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
  const { updateTests } = useCV();
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
    const scores = { analitik: 0, lider: 0, yaratici: 0, duzenli: 0 };
    
    questions.forEach((q, idx) => {
      const selectedType = q.options[answers[idx]].type;
      scores[selectedType]++;
    });

    let dominantType = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    const profile = profiles[dominantType];

    setResult(profile);
    updateTests('career', { profile: profile.title, dominantType, date: new Date().toISOString() });
    setIsFinished(true);
  };

  if (isFinished) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ background: 'white', padding: '3rem', borderRadius: '24px', maxWidth: '500px', width: '100%', textAlign: 'center', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}>
          <div style={{ width: 80, height: 80, background: '#f3e8ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            <CheckCircle size={40} color="#9333ea" />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Test Tamamlandı!</h2>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>Sonuçlarınız profilinize kaydedildi.</p>
          
          <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#9333ea', marginBottom: '1rem' }}>{result.title}</div>
            <p style={{ color: '#475569', lineHeight: 1.6, margin: 0 }}>{result.desc}</p>
          </div>

          <button className="btn-primary" onClick={() => navigate('/dashboard')} style={{ width: '100%', justifyContent: 'center', background: '#9333ea' }}>
            Dashboard'a Dön
          </button>
        </div>
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
  );
};

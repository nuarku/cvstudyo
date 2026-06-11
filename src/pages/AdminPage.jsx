import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { Users, Search, AlertTriangle, ArrowLeft, Download, FileText, CheckCircle2, Eye, X } from 'lucide-react';
import { ModernTemplate } from '../components/Preview/Templates/ModernTemplate';
import { ClassicTemplate } from '../components/Preview/Templates/ClassicTemplate';
import { CreativeTemplate } from '../components/Preview/Templates/CreativeTemplate';
import { MinimalistTemplate } from '../components/Preview/Templates/MinimalistTemplate';
import { ExecutiveTemplate } from '../components/Preview/Templates/ExecutiveTemplate';

export const AdminPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleExportCSV = () => {
    const headers = ['Isim Soyisim', 'E-posta', 'Telefon', 'Meslek', 'Cinsiyet', 'Konum', 'Olusturulma'];
    const rows = users.map(user => {
      const info = user.personalInfo || {};
      return [
        `"${info.fullName || ''}"`,
        `"${info.email || ''}"`,
        `"${info.phone || ''}"`,
        `"${info.jobTitle || ''}"`,
        `"${info.gender || ''}"`,
        `"${info.location || ''}"`,
        `"${new Date().toLocaleDateString('tr-TR')}"`
      ].join(',');
    });
    
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "cv_kullanicilar.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderTemplate = (userData) => {
    const theme = userData.theme || { template: 'modern' };
    // set CSS variables for primary color and font just for the preview
    const color = theme.primaryColor || '#3b82f6';
    const font = theme.fontFamily || "'Space Grotesk', sans-serif";
    
    return (
      <div style={{ '--primary-color': color, '--font-family': font, fontFamily: font, height: '100%' }}>
        {(() => {
          switch (theme.template) {
            case 'modern': return <ModernTemplate data={userData} />;
            case 'classic': return <ClassicTemplate data={userData} />;
            case 'creative': return <CreativeTemplate data={userData} />;
            case 'minimalist': return <MinimalistTemplate data={userData} />;
            case 'executive': return <ExecutiveTemplate data={userData} />;
            default: return <ModernTemplate data={userData} />;
          }
        })()}
      </div>
    );
  };

  useEffect(() => {
    const checkAdminAndFetch = async () => {
      if (!currentUser) return;

      try {
        // İlk olarak kullanıcının admin tablosunda olup olmadığını kontrol et
        const adminDoc = await getDoc(doc(db, 'admins', currentUser.uid));
        if (!adminDoc.exists()) {
          setError('Bu sayfayı görüntülemek için yönetici yetkiniz bulunmuyor. Lütfen Firebase üzerinden admins koleksiyonuna UID bilginizi ekleyin.');
          setLoading(false);
          return;
        }

        setIsAdmin(true);

        // Kullanıcı yetkiliyse tüm verileri çek
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersList);
      } catch (err) {
        console.error("Veri çekme hatası:", err);
        setError('Veriler çekilirken bir hata oluştu veya erişim yetkiniz reddedildi.');
      } finally {
        setLoading(false);
      }
    };

    checkAdminAndFetch();
  }, [currentUser]);

  const filteredUsers = users.filter(user => {
    const searchStr = searchTerm.toLowerCase();
    const name = (user.personalInfo?.fullName || '').toLowerCase();
    const email = (user.personalInfo?.email || '').toLowerCase();
    return name.includes(searchStr) || email.includes(searchStr);
  });

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: '#64748b' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <p>Veriler yükleniyor...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '2rem' }}>
        <div style={{ background: 'white', padding: '3rem', borderRadius: '24px', maxWidth: '500px', textAlign: 'center', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}>
          <div style={{ width: 64, height: 64, background: '#fef2f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            <AlertTriangle size={32} color="#ef4444" />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Erişim Reddedildi</h2>
          <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '2rem' }}>{error}</p>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', background: '#f1f5f9', padding: '1rem', borderRadius: '12px', wordBreak: 'break-all' }}>
            Sizin UID bilginiz:<br/><strong>{currentUser?.uid}</strong>
          </p>
          <button className="btn-primary" onClick={() => navigate('/')} style={{ marginTop: '2rem' }}>Ana Sayfaya Dön</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <button 
              onClick={() => navigate('/editor')}
              style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', cursor: 'pointer', padding: 0, marginBottom: '1rem', fontWeight: 600 }}
            >
              <ArrowLeft size={18} /> Editöre Dön
            </button>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Users size={32} color="#2563eb" /> Admin Paneli
            </h1>
            <p style={{ color: '#64748b', margin: '0.5rem 0 0 0' }}>Sistemde kayıtlı toplam {users.length} CV bulunuyor.</p>
          </div>
          
          <div style={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
            <div style={{ position: 'relative', width: '100%', marginBottom: '1rem' }}>
              <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder="İsim veya E-posta ara..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '0.85rem 1.25rem 0.85rem 3rem', width: '100%', borderRadius: '9999px', border: '1px solid #e2e8f0', outline: 'none' }}
              />
            </div>
            <button className="btn-secondary" onClick={handleExportCSV} style={{ width: '100%', justifyContent: 'center' }}>
              <Download size={18} /> Tümünü İndir (CSV)
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700 }}>Kişi Bilgisi</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700 }}>İletişim</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700 }}>Meslek / Ünvan</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700 }}>Test Sonuçları</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700 }}>CV Detayları</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, textAlign: 'right' }}>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>Kayıt bulunamadı.</td>
                  </tr>
                ) : (
                  filteredUsers.map((user, index) => {
                    const info = user.personalInfo || {};
                    const isComplete = info.fullName && info.email;
                    const tests = user.tests || {};
                    
                    return (
                      <tr key={user.id} style={{ borderBottom: index === filteredUsers.length - 1 ? 'none' : '1px solid #e2e8f0' }}>
                        <td style={{ padding: '1.25rem 1.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                              {info.fullName ? info.fullName.charAt(0).toUpperCase() : '?'}
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, color: '#0f172a' }}>{info.fullName || 'İsimsiz'}</div>
                              <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                {isComplete ? <><CheckCircle2 size={12} color="#10b981"/> Aktif</> : 'Eksik Profil'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '1.25rem 1.5rem', color: '#475569' }}>
                          <div style={{ fontSize: '0.9rem' }}>{info.email || '-'}</div>
                          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{info.phone || '-'}</div>
                        </td>
                        <td style={{ padding: '1.25rem 1.5rem', color: '#475569' }}>
                          <span style={{ background: '#f1f5f9', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.85rem' }}>
                            {info.jobTitle || 'Belirtilmedi'}
                          </span>
                        </td>
                        <td style={{ padding: '1.25rem 1.5rem' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                            {tests.english ? (
                              <div style={{ color: '#059669', background: '#d1fae5', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block', whiteSpace: 'nowrap' }}>
                                🇺🇸 {tests.english.level} ({tests.english.score}p)
                              </div>
                            ) : null}
                            {tests.career ? (
                              <div style={{ color: '#7e22ce', background: '#f3e8ff', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block', whiteSpace: 'nowrap' }}>
                                🧠 {tests.career.profile}
                              </div>
                            ) : null}
                            {!tests.english && !tests.career && <span style={{ color: '#94a3b8' }}>Test Çözülmedi</span>}
                          </div>
                        </td>
                        <td style={{ padding: '1.25rem 1.5rem' }}>
                          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: '#64748b' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} title="Deneyim Sayısı"><FileText size={14} /> {(user.experience || []).length}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} title="Eğitim Sayısı"><FileText size={14} /> {(user.education || []).length}</div>
                          </div>
                        </td>
                        <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                          <button 
                            className="btn-secondary" 
                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                            onClick={() => setSelectedUser(user)}
                          >
                            <Eye size={16} /> Görüntüle
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CV Preview Modal */}
      {selectedUser && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999,
          background: 'rgba(15, 23, 42, 0.95)', display: 'flex', flexDirection: 'column'
        }}>
          {/* Modal Header */}
          <div className="hide-on-print" style={{ padding: '1rem 2rem', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#0f172a' }}>{selectedUser.personalInfo?.fullName || 'İsimsiz CV'}</h3>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{selectedUser.personalInfo?.email || 'E-posta yok'}</div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn-primary" onClick={() => window.print()}>
                <Download size={18} /> PDF İndir
              </button>
              <button className="btn-secondary" onClick={() => setSelectedUser(null)}>
                <X size={18} /> Kapat
              </button>
            </div>
          </div>
          
          {/* Modal Content - CV Preview */}
          <div className="preview-panel" style={{ flex: 1, padding: '2rem', display: 'flex', justifyContent: 'center' }}>
            <div className="cv-container">
              {renderTemplate(selectedUser)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { useAuth } from '../../context/AuthContext';
import { Upload, Trash2, Loader, Image as ImageIcon } from 'lucide-react';

const CITIES = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
];

export const PersonalInfoForm = () => {
  const { cvData, updatePersonalInfo } = useCV();
  const { personalInfo } = cvData;
  const { currentUser } = useAuth();
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'gender' && value !== 'Erkek') {
      updatePersonalInfo({ [name]: value, militaryStatus: '' });
    } else {
      updatePersonalInfo({ [name]: value });
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && currentUser) {
      setUploading(true);

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 400;
          const MAX_HEIGHT = 400;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to JPEG with 0.8 quality
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          updatePersonalInfo({ photoUrl: dataUrl });
          setUploading(false);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="form-grid">
      <div className="form-full" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem', 
        padding: '1rem', 
        backgroundColor: '#ffffff', 
        borderRadius: '12px', 
        border: '1px solid var(--border-color)',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
      }}>
        {/* Photo Avatar */}
        <div style={{ flexShrink: 0 }}>
          {personalInfo.photoUrl ? (
            <img 
              src={personalInfo.photoUrl} 
              alt="Profil" 
              style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: personalInfo.photoShape === 'round' ? '50%' : '10px', 
                objectFit: 'cover', 
                border: '2px solid #f8fafc',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
              }}
            />
          ) : (
            <div style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '50%', 
              backgroundColor: '#f1f5f9', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: '#94a3b8',
              border: '2px dashed #cbd5e1'
            }}>
              <Upload size={20} />
            </div>
          )}
        </div>

        {/* Controls */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Profil Fotoğrafı
            </div>
            
            {personalInfo.photoUrl && (
              <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: '#64748b', marginRight: '0.25rem' }}>Şekil:</span>
                <button 
                  type="button" 
                  onClick={() => updatePersonalInfo({ photoShape: 'round' })}
                  style={{ 
                    width: '24px', height: '24px', 
                    borderRadius: '50%', 
                    border: personalInfo.photoShape === 'round' ? '2px solid var(--primary-color)' : '1px solid #e4e4e7',
                    backgroundColor: personalInfo.photoShape === 'round' ? '#eff6ff' : '#fafafa',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  title="Yuvarlak"
                />
                <button 
                  type="button" 
                  onClick={() => updatePersonalInfo({ photoShape: 'square' })}
                  style={{ 
                    width: '24px', height: '24px', 
                    borderRadius: '6px', 
                    border: personalInfo.photoShape === 'square' ? '2px solid var(--primary-color)' : '1px solid #e4e4e7',
                    backgroundColor: personalInfo.photoShape === 'square' ? '#eff6ff' : '#fafafa',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  title="Kare"
                />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label 
              htmlFor="photo" 
              className="btn-primary" 
              style={{ cursor: uploading ? 'not-allowed' : 'pointer', padding: '0.4rem 0.8rem', fontSize: '0.8rem', margin: 0, borderRadius: '9999px', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', width: 'fit-content', opacity: uploading ? 0.7 : 1 }}
            >
              {uploading ? <Loader size={14} className="animate-spin" /> : <Upload size={14} />} 
              {uploading ? 'Yükleniyor...' : 'Yükle'}
            </label>
            <input 
              type="file" 
              id="photo" 
              accept="image/*"
              onChange={handlePhotoChange} 
              disabled={uploading}
              style={{ display: 'none' }}
            />
            
            {personalInfo.photoUrl && !uploading && (
              <button 
                type="button" 
                className="btn-icon danger" 
                onClick={() => updatePersonalInfo({ photoUrl: '' })}
                title="Fotoğrafı Sil"
                style={{ width: '32px', height: '32px' }}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="form-full">
        <label htmlFor="fullName">Ad Soyad</label>
        <input 
          type="text" 
          id="fullName" 
          name="fullName" 
          value={personalInfo.fullName} 
          onChange={handleChange} 
          placeholder="Örn: Ahmet Yılmaz"
        />
      </div>
      
      <div className="form-full">
        <label htmlFor="jobTitle">Meslek / Unvan</label>
        <input 
          type="text" 
          id="jobTitle" 
          name="jobTitle" 
          value={personalInfo.jobTitle} 
          onChange={handleChange} 
          placeholder="Örn: Kıdemli Yazılım Mühendisi"
        />
      </div>

      <div className="form-row-2">
        <div>
          <label htmlFor="tcKimlik">TC Kimlik Numarası</label>
          <input 
            type="text" 
            id="tcKimlik" 
            name="tcKimlik" 
            value={personalInfo.tcKimlik} 
            onChange={handleChange} 
            placeholder="Örn: 12345678901"
            maxLength="11"
          />
        </div>
        <div>
          <label htmlFor="birthDate">Doğum Tarihi</label>
          <input 
            type="text" 
            id="birthDate" 
            name="birthDate" 
            value={personalInfo.birthDate} 
            onChange={handleChange} 
            placeholder="Örn: 15.08.1990"
          />
        </div>
      </div>

      <div className="form-row-2">
        <div>
          <label htmlFor="email">E-posta</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={personalInfo.email} 
            onChange={handleChange} 
            placeholder="ornek@mail.com"
          />
        </div>
        <div>
          <label htmlFor="phone">Telefon</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            value={personalInfo.phone} 
            onChange={handleChange} 
            placeholder="+90 555 123 4567"
          />
        </div>
      </div>

      <div className="form-row-2">
        <div>
          <label htmlFor="location">Şehir</label>
          <select 
            id="location" 
            name="location" 
            value={personalInfo.location} 
            onChange={handleChange}
          >
            <option value="">Seçiniz...</option>
            {CITIES.sort().map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="driverLicense">Ehliyet (Varsa)</label>
          <input 
            type="text" 
            id="driverLicense" 
            name="driverLicense" 
            value={personalInfo.driverLicense} 
            onChange={handleChange} 
            placeholder="Örn: B Sınıfı"
          />
        </div>
      </div>

      <div className="form-row-2">
        <div>
          <label htmlFor="gender">Cinsiyet</label>
          <select 
            id="gender" 
            name="gender" 
            value={personalInfo.gender} 
            onChange={handleChange}
          >
            <option value="">Seçiniz...</option>
            <option value="Kadın">Kadın</option>
            <option value="Erkek">Erkek</option>
            <option value="Belirtmek İstemiyorum">Gizli</option>
          </select>
        </div>
        
        {personalInfo.gender === 'Erkek' ? (
          <div>
            <label htmlFor="militaryStatus">Askerlik Durumu</label>
            <select 
              id="militaryStatus" 
              name="militaryStatus" 
              value={personalInfo.militaryStatus} 
              onChange={handleChange}
            >
              <option value="">Seçiniz...</option>
              <option value="Yapıldı">Yapıldı</option>
              <option value="Tecilli">Tecilli</option>
              <option value="Muaf">Muaf</option>
              <option value="Yapılmadı">Yapılmadı</option>
            </select>
          </div>
        ) : (
          <div style={{ visibility: 'hidden' }}>
            {/* Placeholder to keep alignment */}
          </div>
        )}
      </div>

      <div className="form-full">
        <label htmlFor="website">Kişisel Web Sitesi / LinkedIn / GitHub</label>
        <input 
          type="text" 
          id="website" 
          name="website" 
          value={personalInfo.website} 
          onChange={handleChange} 
          placeholder="Örn: linkedin.com/in/ahmetyilmaz"
        />
      </div>

      <div className="form-full">
        <label htmlFor="summary">Profil Özeti / Hakkımda</label>
        <textarea 
          id="summary" 
          name="summary" 
          value={personalInfo.summary} 
          onChange={handleChange} 
          rows="4"
          placeholder="Kariyer hedeflerinizden ve öne çıkan yeteneklerinizden bahsedin."
        />
      </div>

      <div className="form-full">
        <label htmlFor="hobbies">Hobiler / İlgi Alanları</label>
        <textarea 
          id="hobbies" 
          name="hobbies" 
          value={personalInfo.hobbies} 
          onChange={handleChange} 
          rows="3"
          placeholder="Örn: Teknoloji okuryazarlığı, Dağcılık, Satranç"
        />
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { ChevronDown, ChevronUp, Plus, Trash2, Edit2 } from 'lucide-react';

export const LanguageForm = () => {
  const { cvData, addLanguage, updateLanguage, removeLanguage } = useCV();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleAddNew = () => {
    const newId = Date.now().toString();
    const newLang = {
      id: newId,
      language: '',
      level: '',
      institution: ''
    };
    addLanguage(newLang);
    setEditingId(newId);
    setFormData(newLang);
  };

  const handleEdit = (lang) => {
    setEditingId(lang.id);
    setFormData(lang);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    updateLanguage(editingId, { [name]: value });
  };

  const handleSave = () => {
    setEditingId(null);
    setFormData(null);
  };

  return (
    <div className="item-list">
      {cvData.languages.map(lang => (
        <div key={lang.id} className="item-card">
          {editingId === lang.id ? (
            <div className="form-grid">
              <div className="form-row-2">
                <div>
                  <label>Dil Adı</label>
                  <input type="text" name="language" value={formData.language} onChange={handleChange} placeholder="Örn: İngilizce" />
                </div>
                <div>
                  <label>Seviye</label>
                  <select name="level" value={formData.level} onChange={handleChange}>
                    <option value="">Seçiniz...</option>
                    <option value="A1 - Başlangıç">A1 - Başlangıç</option>
                    <option value="A2 - Temel">A2 - Temel</option>
                    <option value="B1 - Orta">B1 - Orta</option>
                    <option value="B2 - İyi">B2 - İyi</option>
                    <option value="C1 - İleri">C1 - İleri</option>
                    <option value="C2 - Anadil">C2 - Anadil</option>
                  </select>
                </div>
              </div>
              <div className="form-full">
                <label>Eğitimin Alındığı Yer (İsteğe Bağlı)</label>
                <input type="text" name="institution" value={formData.institution} onChange={handleChange} placeholder="Örn: Boğaziçi Üniversitesi / TOEFL IBT" />
              </div>
              
              <div className="form-full" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <button type="button" className="btn-icon danger" onClick={() => removeLanguage(lang.id)} title="Dili Sil">
                  <Trash2 size={18} />
                </button>
                <button type="button" className="btn-primary" onClick={handleSave}>Kaydet</button>
              </div>
            </div>
          ) : (
            <>
              <div className="item-card-header" onClick={() => handleEdit(lang)} style={{ cursor: 'pointer' }}>
                <div>
                  <div className="item-card-title">{lang.language || '(Dil Belirtilmedi)'}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {lang.level} {lang.institution && `| ${lang.institution}`}
                  </div>
                </div>
                {editingId === lang.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </>
          )}
        </div>
      ))}

      {!editingId && (
        <button type="button" className="btn-secondary" style={{ width: '100%', display: 'flex', justifyContent: 'center' }} onClick={handleAddNew}>
          <Plus size={18} /> Yeni Yabancı Dil Ekle
        </button>
      )}
    </div>
  );
};

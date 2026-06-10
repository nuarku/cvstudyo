import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { ChevronDown, ChevronUp, Plus, Trash2, Edit2 } from 'lucide-react';

export const EducationForm = () => {
  const { cvData, addEducation, updateEducation, removeEducation } = useCV();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleAddNew = () => {
    const newId = Date.now().toString();
    const newEdu = {
      id: newId,
      institution: '',
      educationType: '',
      degree: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    addEducation(newEdu);
    setEditingId(newId);
    setFormData(newEdu);
  };

  const handleEdit = (edu) => {
    setEditingId(edu.id);
    setFormData(edu);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    updateEducation(editingId, { [name]: value });
  };

  const handleSave = () => {
    setEditingId(null);
    setFormData(null);
  };

  return (
    <div className="item-list">
      {cvData.education.map(edu => (
        <div key={edu.id} className="item-card">
          {editingId === edu.id ? (
            <div className="form-grid">
              <div className="form-full">
                <label>Okul / Kurum Adı</label>
                <input type="text" name="institution" value={formData.institution} onChange={handleChange} />
              </div>
              <div className="form-full">
                <label>Eğitim Türü</label>
                <select name="educationType" value={formData.educationType} onChange={handleChange}>
                  <option value="">Seçiniz...</option>
                  <option value="Lise">Lise</option>
                  <option value="Ön Lisans">Ön Lisans</option>
                  <option value="Lisans">Lisans</option>
                  <option value="Yüksek Lisans">Yüksek Lisans</option>
                  <option value="Doktora">Doktora</option>
                  <option value="Sertifika/Kurs">Sertifika/Kurs</option>
                </select>
              </div>
              <div className="form-full">
                <label>Bölüm / Derece</label>
                <input type="text" name="degree" value={formData.degree} onChange={handleChange} placeholder="Örn: Bilgisayar Mühendisliği" />
              </div>
              <div className="form-row-2">
                <div>
                  <label>Başlangıç Tarihi</label>
                  <input type="text" name="startDate" value={formData.startDate} onChange={handleChange} placeholder="Örn: Eyl 2018" />
                </div>
                <div>
                  <label>Bitiş Tarihi</label>
                  <input type="text" name="endDate" value={formData.endDate} onChange={handleChange} placeholder="Örn: Haz 2022" />
                </div>
              </div>
              <div className="form-full">
                <label>Açıklama</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="3" placeholder="Eğitim detayları, başarılar vs." />
              </div>
              <div className="form-full" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <button type="button" className="btn-icon danger" onClick={() => removeEducation(edu.id)} title="Eğitimi Sil">
                  <Trash2 size={18} />
                </button>
                <button type="button" className="btn-primary" onClick={handleSave}>Kaydet</button>
              </div>
            </div>
          ) : (
            <>
              <div className="item-card-header">
                <div>
                  <div className="item-card-title">{edu.degree || '(Derece Girilmedi)'}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {edu.institution} {edu.educationType && `(${edu.educationType})`} | {edu.startDate} - {edu.endDate}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="button" className="btn-icon edit" onClick={() => handleEdit(edu)} title="Düzenle"><Edit2 size={16} /></button>
                  <button type="button" className="btn-icon danger" onClick={() => removeEducation(edu.id)} title="Sil"><Trash2 size={16} /></button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}

      {!editingId && (
        <button type="button" className="btn-secondary" style={{ width: '100%', display: 'flex', justifyContent: 'center' }} onClick={handleAddNew}>
          <Plus size={18} /> Yeni Eğitim Ekle
        </button>
      )}
    </div>
  );
};

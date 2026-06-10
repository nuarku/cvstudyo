import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { ChevronDown, ChevronUp, Plus, Trash2, Edit2 } from 'lucide-react';

export const ExperienceForm = () => {
  const { cvData, addExperience, updateExperience, removeExperience } = useCV();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleAddNew = () => {
    const newId = Date.now().toString();
    const newExp = {
      id: newId,
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    addExperience(newExp);
    setEditingId(newId);
    setFormData(newExp);
  };

  const handleEdit = (exp) => {
    setEditingId(exp.id);
    setFormData(exp);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    updateExperience(editingId, { [name]: value });
  };

  const handleSave = () => {
    setEditingId(null);
    setFormData(null);
  };

  return (
    <div className="item-list">
      {cvData.experience.map(exp => (
        <div key={exp.id} className="item-card">
          {editingId === exp.id ? (
            <div className="form-grid">
              <div className="form-full">
                <label>Firma / Şirket</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Örn: Trendyol, Arçelik, Koç Holding" />
              </div>
              <div className="form-full">
                <label>Pozisyon / Unvan</label>
                <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Örn: Kıdemli Yazılım Mühendisi" />
              </div>
              <div className="form-row-2">
                <div>
                  <label>Başlangıç Tarihi</label>
                  <input type="text" name="startDate" value={formData.startDate} onChange={handleChange} placeholder="Örn: Oca 2021" />
                </div>
                <div>
                  <label>Bitiş Tarihi</label>
                  <input type="text" name="endDate" value={formData.endDate} onChange={handleChange} placeholder="Örn: Devam Ediyor" />
                </div>
              </div>
              <div className="form-full">
                <label>Açıklama</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="3" placeholder="Sorumluluklarınız ve başarılarınız" />
              </div>
              <div className="form-full" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <button type="button" className="btn-icon danger" onClick={() => removeExperience(exp.id)} title="Deneyimi Sil">
                  <Trash2 size={18} />
                </button>
                <button type="button" className="btn-primary" onClick={handleSave}>Kaydet</button>
              </div>
            </div>
          ) : (
            <>
              <div className="item-card-header">
                <div>
                  <div className="item-card-title">{exp.company || '(Şirket Adı Yok)'}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{exp.position}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="button" className="btn-icon edit" onClick={() => handleEdit(exp)} title="Düzenle"><Edit2 size={16} /></button>
                  <button type="button" className="btn-icon danger" onClick={() => removeExperience(exp.id)} title="Sil"><Trash2 size={16} /></button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}

      {!editingId && (
        <button type="button" className="btn-secondary" style={{ width: '100%', display: 'flex', justifyContent: 'center' }} onClick={handleAddNew}>
          <Plus size={18} /> Yeni Deneyim Ekle
        </button>
      )}
    </div>
  );
};

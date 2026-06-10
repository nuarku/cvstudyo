import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { ChevronDown, ChevronUp, Plus, Trash2, Edit2 } from 'lucide-react';

export const VolunteerForm = () => {
  const { cvData, addVolunteer, updateVolunteer, removeVolunteer } = useCV();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleAddNew = () => {
    const newId = Date.now().toString();
    const newVol = {
      id: newId,
      organization: '',
      role: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    addVolunteer(newVol);
    setEditingId(newId);
    setFormData(newVol);
  };

  const handleEdit = (vol) => {
    setEditingId(vol.id);
    setFormData(vol);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    updateVolunteer(editingId, { [name]: value });
  };

  const handleSave = () => {
    setEditingId(null);
    setFormData(null);
  };

  return (
    <div className="item-list">
      {cvData.volunteer.map(vol => (
        <div key={vol.id} className="item-card">
          {editingId === vol.id ? (
            <div className="form-grid">
              <div className="form-full">
                <label>Kurum / STK Adı</label>
                <input type="text" name="organization" value={formData.organization} onChange={handleChange} placeholder="Örn: TEMA Vakfı, Kızılay, TEV" />
              </div>
              <div className="form-full">
                <label>Görev / Rol</label>
                <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Örn: Gönüllü Eğitmen, Proje Koordinatörü" />
              </div>
              <div className="form-row-2">
                <div>
                  <label>Başlangıç Tarihi</label>
                  <input type="text" name="startDate" value={formData.startDate} onChange={handleChange} placeholder="Örn: Eyl 2020" />
                </div>
                <div>
                  <label>Bitiş Tarihi</label>
                  <input type="text" name="endDate" value={formData.endDate} onChange={handleChange} placeholder="Örn: Devam Ediyor" />
                </div>
              </div>
              <div className="form-full">
                <label>Açıklama (İsteğe Bağlı)</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="3" placeholder="Sorumluluklarınız ve yürüttüğünüz projeler" />
              </div>
              
              <div className="form-full" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <button type="button" className="btn-icon danger" onClick={() => removeVolunteer(vol.id)} title="Çalışmayı Sil">
                  <Trash2 size={18} />
                </button>
                <button type="button" className="btn-primary" onClick={handleSave}>Kaydet</button>
              </div>
            </div>
          ) : (
            <>
              <div className="item-card-header" onClick={() => handleEdit(vol)} style={{ cursor: 'pointer' }}>
                <div>
                  <div className="item-card-title">{vol.organization || '(Kurum Adı Yok)'}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{vol.role}</div>
                </div>
                {editingId === vol.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </>
          )}
        </div>
      ))}

      {!editingId && (
        <button type="button" className="btn-secondary" style={{ width: '100%', display: 'flex', justifyContent: 'center' }} onClick={handleAddNew}>
          <Plus size={18} /> Yeni Gönüllü Çalışma Ekle
        </button>
      )}
    </div>
  );
};

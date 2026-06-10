import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { ChevronDown, ChevronUp, Plus, Trash2, Edit2 } from 'lucide-react';

export const ReferenceForm = () => {
  const { cvData, addReference, updateReference, removeReference } = useCV();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleAddNew = () => {
    const newId = Date.now().toString();
    const newRef = {
      id: newId,
      fullName: '',
      title: '',
      company: '',
      phone: '',
      email: ''
    };
    addReference(newRef);
    setEditingId(newId);
    setFormData(newRef);
  };

  const handleEdit = (ref) => {
    setEditingId(ref.id);
    setFormData(ref);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    updateReference(editingId, { [name]: value });
  };

  const handleSave = () => {
    setEditingId(null);
    setFormData(null);
  };

  return (
    <div className="item-list">
      {cvData.references.map(ref => (
        <div key={ref.id} className="item-card">
          {editingId === ref.id ? (
            <div className="form-grid">
              <div className="form-full">
                <label>Ad Soyad</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Örn: Ayşe Yılmaz" />
              </div>
              <div className="form-row-2">
                <div>
                  <label>Çalıştığı Kurum</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Örn: X Teknoloji A.Ş." />
                </div>
                <div>
                  <label>Unvanı / Pozisyonu</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Örn: İnsan Kaynakları Müdürü" />
                </div>
              </div>
              <div className="form-row-2">
                <div>
                  <label>Telefon</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Örn: +90 555 123 4567" />
                </div>
                <div>
                  <label>E-posta</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Örn: ayse.yilmaz@xteknoloji.com" />
                </div>
              </div>
              
              <div className="form-full" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <button type="button" className="btn-icon danger" onClick={() => removeReference(ref.id)} title="Referansı Sil">
                  <Trash2 size={18} />
                </button>
                <button type="button" className="btn-primary" onClick={handleSave}>Kaydet</button>
              </div>
            </div>
          ) : (
            <>
              <div className="item-card-header" onClick={() => handleEdit(ref)} style={{ cursor: 'pointer' }}>
                <div>
                  <div className="item-card-title">{ref.fullName || '(İsim Belirtilmedi)'}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {ref.title} {ref.company && `@ ${ref.company}`}
                  </div>
                </div>
                {editingId === ref.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </>
          )}
        </div>
      ))}

      {!editingId && (
        <button type="button" className="btn-secondary" style={{ width: '100%', display: 'flex', justifyContent: 'center' }} onClick={handleAddNew}>
          <Plus size={18} /> Yeni Referans Ekle
        </button>
      )}
    </div>
  );
};

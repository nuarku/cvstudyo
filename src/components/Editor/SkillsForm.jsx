import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { X } from 'lucide-react';

export const SkillsForm = () => {
  const { cvData, updateSkills } = useCV();
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      if (!cvData.skills.includes(inputValue.trim())) {
        updateSkills([...cvData.skills, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const removeSkill = (skillToRemove) => {
    updateSkills(cvData.skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Yetenek Ekle</label>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Yetenek yazıp 'Enter' tuşuna basın (Örn: JavaScript, Photoshop)"
        />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {cvData.skills.map((skill, idx) => (
          <div key={idx} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            backgroundColor: 'var(--border-color)',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.875rem'
          }}>
            <span>{skill}</span>
            <button 
              type="button" 
              onClick={() => removeSkill(skill)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                color: 'var(--text-secondary)'
              }}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

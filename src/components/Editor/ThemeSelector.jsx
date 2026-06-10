import React from 'react';
import { useCV } from '../../context/CVContext';

const COLORS = [
  { name: 'Blue', value: '#2563eb' },
  { name: 'Indigo', value: '#4f46e5' },
  { name: 'Purple', value: '#9333ea' },
  { name: 'Pink', value: '#db2777' },
  { name: 'Red', value: '#dc2626' },
  { name: 'Orange', value: '#ea580c' },
  { name: 'Amber', value: '#d97706' },
  { name: 'Green', value: '#16a34a' },
  { name: 'Teal', value: '#0d9488' },
  { name: 'Slate', value: '#475569' },
];

const FONTS = [
  { name: 'Space Grotesk (Modern)', value: '"Space Grotesk", sans-serif' },
  { name: 'Inter (Clean)', value: '"Inter", sans-serif' },
  { name: 'Roboto (Classic)', value: '"Roboto", sans-serif' },
  { name: 'Merriweather (Elegant)', value: '"Merriweather", serif' },
  { name: 'Playfair Display (Serif)', value: '"Playfair Display", serif' },
];

const TEMPLATES = [
  { id: 'modern', name: 'Modern (Minimalist)' },
  { id: 'classic', name: 'Kurumsal (Klasik)' },
  { id: 'creative', name: 'Yaratıcı (Canlı)' },
  { id: 'minimalist', name: 'Sade (Minimalist)' },
  { id: 'executive', name: 'Yönetici (Executive)' },
];

export const ThemeSelector = () => {
  const { cvData, updateTheme } = useCV();
  const { theme } = cvData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      <div>
        <label>Şablon Seçimi</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginTop: '0.5rem' }}>
          {TEMPLATES.map(tpl => (
            <button
              key={tpl.id}
              type="button"
              onClick={() => updateTheme({ template: tpl.id })}
              style={{
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: theme.template === tpl.id ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                backgroundColor: theme.template === tpl.id ? 'rgba(37, 99, 235, 0.05)' : 'transparent',
                cursor: 'pointer',
                fontWeight: theme.template === tpl.id ? '600' : '400',
              }}
            >
              {tpl.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label>Ana Renk</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
          {COLORS.map(color => (
            <button
              key={color.value}
              type="button"
              onClick={() => updateTheme({ primaryColor: color.value })}
              style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '50%',
                backgroundColor: color.value,
                border: theme.primaryColor === color.value ? '2px solid #111827' : '2px solid transparent',
                outline: theme.primaryColor === color.value ? '2px solid white' : 'none',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
              title={color.name}
              aria-label={color.name}
            />
          ))}
        </div>
      </div>

      <div>
        <label>Yazı Tipi (Font)</label>
        <select 
          value={theme.fontFamily} 
          onChange={(e) => updateTheme({ fontFamily: e.target.value })}
          style={{ fontFamily: theme.fontFamily }}
        >
          {FONTS.map(font => (
            <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
              {font.name}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
};

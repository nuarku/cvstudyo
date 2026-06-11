import React from 'react';

export const ClassicTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, languages, volunteer, references, theme } = data;

  const validExperience = experience.filter(exp => exp.position || exp.company || exp.description);
  const validEducation = education.filter(edu => edu.institution || edu.degree);
  const validLanguages = languages ? languages.filter(lang => lang.language) : [];
  const validVolunteer = volunteer ? volunteer.filter(vol => vol.organization || vol.role) : [];
  const validReferences = references ? references.filter(ref => ref.fullName) : [];
  const validSkills = skills ? skills.filter(skill => skill.trim() !== '') : [];
  return (
    <div style={{
      fontFamily: theme.fontFamily,
      color: '#000000',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#ffffff',
      padding: '3rem'
    }}>
      {/* Header */}
      <header style={{
        textAlign: 'center',
        borderBottom: `2px solid ${theme.primaryColor}`,
        paddingBottom: '1.5rem',
        marginBottom: '2rem'
      }}>
        {personalInfo.photoUrl && (
          <div 
            title="Profil" 
            style={{ 
              width: '100px', 
              height: '100px', 
              minWidth: '100px',
              minHeight: '100px',
              flexShrink: 0,
              borderRadius: personalInfo.photoShape === 'round' ? '50%' : '8px', 
              backgroundImage: `url(${personalInfo.photoUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: `3px solid ${theme.primaryColor}`, 
              marginBottom: '1rem',
              display: 'inline-block'
            }} 
          />
        )}
        <h1 style={{ fontSize: '2.25rem', fontWeight: '700', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>
          {personalInfo.fullName}
        </h1>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '400', margin: '0 0 1rem 0', color: theme.primaryColor }}>
          {personalInfo.jobTitle}
        </h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', fontSize: '0.875rem', color: '#4b5563' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
          {personalInfo.birthDate && <span>• {personalInfo.birthDate}</span>}
          {personalInfo.tcKimlik && <span>• TCKN: {personalInfo.tcKimlik}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section style={{ marginBottom: '2rem' }}>
          <p style={{ lineHeight: 1.6, textAlign: 'justify' }}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {validExperience.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '700', textTransform: 'uppercase', color: theme.primaryColor, borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '1rem' }}>
            Profesyonel Deneyim
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {validExperience.map(exp => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', margin: 0 }}>{exp.position}</h4>
                  <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <div style={{ fontSize: '0.95rem', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                  {exp.company}
                </div>
                {exp.description && (
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.5, margin: 0, textAlign: 'justify' }}>
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {validEducation.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '700', textTransform: 'uppercase', color: theme.primaryColor, borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '1rem' }}>
            Eğitim Bilgileri
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {validEducation.map(edu => (
              <div key={edu.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', margin: 0 }}>{edu.degree}</h4>
                  <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <div style={{ fontSize: '0.95rem', fontStyle: 'italic', marginBottom: '0.25rem' }}>
                  {edu.institution} {edu.educationType && `(${edu.educationType})`}
                </div>
                {edu.description && (
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {validSkills.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '700', textTransform: 'uppercase', color: theme.primaryColor, borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '1rem' }}>
            Yetenekler, Sertifikalar ve Belgeler
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {validSkills.join(' • ')}
          </div>
        </section>
      )}

      {/* Hobbies */}
      {personalInfo.hobbies && personalInfo.hobbies.trim() !== '' && (
        <section style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '700', textTransform: 'uppercase', color: theme.primaryColor, borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '1rem' }}>
            Hobiler / İlgi Alanları
          </h3>
          <p style={{ lineHeight: 1.6, textAlign: 'justify' }}>
            {personalInfo.hobbies}
          </p>
        </section>
      )}

      {/* Volunteer Work */}
      {validVolunteer.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '700', textTransform: 'uppercase', color: theme.primaryColor, borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '1rem' }}>
            Gönüllü Çalışmalar
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {validVolunteer.map(vol => (
              <div key={vol.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', margin: 0 }}>{vol.role}</h4>
                  <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                    {vol.startDate} - {vol.endDate}
                  </span>
                </div>
                <div style={{ fontSize: '0.95rem', fontStyle: 'italic', marginBottom: '0.25rem' }}>
                  {vol.organization}
                </div>
                {vol.description && (
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>
                    {vol.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {validLanguages.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '700', textTransform: 'uppercase', color: theme.primaryColor, borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '1rem' }}>
            Yabancı Diller
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
            {validLanguages.map(lang => (
              <div key={lang.id} style={{ fontSize: '0.95rem' }}>
                <span style={{ fontWeight: '600' }}>{lang.language}</span>
                {lang.level && <span> - {lang.level}</span>}
                {lang.institution && <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{lang.institution}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {validReferences.length > 0 && (
        <section>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '700', textTransform: 'uppercase', color: theme.primaryColor, borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '1rem' }}>
            Referanslar
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {validReferences.map(ref => (
              <div key={ref.id}>
                <div style={{ fontWeight: '700', fontSize: '1rem' }}>{ref.fullName}</div>
                <div style={{ fontSize: '0.95rem', fontStyle: 'italic', color: '#4b5563' }}>{ref.title}</div>
                <div style={{ fontSize: '0.95rem', color: theme.primaryColor }}>{ref.company}</div>
                {(ref.phone || ref.email) && (
                  <div style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {ref.phone} {ref.phone && ref.email && ' | '} {ref.email}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

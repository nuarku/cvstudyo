import React from 'react';

export const MinimalistTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, languages, volunteer, references, theme } = data;

  const validExperience = experience.filter(exp => exp.position || exp.company || exp.description);
  const validEducation = education.filter(edu => edu.institution || edu.degree);
  const validSkills = skills ? skills.filter(skill => skill.trim() !== '') : [];
  const validLanguages = languages ? languages.filter(lang => lang.language) : [];
  const validVolunteer = volunteer ? volunteer.filter(vol => vol.organization || vol.role) : [];
  const validReferences = references ? references.filter(ref => ref.fullName) : [];

  return (
    <div style={{
      fontFamily: theme.fontFamily,
      color: '#333333',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#ffffff',
      padding: '4rem'
    }}>
      {/* Header */}
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '3rem', fontWeight: '300', margin: '0 0 0.5rem 0', letterSpacing: '-0.02em', color: '#111' }}>
            {personalInfo.fullName}
          </h1>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '400', margin: '0 0 1rem 0', color: theme.primaryColor, letterSpacing: '0.05em' }}>
            {personalInfo.jobTitle}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.875rem', color: '#4b5563', textAlign: 'right' }}>
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.website && <div>{personalInfo.website}</div>}
            {personalInfo.birthDate && <div>{personalInfo.birthDate}</div>}
            {personalInfo.tcKimlik && <div>TCKN: {personalInfo.tcKimlik}</div>}
          </div>
        </div>
        {personalInfo.photoUrl && (
          <img 
            src={personalInfo.photoUrl} 
            alt="Profil" 
            
            style={{ 
              width: '100px', 
              height: '100px', 
              minWidth: '100px',
              minHeight: '100px',
              flexShrink: 0,
              borderRadius: personalInfo.photoShape === 'round' ? '50%' : '8px', 
              objectFit: 'cover',
              filter: 'grayscale(20%)'
            }} 
          />
        )}
      </header>

      <div style={{ display: 'flex', gap: '4rem' }}>
        {/* Main Column */}
        <div style={{ flex: 2 }}>
          {/* Summary */}
          {personalInfo.summary && (
            <section style={{ marginBottom: '3rem' }}>
              <p style={{ lineHeight: 1.8, fontSize: '0.95rem', color: '#444' }}>
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {validExperience.length > 0 && (
            <section style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: '#111' }}>
                Deneyim
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {validExperience.map(exp => (
                  <div key={exp.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0, color: '#222' }}>{exp.position}</h4>
                      <span style={{ fontSize: '0.85rem', color: '#666' }}>
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.95rem', color: theme.primaryColor, marginBottom: '0.75rem' }}>
                      {exp.company}
                    </div>
                    {exp.description && (
                      <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#555', margin: 0 }}>
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
            <section style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: '#111' }}>
                Eğitim
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {validEducation.map(edu => (
                  <div key={edu.id}>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', margin: '0 0 0.25rem 0', color: '#222' }}>{edu.degree}</h4>
                    <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>
                      {edu.institution} {edu.educationType && `(${edu.educationType})`}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: theme.primaryColor, marginBottom: '0.5rem' }}>
                      {edu.startDate} - {edu.endDate}
                    </div>
                    {edu.description && (
                      <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#555', margin: 0 }}>
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Volunteer Section */}
          {validVolunteer.length > 0 && (
            <section style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: '#111' }}>
                Gönüllü Çalışmalar
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {validVolunteer.map(vol => (
                  <div key={vol.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0, color: '#222' }}>{vol.role}</h4>
                      <span style={{ fontSize: '0.85rem', color: '#666' }}>
                        {vol.startDate} - {vol.endDate}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.95rem', color: theme.primaryColor, marginBottom: '0.75rem' }}>
                      {vol.organization}
                    </div>
                    {vol.description && (
                      <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#555', margin: 0 }}>
                        {vol.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Side Column */}
        <div style={{ flex: 1 }}>


          {/* Skills */}
          {validSkills.length > 0 && (
            <section style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: '#111' }}>
                Yetenekler
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {validSkills.map((skill, index) => (
                  <div key={index} style={{ fontSize: '0.9rem', color: '#555' }}>
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Hobbies Section */}
          {personalInfo.hobbies && personalInfo.hobbies.trim() !== '' && (
            <section style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '400', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '1rem' }}>
                İlgi Alanları
              </h3>
              <p style={{ lineHeight: 1.6, color: '#374151' }}>
                {personalInfo.hobbies}
              </p>
            </section>
          )}



          {/* Languages Section */}
          {validLanguages.length > 0 && (
            <section style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '400', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '1rem' }}>
                Yabancı Diller
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                {validLanguages.map(lang => (
                  <div key={lang.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#111827' }}>{lang.language}</div>
                    {lang.level && <div style={{ fontSize: '0.875rem', color: '#4b5563' }}>{lang.level}</div>}
                    {lang.institution && <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{lang.institution}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* References Section */}
          {validReferences.length > 0 && (
            <section>
              <h3 style={{ fontSize: '1rem', fontWeight: '400', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '1rem' }}>
                Referanslar
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                {validReferences.map(ref => (
                  <div key={ref.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ fontSize: '1rem', fontWeight: '600', color: '#111827' }}>{ref.fullName}</div>
                    <div style={{ fontSize: '0.95rem', color: '#4b5563' }}>{ref.title}</div>
                    <div style={{ fontSize: '0.9rem', color: theme.primaryColor }}>{ref.company}</div>
                    {(ref.phone || ref.email) && (
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                        {ref.phone && <span>{ref.phone}</span>}
                        {ref.phone && ref.email && <span> | </span>}
                        {ref.email && <span>{ref.email}</span>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

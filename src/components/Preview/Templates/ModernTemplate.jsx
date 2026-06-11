import React from 'react';

export const ModernTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, languages, volunteer, references, theme } = data;

  const validExperience = experience.filter(exp => exp.position || exp.company || exp.description);
  const validEducation = education.filter(edu => edu.degree || edu.institution || edu.description);
  const validSkills = skills ? skills.filter(skill => skill.trim() !== '') : [];
  const validLanguages = languages ? languages.filter(lang => lang.language) : [];
  const validVolunteer = volunteer ? volunteer.filter(vol => vol.organization || vol.role) : [];
  const validReferences = references ? references.filter(ref => ref.fullName) : [];

  const contactItems = [];
  if (personalInfo.email) contactItems.push(personalInfo.email);
  if (personalInfo.phone) contactItems.push(personalInfo.phone);
  if (personalInfo.location) contactItems.push(personalInfo.location);
  if (personalInfo.website) contactItems.push(personalInfo.website);
  if (personalInfo.driverLicense) contactItems.push(`Ehliyet: ${personalInfo.driverLicense}`);
  if (personalInfo.militaryStatus && personalInfo.gender === 'Erkek') contactItems.push(`Askerlik: ${personalInfo.militaryStatus}`);
  if (personalInfo.birthDate) contactItems.push(personalInfo.birthDate);
  if (personalInfo.tcKimlik) contactItems.push(`TCKN: ${personalInfo.tcKimlik}`);

  return (
    <div style={{
      fontFamily: theme.fontFamily,
      color: '#1f2937',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#ffffff'
    }}>
      {/* Header */}
      <header style={{
        padding: '2.5rem 3rem',
        backgroundColor: theme.primaryColor,
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        gap: '2rem'
      }}>
        {personalInfo.photoUrl && (
          <div 
            title="Profil" 
            style={{ 
              width: '120px', 
              height: '120px', 
              minWidth: '120px',
              minHeight: '120px',
              flexShrink: 0,
              borderRadius: personalInfo.photoShape === 'round' ? '50%' : '8px', 
              backgroundImage: `url(${personalInfo.photoUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '3px solid rgba(255,255,255,0.5)' 
            }} 
          />
        )}
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', margin: '0 0 0.5rem 0', letterSpacing: '-0.025em' }}>
            {personalInfo.fullName}
          </h1>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '400', margin: '0 0 1.5rem 0', opacity: 0.9 }}>
            {personalInfo.jobTitle}
          </h2>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.875rem', opacity: 0.9 }}>
            {contactItems.map((item, idx) => (
              <div key={idx}>{idx > 0 && '• '}{item}</div>
            ))}
          </div>
        </div>
      </header>

      {/* Body */}
      <div style={{ padding: '3rem', flex: 1, display: 'flex', gap: '3rem' }}>
        
        {/* Left Column (Main Content) */}
        <div style={{ flex: 2 }}>
          {/* Summary */}
          {personalInfo.summary && (
            <section style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: theme.primaryColor, borderBottom: `2px solid ${theme.primaryColor}`, paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                Profil Özeti
              </h3>
              <p style={{ lineHeight: 1.6, color: '#4b5563' }}>
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {validExperience.length > 0 && (
            <section style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: theme.primaryColor, borderBottom: `2px solid ${theme.primaryColor}`, paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                Deneyim
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {validExperience.map(exp => (
                  <div key={exp.id}>
                    <div style={{ display: 'flex', justifyItems: 'space-between', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                      <h4 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0 }}>{exp.position}</h4>
                      <span style={{ fontSize: '0.875rem', color: theme.primaryColor, fontWeight: '500' }}>
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.5rem' }}>
                      {exp.company}
                    </div>
                    {exp.description && (
                      <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#4b5563', margin: 0 }}>
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {validEducation.length > 0 && (
            <section style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: theme.primaryColor, borderBottom: `2px solid ${theme.primaryColor}`, paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                Eğitim
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {validEducation.map(edu => (
                  <div key={edu.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                      <h4 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0 }}>{edu.degree}</h4>
                      <span style={{ fontSize: '0.875rem', color: theme.primaryColor, fontWeight: '500' }}>
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.5rem' }}>
                      {edu.institution} {edu.educationType && `(${edu.educationType})`}
                    </div>
                    {edu.description && (
                      <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#4b5563', margin: 0 }}>
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Volunteer */}
          {validVolunteer.length > 0 && (
            <section style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: theme.primaryColor, borderBottom: `2px solid ${theme.primaryColor}`, paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                Gönüllü Çalışmalar
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {validVolunteer.map(vol => (
                  <div key={vol.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                      <h4 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0 }}>{vol.role}</h4>
                      <span style={{ fontSize: '0.875rem', color: theme.primaryColor, fontWeight: '500' }}>
                        {vol.startDate} - {vol.endDate}
                      </span>
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.5rem' }}>
                      {vol.organization}
                    </div>
                    {vol.description && (
                      <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#4b5563', margin: 0 }}>
                        {vol.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (Sidebar) */}
        <div style={{ flex: 1 }}>
          {validSkills.length > 0 && (
            <section style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: theme.primaryColor, borderBottom: `2px solid ${theme.primaryColor}`, paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                Yetenekler, Sertifikalar ve Belgeler
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {validSkills.map((skill, index) => (
                  <div key={index} style={{ 
                    padding: '0.5rem 0',
                    borderBottom: '1px solid #e5e7eb',
                    color: '#4b5563',
                    fontSize: '0.95rem'
                  }}>
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Hobbies */}
          {personalInfo.hobbies && personalInfo.hobbies.trim() !== '' && (
            <section style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: theme.primaryColor, borderBottom: `2px solid ${theme.primaryColor}`, paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                İlgi Alanları
              </h3>
              <p style={{ lineHeight: 1.6, color: '#4b5563', margin: 0 }}>
                {personalInfo.hobbies}
              </p>
            </section>
          )}

          {/* Languages */}
          {validLanguages.length > 0 && (
            <section style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: theme.primaryColor, borderBottom: `2px solid ${theme.primaryColor}`, paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                Yabancı Diller
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {validLanguages.map(lang => (
                  <div key={lang.id} style={{ color: '#4b5563' }}>
                    <div style={{ fontWeight: '600', color: '#1f2937' }}>{lang.language}</div>
                    <div style={{ fontSize: '0.95rem' }}>{lang.level}</div>
                    {lang.institution && <div style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{lang.institution}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* References */}
          {validReferences.length > 0 && (
            <section>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: theme.primaryColor, borderBottom: `2px solid ${theme.primaryColor}`, paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                Referanslar
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {validReferences.map(ref => (
                  <div key={ref.id} style={{ color: '#4b5563' }}>
                    <div style={{ fontWeight: '600', color: '#1f2937' }}>{ref.fullName}</div>
                    <div style={{ fontSize: '0.95rem' }}>{ref.title}</div>
                    <div style={{ fontSize: '0.95rem', color: theme.primaryColor }}>{ref.company}</div>
                    {(ref.phone || ref.email) && (
                      <div style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
                        {ref.phone && <div>{ref.phone}</div>}
                        {ref.email && <div>{ref.email}</div>}
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

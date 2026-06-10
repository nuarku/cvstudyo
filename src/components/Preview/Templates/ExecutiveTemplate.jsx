import React from 'react';

export const ExecutiveTemplate = ({ data }) => {
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
      color: '#1e293b', // slate-800
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#f8fafc' // slate-50
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#0f172a', // slate-900
        color: '#f8fafc',
        padding: '3rem',
        display: 'flex',
        alignItems: 'center',
        gap: '2.5rem',
        borderBottom: `6px solid ${theme.primaryColor}`
      }}>
        {personalInfo.photoUrl && (
          <img 
            src={personalInfo.photoUrl} 
            alt="Profil" 
            
            style={{ 
              width: '130px', 
              height: '130px', 
              minWidth: '130px',
              minHeight: '130px',
              flexShrink: 0,
              borderRadius: personalInfo.photoShape === 'round' ? '50%' : '12px', 
              objectFit: 'cover', 
              border: '4px solid #334155' 
            }} 
          />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '2.75rem', fontWeight: '800', margin: '0 0 0.25rem 0', letterSpacing: '-0.025em' }}>
            {personalInfo.fullName}
          </h1>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '500', margin: '0 0 1rem 0', color: '#94a3b8' }}>
            {personalInfo.jobTitle}
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
            {contactItems.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: theme.primaryColor, marginRight: '0.5rem' }}>▪</span> {item}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Body */}
      <div style={{ padding: '3rem', flex: 1, backgroundColor: '#ffffff', margin: '0 2rem 2rem 2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', borderRadius: '0 0 8px 8px' }}>
        
        {/* Summary */}
        {personalInfo.summary && (
          <section style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: theme.primaryColor }}></span>
              PROFİL ÖZETİ
            </h3>
            <p style={{ lineHeight: 1.6, color: '#334155', fontSize: '0.95rem' }}>
              {personalInfo.summary}
            </p>
          </section>
        )}

        <div style={{ display: 'flex', gap: '3rem' }}>
          
          {/* Main Column */}
          <div style={{ flex: 2 }}>
            {/* Experience */}
            {validExperience.length > 0 && (
              <section style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: theme.primaryColor }}></span>
                  PROFESYONEL DENEYİM
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {validExperience.map(exp => (
                    <div key={exp.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: '700', margin: 0, color: '#0f172a' }}>{exp.position}</h4>
                        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600', backgroundColor: '#f1f5f9', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <div style={{ fontSize: '1rem', fontWeight: '600', color: theme.primaryColor, marginBottom: '0.5rem' }}>
                        {exp.company}
                      </div>
                      {exp.description && (
                        <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#475569', margin: 0 }}>
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
              <section style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: theme.primaryColor }}></span>
                  EĞİTİM BİLGİLERİ
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {validEducation.map((edu, index) => (
                    <div key={edu.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#111827', margin: 0 }}>{edu.degree}</h4>
                        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600', backgroundColor: '#f1f5f9', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                      <div style={{ fontSize: '1rem', color: theme.primaryColor, fontWeight: '600', marginBottom: '0.5rem' }}>
                        {edu.institution} {edu.educationType && `(${edu.educationType})`}
                      </div>
                      {edu.description && (
                        <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Volunteer Works */}
            {validVolunteer.length > 0 && (
              <section style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: theme.primaryColor }}></span>
                  GÖNÜLLÜ ÇALIŞMALAR
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {validVolunteer.map(vol => (
                    <div key={vol.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#111827', margin: 0 }}>{vol.role}</h4>
                        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600', backgroundColor: '#f1f5f9', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                          {vol.startDate} - {vol.endDate}
                        </span>
                      </div>
                      <div style={{ fontSize: '1rem', color: theme.primaryColor, fontWeight: '600', marginBottom: '0.5rem' }}>
                        {vol.organization}
                      </div>
                      {vol.description && (
                        <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
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


            {/* Skills */}
            {validSkills.length > 0 && (
              <section style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: theme.primaryColor }}></span>
                  YETENEKLER & BELGELER
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {validSkills.map((skill, index) => (
                    <span key={index} style={{ 
                      backgroundColor: '#f1f5f9',
                      border: '1px solid #e2e8f0',
                      color: '#334155',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                      fontWeight: '500'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Hobbies */}
          {personalInfo.hobbies && personalInfo.hobbies.trim() !== '' && (
            <section style={{ marginBottom: '2.5rem' }}>
              <div style={{ marginBottom: '1rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: theme.primaryColor, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>İlgi Alanları</h3>
              </div>
              <p style={{ lineHeight: 1.6, color: '#4b5563', margin: 0 }}>
                {personalInfo.hobbies}
              </p>
            </section>
          )}

          {/* Languages */}
          {validLanguages.length > 0 && (
            <section style={{ marginBottom: '2.5rem' }}>
              <div style={{ marginBottom: '1rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: theme.primaryColor, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Yabancı Diller</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {validLanguages.map(lang => (
                  <div key={lang.id} style={{ color: '#4b5563' }}>
                    <div style={{ fontWeight: '600', color: '#111827' }}>{lang.language}</div>
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
              <div style={{ marginBottom: '1rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: theme.primaryColor, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Referanslar</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {validReferences.map(ref => (
                  <div key={ref.id} style={{ color: '#4b5563' }}>
                    <div style={{ fontWeight: '600', color: '#111827' }}>{ref.fullName}</div>
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
    </div>
  );
};

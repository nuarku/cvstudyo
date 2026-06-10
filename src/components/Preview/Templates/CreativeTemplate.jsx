import React from 'react';

export const CreativeTemplate = ({ data }) => {
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
      color: '#1f2937',
      display: 'flex',
      height: '100%',
      backgroundColor: '#ffffff'
    }}>
      
      {/* Left Sidebar */}
      <div style={{
        width: '35%',
        backgroundColor: theme.primaryColor,
        color: '#ffffff',
        padding: '3rem 2rem',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          {personalInfo.photoUrl ? (
            <img 
              src={personalInfo.photoUrl} 
              alt="Profil" 
              
              style={{ 
                width: '120px', 
                height: '120px', 
                minWidth: '120px',
                minHeight: '120px',
                flexShrink: 0,
                borderRadius: personalInfo.photoShape === 'round' ? '50%' : '8px', 
                objectFit: 'cover', 
                margin: '0 auto 1.5rem', 
                border: '3px solid rgba(255,255,255,0.5)', 
                display: 'block' 
              }} 
            />
          ) : (
            <div style={{ 
              width: '120px', 
              height: '120px', 
              borderRadius: personalInfo.photoShape === 'round' ? '50%' : '8px', 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              margin: '0 auto 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              fontWeight: '700'
            }}>
              {personalInfo.fullName.charAt(0)}
            </div>
          )}
          <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 0.5rem 0', lineHeight: 1.1 }}>
            {personalInfo.fullName}
          </h1>
          <h2 style={{ fontSize: '1.125rem', fontWeight: '400', margin: 0, opacity: 0.9 }}>
            {personalInfo.jobTitle}
          </h2>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '700', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            İLETİŞİM
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#f8fafc' }}>
            {personalInfo.email && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span>✉</span> {personalInfo.email}</div>}
            {personalInfo.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span>☎</span> {personalInfo.phone}</div>}
            {personalInfo.location && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span>⌂</span> {personalInfo.location}</div>}
            {personalInfo.website && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span>🌐</span> {personalInfo.website}</div>}
            {personalInfo.birthDate && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span>🎂</span> {personalInfo.birthDate}</div>}
            {personalInfo.tcKimlik && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span>🆔</span> TCKN: {personalInfo.tcKimlik}</div>}
          </div>
        </div>

        {validSkills.length > 0 && (
          <div style={{ marginTop: '2.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase' }}>
              <span style={{ width: '1.5rem', height: '2px', backgroundColor: '#38bdf8' }}></span>
              YETENEKLER
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {validSkills.map((skill, index) => (
                <div key={index} style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
                  • {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {validLanguages.length > 0 && (
          <div style={{ marginTop: '2.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase' }}>
              <span style={{ width: '1.5rem', height: '2px', backgroundColor: '#38bdf8' }}></span>
              YABANCI DİLLER
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {validLanguages.map(lang => (
                <div key={lang.id} style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
                  <div style={{ color: '#ffffff', fontWeight: 'bold' }}>{lang.language}</div>
                  <div>{lang.level}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div style={{
        width: '65%',
        padding: '4rem 3rem',
        display: 'flex',
        flexDirection: 'column'
      }}>
        
        {personalInfo.summary && (
          <section style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: theme.primaryColor, marginBottom: '1rem' }}>Profil Özeti</h3>
            <p style={{ lineHeight: 1.7, color: '#4b5563' }}>
              {personalInfo.summary}
            </p>
          </section>
        )}

        {validExperience.length > 0 && (
          <section style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: theme.primaryColor, margin: 0, letterSpacing: '0.05em' }}>DENEYİM</h3>
              <div style={{ flex: 1, height: '2px', backgroundColor: '#e2e8f0' }}></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {validExperience.map(exp => (
                <div key={exp.id} style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: `2px solid ${theme.primaryColor}` }}>
                  <div style={{ position: 'absolute', left: '-6px', top: '0', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: theme.primaryColor }}></div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '600', marginBottom: '0.25rem' }}>
                    {exp.startDate} — {exp.endDate}
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', margin: '0 0 0.25rem 0' }}>{exp.position}</h4>
                  <div style={{ fontSize: '1rem', color: theme.primaryColor, fontWeight: '500', marginBottom: '0.5rem' }}>{exp.company}</div>
                  {exp.description && (
                    <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {validEducation.length > 0 && (
          <section style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: theme.primaryColor, margin: 0, letterSpacing: '0.05em' }}>EĞİTİM</h3>
              <div style={{ flex: 1, height: '2px', backgroundColor: '#e2e8f0' }}></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {validEducation.map(edu => (
                <div key={edu.id} style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: `2px solid ${theme.primaryColor}` }}>
                  <div style={{ position: 'absolute', left: '-6px', top: '0', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: theme.primaryColor }}></div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '600', marginBottom: '0.25rem' }}>
                    {edu.startDate} — {edu.endDate}
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', margin: '0 0 0.25rem 0' }}>{edu.degree}</h4>
                  <div style={{ fontSize: '1rem', color: theme.primaryColor, fontWeight: '500', marginBottom: '0.5rem' }}>
                    {edu.institution} {edu.educationType && `(${edu.educationType})`}
                  </div>
                  {edu.description && (
                    <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {validVolunteer.length > 0 && (
          <section style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: theme.primaryColor, margin: 0, letterSpacing: '0.05em' }}>GÖNÜLLÜ ÇALIŞMALAR</h3>
              <div style={{ flex: 1, height: '2px', backgroundColor: '#e2e8f0' }}></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {validVolunteer.map(vol => (
                <div key={vol.id} style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: `2px solid ${theme.primaryColor}` }}>
                  <div style={{ position: 'absolute', left: '-6px', top: '0', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: theme.primaryColor }}></div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '600', marginBottom: '0.25rem' }}>
                    {vol.startDate} — {vol.endDate}
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', margin: '0 0 0.25rem 0' }}>{vol.role}</h4>
                  <div style={{ fontSize: '1rem', color: theme.primaryColor, fontWeight: '500', marginBottom: '0.5rem' }}>
                    {vol.organization}
                  </div>
                  {vol.description && (
                    <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>{vol.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {validReferences.length > 0 && (
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: theme.primaryColor, margin: 0, letterSpacing: '0.05em' }}>REFERANSLAR</h3>
              <div style={{ flex: 1, height: '2px', backgroundColor: '#e2e8f0' }}></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
              {validReferences.map(ref => (
                <div key={ref.id} style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', borderLeft: `4px solid ${theme.primaryColor}` }}>
                  <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '1.05rem' }}>{ref.fullName}</div>
                  <div style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{ref.title}</div>
                  <div style={{ color: theme.primaryColor, fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.5rem' }}>{ref.company}</div>
                  {(ref.phone || ref.email) && (
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
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
  );
};

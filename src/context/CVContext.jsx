import { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const CVContext = createContext();

const initialState = {
  theme: {
    id: 'modern',
    primaryColor: '#3b82f6',
    fontFamily: "'Space Grotesk', sans-serif"
  },
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    driverLicense: '',
    militaryStatus: '',
    gender: '',
    photoUrl: null,
    photoShape: 'round',
    summary: '',
    hobbies: '',
    birthDate: '',
    tcKimlik: ''
  },
  experience: [],
  education: [],
  skills: [],
  languages: [],
  volunteer: [],
  references: []
};

export const CVProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [cvData, setCvData] = useState(initialState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from Firestore
  useEffect(() => {
    const loadData = async () => {
      if (currentUser) {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const parsedData = docSnap.data();
            setCvData({
              ...initialState,
              ...parsedData,
              languages: parsedData.languages || initialState.languages,
              volunteer: parsedData.volunteer || initialState.volunteer,
              references: parsedData.references || initialState.references
            });
          } else {
            // New user, save initial state
            await setDoc(docRef, initialState);
            setCvData(initialState);
          }
        } catch (error) {
          console.error("Error loading CV data:", error);
        }
      } else {
        // Not logged in
        setCvData(initialState);
      }
      setIsLoaded(true);
    };

    loadData();
  }, [currentUser]);

  // Save to Firestore & Update CSS Variables
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', cvData.theme.primaryColor);

    if (currentUser && isLoaded) {
      const timeoutId = setTimeout(() => {
        setDoc(doc(db, 'users', currentUser.uid), cvData).catch(err => console.error("Error saving CV data:", err));
      }, 1500); // 1.5s debounce
      
      return () => clearTimeout(timeoutId);
    }
  }, [cvData, currentUser, isLoaded]);

  const updatePersonalInfo = (data) => {
    setCvData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, ...data } }));
  };

  const addExperience = (exp) => {
    setCvData(prev => ({ ...prev, experience: [...prev.experience, { ...exp, id: Date.now().toString() }] }));
  };

  const updateExperience = (id, data) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, ...data } : exp)
    }));
  };

  const removeExperience = (id) => {
    setCvData(prev => ({ ...prev, experience: prev.experience.filter(exp => exp.id !== id) }));
  };

  const addEducation = (edu) => {
    setCvData(prev => ({ ...prev, education: [...prev.education, { ...edu, id: Date.now().toString() }] }));
  };

  const updateEducation = (id, data) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, ...data } : edu)
    }));
  };

  const removeEducation = (id) => {
    setCvData(prev => ({ ...prev, education: prev.education.filter(edu => edu.id !== id) }));
  };

  const updateSkills = (skills) => {
    setCvData(prev => ({ ...prev, skills }));
  };

  const updateTheme = (themeData) => {
    setCvData(prev => ({ ...prev, theme: { ...prev.theme, ...themeData } }));
  };

  // --- LANGUAGES ---
  const addLanguage = (language) => {
    setCvData(prev => ({
      ...prev,
      languages: [...(prev.languages || []), { ...language, id: Date.now().toString() }]
    }));
  };

  const updateLanguage = (id, data) => {
    setCvData(prev => ({
      ...prev,
      languages: prev.languages.map(lang => lang.id === id ? { ...lang, ...data } : lang)
    }));
  };

  const removeLanguage = (id) => {
    setCvData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang.id !== id)
    }));
  };

  // --- VOLUNTEER ---
  const addVolunteer = (vol) => {
    setCvData(prev => ({
      ...prev,
      volunteer: [...(prev.volunteer || []), { ...vol, id: Date.now().toString() }]
    }));
  };

  const updateVolunteer = (id, data) => {
    setCvData(prev => ({
      ...prev,
      volunteer: prev.volunteer.map(vol => vol.id === id ? { ...vol, ...data } : vol)
    }));
  };

  const removeVolunteer = (id) => {
    setCvData(prev => ({
      ...prev,
      volunteer: prev.volunteer.filter(vol => vol.id !== id)
    }));
  };

  // --- REFERENCES ---
  const addReference = (ref) => {
    setCvData(prev => ({
      ...prev,
      references: [...(prev.references || []), { ...ref, id: Date.now().toString() }]
    }));
  };

  const updateReference = (id, data) => {
    setCvData(prev => ({
      ...prev,
      references: prev.references.map(ref => ref.id === id ? { ...ref, ...data } : ref)
    }));
  };

  const removeReference = (id) => {
    setCvData(prev => ({
      ...prev,
      references: prev.references.filter(ref => ref.id !== id)
    }));
  };

  return (
    <CVContext.Provider value={{
      cvData,
      updateTheme,
      updatePersonalInfo,
      addExperience,
      updateExperience,
      removeExperience,
      addEducation,
      updateEducation,
      removeEducation,
      updateSkills,
      addLanguage,
      updateLanguage,
      removeLanguage,
      addVolunteer,
      updateVolunteer,
      removeVolunteer,
      addReference,
      updateReference,
      removeReference
    }}>
      {children}
    </CVContext.Provider>
  );
};

export const useCV = () => useContext(CVContext);

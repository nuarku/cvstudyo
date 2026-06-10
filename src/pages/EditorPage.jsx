import React from 'react';
import { CVProvider } from '../context/CVContext';
import { EditorPanel } from '../components/Editor/EditorPanel';
import { PreviewPanel } from '../components/Preview/PreviewPanel';
import { TutorialModal } from '../components/Editor/TutorialModal';

export const EditorPage = () => {
  return (
    <CVProvider>
      <TutorialModal />
      <div className="app-container">
        <EditorPanel />
        <PreviewPanel />
      </div>
    </CVProvider>
  )
}


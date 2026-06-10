import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CVProvider } from './context/CVContext';
import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/HomePage';
import { EditorPage } from './pages/EditorPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { KvkkPage } from './pages/KvkkPage';
import { AdminPage } from './pages/AdminPage';
import { DashboardPage } from './pages/DashboardPage';
import { EnglishTestPage } from './pages/EnglishTestPage';
import { CareerTestPage } from './pages/CareerTestPage';
import { VerifyCertificatePage } from './pages/VerifyCertificatePage';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <CVProvider>
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <PublicRoute>
                  <HomePage />
                </PublicRoute>
              } 
            />
            <Route 
              path="/auth" 
              element={
                <PublicRoute>
                  <AuthPage />
                </PublicRoute>
              } 
            />
            <Route path="/gizlilik" element={<PrivacyPage />} />
            <Route path="/kvkk" element={<KvkkPage />} />
            <Route path="/verify/certificate" element={<VerifyCertificatePage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/test/english" 
              element={
                <ProtectedRoute>
                  <EnglishTestPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/test/career" 
              element={
                <ProtectedRoute>
                  <CareerTestPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/editor" 
              element={
                <ProtectedRoute>
                  <EditorPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </BrowserRouter>
      </CVProvider>
    </AuthProvider>
  );
};

export default App;

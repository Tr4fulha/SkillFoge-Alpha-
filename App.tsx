
import React, { useState, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TopBar from './components/TopBar';
import Navigation from './components/Navigation';
import BottomNav from './components/BottomNav';
import Onboarding from './components/Onboarding';
import { UserProvider, useUser } from './context/UserContext';
import { Loader2 } from 'lucide-react';

const Home = lazy(() => import('./pages/Home'));
const Profile = lazy(() => import('./pages/Profile'));
const LogicLab = lazy(() => import('./pages/LogicLab'));
const Companies = lazy(() => import('./pages/Companies'));
const ChallengeDetail = lazy(() => import('./pages/ChallengeDetail'));
const Messages = lazy(() => import('./pages/Messages'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-dark text-primary">
    <Loader2 size={40} className="animate-spin" />
  </div>
);

const AppContent: React.FC = () => {
    const location = useLocation();
    const isDetailPage = location.pathname.includes('/challenge/');

    return (
        <div className="min-h-screen bg-dark font-sans text-text flex flex-col">
            <Onboarding />
            
            {!isDetailPage && <TopBar />}
            
            <div className="flex flex-1 relative">
                {!isDetailPage && (
                    <div className="hidden md:block">
                        <Navigation />
                    </div>
                )}
                
                <main className={`flex-1 w-full bg-dark relative ${!isDetailPage ? 'md:ml-64' : ''}`}>
                    <div className="page-transition">
                        <Suspense fallback={<LoadingFallback />}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/profile/:userId" element={<Profile />} />
                                <Route path="/logic" element={<LogicLab />} />
                                <Route path="/companies" element={<Companies />} />
                                <Route path="/challenge/:id" element={<ChallengeDetail />} />
                                <Route path="/messages" element={<Messages />} />
                            </Routes>
                        </Suspense>
                    </div>
                </main>
            </div>

            {!isDetailPage && <BottomNav />}
        </div>
    );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
};

export default App;

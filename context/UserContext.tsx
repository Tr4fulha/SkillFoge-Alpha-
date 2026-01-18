
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Challenge, Message } from '../types';
import { CURRENT_USER } from '../constants';
import { useLocalStorage } from '../utils/hooks';
import { audio } from '../utils/audio';

interface UserContextType {
  user: UserProfile;
  isMuted: boolean;
  toggleMute: () => void;
  addPoints: (amount: number) => void;
  spendPoints: (amount: number) => boolean;
  toggleFavorite: (id: string) => void;
  isFavorited: (id: string) => boolean;
  completeChallenge: (id: string, reward: number) => void;
  sendMessage: (receiverId: string, text: string) => void;
  isUnlocked: (id: string) => boolean;
  unlockChallenge: (id: string, cost: number) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useLocalStorage<UserProfile>('skillforge_user_state', CURRENT_USER);
  const [unlockedIds, setUnlockedIds] = useLocalStorage<string[]>('skillforge_unlocked', []);
  const [isMuted, setIsMuted] = useLocalStorage<boolean>('skillforge_muted', false);

  useEffect(() => {
    audio.setMuted(isMuted);
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
    if (isMuted) audio.playTap(); // Som ao desmutar
  };

  const addPoints = (amount: number) => {
    setUser(prev => ({ ...prev, points: prev.points + amount }));
  };

  const spendPoints = (amount: number): boolean => {
    if (user.points >= amount) {
      setUser(prev => ({ ...prev, points: prev.points - amount }));
      return true;
    }
    audio.playError();
    return false;
  };

  const toggleFavorite = (id: string) => {
    audio.playTap();
    setUser(prev => {
      const isAlready = prev.completedChallenges.includes(id);
      return {
        ...prev,
        completedChallenges: isAlready 
          ? prev.completedChallenges.filter(cid => cid !== id)
          : [...prev.completedChallenges, id]
      };
    });
  };

  const isFavorited = (id: string) => user.completedChallenges.includes(id);

  const completeChallenge = (id: string, reward: number) => {
    if (!user.completedChallenges.includes(id)) {
      audio.playSuccess();
      setUser(prev => ({
        ...prev,
        points: prev.points + reward,
        completedChallenges: [...prev.completedChallenges, id]
      }));
      return true;
    }
    return false;
  };

  const unlockChallenge = (id: string, cost: number): boolean => {
    if (unlockedIds.includes(id)) return true;
    if (spendPoints(cost)) {
      audio.playUnlock();
      setUnlockedIds(prev => [...prev, id]);
      return true;
    }
    return false;
  };

  const isUnlocked = (id: string) => unlockedIds.includes(id);

  const sendMessage = (receiverId: string, text: string) => {
    audio.playTap();
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: user.id,
      senderName: user.name,
      text,
      timestamp: 'Agora'
    };
    setUser(prev => ({
        ...prev,
        messages: [...prev.messages, newMessage]
    }));
  };

  return (
    <UserContext.Provider value={{ 
        user, isMuted, toggleMute, addPoints, spendPoints, toggleFavorite, 
        isFavorited, completeChallenge, sendMessage, 
        isUnlocked, unlockChallenge 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser deve ser usado dentro de um UserProvider');
  return context;
};

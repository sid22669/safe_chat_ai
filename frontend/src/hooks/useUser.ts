import { useState, useEffect } from 'react';
import type { UserProfile } from '../types';

const STORAGE_KEY = 'safechat_user';

const DEFAULT_USER: UserProfile = { name: '', avatar: '', onboarded: false };

function loadUser(): UserProfile {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : DEFAULT_USER;
}

export function useUser() {
  const [user, setUser] = useState<UserProfile>(loadUser);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  const login = (name: string) => {
    setUser(prev => ({ ...prev, name, onboarded: true }));
  };

  const logout = () => {
    setUser(DEFAULT_USER);
  };

  return { user, login, logout, setUser };
}

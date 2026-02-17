import { useState, useEffect } from 'react';
import type { Message, MessageAction } from '../types';

const STORAGE_KEY = 'safechat_messages';

function loadMessages(): Message[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveMessages(messages: Message[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>(loadMessages);

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  const addMessage = (msg: Omit<Message, 'id' | 'timestamp' | 'action'>) => {
    const newMsg: Message = {
      ...msg,
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      action: null,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [newMsg, ...prev]);
    return newMsg;
  };

  const setAction = (messageId: string, action: MessageAction) => {
    setMessages(prev =>
      prev.map(m => (m.id === messageId ? { ...m, action } : m))
    );
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return { messages, addMessage, setAction, clearMessages };
}

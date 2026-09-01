'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, Phone, Video, CheckCheck, User } from 'lucide-react';
import Image from 'next/image';

interface InAppChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  ownerName: string;
  ownerAvatar: string;
  propertyName: string;
}

export function InAppChatModal({
  isOpen,
  onClose,
  ownerName,
  ownerAvatar,
  propertyName,
}: InAppChatModalProps) {
  const threadKey = `staysetu-chat-${ownerName.toLowerCase().replace(/\s+/g, '-')}`;

  const [messages, setMessages] = useState([
    { id: 1, sender: 'OWNER', text: `Hi! Welcome to ${propertyName}. How can I help you today?`, time: '10:14 AM' },
    { id: 2, sender: 'USER', text: 'I am interested in visiting this property on Sunday!', time: '10:15 AM' },
    { id: 3, sender: 'OWNER', text: 'That sounds great! Sunday 10:00 AM works perfectly for me.', time: '10:16 AM' },
  ]);
  const [inputMsg, setInputMsg] = useState('');

  // Load existing saved chat history on open
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(threadKey);
      if (saved) {
        try {
          setMessages(JSON.parse(saved));
        } catch (e) {
          console.error('Error loading chat history:', e);
        }
      }
    }
  }, [threadKey, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'USER',
      text: inputMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(threadKey, JSON.stringify(updated));
    }
    setInputMsg('');

    // Simulated owner auto-reply
    setTimeout(() => {
      setMessages((prev) => {
        const withReply = [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'OWNER',
            text: 'Got your message! I have locked your slot. See you soon at the site!',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ];
        if (typeof window !== 'undefined') {
          localStorage.setItem(threadKey, JSON.stringify(withReply));
        }
        return withReply;
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-950 rounded-3xl border-2 border-[#1E1B4B] w-full max-w-md h-[560px] flex flex-col shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 bg-[#1E1B4B] text-white flex items-center justify-between border-b border-indigo-900">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500 shrink-0">
              <Image src={ownerAvatar} alt={ownerName} fill className="object-cover" unoptimized />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">{ownerName}</h3>
              <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Online Owner
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <button onClick={() => alert(`Calling ${ownerName}...`)} className="p-2 rounded-full hover:bg-indigo-900 transition-colors">
              <Phone className="w-4 h-4 text-orange-400" />
            </button>
            <button onClick={() => alert(`Starting Video Call with ${ownerName}...`)} className="p-2 rounded-full hover:bg-indigo-900 transition-colors">
              <Video className="w-4 h-4 text-orange-400" />
            </button>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-indigo-900 transition-colors text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 dark:bg-slate-900/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'USER' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-xs font-semibold shadow-xs ${
                  m.sender === 'USER'
                    ? 'bg-[#1E1B4B] text-white rounded-br-none'
                    : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-bl-none'
                }`}
              >
                <p>{m.text}</p>
                <span
                  className={`text-[9px] block text-right mt-1 font-normal ${
                    m.sender === 'USER' ? 'text-indigo-200' : 'text-slate-400'
                  }`}
                >
                  {m.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="Write a reply..."
            className="input-base text-xs font-semibold flex-1 py-2.5"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-black p-3 rounded-xl shadow-md cursor-pointer transition-transform active:scale-95 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}

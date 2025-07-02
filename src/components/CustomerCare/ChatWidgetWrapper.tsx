'use client';

import { useChat } from './ChatProvider';
import ChatWidget from './ChatWidget';

export default function ChatWidgetWrapper() {
  const { isChatOpen, toggleChat } = useChat();
  return <ChatWidget isOpen={isChatOpen} onToggle={toggleChat} />;
}

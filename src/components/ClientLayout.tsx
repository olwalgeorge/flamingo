'use client';

import { ChatProvider } from './CustomerCare/ChatProvider';
import ChatWidgetWrapper from './CustomerCare/ChatWidgetWrapper';
import { ReactNode } from 'react';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ChatProvider>
      {children}
      <ChatWidgetWrapper />
    </ChatProvider>
  );
}

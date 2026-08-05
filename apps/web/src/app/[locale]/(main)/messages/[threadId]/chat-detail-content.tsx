'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { Avatar } from '@/components/ui/Avatar';
import { Skeleton } from '@/components/ui/Skeleton';
import { ChatMessageInput } from '@/components/features/chat/ChatMessageInput';
import {
  useChatMessages,
  useChatThreads,
  useSendMessage,
  useMarkMessagesAsRead,
} from '@/hooks/api';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/cn';

// ---------------------------------------------------------------------------
// Chat Detail Content (Mobile) — Full screen chat view
// ---------------------------------------------------------------------------
export function ChatDetailContent() {
  const { locale, threadId } = useParams<{ locale: string; threadId: string }>();
  const { user } = useAuth();
  const userId = user?.id ?? '';

  const { data: messages, isLoading } = useChatMessages(threadId);
  const { data: threads } = useChatThreads(userId);
  const sendMessage = useSendMessage();
  const markRead = useMarkMessagesAsRead();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Find thread info
  const thread = (threads as Array<Record<string, unknown>> | undefined)?.find(
    (t) => String(t.id) === threadId
  );
  const otherUserName = String(thread?.other_user_name ?? 'User');

  // Mark as read
  useEffect(() => {
    if (threadId && userId) {
      markRead.mutate({ threadId, userId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadId, userId]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (data: { thread_id: string; content: string }) => {
    sendMessage.mutate({
      threadId: data.thread_id,
      senderId: userId,
      content: data.content,
    });
  };

  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col overflow-hidden rounded-xl border border-border bg-surface">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <Link
          href={`/${locale}/messages`}
          className="rounded-lg p-1 text-text-secondary hover:bg-surface-muted"
          aria-label="Back to messages"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <Avatar fallback={otherUserName.charAt(0)} size="sm" />
        <div>
          <p className="text-sm font-semibold text-text-primary">
            {otherUserName}
          </p>
          <p className="text-[10px] text-text-muted">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={cn('flex', i % 2 === 0 ? 'justify-start' : 'justify-end')}
              >
                <Skeleton className="h-10 w-48 rounded-2xl" />
              </div>
            ))}
          </div>
        ) : messages && (messages as Array<Record<string, unknown>>).length > 0 ? (
          <div className="space-y-3">
            {(messages as Array<Record<string, unknown>>).map((msg) => {
              const isMine = msg.sender_id === userId;
              return (
                <div
                  key={String(msg.id)}
                  className={cn('flex', isMine ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      'max-w-[75%] rounded-2xl px-4 py-2.5 text-sm',
                      isMine
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-surface-muted text-text-primary rounded-bl-md'
                    )}
                  >
                    <p className="whitespace-pre-wrap break-words">
                      {String(msg.content ?? '')}
                    </p>
                    <p
                      className={cn(
                        'mt-1 text-[10px]',
                        isMine ? 'text-primary-foreground/60' : 'text-text-muted'
                      )}
                    >
                      {msg.created_at
                        ? new Date(String(msg.created_at)).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : ''}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-text-muted">No messages yet. Say hello! 👋</p>
          </div>
        )}
      </div>

      {/* Input */}
      <ChatMessageInput
        threadId={threadId}
        onSubmit={handleSend}
        isLoading={sendMessage.isPending}
      />
    </div>
  );
}

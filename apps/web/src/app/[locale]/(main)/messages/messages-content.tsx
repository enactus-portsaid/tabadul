'use client';

import { ArrowLeft, MessageCircle, Search } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import { ChatMessageInput } from '@/components/features/chat/ChatMessageInput';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  useChatMessages,
  useChatThreads,
  useMarkMessagesAsRead,
  useSendMessage,
} from '@/hooks/api';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/cn';

// ---------------------------------------------------------------------------
// Messages Content — Client Component (Desktop: split panel, Mobile: list/detail)
// ---------------------------------------------------------------------------
export function MessagesContent() {
  const { locale } = useParams<{ locale: string }>();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const userId = user?.id ?? '';

  const { data: threads, isLoading: threadsLoading } = useChatThreads(userId);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-select first thread or from URL param
  useEffect(() => {
    const sellerParam = searchParams.get('seller');
    if (sellerParam && threads && threads.length > 0) {
      const match = (threads as Array<Record<string, unknown>>).find(
        (t) => t.seller_id === sellerParam || t.buyer_id === sellerParam
      );
      if (match) setActiveThreadId(String(match.id));
    } else if (!activeThreadId && threads && threads.length > 0) {
      setActiveThreadId(
        String((threads as Array<Record<string, unknown>>)[0].id)
      );
    }
  }, [threads, searchParams, activeThreadId]);

  const filteredThreads = useMemo(() => {
    if (!threads) return [];
    const list = threads as Array<Record<string, unknown>>;
    if (!searchQuery) return list;
    return list.filter((t) => {
      const name = String(t.other_user_name ?? '').toLowerCase();
      const lastMsg = String(t.last_message ?? '').toLowerCase();
      return (
        name.includes(searchQuery.toLowerCase()) ||
        lastMsg.includes(searchQuery.toLowerCase())
      );
    });
  }, [threads, searchQuery]);

  return (
    <div className="border-border bg-surface flex h-[calc(100vh-10rem)] gap-0 overflow-hidden rounded-xl border lg:gap-0">
      {/* Thread List Panel */}
      <div
        className={cn(
          'border-border flex w-full flex-col border-r lg:w-80 lg:shrink-0',
          activeThreadId ? 'hidden lg:flex' : 'flex'
        )}
      >
        {/* Search */}
        <div className="border-border border-b p-3">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            leftAddon={<Search className="h-4 w-4" />}
          />
        </div>

        {/* Thread List */}
        <div className="flex-1 overflow-y-auto">
          {threadsLoading ? (
            <div className="space-y-1 p-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredThreads.length > 0 ? (
            filteredThreads.map((thread) => {
              const isActive = activeThreadId === String(thread.id);
              const hasUnread = Number(thread.unread_count ?? 0) > 0;
              return (
                <button
                  key={String(thread.id)}
                  type="button"
                  onClick={() => setActiveThreadId(String(thread.id))}
                  className={cn(
                    'flex w-full items-center gap-3 px-4 py-3 text-left transition-colors',
                    isActive
                      ? 'bg-primary/5 border-primary border-l-2'
                      : 'hover:bg-surface-muted border-l-2 border-transparent'
                  )}
                >
                  <Avatar
                    fallback={String(thread.other_user_name ?? 'U').charAt(0)}
                    size="sm"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          'truncate text-sm',
                          hasUnread
                            ? 'text-text-primary font-bold'
                            : 'text-text-primary font-medium'
                        )}
                      >
                        {String(thread.other_user_name ?? 'User')}
                      </span>
                      <span className="text-text-muted shrink-0 text-[10px]">
                        {thread.updated_at
                          ? formatTimeAgo(String(thread.updated_at))
                          : ''}
                      </span>
                    </div>
                    <p
                      className={cn(
                        'truncate text-xs',
                        hasUnread
                          ? 'text-text-primary font-semibold'
                          : 'text-text-secondary'
                      )}
                    >
                      {String(thread.last_message ?? 'No messages yet')}
                    </p>
                  </div>
                  {hasUnread && (
                    <span className="bg-primary text-primary-foreground flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold">
                      {Number(thread.unread_count)}
                    </span>
                  )}
                </button>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
              <MessageCircle className="text-text-muted h-10 w-10" />
              <p className="text-text-secondary mt-3 text-sm">
                No conversations yet
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Detail Panel */}
      {activeThreadId ? (
        <ChatPanel
          threadId={activeThreadId}
          userId={userId}
          onBack={() => setActiveThreadId(null)}
          threads={filteredThreads}
        />
      ) : (
        <div className="hidden flex-1 items-center justify-center lg:flex">
          <div className="text-center">
            <MessageCircle className="text-text-muted mx-auto h-12 w-12" />
            <p className="text-text-secondary mt-3 text-sm">
              Select a conversation to start chatting
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Chat Panel sub-component
// ---------------------------------------------------------------------------
function ChatPanel({
  threadId,
  userId,
  onBack,
  threads,
}: {
  threadId: string;
  userId: string;
  onBack: () => void;
  threads: Array<Record<string, unknown>>;
}) {
  const { data: messages, isLoading } = useChatMessages(threadId);
  const sendMessage = useSendMessage();
  const markRead = useMarkMessagesAsRead();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeThread = threads.find((t) => String(t.id) === threadId);
  const otherUserName = String(activeThread?.other_user_name ?? 'User');

  // Mark messages as read when panel opens
  useEffect(() => {
    if (threadId && userId) {
      markRead.mutate({ threadId, userId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadId, userId]);

  // Scroll to bottom when new messages arrive
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
    <div className="flex flex-1 flex-col">
      {/* Chat Header */}
      <div className="border-border flex items-center gap-3 border-b px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          className="text-text-secondary hover:bg-surface-muted rounded-lg p-1 lg:hidden"
          aria-label="Back to conversations"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <Avatar fallback={otherUserName.charAt(0)} size="sm" />
        <div>
          <p className="text-text-primary text-sm font-semibold">
            {otherUserName}
          </p>
          <p className="text-text-muted text-[10px]">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'flex',
                  i % 2 === 0 ? 'justify-start' : 'justify-end'
                )}
              >
                <Skeleton className="h-10 w-48 rounded-2xl" />
              </div>
            ))}
          </div>
        ) : messages &&
          (messages as Array<Record<string, unknown>>).length > 0 ? (
          <div className="space-y-3">
            {(messages as Array<Record<string, unknown>>).map((msg) => {
              const isMine = msg.sender_id === userId;
              return (
                <div
                  key={String(msg.id)}
                  className={cn(
                    'flex',
                    isMine ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[75%] rounded-2xl px-4 py-2.5 text-sm',
                      isMine
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-surface-muted text-text-primary rounded-bl-md'
                    )}
                  >
                    <p className="break-words whitespace-pre-wrap">
                      {String(msg.content ?? '')}
                    </p>
                    <p
                      className={cn(
                        'mt-1 text-[10px]',
                        isMine
                          ? 'text-primary-foreground/60'
                          : 'text-text-muted'
                      )}
                    >
                      {msg.created_at
                        ? new Date(String(msg.created_at)).toLocaleTimeString(
                            [],
                            {
                              hour: '2-digit',
                              minute: '2-digit',
                            }
                          )
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
            <p className="text-text-muted text-sm">
              No messages yet. Say hello! 👋
            </p>
          </div>
        )}
      </div>

      {/* Message Input */}
      <ChatMessageInput
        threadId={threadId}
        onSubmit={handleSend}
        isLoading={sendMessage.isPending}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Time formatting
// ---------------------------------------------------------------------------
function formatTimeAgo(dateStr: string): string {
  const now = Date.now();
  const diff = now - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return new Date(dateStr).toLocaleDateString();
}

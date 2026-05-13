'use client';

import { sendMessageSchema, type SendMessageInput } from '@tabadul/shared/schemas';
import { Send } from 'lucide-react';
import { useRef } from 'react';

import { Button } from '@/components/ui/Button';
import { useZodForm } from '@/hooks/useZodForm';
import { cn } from '@/lib/cn';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
export interface ChatMessageInputProps {
  threadId: string;
  onSubmit: (data: SendMessageInput) => void | Promise<void>;
  isLoading?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Additional className for the wrapper */
  className?: string;
}

// ---------------------------------------------------------------------------
// ChatMessageInput
// ---------------------------------------------------------------------------
/**
 * Inline chat message input — compact form designed for embedding
 * at the bottom of a chat panel. Submits on Enter (Shift+Enter for newline).
 *
 * @example
 * <ChatMessageInput
 *   threadId={thread.id}
 *   onSubmit={handleSend}
 *   isLoading={isPending}
 * />
 */
export function ChatMessageInput({
  threadId,
  onSubmit,
  isLoading = false,
  placeholder = 'Type a message...',
  className,
}: ChatMessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const form = useZodForm(sendMessageSchema, {
    defaultValues: {
      thread_id: threadId,
      content: '',
    },
  });

  const handleSubmit = async (data: SendMessageInput) => {
    await onSubmit(data);
    form.reset({ thread_id: threadId, content: '' });
    // Refocus textarea after send
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.handleSubmit(handleSubmit)();
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className={cn(
        'flex items-end gap-2 border-t border-gray-200 bg-surface p-3 dark:border-gray-700',
        className
      )}
      noValidate
    >
      <input type="hidden" {...form.register('thread_id')} />

      {(() => {
        const { ref: registerRef, ...registerRest } = form.register('content');
        return (
          <textarea
            ref={(el) => {
              registerRef(el);
              (textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
            }}
            {...registerRest}
            placeholder={placeholder}
            rows={1}
            onKeyDown={handleKeyDown}
            className={cn(
              'flex-1 resize-none rounded-lg border border-gray-200 bg-background px-3 py-2',
              'text-sm text-text-primary placeholder:text-text-muted',
              'transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary',
              'dark:border-gray-700',
              'max-h-32'
            )}
            style={{
              height: 'auto',
              minHeight: '40px',
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
            }}
          />
        );
      })()}

      <Button
        type="submit"
        size="md"
        isLoading={isLoading}
        disabled={isLoading}
        aria-label="Send message"
        className="shrink-0"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}

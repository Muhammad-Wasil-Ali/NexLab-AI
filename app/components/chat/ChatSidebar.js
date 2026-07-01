"use client";

import { FiPlus, FiX } from "react-icons/fi";

import ConversationCard from "@/app/components/chat/ConversationCard";

export default function ChatSidebar({
  conversations,
  activeChatId,
  isLoading,
  isCreating,
  isOpen,
  onClose,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
}) {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/30 transition lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-80 max-w-[86vw] flex-col border-r border-slate-200 bg-white transition lg:static lg:z-auto lg:max-w-none lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
          <div>
            <p className="text-sm font-bold text-slate-950">AI Chat</p>
            <p className="text-xs font-medium text-slate-400">
              {conversations.length} conversations
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close conversations"
            title="Close"
          >
            <FiX />
          </button>
        </div>

        <div className="p-4">
          <button
            type="button"
            onClick={onNewChat}
            disabled={isCreating}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiPlus />
            New Chat
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4">
          {isLoading ? (
            <div className="space-y-3 px-1">
              {[0, 1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-16 animate-pulse rounded-lg bg-slate-100"
                />
              ))}
            </div>
          ) : conversations.length ? (
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <ConversationCard
                  key={conversation.id}
                  conversation={conversation}
                  active={conversation.id === activeChatId}
                  onSelect={() => onSelectConversation(conversation.id)}
                  onDelete={() => onDeleteConversation(conversation.id)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center">
              <p className="text-sm font-semibold text-slate-700">
                No conversations yet
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Your chat history will appear here after the first message.
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

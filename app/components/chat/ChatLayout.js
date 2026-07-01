"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import ChatHeader from "@/app/components/chat/ChatHeader";
import ChatInput from "@/app/components/chat/ChatInput";
import ChatSidebar from "@/app/components/chat/ChatSidebar";
import ChatWindow from "@/app/components/chat/ChatWindow";
import {
  createConversation,
  deleteConversation,
  getConversation,
  getHistory,
  sendMessage,
} from "@/utils/chat/chatApi";

function sortConversations(conversations) {
  return [...conversations].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );
}

function upsertConversation(conversations, chat) {
  const exists = conversations.some((item) => item.id === chat.id);
  const next = exists
    ? conversations.map((item) => (item.id === chat.id ? chat : item))
    : [chat, ...conversations];

  return sortConversations(next);
}

export default function ChatLayout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedConversationId = searchParams.get("conversation");
  const requestedPrompt = searchParams.get("prompt");
  const abortControllerRef = useRef(null);

  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draftMessage, setDraftMessage] = useState("");
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [isConversationLoading, setIsConversationLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [lastRetryMessage, setLastRetryMessage] = useState("");

  const activeTitle = useMemo(
    () => activeChat?.title || "New Chat",
    [activeChat]
  );

  const loadHistory = useCallback(async () => {
    try {
      const data = await getHistory();
      setConversations(data.chats || []);
    } catch (loadError) {
      setError(loadError.message || "Unable to load conversations.");
    } finally {
      setIsHistoryLoading(false);
    }
  }, []);

  const loadConversation = useCallback(
    async (id) => {
      if (!id) {
        return;
      }

      try {
        const data = await getConversation(id);
        setActiveChat(data.chat);
        setMessages(data.messages || []);
        setConversations((current) => upsertConversation(current, data.chat));
      } catch (loadError) {
        setError(loadError.message || "Unable to load conversation.");
      } finally {
        setIsConversationLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    let active = true;

    async function loadInitialHistory() {
      try {
        const data = await getHistory();
        if (active) {
          setConversations(data.chats || []);
        }
      } catch (loadError) {
        if (active) {
          setError(loadError.message || "Unable to load conversations.");
        }
      } finally {
        if (active) {
          setIsHistoryLoading(false);
        }
      }
    }

    loadInitialHistory();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!requestedConversationId) {
      return;
    }

    let active = true;

    async function loadRequestedConversation() {
      try {
        const data = await getConversation(requestedConversationId);

        if (active) {
          setActiveChat(data.chat);
          setMessages(data.messages || []);
          setConversations((current) => upsertConversation(current, data.chat));
        }
      } catch (loadError) {
        if (active) {
          setError(loadError.message || "Unable to load conversation.");
        }
      } finally {
        if (active) {
          setIsConversationLoading(false);
        }
      }
    }

    loadRequestedConversation();

    return () => {
      active = false;
    };
  }, [requestedConversationId]);

  useEffect(() => {
    if (!requestedPrompt) {
      return;
    }

    const timer = window.setTimeout(() => {
      setDraftMessage(requestedPrompt);
      setStatus("Prompt inserted. Review it, then send when you are ready.");
      setError("");
    }, 0);

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("prompt");
    const nextQuery = nextParams.toString();
    router.replace(`/dashboard/chat${nextQuery ? `?${nextQuery}` : ""}`);

    return () => window.clearTimeout(timer);
  }, [requestedPrompt, router, searchParams]);

  async function handleNewChat() {
    setIsCreating(true);
    setError("");
    setStatus("");
    setLastRetryMessage("");

    try {
      const data = await createConversation();
      setActiveChat(data.chat);
      setMessages([]);
      setConversations((current) => upsertConversation(current, data.chat));
      router.replace(`/dashboard/chat?conversation=${data.chat.id}`);
      setSidebarOpen(false);
    } catch (createError) {
      setError(createError.message || "Unable to create conversation.");
    } finally {
      setIsCreating(false);
    }
  }

  function handleSelectConversation(id) {
    setIsConversationLoading(true);
    setError("");
    setStatus("");
    setLastRetryMessage("");
    router.replace(`/dashboard/chat?conversation=${id}`);
    setSidebarOpen(false);
    loadConversation(id);
  }

  async function handleDeleteConversation(id) {
    const wasActive = activeChat?.id === id;

    setError("");
    setStatus("");
    setLastRetryMessage("");
    setConversations((current) =>
      current.filter((conversation) => conversation.id !== id)
    );

    if (wasActive) {
      setActiveChat(null);
      setMessages([]);
      router.replace("/dashboard/chat");
    }

    try {
      await deleteConversation(id);
    } catch (deleteError) {
      setError(deleteError.message || "Unable to delete conversation.");
      loadHistory();
    }
  }

  async function handleSend(message) {
    if (!message.trim() || isSending) {
      return;
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    const retryMessage = message.trim();
    const tempMessage = {
      id: `temp-${Date.now()}`,
      role: "user",
      content: retryMessage,
      createdAt: new Date().toISOString(),
    };

    setMessages((current) => [...current, tempMessage]);
    setIsSending(true);
    setError("");
    setStatus("");
    setLastRetryMessage("");

    try {
      const data = await sendMessage({
        chatId: activeChat?.id,
        message: retryMessage,
        signal: controller.signal,
      });

      setActiveChat(data.chat);
      setConversations((current) => upsertConversation(current, data.chat));
      setMessages((current) => [
        ...current.filter((item) => item.id !== tempMessage.id),
        data.userMessage,
        data.aiMessage,
      ]);

      if (!activeChat?.id || activeChat.id !== data.chat.id) {
        router.replace(`/dashboard/chat?conversation=${data.chat.id}`);
      }
    } catch (sendError) {
      setMessages((current) =>
        current.filter((item) => item.id !== tempMessage.id)
      );
      setLastRetryMessage(retryMessage);

      if (sendError.name === "AbortError") {
        setStatus("Generation stopped. You can retry the message when ready.");
      } else {
        setError(sendError.message || "Unable to send message.");
      }
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
      setIsSending(false);
    }
  }

  function handleStop() {
    abortControllerRef.current?.abort();
  }

  function handleRetry() {
    if (!lastRetryMessage || isSending) {
      return;
    }

    handleSend(lastRetryMessage);
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-7rem)] min-h-[680px] max-w-7xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm lg:h-[calc(100vh-5rem)]">
      <ChatSidebar
        conversations={conversations}
        activeChatId={activeChat?.id}
        isLoading={isHistoryLoading}
        isCreating={isCreating}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={handleNewChat}
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={handleDeleteConversation}
      />
      <section className="flex min-w-0 flex-1 flex-col">
        <ChatHeader
          title={activeTitle}
          onMenuClick={() => setSidebarOpen(true)}
          onNewChat={handleNewChat}
        />
        <ChatWindow
          messages={messages}
          isLoading={isConversationLoading}
          isTyping={isSending}
          error={error}
          status={status}
          canRetry={Boolean(lastRetryMessage) && !isSending}
          onRetry={handleRetry}
          onPromptSelect={handleSend}
        />
        <ChatInput
          onSend={handleSend}
          onStop={handleStop}
          disabled={isSending || isConversationLoading}
          isSending={isSending}
          value={draftMessage}
          onChange={setDraftMessage}
        />
      </section>
    </div>
  );
}

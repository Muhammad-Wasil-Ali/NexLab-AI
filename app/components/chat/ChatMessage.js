import ChatBubble from "@/app/components/chat/ChatBubble";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <ChatBubble role={message.role} content={message.content} />
    </div>
  );
}

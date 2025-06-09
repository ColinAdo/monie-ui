"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/common";
import { Send } from "lucide-react";
import { useChatWithAIMutation } from "@/redux/features/accountSlice";
import { useWebSocketContext } from "@/hooks/WebSocketContext";
import { useGetChatsQuery } from "@/redux/features/accountSlice";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";

export default function ChatForm() {
  const { data: chats } = useGetChatsQuery();
  const { data: user } = useRetrieveUserQuery();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { lastJsonMessage } = useWebSocketContext();
  const [chatWithAI, { isLoading }] = useChatWithAIMutation();
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<
    {
      role: "user" | "ai";
      content: string;
      isTyping?: boolean;
      loading?: boolean;
      displayedContent?: string;
    }[]
  >([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Store user prompt
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    setPrompt("");

    // Insert AI loading placeholder
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: "",
        isTyping: true,
        displayedContent: "",
        loading: true,
      },
    ]);

    chatWithAI(prompt)
      .unwrap()
      .catch((error) => {
        console.error("Error occurred", error);
      });
  };

  useEffect(() => {
    if (lastJsonMessage?.type === "chat_event") {
      scrollIfNotVisible();
      const fullContent = lastJsonMessage.response;

      // Replace the last loading message
      setMessages((prev) => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;

        if (updated[lastIndex]?.role === "ai" && updated[lastIndex]?.loading) {
          updated[lastIndex] = {
            ...updated[lastIndex],
            content: fullContent,
            displayedContent: "",
            isTyping: true,
            loading: false,
          };
        }

        return updated;
      });

      let index = 0;
      const typingInterval = setInterval(() => {
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];

          if (!last || !last.isTyping) return updated;

          last.displayedContent = fullContent.slice(0, index);
          index++;

          if (index > fullContent.length) {
            last.isTyping = false;
            clearInterval(typingInterval);
            scrollToBottom();
          }

          return [...updated];
        });
      }, 20);

      return () => clearInterval(typingInterval);
    }
  }, [lastJsonMessage]);

  const scrollIfNotVisible = () => {
    const el = bottomRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

    if (!isVisible) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (chats && messages.length === 0) {
      const formattedChats = chats.flatMap((chat: any) => {
        const msgs = [];

        if (chat.prompt) {
          msgs.push({ role: "user" as const, content: chat.prompt });
        }
        if (chat.response) {
          msgs.push({ role: "ai" as const, content: chat.response });
        }

        return msgs;
      });

      setMessages(formattedChats);

      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [chats, messages.length]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (!chats) {
    return (
      <div className="flex justify-center items-center my-20">
        <Spinner md />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto sm:px-0 lg:px-16 sm:w-[800px] space-y-8">
        <h1
          className={`${
            messages.length === 0 && "py-40"
          } text-base lg:text-lg font-bold text-center mb-8`}
        >
          Hello {user?.username} 👋, I am your AI assistant. I am here for you!
        </h1>

        <div className="ms:p-4 bg-card pb-20">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-2 mb-4 text-justify ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`p-0 rounded-lg text-sm lg:text-base max-w-[100%] ${
                  msg.role === "ai" ? "rounded-tl-none" : ""
                }`}
              >
                <p
                  className={
                    msg.role === "user"
                      ? "text-blue-600 dark:text-blue-300"
                      : ""
                  }
                >
                  {msg.loading ? (
                    <span className="italic text-gray-500">
                      <div className="flex flex-row items-center gap-1">
                        <span className="relative flex size-3">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                          <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
                        </span>
                        <span className="relative flex size-3">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                          <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
                        </span>
                        <span className="relative flex size-3">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                          <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
                        </span>
                      </div>
                    </span>
                  ) : msg.isTyping ? (
                    msg.displayedContent
                  ) : (
                    msg.content
                  )}
                </p>
              </div>
            </div>
          ))}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Floating Input Component */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 max-w-2xl mx-auto"
          >
            <Input
              type="text"
              placeholder="Type your message here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!prompt.trim()}
              className="shrink-0 bg-black dark:bg-gray-100"
            >
              {isLoading ? (
                <Spinner sm />
              ) : (
                <Send className="h-4 w-4 dark:text-black" />
              )}

              <span className="sr-only">Ask AI</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

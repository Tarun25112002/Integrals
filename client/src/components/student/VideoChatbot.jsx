import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import { defaultSchema } from "hast-util-sanitize";
import "highlight.js/styles/github-dark.css";

const markdownSanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), "className"],
    pre: [...(defaultSchema.attributes?.pre || []), "className"],
    span: [...(defaultSchema.attributes?.span || []), "className"],
    table: [...(defaultSchema.attributes?.table || []), "className"],
    thead: [...(defaultSchema.attributes?.thead || []), "className"],
    tbody: [...(defaultSchema.attributes?.tbody || []), "className"],
    tr: [...(defaultSchema.attributes?.tr || []), "className"],
    th: [...(defaultSchema.attributes?.th || []), "className"],
    td: [...(defaultSchema.attributes?.td || []), "className"],
  },
};

// Reusable message bubble component with markdown rendering
const MessageBubble = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } animate-fadeIn`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
          isUser
            ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-md"
            : "bg-white text-gray-800 border border-gray-100 rounded-bl-md"
        }`}
      >
        {!isUser && (
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
            <div className="w-5 h-5 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center">
              <svg
                className="w-3 h-3 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-blue-600">
              AI Assistant
            </span>
          </div>
        )}

        {/* Render markdown for assistant messages; plain text for user */}
        {isUser ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        ) : (
          <div className="prose prose-sm max-w-none text-gray-800">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[
                rehypeHighlight,
                [rehypeSanitize, markdownSanitizeSchema],
              ]}
              components={{
                h1: (props) => (
                  <h1
                    {...props}
                    className="text-base font-bold text-gray-900"
                  />
                ),
                h2: (props) => (
                  <h2 {...props} className="text-sm font-bold text-gray-900" />
                ),
                h3: (props) => (
                  <h3
                    {...props}
                    className="text-sm font-semibold text-gray-900"
                  />
                ),
                p: (props) => (
                  <p
                    {...props}
                    className="text-sm leading-relaxed text-gray-800"
                  />
                ),
                ul: (props) => (
                  <ul {...props} className="my-2 list-disc pl-5" />
                ),
                ol: (props) => (
                  <ol {...props} className="my-2 list-decimal pl-5" />
                ),
                li: (props) => <li {...props} className="my-1" />,
                a: (props) => (
                  <a
                    {...props}
                    className="text-blue-700 hover:text-blue-800 underline"
                    target="_blank"
                    rel="noreferrer"
                  />
                ),
                pre: (props) => (
                  <pre
                    {...props}
                    className="my-3 overflow-x-auto rounded-lg bg-gray-900 p-3 text-gray-100"
                  />
                ),
                code: ({ inline, className, children, ...props }) => {
                  if (inline) {
                    return (
                      <code
                        {...props}
                        className="rounded bg-gray-100 px-1 py-0.5 text-[12px] text-gray-800"
                      >
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code
                      {...props}
                      className={className ? className : "text-[12px]"}
                    >
                      {children}
                    </code>
                  );
                },
                blockquote: (props) => (
                  <blockquote
                    {...props}
                    className="my-2 border-l-4 border-gray-200 pl-3 text-gray-700"
                  />
                ),
                table: (props) => (
                  <div className="my-3 overflow-x-auto">
                    <table
                      {...props}
                      className="w-full border-collapse text-sm"
                    />
                  </div>
                ),
                th: (props) => (
                  <th
                    {...props}
                    className="border border-gray-200 bg-gray-50 px-2 py-1 text-left font-semibold"
                  />
                ),
                td: (props) => (
                  <td {...props} className="border border-gray-200 px-2 py-1" />
                ),
              }}
            >
              {String(message.content || "")}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

// Loading indicator
const TypingIndicator = () => (
  <div className="flex justify-start animate-fadeIn">
    <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2">
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">Thinking...</span>
      </div>
    </div>
  </div>
);

// Quick suggestion button
const SuggestionButton = ({ text, onClick, disabled, variant = "default" }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 ${
      variant === "primary"
        ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`}
  >
    {text}
  </button>
);

const VideoChatbot = ({ courseId, lectureId, lectureTitle, onClose }) => {
  const initialMessage = useMemo(
    () => ({
      role: "assistant",
      content: `Hi! I'm your AI assistant for "${lectureTitle}". Ask me anything about the video content!`,
    }),
    [lectureTitle]
  );

  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasTranscription, setHasTranscription] = useState(null);
  const [error, setError] = useState(null);
  const [rateLimitUntil, setRateLimitUntil] = useState(null);

  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const messagesRef = useRef([]);
  const abortRef = useRef(null);
  const isAtBottomRef = useRef(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const isRateLimited = useMemo(() => {
    if (!rateLimitUntil) return false;
    return Date.now() < rateLimitUntil;
  }, [rateLimitUntil]);

  const rateLimitSecondsLeft = useMemo(() => {
    if (!rateLimitUntil) return 0;
    return Math.max(0, Math.ceil((rateLimitUntil - Date.now()) / 1000));
  }, [rateLimitUntil]);

  const suggestedQuestions = useMemo(
    () => [
      "Summarize this lecture",
      "Key concepts?",
      "Explain simply",
      "Quiz me",
    ],
    []
  );

  const updateIsAtBottom = useCallback(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const thresholdPx = 48;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    isAtBottomRef.current = distanceFromBottom <= thresholdPx;
  }, []);

  const scrollToBottom = useCallback((behavior = "auto") => {
    const el = messagesContainerRef.current;
    if (!el) return;
    // Only scroll the messages container, not the entire page
    el.scrollTo({ top: el.scrollHeight, behavior });
  }, []);

  // Only auto-scroll if the user is already near the bottom.
  useEffect(() => {
    if (isAtBottomRef.current) {
      scrollToBottom("auto");
    }
  }, [messages, scrollToBottom]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Reset on lecture change
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: `Hi! I'm your AI assistant for "${lectureTitle}". Ask me anything about the video content!`,
      },
    ]);
    setInput("");
    setHasTranscription(null);
    setError(null);
  }, [lectureTitle]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort?.();
    };
  }, []);

  const sendQuestion = useCallback(
    async (text) => {
      const userMessage = text.trim();
      if (!userMessage || isLoading || isRateLimited) return;

      // User just sent a message; keep the view pinned to the bottom.
      isAtBottomRef.current = true;

      if (!backendUrl) {
        setError("Backend URL is not configured.");
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Chatbot backend is not configured. Please set VITE_BACKEND_URL.",
          },
        ]);
        return;
      }

      setInput("");
      setError(null);
      setRateLimitUntil(null);
      setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
      setIsLoading(true);

      try {
        abortRef.current?.abort?.();
        const controller = new AbortController();
        abortRef.current = controller;

        const conversationHistory = (messagesRef.current || []).slice(-8);
        const { data } = await axios.post(
          `${backendUrl}/api/chatbot/ask`,
          {
            courseId,
            lectureId,
            question: userMessage,
            conversationHistory,
          },
          { signal: controller.signal }
        );

        if (data.success) {
          setHasTranscription(data.hasTranscription ?? null);
          // Prefer structured response if available (markdown or parts)
          const answer =
            data.answerMarkdown || data.answer || String(data.answer || "");
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: answer },
          ]);
        } else {
          throw new Error(data.message || "Unable to process your question.");
        }
      } catch (err) {
        if (err?.name === "CanceledError" || err?.code === "ERR_CANCELED") {
          return;
        }
        console.error("Chatbot error:", err);
        const status = err?.response?.status;
        const retryAfterSeconds =
          err?.response?.data?.retryAfterSeconds ||
          (() => {
            const header = err?.response?.headers?.["retry-after"];
            const parsed = Number(header);
            return Number.isFinite(parsed) ? parsed : null;
          })();

        if (status === 429) {
          const seconds =
            typeof retryAfterSeconds === "number" && retryAfterSeconds > 0
              ? retryAfterSeconds
              : 60;
          setRateLimitUntil(Date.now() + seconds * 1000);
          setError(`AI is rate-limited. Try again in ${seconds}s.`);
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: `I'm getting rate-limited right now. Please try again in **${seconds}s**.`,
            },
          ]);
          return;
        }

        const apiMessage = err?.response?.data?.message || err.message;
        setError(apiMessage || "Network error. Please try again.");
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I couldn't process that. Please try again.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [backendUrl, courseId, lectureId, isLoading, isRateLimited]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      sendQuestion(input);
    },
    [input, sendQuestion]
  );

  const handleReset = useCallback(() => {
    setMessages([initialMessage]);
    setError(null);
    setHasTranscription(null);
    setRateLimitUntil(null);
  }, [initialMessage]);

  return (
    <div className="h-full w-full bg-white shadow-lg flex flex-col rounded-xl border border-gray-200 overflow-hidden">
      {/* Compact Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-white">AI Assistant</h3>
            <p className="text-[10px] text-white/70 truncate max-w-[180px]">
              {lectureTitle}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleReset}
            className="text-[10px] font-medium px-2 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close"
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Status indicator */}
      <div className="px-3 py-1.5 flex items-center gap-2 text-[10px] bg-gray-50 border-b border-gray-100">
        <span
          className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${
            hasTranscription
              ? "bg-green-50 text-green-700"
              : hasTranscription === false
              ? "bg-amber-50 text-amber-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              hasTranscription
                ? "bg-green-500"
                : hasTranscription === false
                ? "bg-amber-500"
                : "bg-gray-400"
            }`}
          />
          {hasTranscription === null
            ? "Ready"
            : hasTranscription
            ? "Transcript"
            : "Context"}
        </span>
        <span className="text-gray-400">•</span>
        <span className="text-gray-500">Gemini AI</span>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        onScroll={updateIsAtBottom}
        onWheel={updateIsAtBottom}
        onTouchMove={updateIsAtBottom}
        className="flex-1 overflow-y-auto p-3 space-y-3 bg-gradient-to-b from-gray-50/50 to-white"
      >
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      <div className="px-3 py-2 bg-gray-50/80 border-t border-gray-100">
        <div className="flex flex-wrap gap-1.5">
          {suggestedQuestions.map((question, index) => (
            <SuggestionButton
              key={index}
              text={question}
              onClick={() => sendQuestion(question)}
              disabled={isLoading}
            />
          ))}
          <SuggestionButton
            text="Practice Quiz"
            onClick={() =>
              sendQuestion("Create 5 practice questions with answers")
            }
            disabled={isLoading}
            variant="primary"
          />
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-3 bg-white border-t border-gray-200"
      >
        {error && (
          <div className="mb-2 text-[10px] text-red-600 bg-red-50 px-2 py-1.5 rounded-lg">
            {error}
          </div>
        )}
        {isRateLimited && (
          <div className="mb-2 text-[10px] text-amber-700 bg-amber-50 px-2 py-1.5 rounded-lg">
            Rate limited — you can try again in {rateLimitSecondsLeft}s.
          </div>
        )}
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about this video..."
            className="flex-1 px-3 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            disabled={isLoading || isRateLimited}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading || isRateLimited}
            className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
            aria-label="Send"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default VideoChatbot;

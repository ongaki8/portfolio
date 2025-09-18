// app/components/desktop/DesktopAIAssistant.tsx
"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import {
  Send,
  User,
  Bot,
  Loader2,
  AlertCircle,
  Code,
  Globe,
  TrendingUp,
  Award,
  GraduationCap,
  ShoppingCart,
  LayoutTemplate,
  MessageCircle,
  LucideProps,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { motion } from "framer-motion";
import SkillBadge from "./ai/SkillBadge";
import ProjectCard from "./ai/ProjectCard";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "error";
  timestamp: Date;
}

// Reusable type for Lucide icons
type LucideIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

// Enhanced response cache with semantic grouping
interface CachedResponse {
  response: string;
  timestamp: Date;
  questionType: string;
  variations: string[];
}

const responseCache = new Map<string, CachedResponse>();

// Question type categorization
const categorizeQuestion = (question: string): string => {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes("wordpress") || lowerQuestion.includes("cms")) {
    return "wordpress";
  } else if (lowerQuestion.includes("python") || lowerQuestion.includes("data")) {
    return "python";
  } else if (lowerQuestion.includes("javascript") || lowerQuestion.includes("react")) {
    return "javascript";
  } else if (lowerQuestion.includes("project") || lowerQuestion.includes("portfolio")) {
    return "projects";
  } else if (lowerQuestion.includes("skill") || lowerQuestion.includes("expertise")) {
    return "skills";
  } else if (lowerQuestion.includes("experience") || lowerQuestion.includes("work")) {
    return "experience";
  } else if (lowerQuestion.includes("education") || lowerQuestion.includes("degree")) {
    return "education";
  } else {
    return "general";
  }
};

// Check if questions are similar based on type and keywords
const isSimilarQuestion = (newQuestion: string, cachedQuestion: string): boolean => {
  const newType = categorizeQuestion(newQuestion);
  const cachedType = categorizeQuestion(cachedQuestion);
  
  // If different categories, they're not similar
  if (newType !== cachedType) return false;
  
  // For same category, check if they're asking essentially the same thing
  const newWords = newQuestion.toLowerCase().split(/\s+/);
  const cachedWords = cachedQuestion.toLowerCase().split(/\s+/);
  
  const commonWords = newWords.filter(word => 
    cachedWords.includes(word) && word.length > 3
  );
  
  // If they share several meaningful words, consider them similar
  return commonWords.length >= 2;
};

export default function DesktopAIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationContext = useRef<string[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  // Add context tracking
  useEffect(() => {
    // Keep track of recently discussed topics to avoid repetition
    const recentTopics = messages
      .filter(msg => msg.role === "assistant")
      .slice(-5) // Last 5 assistant messages
      .map(msg => categorizeQuestion(msg.content));
    
    conversationContext.current = Array.from(new Set(recentTopics)); // Remove duplicates
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Check cache for similar questions (not just exact matches)
    let cachedResponse: string | null = null;
    let cachedKey: string | null = null;
    
    for (const [key, value] of responseCache.entries()) {
      if (isSimilarQuestion(input.trim(), key)) {
        cachedResponse = value.response;
        cachedKey = key;
        break;
      }
    }

    if (cachedResponse && cachedKey) {
      setTimeout(() => {
        // Add variation to avoid sounding repetitive
        let variedResponse = cachedResponse as string;
        
        // If this topic was recently discussed, add a note about it
        const questionType = categorizeQuestion(input.trim());
        if (conversationContext.current.includes(questionType)) {
          variedResponse = variedResponse.replace(
            /(Hello|Hi|Hey)/i, 
            "$1 again! As I mentioned earlier,"
          );
          
          if (!variedResponse.includes("As I mentioned earlier")) {
            variedResponse = "As I mentioned before, " + variedResponse;
          }
        }

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: variedResponse,
          role: "assistant",
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
        
        // Update cache with this variation
        if (cachedKey) {
          const existingCache = responseCache.get(cachedKey);
          if (existingCache) {
            responseCache.set(cachedKey, {
              ...existingCache,
              variations: [...existingCache.variations, input.trim()]
            });
          }
        }
      }, 500);
      return;
    }

    try {
      // Add context to the API request to help avoid repetition
      const requestBody = {
        message: input.trim(),
        context: conversationContext.current
      };

      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: "assistant",
        timestamp: new Date(),
      };

      // Cache the response with metadata
      responseCache.set(input.trim().toLowerCase(), {
        response: data.response,
        timestamp: new Date(),
        questionType: categorizeQuestion(input.trim()),
        variations: [input.trim()]
      });

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Sorry, I encountered an error. Please check if the API key is configured properly.",
        role: "error",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Utility: section renderer (reduces repetition)
  const renderSectionBlock = (
    lines: string[],
    title: string,
    color: string,
    Icon: LucideIcon,
    key: string
  ) => (
    <div key={key} className={`p-3 rounded-lg ${color}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon size={16} className="text-current" />
        <strong className="capitalize">{title}</strong>
      </div>
      <ul className="mt-2 space-y-1">
        {lines
          .filter((l) => l.startsWith("•"))
          .map((item, idx) => (
            <li
              key={`${key}-item-${idx}`}
              className="text-sm text-gray-700 dark:text-gray-300"
            >
              {item.replace("•", "-").trim()}
            </li>
          ))}
      </ul>
    </div>
  );

  const renderMessageContent = (content: string, role: string) => {
    const hasSkillData =
      (content.includes("Skill") ||
        content.includes("expertise") ||
        content.includes("proficiency")) &&
      (content.includes("WordPress") ||
        content.includes("Python") ||
        content.includes("JavaScript"));

    const hasProjectData =
      (content.includes("Project") || content.includes("portfolio")) &&
      (content.includes("E-commerce") ||
        content.includes("Website") ||
        content.includes("Application"));

    if (hasSkillData) {
      return (
        <div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <SkillBadge name="WordPress" level={95} />
            <SkillBadge name="PHP" level={90} />
            <SkillBadge name="Python" level={85} />
            <SkillBadge name="JavaScript" level={88} />
            <SkillBadge name="React" level={82} />
            <SkillBadge name="CSS/HTML" level={93} />
          </div>
          {renderFormattedText(content)}
        </div>
      );
    }

    if (hasProjectData) {
      return (
        <div>
          <div className="space-y-3 mb-4">
            <ProjectCard
              title="E-commerce Website"
              description="A full-featured online store with payment processing and inventory management"
              tech={["WordPress", "WooCommerce", "PHP", "JavaScript"]}
            />
            <ProjectCard
              title="Data Automation Tool"
              description="Python-based automation system for processing large datasets"
              tech={["Python", "Pandas", "SQL", "Automation"]}
            />
          </div>
          {renderFormattedText(content)}
        </div>
      );
    }

    return renderFormattedText(content);
  };

  const renderFormattedText = (content: string) => {
  const sections = content.split(/\n-{3,}\n/).filter((s) => s.trim());

  return (
    <div className="space-y-4">
      {sections.map((section, sectionIndex) => {
        const lines = section.split("\n").filter((line) => line.trim());
        const firstLine = lines[0] || "";
        const isHeader = firstLine.match(/[🌐🐍🚀💼🎓🏆💡💬🔗✨]+\s+.+/);

        return (
          <div key={`section-${sectionIndex}`} className="space-y-3">
            {isHeader && (
              <div className="flex items-center gap-2">
                <div className="text-lg">
                  {firstLine.match(/[🌐🐍🚀💼🎓🏆💡💬🔗✨]+/)?.[0]}
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-white">
                  {firstLine.replace(/[🌐🐍🚀💼🎓🏆💡💬🔗✨]+\s+/, "")}
                </h4>
              </div>
            )}

            <div className="space-y-2">
              {lines.slice(isHeader ? 1 : 0).map((line, lineIndex) => {
                // HIDE the original bullet points from main content
                if (line.startsWith("•")) return null;

                if (line.startsWith("**✨ Highlights:**"))
                  return renderSectionBlock(
                    lines.slice(lineIndex + 1),
                    "Highlights",
                    "bg-blue-50 dark:bg-blue-900/20",
                    Award,
                    `highlights-${sectionIndex}-${lineIndex}`
                  );

                if (line.startsWith("💬 Follow-Up Questions"))
                  return renderSectionBlock(
                    lines.slice(lineIndex + 1),
                    "Follow-up Questions",
                    "bg-purple-50 dark:bg-purple-900/20",
                    MessageCircle,
                    `questions-${sectionIndex}-${lineIndex}`
                  );

                if (line.startsWith("🔗 Quick Access"))
                  return renderSectionBlock(
                    lines.slice(lineIndex + 1),
                    "Quick Access",
                    "bg-green-50 dark:bg-green-900/20",
                    Globe,
                    `access-${sectionIndex}-${lineIndex}`
                  );

                const parts = line.split(/(\*\*.*?\*\*|_.*?_|`.*?`)/g);
                return (
                  <p
                    key={`line-${sectionIndex}-${lineIndex}`}
                    className="text-sm text-gray-700 dark:text-gray-300"
                  >
                    {parts.map((part, idx) => {
                      if (part.startsWith("**") && part.endsWith("**"))
                        return (
                          <strong
                            key={`strong-${sectionIndex}-${lineIndex}-${idx}`}
                            className="text-blue-600 dark:text-blue-400"
                          >
                            {part.slice(2, -2)}
                          </strong>
                        );
                      if (part.startsWith("_") && part.endsWith("_"))
                        return (
                          <em
                            key={`em-${sectionIndex}-${lineIndex}-${idx}`}
                            className="text-gray-600 dark:text-gray-400"
                          >
                            {part.slice(1, -1)}
                          </em>
                        );
                      if (part.startsWith("`") && part.endsWith("`"))
                        return (
                          <code
                            key={`code-${sectionIndex}-${lineIndex}-${idx}`}
                            className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-xs"
                          >
                            {part.slice(1, -1)}
                          </code>
                        );
                      return <span key={`span-${sectionIndex}-${lineIndex}-${idx}`}>{part}</span>;
                    })}
                  </p>
                );
              })}
            </div>

            {sectionIndex < sections.length - 1 && (
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

  const getIconForMessage = (content: string) => {
    if (content.includes("WordPress") || content.includes("CMS"))
      return <LayoutTemplate size={16} />;
    if (content.includes("Python") || content.includes("Data"))
      return <Code size={16} />;
    if (content.includes("project") || content.includes("portfolio"))
      return <Globe size={16} />;
    if (content.includes("experience") || content.includes("work"))
      return <TrendingUp size={16} />;
    if (content.includes("education") || content.includes("degree"))
      return <GraduationCap size={16} />;
    if (content.includes("certificate") || content.includes("award"))
      return <Award size={16} />;
    if (content.includes("ecommerce") || content.includes("shop"))
      return <ShoppingCart size={16} />;
    return <Bot size={16} />;
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900 rounded-b-lg overflow-hidden relative">
      {/* Glassy Blurred Header */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-white/70 dark:bg-transparent border-b border-gray-200/50 dark:border-gray-700/50 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-b from-blue-900 to-purple-900 rounded-full">
            <MessageCircle className="text-white" size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800 dark:text-white">
              NIARU
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Ask me about Brian
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pt-0 -mt-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-14">
            <div className="bg-gradient-to-b from-blue-900 to-purple-900 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Bot className="text-white" size={32} />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Hello! I&apos;m Brian&apos;s AI Assistant
            </h3>
            <p className="text-sm mb-6">
              Ask me about his skills, projects, or experience
            </p>

            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              <button
                onClick={() =>
                  setInput("What's Brian's experience with WordPress?")
                }
                className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm hover:border-blue-500 transition-colors"
              >
                <LayoutTemplate size={16} className="mx-auto mb-1" />
                WordPress Skills
              </button>
              <button
                onClick={() => setInput("Tell me about Brian's projects")}
                className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm hover:border-blue-500 transition-colors"
              >
                <Globe size={16} className="mx-auto mb-1" />
                Projects
              </button>
              <button
                onClick={() =>
                  setInput("What programming languages does Brian know?")
                }
                className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm hover:border-blue-500 transition-colors"
              >
                <Code size={16} className="mx-auto mb-1" />
                Tech Stack
              </button>
              <button
                onClick={() => setInput("What's Brian's educational background?")}
                className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm hover:border-blue-500 transition-colors"
              >
                <GraduationCap size={16} className="mx-auto mb-1" />
                Education
              </button>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex max-w-xs lg:max-w-md items-start space-x-3 ${
                  message.role === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      : message.role === "error"
                      ? "bg-red-500 text-white"
                      : "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
                  }`}
                >
                  {message.role === "user" ? (
                    <User size={16} />
                  ) : message.role === "error" ? (
                    <AlertCircle size={16} />
                  ) : (
                    getIconForMessage(message.content)
                  )}
                </div>
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none"
                      : message.role === "error"
                      ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-bl-none border border-red-200 dark:border-red-700"
                      : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">
                    {renderMessageContent(message.content, message.role)}
                  </div>
                  <div
                    className={`text-xs mt-2 ${
                      message.role === "user"
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-gray-500 to-gray-600 flex-shrink-0">
                <Bot size={16} className="text-white" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white dark:bg-gray-800 rounded-bl-none border border-gray-200 dark:border-gray-700">
                <Loader2 size={16} className="animate-spin" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
      >
        <div className="flex space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about skills, projects, or experience..."
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import AppShell from "@/components/app-shell";
import ChatBubble from "@/components/chat-bubble";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Send, ChevronDown } from "lucide-react";
import { sendChatMessage } from "@/lib/api";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FAQ_ITEMS } from "@/lib/faq";

const SUGGESTED_PROMPTS = [
    "What does moderate risk mean?",
    "How can I lower my risk?",
    "Why is family history important?",
];

interface Message {
    role: "user" | "assistant";
    text: string;
}

export default function AssistantPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            text: "Hi! I can help explain your screening results. What would you like to know?",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [useContext, setUseContext] = useState(true);
    const bottomRef = useRef<HTMLDivElement>(null);

    const isConversationEmpty = messages.length <= 1;

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const submitMessage = async (text: string) => {
        if (!text.trim() || loading) return;
        setMessages((prev) => [...prev, { role: "user", text: text }]);
        setInput("");
        setLoading(true);

        try {
            const stored = sessionStorage.getItem("gs_result");
            const context = useContext && stored ? JSON.parse(stored) : undefined;
            const reply = await sendChatMessage(text, context);
            setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
        } catch (err) {
            console.error("Chat error:", err);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", text: "Sorry, I'm having trouble responding right now. Please try again." },
            ]);
        }
        setLoading(false);
    };

    const handleSend = () => submitMessage(input);

    const handleClearChat = () => {
        setMessages([{ role: "assistant", text: "Hi! I can help explain your screening results. What would you like to know?" }]);
        toast.success("Chat cleared");
    };

    const handleFaqClick = (question: string) => {
        submitMessage(question);
    };

    return (
        <AppShell>
            <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold font-heading">AI Health Assistant</h1>
                    <Button variant="ghost" size="sm" onClick={handleClearChat}>Clear Chat</Button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
                    {messages.map((msg, i) => (
                        <ChatBubble key={i} role={msg.role} text={msg.text} />
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-card border rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" />
                            </div>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>

                <div className="flex items-center justify-between mb-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger className={buttonVariants({ variant: "outline", size: "sm", className: "rounded-full bg-card cursor-pointer text-xs h-7 px-3" })}>
                            FAQ <ChevronDown className="ml-1 h-3 w-3" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" side="top" className="w-[300px] mb-1">
                            {[...SUGGESTED_PROMPTS.map(q => ({ question: q })), ...FAQ_ITEMS].map((item) => (
                                <DropdownMenuItem
                                    key={item.question}
                                    onClick={() => handleFaqClick(item.question)}
                                    className="cursor-pointer text-xs py-2"
                                >
                                    {item.question}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="flex items-center gap-2">
                        <Switch id="useContext" checked={useContext} onCheckedChange={setUseContext} />
                        <Label htmlFor="useContext" className="text-xs text-muted-foreground cursor-pointer">
                            Reference my last screening result
                        </Label>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Input
                        placeholder="Ask about your screening result..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        disabled={loading}
                    />
                    <Button onClick={handleSend} disabled={loading || !input.trim()}>
                        <Send size={16} />
                    </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-3">
                    This assistant explains your screening — it does not diagnose or prescribe treatment.
                </p>
            </div>
        </AppShell>
    );
}
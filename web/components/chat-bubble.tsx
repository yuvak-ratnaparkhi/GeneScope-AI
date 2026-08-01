export default function ChatBubble({ role, text }: { role: "user" | "assistant"; text: string }) {
    const isUser = role === "user";
    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${isUser
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-card border rounded-bl-sm"
                    }`}
            >
                {text}
            </div>
        </div>
    );
}
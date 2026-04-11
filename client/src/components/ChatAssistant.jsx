import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";

export default function ChatAssistant({ documentContext, selectedLanguage }) {
    const [messages, setMessages] = useState([
        { role: "ai", text: `Namaste! I have analyzed your document. How can I help you in ${selectedLanguage} today?` }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    // Auto-scroll to bottom when new message arrives
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMsg = input;
        setInput("");
        setMessages(prev => [...prev, { role: "user", text: userMsg }]);
        setIsTyping(true);

        try {
            const response = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    message: userMsg,
                    context: documentContext, // Passing the PDF text so AI knows what we are talking about
                    language: selectedLanguage
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Chat failed");

            setMessages(prev => [...prev, { role: "ai", text: data.reply }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: "ai", text: "Maafi chahta hoon, error occurred: " + error.message }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-black/40 relative">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`flex gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'ai' ? 'bg-purple-600' : 'bg-blue-600'}`}>
                                {msg.role === 'ai' ? <Bot size={14} /> : <User size={14} />}
                            </div>
                            <div className={`p-3 rounded-2xl text-sm ${msg.role === "user" ? "bg-blue-600 text-white" : "bg-white/10 text-gray-200"}`}>
                                {msg.text}
                            </div>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white/5 p-3 rounded-2xl flex gap-1">
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                        </div>
                    </div>
                )}
                <div ref={scrollRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-black/40 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything about the document..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-500 transition-all text-white"
                />
                <button 
                    disabled={isTyping}
                    className="p-2 bg-purple-600 hover:bg-purple-500 rounded-xl transition-all disabled:opacity-50"
                >
                    <Send size={18} className="text-white" />
                </button>
            </form>
        </div>
    );
}
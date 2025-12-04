import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Bot, User, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Message {
    id: string;
    role: 'user' | 'ai';
    content: string;
    results?: any[];
}

// Mock data for the AI to "find"
const MOCK_SERVICES = [
    {
        id: 1,
        name: "John Doe",
        role: "Plumber",
        rating: 4.8,
        price: "$50/hr",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80",
        tags: ["Plumbing", "Repairs"]
    },
    {
        id: 2,
        name: "Sarah Smith",
        role: "Electrician",
        rating: 4.9,
        price: "$65/hr",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80",
        tags: ["Electrical", "Wiring"]
    },
    {
        id: 4,
        name: "Emily Davis",
        role: "Cleaner",
        rating: 4.6,
        price: "$30/hr",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80",
        tags: ["Cleaning", "Home"]
    }
];

interface AIChatWindowProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AIChatWindow({ isOpen, onClose }: AIChatWindowProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'ai',
            content: "Hi! I'm your personal assistant. I can help you find services or professionals. Try asking 'I need a plumber' or 'Find a cleaner'."
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulate AI processing
        setTimeout(() => {
            const lowerInput = userMessage.content.toLowerCase();
            let results: any[] = [];
            let responseContent = "I couldn't find any specific services matching that. Could you try being more specific? (e.g., 'plumber', 'electrician')";

            if (lowerInput.includes('plumber') || lowerInput.includes('leak') || lowerInput.includes('water')) {
                results = MOCK_SERVICES.filter(s => s.role === 'Plumber');
                responseContent = "I found some plumbers who can help with that.";
            } else if (lowerInput.includes('electric') || lowerInput.includes('wire') || lowerInput.includes('power')) {
                results = MOCK_SERVICES.filter(s => s.role === 'Electrician');
                responseContent = "Here are some top-rated electricians.";
            } else if (lowerInput.includes('clean') || lowerInput.includes('maid') || lowerInput.includes('tidy')) {
                results = MOCK_SERVICES.filter(s => s.role === 'Cleaner');
                responseContent = "I've found these cleaning professionals for you.";
            }

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                content: responseContent,
                results: results.length > 0 ? results : undefined
            };

            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="fixed bottom-4 right-4 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] flex flex-col panel-glass rounded-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/10 to-purple-500/10">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/30 flex items-center justify-center ring-2 ring-primary/50">
                                <Sparkles className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm text-foreground">AI Assistant</h3>
                                <p className="text-[10px] text-muted-foreground">Powered by TaskFlow AI</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-secondary text-foreground" onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent bg-background/50">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={cn(
                                    "flex gap-3 max-w-[85%]",
                                    msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                                )}
                            >
                                <div className={cn(
                                    "h-8 w-8 rounded-full flex items-center justify-center shrink-0 ring-2",
                                    msg.role === 'ai' ? "bg-primary/30 text-primary ring-primary/50" : "bg-purple-600 text-primary-foreground ring-purple-400/50"
                                )}>
                                    {msg.role === 'ai' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className={cn(
                                        "p-3 rounded-2xl text-sm font-medium",
                                        msg.role === 'user'
                                            ? "bg-gradient-to-br from-primary to-purple-600 text-primary-foreground rounded-tr-sm shadow-lg"
                                            : "bg-secondary/80 backdrop-blur-sm border border-border rounded-tl-sm text-foreground shadow-md"
                                    )}>
                                        {msg.content}
                                    </div>
                                    {msg.results && (
                                        <div className="flex flex-col gap-2 mt-1">
                                            {msg.results.map((result: any) => (
                                                <div key={result.id} className="flex items-center gap-3 p-2 rounded-xl bg-secondary/60 border border-border hover:bg-secondary hover:border-primary/40 transition-all cursor-pointer group shadow-md">
                                                    <img src={result.image} alt={result.name} className="h-10 w-10 rounded-lg object-cover ring-2 ring-border" />
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-sm font-semibold truncate text-foreground">{result.name}</h4>
                                                        <p className="text-xs text-muted-foreground">{result.role} • {result.rating}★</p>
                                                    </div>
                                                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex gap-3">
                                <div className="h-8 w-8 rounded-full bg-primary/30 flex items-center justify-center shrink-0 ring-2 ring-primary/50">
                                    <Bot className="h-4 w-4 text-primary" />
                                </div>
                                <div className="bg-secondary/80 backdrop-blur-sm border border-border rounded-2xl rounded-tl-sm p-4 flex items-center gap-1 shadow-md">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-border bg-gradient-to-r from-card to-secondary">
                        <div className="relative flex items-center gap-2">
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask for a service..."
                                className="pr-12 bg-background border-border focus-visible:ring-primary/40 text-foreground placeholder:text-muted-foreground"
                            />
                            <Button
                                size="icon"
                                className="absolute right-1 h-8 w-8 rounded-lg bg-primary hover:bg-primary/90"
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim() || isTyping}
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

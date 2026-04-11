import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { Upload, Languages, Lightbulb, Sparkles, Network, X } from "lucide-react";
import { useState } from "react";

export default function HomePage() {
    const navigate = useNavigate();
    const [showDemo, setShowDemo] = useState(false);
    
    const features = [
        { icon: <Upload className="w-8 h-8" />, title: "PDF Upload", desc: "Upload any PDF document for processing" },
        { icon: <Languages className="w-8 h-8" />, title: "Multi-Language", desc: "Translate to 8+ Indian languages" },
        { icon: <Lightbulb className="w-8 h-8" />, title: "AI Summary", desc: "Get intelligent insights from your document" },
        { icon: <Sparkles className="w-8 h-8" />, title: "VishwaVani AI Chatbot", desc: "AI-powered analysis in seconds" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-16">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-secondary via-primary to-accent p-[2px]">
                            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                                <Network className="w-10 h-10 text-secondary" />
                            </div>
                        </div>
                    </div>
                    
                    <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">
                        Vishwa<span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Vani</span>
                    </h1>
                    
                    <p className="text-xl text-purple-200 mb-4">AI Document Intelligence</p>
                    
                    <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                        Upload any PDF, translate to Indian languages, and get AI-powered summaries in seconds, VishwaVani AI Chatbot For Any Doubts,
                    </p>
                    
                    {/* BUTTONS - Dono buttons yahan */}
                    <div className="flex gap-4 justify-center flex-wrap">
                        {/* Get Started Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/dashboard')}
                            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
                        >
                            🚀 Get Started
                        </motion.button>
                        
                        {/* View Demo Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowDemo(true)}
                            className="px-8 py-4 bg-white/10 backdrop-blur-lg rounded-full text-white font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all"
                        >
                            ▶️ View Demo
                        </motion.button>
                    </div>
                </motion.div> 
                

                {/* Features Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
                >
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + idx * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 hover:border-white/40 transition-all"
                        >
                            <div className="text-secondary mb-4 flex justify-center">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-300">{feature.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* How It Works */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 text-center"
                >
                    <h2 className="text-3xl font-bold text-white mb-8">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: "1", title: "Upload PDF", desc: "Upload any PDF document" },
                            { step: "2", title: "Translate", desc: "Choose your preferred language" },
                            { step: "3", title: "Get Summary", desc: "AI generates insights" }
                        ].map((item, idx) => (
                            <div key={idx} className="relative">
                                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-gray-300">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <footer className="mt-20 pt-8 border-t border-white/10 text-center text-gray-400">
                    <p>Made for Hackathon</p>
                </footer>
            </div>

            {/* ========== DEMO VIDEO MODAL (Popup Container) ========== */}
            <AnimatePresence>
                {showDemo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setShowDemo(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 50 }}
                            className="relative max-w-4xl w-full bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl overflow-hidden shadow-2xl border border-white/20"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                        <span className="text-white text-sm">▶️</span>
                                    </div>
                                    <h3 className="text-white font-bold">Vishwa Vani - Demo Video</h3>
                                </div>
                                <button
                                    onClick={() => setShowDemo(false)}
                                    className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            
                            {/* Video Player */}
                            <div className="aspect-video bg-black">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/embed/bP8ATWCvqzw?autoplay=1"
                                    title="Vishwa Vani Demo"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                            
                            {/* Footer */}
                            <div className="p-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10">
                                <p className="text-white/80 text-sm">
                                    📌 See how Vishwa Vani transforms your documents with AI-powered translation and summarization
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}

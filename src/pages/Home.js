import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { PostCard } from '../components/PostCard';
import { supabase } from '../lib/supabase';
import { Heart, Users, BookOpen, Award } from 'lucide-react';
export function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetchPosts();
    }, []);
    const fetchPosts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('status', 'published')
                .order('published_at', { ascending: false });
            if (error)
                throw error;
            setPosts(data || []);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
        finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600", children: "Loading medical articles..." })] }) }));
    }
    if (error) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsxs("p", { className: "text-red-600 mb-4", children: ["Error loading posts: ", error] }), _jsx("button", { onClick: fetchPosts, className: "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors", children: "Try Again" })] }) }));
    }
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx("div", { className: "bg-gradient-to-r from-blue-600 to-blue-800 text-white", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: _jsxs("div", { className: "text-center", children: [_jsxs("h1", { className: "text-4xl font-bold sm:text-5xl md:text-6xl mb-6", children: ["Welcome to ", _jsx("span", { className: "text-blue-200", children: "MediBlog" })] }), _jsx("p", { className: "text-xl max-w-3xl mx-auto mb-8 text-blue-100", children: "Your trusted source for medical knowledge, health insights, and professional healthcare content. Stay informed with the latest medical research and expert opinions." }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8 mt-12", children: [_jsxs("div", { className: "text-center", children: [_jsx(Heart, { className: "h-8 w-8 mx-auto mb-2 text-blue-200" }), _jsxs("div", { className: "text-2xl font-bold", children: [posts.length, "+"] }), _jsx("div", { className: "text-blue-200", children: "Published Articles" })] }), _jsxs("div", { className: "text-center", children: [_jsx(Users, { className: "h-8 w-8 mx-auto mb-2 text-blue-200" }), _jsx("div", { className: "text-2xl font-bold", children: "50+" }), _jsx("div", { className: "text-blue-200", children: "Medical Writers" })] }), _jsxs("div", { className: "text-center", children: [_jsx(BookOpen, { className: "h-8 w-8 mx-auto mb-2 text-blue-200" }), _jsx("div", { className: "text-2xl font-bold", children: "20+" }), _jsx("div", { className: "text-blue-200", children: "Specialties" })] }), _jsxs("div", { className: "text-center", children: [_jsx(Award, { className: "h-8 w-8 mx-auto mb-2 text-blue-200" }), _jsx("div", { className: "text-2xl font-bold", children: "100%" }), _jsx("div", { className: "text-blue-200", children: "Peer Reviewed" })] })] })] }) }) }), _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: posts.length === 0 ? (_jsxs("div", { className: "text-center py-16", children: [_jsx(BookOpen, { className: "h-16 w-16 text-gray-400 mx-auto mb-4" }), _jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-4", children: "No published articles yet" }), _jsx("p", { className: "text-gray-600 mb-8", children: "Medical articles are being reviewed and will be published soon!" })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Latest Published Articles" }), _jsx("p", { className: "text-gray-600 max-w-2xl mx-auto", children: "Discover peer-reviewed medical insights from healthcare professionals and stay updated with current medical knowledge." })] }), _jsx("div", { className: "grid gap-8 md:grid-cols-2 lg:grid-cols-3", children: posts.map((post) => (_jsx(PostCard, { post: post }, post.id))) })] })) })] }));
}

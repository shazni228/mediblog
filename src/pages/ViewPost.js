import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { supabase } from '../lib/supabase';
export function ViewPost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!id)
            return;
        const fetchPost = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('id', id)
                    .single();
                if (error)
                    throw error;
                setPost(data);
            }
            catch (err) {
                setError(err instanceof Error ? err.message : 'Post not found');
            }
            finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);
    if (loading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600", children: "Loading article..." })] }) }));
    }
    if (error || !post) {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    return (_jsx("div", { className: "min-h-screen py-12", children: _jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(Link, { to: "/", className: "inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors", children: [_jsx(ArrowLeft, { size: 20, className: "mr-2" }), "Back to Articles"] }), _jsxs("article", { className: "bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100", children: [post.featured_image && (_jsx("div", { className: "aspect-video overflow-hidden", children: _jsx("img", { src: post.featured_image, alt: post.title, className: "w-full h-full object-cover", onError: (e) => {
                                    // Hide image if it fails to load
                                    e.currentTarget.style.display = 'none';
                                } }) })), _jsxs("div", { className: "p-8", children: [_jsxs("header", { className: "mb-8", children: [_jsx("div", { className: "flex flex-wrap items-center gap-4 mb-4", children: _jsxs("time", { className: "flex items-center text-sm text-gray-500", children: [_jsx(Calendar, { size: 14, className: "mr-1" }), format(new Date(post.created_at), 'MMMM dd, yyyy')] }) }), _jsx("h1", { className: "text-4xl font-bold text-gray-900 mb-4 leading-tight", children: post.title }), post.excerpt && (_jsx("p", { className: "text-xl text-gray-600 mb-6 leading-relaxed", children: post.excerpt }))] }), _jsx("div", { className: "prose prose-lg max-w-none", children: _jsx(ReactMarkdown, { className: "text-gray-700 leading-relaxed", components: {
                                            h1: ({ children }) => _jsx("h1", { className: "text-2xl font-bold text-gray-900 mt-8 mb-4", children: children }),
                                            h2: ({ children }) => _jsx("h2", { className: "text-xl font-bold text-gray-900 mt-6 mb-3", children: children }),
                                            h3: ({ children }) => _jsx("h3", { className: "text-lg font-semibold text-gray-900 mt-4 mb-2", children: children }),
                                            p: ({ children }) => _jsx("p", { className: "mb-4 text-gray-700 leading-relaxed", children: children }),
                                            ul: ({ children }) => _jsx("ul", { className: "list-disc list-inside mb-4 space-y-2", children: children }),
                                            ol: ({ children }) => _jsx("ol", { className: "list-decimal list-inside mb-4 space-y-2", children: children }),
                                            li: ({ children }) => _jsx("li", { className: "text-gray-700", children: children }),
                                            blockquote: ({ children }) => (_jsx("blockquote", { className: "border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4", children: children })),
                                            img: ({ src, alt }) => (_jsx("img", { src: src, alt: alt, className: "w-full h-auto rounded-lg my-6", onError: (e) => {
                                                    e.currentTarget.style.display = 'none';
                                                } })),
                                        }, children: post.content }) })] })] }), _jsx("div", { className: "text-center mt-12", children: _jsxs(Link, { to: "/", className: "inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors", children: [_jsx(ArrowLeft, { size: 20, className: "mr-2" }), "Back to All Articles"] }) })] }) }));
}

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { usePost } from '../hooks/usePosts';
export function PostDetail() {
    const { slug } = useParams();
    const { post, loading, error } = usePost(slug);
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600", children: "Loading post..." })] }) }) }));
    }
    if (error || !post) {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: _jsx("article", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "bg-white rounded-lg shadow-lg overflow-hidden", children: [post.featured_image && (_jsx("div", { className: "aspect-video overflow-hidden", children: _jsx("img", { src: post.featured_image, alt: post.title, className: "w-full h-full object-cover" }) })), _jsxs("div", { className: "p-8", children: [_jsxs("header", { className: "mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-900 mb-4", children: post.title }), _jsxs("div", { className: "flex items-center text-gray-600", children: [_jsxs("time", { dateTime: post.created_at, children: ["Published on ", format(new Date(post.created_at), 'MMMM dd, yyyy')] }), post.updated_at !== post.created_at && (_jsxs("span", { className: "ml-4", children: ["\u2022 Updated ", format(new Date(post.updated_at), 'MMMM dd, yyyy')] }))] })] }), _jsx("div", { className: "prose prose-lg max-w-none", children: _jsx(ReactMarkdown, { children: post.content }) })] })] }) }) }));
}

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
export function PostCard({ post }) {
    const truncateContent = (content, maxLength = 150) => {
        if (content.length <= maxLength)
            return content;
        return content.substring(0, maxLength) + '...';
    };
    return (_jsxs("article", { className: "bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-blue-100", children: [post.featured_image && (_jsx("div", { className: "aspect-video overflow-hidden", children: _jsx("img", { src: post.featured_image, alt: post.title, className: "w-full h-full object-cover hover:scale-105 transition-transform duration-300", onError: (e) => {
                        // Hide image container if image fails to load
                        e.currentTarget.parentElement.style.display = 'none';
                    } }) })), _jsxs("div", { className: "p-6", children: [_jsx("div", { className: "flex items-center justify-between mb-3", children: _jsxs("time", { className: "flex items-center text-sm text-gray-500", children: [_jsx(Calendar, { size: 14, className: "mr-1" }), format(new Date(post.created_at), 'MMM dd, yyyy')] }) }), _jsx("h2", { className: "text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors", children: _jsx(Link, { to: `/post/${post.id}`, children: post.title }) }), post.excerpt && (_jsx("p", { className: "text-gray-600 mb-4 leading-relaxed", children: truncateContent(post.excerpt) })), _jsx("div", { className: "flex items-center justify-between", children: _jsx(Link, { to: `/post/${post.id}`, className: "text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors", children: "Read more \u2192" }) })] })] }));
}

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Save, X } from 'lucide-react';
const medicalCategories = [
    'Cardiology',
    'Pediatrics',
    'Nutrition',
    'Neurology',
    'Orthopedics',
    'Dermatology',
    'Psychiatry',
    'Oncology',
    'Endocrinology',
    'Gastroenterology',
    'Pulmonology',
    'Nephrology',
    'Infectious Disease',
    'Emergency Medicine',
    'General Medicine',
    'Surgery',
    'Radiology',
    'Pathology',
    'Anesthesiology',
    'Obstetrics & Gynecology'
];
export function AddPost() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { register, handleSubmit, formState: { errors }, reset, } = useForm();
    if (!user) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    const onSubmit = async (formData) => {
        try {
            setLoading(true);
            setError(null);
            console.log('Form data:', formData);
            if (!user) {
                throw new Error('You must be logged in to create a post');
            }
            const postData = {
                title: formData.title,
                content: formData.content,
                slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
                excerpt: formData.excerpt || formData.content.substring(0, 200) + '...',
                status: 'draft',
                published: false,
                author_id: user.id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            console.log('Post data being sent:', postData);
            const { data, error } = await supabase
                .from('posts')
                .insert(postData)
                .select();
            console.log('Supabase response:', { data, error });
            if (error) {
                console.error('Supabase error details:', error);
                throw new Error(error.message || 'Failed to save post');
            }
            if (!data) {
                throw new Error('No data returned from server');
            }
            reset();
            navigate('/');
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create post';
            console.error('Error in onSubmit:', err);
            setError(errorMessage);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen py-12", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "bg-white rounded-xl shadow-lg border border-blue-100", children: [_jsxs("div", { className: "px-6 py-4 border-b border-gray-200", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Add New Medical Article" }), _jsx("p", { className: "text-gray-600 mt-2", children: "Share your medical knowledge with the community" })] }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "p-6 space-y-6", children: [error && (_jsx("div", { className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg", children: error })), _jsxs("div", { children: [_jsx("label", { htmlFor: "title", className: "block text-sm font-medium text-gray-700 mb-2", children: "Article Title *" }), _jsx("input", { type: "text", id: "title", ...register('title', { required: 'Title is required' }), className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors", placeholder: "Enter the article title..." }), errors.title && (_jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.title.message }))] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "category", className: "block text-sm font-medium text-gray-700 mb-2", children: "Medical Category" }), _jsxs("select", { id: "category", ...register('category'), className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors", children: [_jsx("option", { value: "", children: "Select a category..." }), medicalCategories.map((category) => (_jsx("option", { value: category, children: category }, category)))] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "author", className: "block text-sm font-medium text-gray-700 mb-2", children: "Author Name" }), _jsx("input", { type: "text", id: "author", ...register('author'), className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors", placeholder: "Dr. John Smith" })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "content", className: "block text-sm font-medium text-gray-700 mb-2", children: "Article Content *" }), _jsx("textarea", { id: "content", rows: 15, ...register('content', { required: 'Content is required' }), className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono text-sm", placeholder: "Write your medical article content here... You can use Markdown formatting." }), errors.content && (_jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.content.message })), _jsx("p", { className: "mt-2 text-sm text-gray-500", children: "Tip: You can use Markdown formatting for better content structure (headings, lists, bold text, etc.)" })] }), _jsxs("div", { className: "flex justify-end space-x-4 pt-6 border-t border-gray-200", children: [_jsxs("button", { type: "button", onClick: () => navigate('/'), className: "flex items-center space-x-2 px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors", children: [_jsx(X, { size: 18 }), _jsx("span", { children: "Cancel" })] }), _jsxs("button", { type: "submit", disabled: loading, className: "flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors", children: [_jsx(Save, { size: 18 }), _jsx("span", { children: loading ? 'Publishing...' : 'Publish Article' })] })] })] })] }) }) }));
}

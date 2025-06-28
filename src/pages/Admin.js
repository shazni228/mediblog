import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import { usePosts } from '../hooks/usePosts';
import { PostForm } from '../components/PostForm';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
export function Admin() {
    const { user } = useAuth();
    const { posts, loading, createPost, updatePost, deletePost } = usePosts('all');
    const [showForm, setShowForm] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    if (!user) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    const handleCreatePost = async (data) => {
        await createPost(data);
        setShowForm(false);
    };
    const handleUpdatePost = async (data) => {
        if (editingPost) {
            await updatePost(editingPost.id, data);
            setEditingPost(null);
        }
    };
    const handleDeletePost = async (id) => {
        if (confirm('Are you sure you want to delete this post?')) {
            await deletePost(id);
        }
    };
    const handleEditPost = (post) => {
        setEditingPost(post);
        setShowForm(true);
    };
    const handleCancelForm = () => {
        setShowForm(false);
        setEditingPost(null);
    };
    if (showForm) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "bg-white rounded-lg shadow-lg p-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-8", children: editingPost ? 'Edit Post' : 'Create New Post' }), _jsx(PostForm, { post: editingPost ?? undefined, onSave: editingPost ? handleUpdatePost : handleCreatePost, onCancel: handleCancelForm })] }) }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "bg-white rounded-lg shadow-lg", children: [_jsxs("div", { className: "px-6 py-4 border-b border-gray-200 flex justify-between items-center", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Admin Dashboard" }), _jsxs("button", { onClick: () => setShowForm(true), className: "flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors", children: [_jsx(Plus, { size: 20 }), _jsx("span", { children: "New Post" })] })] }), _jsx("div", { className: "p-6", children: loading ? (_jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600", children: "Loading posts..." })] })) : posts.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-2", children: "No posts yet" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Create your first blog post to get started." }), _jsx("button", { onClick: () => setShowForm(true), className: "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors", children: "Create Post" })] })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Title" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Created" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: posts.map((post) => (_jsxs("tr", { className: "hover:bg-gray-50", children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium text-gray-900", children: post.title }), _jsxs("div", { className: "text-sm text-gray-500", children: ["/", post.slug] })] }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.published
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-gray-100 text-gray-800'}`, children: post.published ? (_jsxs(_Fragment, { children: [_jsx(Eye, { size: 12, className: "mr-1" }), "Published"] })) : (_jsxs(_Fragment, { children: [_jsx(EyeOff, { size: 12, className: "mr-1" }), "Draft"] })) }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: format(new Date(post.created_at), 'MMM dd, yyyy') }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium", children: _jsxs("div", { className: "flex space-x-2", children: [_jsx("button", { onClick: () => handleEditPost(post), className: "text-blue-600 hover:text-blue-900 transition-colors", children: _jsx(Edit, { size: 16 }) }), _jsx("button", { onClick: () => handleDeletePost(post.id), className: "text-red-600 hover:text-red-900 transition-colors", children: _jsx(Trash2, { size: 16 }) })] }) })] }, post.id))) })] }) })) })] }) }) }));
}

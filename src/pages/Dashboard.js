import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import { useUserRole } from '../hooks/useUserRole';
import { usePosts } from '../hooks/usePosts';
import { PostForm } from '../components/PostForm';
import { UserManagement } from '../components/UserManagement';
import { Plus, Edit, Trash2, Clock, CheckCircle, XCircle, FileText, Users, Settings, Send } from 'lucide-react';
export function Dashboard() {
    const { user } = useAuth();
    const { role, canWrite, canPublish, isAdmin, loading: roleLoading } = useUserRole();
    const [activeTab, setActiveTab] = useState('posts');
    const [postFilter, setPostFilter] = useState('all');
    const { posts, loading, createPost, updatePost, submitForReview, publishPost, rejectPost, deletePost } = usePosts(postFilter);
    const [showForm, setShowForm] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    if (!user) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    if (roleLoading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" }) }));
    }
    if (!canWrite) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx(XCircle, { className: "h-16 w-16 text-red-500 mx-auto mb-4" }), _jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Access Denied" }), _jsx("p", { className: "text-gray-600", children: "You don't have permission to access the dashboard." }), _jsx("p", { className: "text-sm text-gray-500 mt-2", children: "Contact an administrator to get writer access." })] }) }));
    }
    const handleCreatePost = async (data) => {
        await createPost(data);
        setShowForm(false);
    };
    const handleUpdatePost = async (data) => {
        if (editingPost) {
            // Only include the fields that are allowed to be updated
            const updateData = {
                title: data.title,
                content: data.content,
                excerpt: data.excerpt,
                slug: data.slug,
                featured_image: data.featured_image,
                status: data.status,
                published: data.published,
                updated_at: new Date().toISOString()
            };
            await updatePost(editingPost.id, updateData);
            setEditingPost(null);
        }
    };
    const handleSubmitForReview = async (id) => {
        if (confirm('Submit this post for review? You won\'t be able to edit it until it\'s reviewed.')) {
            await submitForReview(id);
        }
    };
    const handlePublishPost = async (id) => {
        if (confirm('Publish this post? It will be visible to all visitors.')) {
            await publishPost(id, user.id);
        }
    };
    const handleRejectPost = async (id) => {
        if (confirm('Reject this post? The author will be able to edit and resubmit it.')) {
            await rejectPost(id);
        }
    };
    const handleDeletePost = async (id) => {
        if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
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
    const getStatusIcon = (status) => {
        switch (status) {
            case 'draft': return _jsx(FileText, { size: 16, className: "text-gray-500" });
            case 'pending': return _jsx(Clock, { size: 16, className: "text-yellow-500" });
            case 'published': return _jsx(CheckCircle, { size: 16, className: "text-green-500" });
            case 'rejected': return _jsx(XCircle, { size: 16, className: "text-red-500" });
            default: return _jsx(FileText, { size: 16, className: "text-gray-500" });
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'draft': return 'bg-gray-100 text-gray-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'published': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    if (showForm) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "bg-white rounded-lg shadow-lg p-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-8", children: editingPost ? 'Edit Article' : 'Create New Article' }), _jsx(PostForm, { post: editingPost || undefined, onSave: editingPost ? handleUpdatePost : handleCreatePost, onCancel: handleCancelForm })] }) }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "bg-white rounded-lg shadow-lg", children: [_jsx("div", { className: "px-6 py-4 border-b border-gray-200", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Dashboard" }), _jsxs("p", { className: "text-gray-600 mt-1", children: ["Role: ", _jsx("span", { className: "font-medium capitalize text-blue-600", children: role })] })] }), canWrite && activeTab === 'posts' && (_jsxs("button", { onClick: () => setShowForm(true), className: "flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors", children: [_jsx(Plus, { size: 20 }), _jsx("span", { children: "New Article" })] }))] }) }), _jsx("div", { className: "border-b border-gray-200", children: _jsxs("nav", { className: "flex space-x-8 px-6", children: [_jsxs("button", { onClick: () => setActiveTab('posts'), className: `py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'posts'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`, children: [_jsx(FileText, { size: 16, className: "inline mr-2" }), "Articles"] }), isAdmin && (_jsxs(_Fragment, { children: [_jsxs("button", { onClick: () => setActiveTab('users'), className: `py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'users'
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`, children: [_jsx(Users, { size: 16, className: "inline mr-2" }), "User Management"] }), _jsxs("button", { onClick: () => setActiveTab('settings'), className: `py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'settings'
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`, children: [_jsx(Settings, { size: 16, className: "inline mr-2" }), "Settings"] })] }))] }) }), _jsxs("div", { className: "p-6", children: [activeTab === 'posts' && (_jsxs(_Fragment, { children: [_jsx("div", { className: "mb-6", children: _jsx("div", { className: "flex space-x-4", children: ['all', 'draft', 'pending', 'published'].map((filter) => (_jsx("button", { onClick: () => setPostFilter(filter), className: `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${postFilter === filter
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`, children: filter.charAt(0).toUpperCase() + filter.slice(1) }, filter))) }) }), loading ? (_jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600", children: "Loading articles..." })] })) : posts.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx(FileText, { className: "h-16 w-16 text-gray-400 mx-auto mb-4" }), _jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-2", children: "No articles found" }), _jsx("p", { className: "text-gray-600 mb-4", children: postFilter === 'all' ? 'Create your first article to get started.' : `No ${postFilter} articles found.` }), canWrite && (_jsx("button", { onClick: () => setShowForm(true), className: "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors", children: "Create Article" }))] })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Title" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Created" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: posts.map((post) => (_jsxs("tr", { className: "hover:bg-gray-50", children: [_jsx("td", { className: "px-6 py-4", children: _jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium text-gray-900", children: post.title }), _jsxs("div", { className: "text-sm text-gray-500", children: ["/", post.slug] })] }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsxs("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(post.status)}`, children: [getStatusIcon(post.status), _jsx("span", { className: "ml-1 capitalize", children: post.status })] }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: format(new Date(post.created_at), 'MMM dd, yyyy') }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium", children: _jsxs("div", { className: "flex space-x-2", children: [((post.status === 'draft' || post.status === 'rejected') && post.author_id === user.id) || canPublish ? (_jsx("button", { onClick: () => handleEditPost(post), className: "text-blue-600 hover:text-blue-900 transition-colors", title: "Edit", children: _jsx(Edit, { size: 16 }) })) : null, post.status === 'draft' && post.author_id === user.id && (_jsx("button", { onClick: () => handleSubmitForReview(post.id), className: "text-yellow-600 hover:text-yellow-900 transition-colors", title: "Submit for Review", children: _jsx(Send, { size: 16 }) })), post.status === 'pending' && canPublish && (_jsx("button", { onClick: () => handlePublishPost(post.id), className: "text-green-600 hover:text-green-900 transition-colors", title: "Publish", children: _jsx(CheckCircle, { size: 16 }) })), post.status === 'pending' && canPublish && (_jsx("button", { onClick: () => handleRejectPost(post.id), className: "text-red-600 hover:text-red-900 transition-colors", title: "Reject", children: _jsx(XCircle, { size: 16 }) })), ((post.status === 'draft' && post.author_id === user.id) || isAdmin) && (_jsx("button", { onClick: () => handleDeletePost(post.id), className: "text-red-600 hover:text-red-900 transition-colors", title: "Delete", children: _jsx(Trash2, { size: 16 }) }))] }) })] }, post.id))) })] }) }))] })), activeTab === 'users' && isAdmin && (_jsx(UserManagement, {})), activeTab === 'settings' && isAdmin && (_jsxs("div", { className: "text-center py-12", children: [_jsx(Settings, { className: "h-16 w-16 text-gray-400 mx-auto mb-4" }), _jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Settings" }), _jsx("p", { className: "text-gray-600", children: "Settings panel coming soon..." })] }))] })] }) }) }));
}

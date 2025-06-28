import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useUserRole } from '../hooks/useUserRole';
import { supabase } from '../lib/supabase';
import { Shield, UserPlus, CheckCircle, AlertCircle } from 'lucide-react';
export function RoleAssignment() {
    const { user } = useAuth();
    const { role, isAdmin } = useUserRole();
    const [assigningRole, setAssigningRole] = useState(false);
    const [message, setMessage] = useState(null);
    const assignSelfAsAdmin = async () => {
        if (!user)
            return;
        try {
            setAssigningRole(true);
            setMessage(null);
            // Try to assign admin role to current user
            const { error } = await supabase
                .from('user_roles')
                .insert({
                user_id: user.id,
                role: 'admin',
                created_by: user.id
            });
            if (error) {
                // If error is due to existing role, that's actually good
                if (error.code === '23505') { // unique constraint violation
                    setMessage({ type: 'success', text: 'You already have admin access!' });
                }
                else {
                    throw error;
                }
            }
            else {
                setMessage({ type: 'success', text: 'Admin role assigned successfully! Please refresh the page.' });
            }
        }
        catch (err) {
            setMessage({
                type: 'error',
                text: err instanceof Error ? err.message : 'Failed to assign admin role'
            });
        }
        finally {
            setAssigningRole(false);
        }
    };
    const assignSelfAsWriter = async () => {
        if (!user)
            return;
        try {
            setAssigningRole(true);
            setMessage(null);
            const { error } = await supabase
                .from('user_roles')
                .insert({
                user_id: user.id,
                role: 'writer',
                created_by: user.id
            });
            if (error) {
                if (error.code === '23505') {
                    setMessage({ type: 'success', text: 'You already have writer access!' });
                }
                else {
                    throw error;
                }
            }
            else {
                setMessage({ type: 'success', text: 'Writer role assigned successfully! Please refresh the page.' });
            }
        }
        catch (err) {
            setMessage({
                type: 'error',
                text: err instanceof Error ? err.message : 'Failed to assign writer role'
            });
        }
        finally {
            setAssigningRole(false);
        }
    };
    if (!user) {
        return (_jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-6", children: [_jsxs("div", { className: "flex items-center mb-4", children: [_jsx(AlertCircle, { className: "h-6 w-6 text-blue-600 mr-2" }), _jsx("h3", { className: "text-lg font-semibold text-blue-900", children: "Login Required" })] }), _jsx("p", { className: "text-blue-800 mb-4", children: "You need to be logged in to access the CMS. Please login or create an account first." })] }));
    }
    if (role) {
        return (_jsxs("div", { className: "bg-green-50 border border-green-200 rounded-lg p-6", children: [_jsxs("div", { className: "flex items-center mb-4", children: [_jsx(CheckCircle, { className: "h-6 w-6 text-green-600 mr-2" }), _jsx("h3", { className: "text-lg font-semibold text-green-900", children: "Access Granted" })] }), _jsxs("p", { className: "text-green-800 mb-4", children: ["You have ", _jsx("strong", { className: "capitalize", children: role }), " access to the CMS."] }), _jsx("p", { className: "text-sm text-green-700", children: "You can now access the CMS from the navigation menu above." })] }));
    }
    return (_jsxs("div", { className: "bg-white border border-gray-200 rounded-lg p-6", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx(Shield, { className: "h-12 w-12 text-blue-600 mx-auto mb-4" }), _jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Get CMS Access" }), _jsx("p", { className: "text-gray-600", children: "Choose your role to start using the MediBlog CMS" })] }), message && (_jsx("div", { className: `mb-6 p-4 rounded-lg ${message.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'}`, children: message.text })), _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "border border-gray-200 rounded-lg p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("h4", { className: "font-semibold text-gray-900 flex items-center", children: [_jsx(UserPlus, { className: "h-5 w-5 mr-2 text-green-600" }), "Writer Access"] }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Create and edit articles, submit for review" })] }), _jsx("button", { onClick: assignSelfAsWriter, disabled: assigningRole, className: "bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors", children: assigningRole ? 'Assigning...' : 'Get Writer Access' })] }) }), _jsx("div", { className: "border border-gray-200 rounded-lg p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("h4", { className: "font-semibold text-gray-900 flex items-center", children: [_jsx(Shield, { className: "h-5 w-5 mr-2 text-blue-600" }), "Admin Access"] }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Full access: write, publish, manage users" })] }), _jsx("button", { onClick: assignSelfAsAdmin, disabled: assigningRole, className: "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors", children: assigningRole ? 'Assigning...' : 'Get Admin Access' })] }) })] }), _jsxs("div", { className: "mt-6 p-4 bg-gray-50 rounded-lg", children: [_jsx("h4", { className: "font-semibold text-gray-900 mb-2", children: "Role Descriptions:" }), _jsxs("ul", { className: "text-sm text-gray-700 space-y-1", children: [_jsxs("li", { children: [_jsx("strong", { children: "Writer:" }), " Create articles, edit drafts, submit for review"] }), _jsxs("li", { children: [_jsx("strong", { children: "Publisher:" }), " Review and publish articles from writers"] }), _jsxs("li", { children: [_jsx("strong", { children: "Admin:" }), " All permissions plus user management"] })] })] })] }));
}

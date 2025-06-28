import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus, Shield, Edit, Trash2 } from 'lucide-react';
export function UserManagement() {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [assigningRole, setAssigningRole] = useState(null);
    useEffect(() => {
        fetchUsers();
    }, []);
    const fetchUsers = async () => {
        try {
            setLoading(true);
            // Get all users from auth.users (this requires admin access)
            const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
            if (authError)
                throw authError;
            // Get user roles
            const { data: userRoles, error: rolesError } = await supabase
                .from('user_roles')
                .select('*');
            if (rolesError)
                throw rolesError;
            // Combine user data with roles
            const usersWithRoles = authUsers.users.map(user => ({
                id: user.id,
                email: user.email || '',
                created_at: user.created_at,
                role: userRoles.find(role => role.user_id === user.id)?.role
            }));
            setUsers(usersWithRoles);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch users');
        }
        finally {
            setLoading(false);
        }
    };
    const assignRole = async (userId, role) => {
        try {
            setAssigningRole(userId);
            const { error } = await supabase.rpc('assign_user_role', {
                target_user_id: userId,
                new_role: role
            });
            if (error)
                throw error;
            // Refresh users list
            await fetchUsers();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to assign role');
        }
        finally {
            setAssigningRole(null);
        }
    };
    const removeRole = async (userId) => {
        try {
            const { error } = await supabase
                .from('user_roles')
                .delete()
                .eq('user_id', userId);
            if (error)
                throw error;
            // Refresh users list
            await fetchUsers();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to remove role');
        }
    };
    const getRoleColor = (role) => {
        switch (role) {
            case 'admin': return 'bg-red-100 text-red-800';
            case 'publisher': return 'bg-blue-100 text-blue-800';
            case 'writer': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    const getRoleIcon = (role) => {
        switch (role) {
            case 'admin': return _jsx(Shield, { size: 14 });
            case 'publisher': return _jsx(Edit, { size: 14 });
            case 'writer': return _jsx(UserPlus, { size: 14 });
            default: return null;
        }
    };
    if (loading) {
        return (_jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600", children: "Loading users..." })] }));
    }
    if (error) {
        return (_jsxs("div", { className: "text-center py-12", children: [_jsxs("p", { className: "text-red-600 mb-4", children: ["Error: ", error] }), _jsx("button", { onClick: fetchUsers, className: "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors", children: "Try Again" })] }));
    }
    return (_jsxs("div", { children: [_jsxs("div", { className: "mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "User Management" }), _jsx("p", { className: "text-gray-600", children: "Manage user roles and permissions for the medical blog platform." })] }), _jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6", children: [_jsx("h3", { className: "font-semibold text-blue-900 mb-2", children: "Role Descriptions:" }), _jsxs("ul", { className: "text-sm text-blue-800 space-y-1", children: [_jsxs("li", { children: [_jsx("strong", { children: "Writer:" }), " Can create and edit their own draft articles, submit for review"] }), _jsxs("li", { children: [_jsx("strong", { children: "Publisher:" }), " Can review, approve, and publish articles from writers"] }), _jsxs("li", { children: [_jsx("strong", { children: "Admin:" }), " Full access to all features including user management"] })] })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "User" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Current Role" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Joined" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: users.map((user) => (_jsxs("tr", { className: "hover:bg-gray-50", children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium text-gray-900", children: user.email }), _jsx("div", { className: "text-sm text-gray-500", children: user.id === currentUser?.id && '(You)' })] }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: user.role ? (_jsxs("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`, children: [getRoleIcon(user.role), _jsx("span", { className: "ml-1 capitalize", children: user.role })] })) : (_jsx("span", { className: "text-gray-500 text-sm", children: "No role assigned" })) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: new Date(user.created_at).toLocaleDateString() }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium", children: user.id !== currentUser?.id && (_jsxs("div", { className: "flex space-x-2", children: [_jsxs("select", { value: user.role || '', onChange: (e) => {
                                                        const newRole = e.target.value;
                                                        if (newRole) {
                                                            assignRole(user.id, newRole);
                                                        }
                                                    }, disabled: assigningRole === user.id, className: "text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500", children: [_jsx("option", { value: "", children: "Select Role" }), _jsx("option", { value: "writer", children: "Writer" }), _jsx("option", { value: "publisher", children: "Publisher" }), _jsx("option", { value: "admin", children: "Admin" })] }), user.role && (_jsx("button", { onClick: () => removeRole(user.id), className: "text-red-600 hover:text-red-900 transition-colors", title: "Remove Role", children: _jsx(Trash2, { size: 16 }) }))] })) })] }, user.id))) })] }) }), users.length === 0 && (_jsxs("div", { className: "text-center py-12", children: [_jsx(UserPlus, { className: "h-16 w-16 text-gray-400 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "No users found" }), _jsx("p", { className: "text-gray-600", children: "Users will appear here once they sign up for accounts." })] }))] }));
}

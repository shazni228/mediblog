import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RoleAssignment } from '../components/RoleAssignment';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { LogIn, ArrowRight } from 'lucide-react';
export function GetAccess() {
    const { user } = useAuth();
    return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: _jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Access MediBlog CMS" }), _jsx("p", { className: "text-gray-600", children: "Get the right permissions to start creating and managing medical content" })] }), !user ? (_jsxs("div", { className: "bg-white rounded-lg shadow-lg p-8 text-center", children: [_jsx(LogIn, { className: "h-16 w-16 text-blue-600 mx-auto mb-4" }), _jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: "Login Required" }), _jsx("p", { className: "text-gray-600 mb-6", children: "You need to login or create an account to access the CMS" }), _jsxs(Link, { to: "/login", className: "inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors", children: ["Go to Login", _jsx(ArrowRight, { className: "ml-2 h-5 w-5" })] })] })) : (_jsx(RoleAssignment, {})), _jsx("div", { className: "mt-8 text-center", children: _jsx(Link, { to: "/", className: "text-blue-600 hover:text-blue-800 transition-colors", children: "\u2190 Back to Home" }) })] }) }));
}

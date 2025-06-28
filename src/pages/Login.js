import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Stethoscope, Mail, Lock, UserPlus, LogIn } from 'lucide-react';
export function Login() {
    const { user, signIn, signUp } = useAuth();
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { register, handleSubmit, formState: { errors }, } = useForm();
    if (user) {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setError(null);
            if (isSignUp) {
                await signUp(data.email, data.password);
                setError('Check your email for the confirmation link!');
            }
            else {
                await signIn(data.email, data.password);
                navigate('/');
            }
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "sm:mx-auto sm:w-full sm:max-w-md", children: [_jsx("div", { className: "flex justify-center", children: _jsx(Stethoscope, { className: "h-12 w-12 text-blue-600" }) }), _jsx("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900", children: isSignUp ? 'Join MediBlog' : 'Sign in to MediBlog' }), _jsx("p", { className: "mt-2 text-center text-sm text-gray-600", children: isSignUp
                            ? 'Create your account to start sharing medical knowledge'
                            : 'Access your medical knowledge hub' })] }), _jsx("div", { className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md", children: _jsx("div", { className: "bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-blue-100", children: _jsxs("form", { className: "space-y-6", onSubmit: handleSubmit(onSubmit), children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700", children: "Email address" }), _jsxs("div", { className: "mt-1 relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(Mail, { className: "h-5 w-5 text-gray-400" }) }), _jsx("input", { id: "email", type: "email", autoComplete: "email", ...register('email', { required: 'Email is required' }), className: "appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors", placeholder: "doctor@example.com" }), errors.email && (_jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.email.message }))] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700", children: "Password" }), _jsxs("div", { className: "mt-1 relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(Lock, { className: "h-5 w-5 text-gray-400" }) }), _jsx("input", { id: "password", type: "password", autoComplete: "current-password", ...register('password', {
                                                    required: 'Password is required',
                                                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                                                }), className: "appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }), errors.password && (_jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.password.message }))] })] }), error && (_jsx("div", { className: `text-sm p-3 rounded-lg ${error.includes('Check your email')
                                    ? 'bg-green-50 text-green-700 border border-green-200'
                                    : 'bg-red-50 text-red-700 border border-red-200'}`, children: error })), _jsx("div", { children: _jsx("button", { type: "submit", disabled: loading, className: "w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors", children: loading ? (_jsx("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-white" })) : (_jsxs(_Fragment, { children: [isSignUp ? _jsx(UserPlus, { size: 18 }) : _jsx(LogIn, { size: 18 }), _jsx("span", { children: isSignUp ? 'Create Account' : 'Sign In' })] })) }) }), _jsx("div", { className: "text-center", children: _jsx("button", { type: "button", onClick: () => setIsSignUp(!isSignUp), className: "text-blue-600 hover:text-blue-500 text-sm font-medium transition-colors", children: isSignUp
                                        ? 'Already have an account? Sign in'
                                        : "Don't have an account? Sign up" }) })] }) }) })] }));
}

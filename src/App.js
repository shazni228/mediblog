import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsConditions } from './pages/TermsConditions';
import { ViewPost } from './pages/ViewPost';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { GetAccess } from './pages/GetAccess';
function App() {
    return (_jsx(AuthProvider, { children: _jsx(Router, { children: _jsxs("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col", children: [_jsx(Header, {}), _jsx("main", { className: "flex-grow", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/about", element: _jsx(About, {}) }), _jsx(Route, { path: "/contact", element: _jsx(Contact, {}) }), _jsx(Route, { path: "/privacy-policy", element: _jsx(PrivacyPolicy, {}) }), _jsx(Route, { path: "/terms-conditions", element: _jsx(TermsConditions, {}) }), _jsx(Route, { path: "/post/:id", element: _jsx(ViewPost, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/get-access", element: _jsx(GetAccess, {}) })] }) }), _jsx(Footer, {})] }) }) }));
}
export default App;

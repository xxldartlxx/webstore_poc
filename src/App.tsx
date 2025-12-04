import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { LandingPage } from '@/pages/LandingPage';
import { ServiceListingPage } from '@/pages/ServiceListingPage';
import { ProviderProfilePage } from '@/pages/ProviderProfilePage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import { AuthProvider } from '@/context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/services" element={<ServiceListingPage />} />
                        <Route path="/providers" element={<ServiceListingPage />} />
                        <Route path="/providers/:id" element={<ProviderProfilePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
    )
}

export default App

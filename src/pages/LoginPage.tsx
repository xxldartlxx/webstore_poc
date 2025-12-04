import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { AuthCard } from '@/features/auth/components/AuthCard';
import { AuthInputField } from '@/features/auth/components/AuthInputField';
import { AuthAlert } from '@/features/auth/components/AuthAlert';
import { PrimaryButton, SecondaryButton } from '@/features/auth/components/AuthActions';
import { useLoginForm } from '@/features/auth/hooks/useLoginForm';

const LoginPage = () => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        error,
        isLoading,
        handleSubmit,
        handleGoogleLogin,
    } = useLoginForm();

    return (
        <AuthCard
            title="Welcome Back"
            subtitle="Sign in to access your account"
            variant="login"
            footer={
                <p>
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-medium hover:underline transition-all">
                        Sign up
                    </Link>
                </p>
            }
        >
            {error && <AuthAlert message={error} />}

            <form onSubmit={handleSubmit} className="space-y-6">
                <AuthInputField
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    icon={Mail}
                    required
                />

                <AuthInputField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    icon={Lock}
                    required
                />

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded border-border bg-secondary/50 checked:bg-purple-500 transition-colors" />
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">Remember me</span>
                    </label>
                    <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Forgot password?</a>
                </div>

                <PrimaryButton type="submit" loading={isLoading}>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                </PrimaryButton>
            </form>

            <div className="mt-8">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-transparent text-muted-foreground bg-background">Or continue with</span>
                    </div>
                </div>

                <SecondaryButton
                    onClick={handleGoogleLogin}
                    loading={isLoading}
                    icon={
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                    }
                >
                    Google
                </SecondaryButton>
            </div>
        </AuthCard>
    );
};

export default LoginPage;

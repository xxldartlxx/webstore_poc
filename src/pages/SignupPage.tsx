import { Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { AuthCard } from '@/features/auth/components/AuthCard';
import { AuthInputField } from '@/features/auth/components/AuthInputField';
import { AuthAlert } from '@/features/auth/components/AuthAlert';
import { PrimaryButton, SecondaryButton } from '@/features/auth/components/AuthActions';
import { GoogleLogo } from '@/features/auth/components/GoogleLogo';
import { useSignupForm } from '@/features/auth/hooks/useSignupForm';

const SignupPage = () => {
    const {
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        error,
        isLoading,
        handleSubmit,
        handleGoogleLogin,
    } = useSignupForm();

    return (
        <AuthCard
            title="Create Account"
            subtitle="Join our community of professionals"
            variant="signup"
            footer={
                <p>
                    Already have an account?{' '}
                    <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium hover:underline transition-all">
                        Sign in
                    </Link>
                </p>
            }
        >
            {error && <AuthAlert message={error} />}

            <form onSubmit={handleSubmit} className="space-y-6">
                <AuthInputField
                    label="Full Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    icon={User}
                    required
                />

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

                <label className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" className="w-4 h-4 rounded border-border bg-secondary/50 checked:bg-purple-500 transition-colors" required />
                    <span className="text-muted-foreground">
                        I agree to the <a href="#" className="text-purple-400 hover:text-purple-300">Terms of Service</a> and{' '}
                        <a href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>
                    </span>
                </label>

                <PrimaryButton type="submit" loading={isLoading}>
                    <span>Create Account</span>
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

                <SecondaryButton onClick={handleGoogleLogin} loading={isLoading} icon={<GoogleLogo />}>
                    Google
                </SecondaryButton>
            </div>
        </AuthCard>
    );
};

export default SignupPage;

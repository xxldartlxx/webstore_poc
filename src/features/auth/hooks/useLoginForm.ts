import { FormEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function useLoginForm() {
    const { login, loginWithGoogle, isLoading } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        try {
            await login(email, password);
            navigate("/");
        } catch (err) {
            console.error("Login failed", err);
            setError("Failed to sign in");
        }
    }, [email, password, login, navigate]);

    const handleGoogleLogin = useCallback(async () => {
        setError("");
        try {
            await loginWithGoogle();
            navigate("/");
        } catch (err) {
            console.error("Google login failed", err);
            setError("Failed to sign in with Google");
        }
    }, [loginWithGoogle, navigate]);

    return {
        email,
        setEmail,
        password,
        setPassword,
        error,
        isLoading,
        handleSubmit,
        handleGoogleLogin,
    };
}

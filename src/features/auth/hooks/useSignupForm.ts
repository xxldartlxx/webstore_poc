import { FormEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function useSignupForm() {
    const { signup, loginWithGoogle, isLoading } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        try {
            await signup(name, email, password);
            navigate("/");
        } catch (err) {
            console.error("Signup failed", err);
            setError("Failed to create account");
        }
    }, [name, email, password, signup, navigate]);

    const handleGoogleLogin = useCallback(async () => {
        setError("");

        try {
            await loginWithGoogle();
            navigate("/");
        } catch (err) {
            console.error("Google signup failed", err);
            setError("Failed to sign up with Google");
        }
    }, [loginWithGoogle, navigate]);

    return {
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
    };
}

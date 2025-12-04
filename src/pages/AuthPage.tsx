import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

export function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-10">
            <Card className="w-full max-w-md overflow-hidden">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold">
                        {isLogin ? "Welcome back" : "Create an account"}
                    </CardTitle>
                    <CardDescription>
                        {isLogin ? "Enter your credentials to access your account" : "Enter your details to get started"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <AnimatePresence mode="wait">
                        <motion.form
                            key={isLogin ? "login" : "register"}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            {!isLogin && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">First name</label>
                                        <Input placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Last name</label>
                                        <Input placeholder="Doe" />
                                    </div>
                                </div>
                            )}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <Input type="email" placeholder="m@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Password</label>
                                <Input type="password" />
                            </div>
                            <Button className="w-full" size="lg">
                                {isLogin ? "Sign In" : "Sign Up"}
                            </Button>
                        </motion.form>
                    </AnimatePresence>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline">Google</Button>
                        <Button variant="outline">Apple</Button>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center border-t p-4">
                    <p className="text-sm text-muted-foreground">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-primary hover:underline font-medium"
                        >
                            {isLogin ? "Sign up" : "Sign in"}
                        </button>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}

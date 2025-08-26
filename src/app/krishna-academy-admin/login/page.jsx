"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res.error) {
                setError("Invalid Credentials");
                setLoading(false);
                return;
            }

            router.replace("/krishna-academy-admin/dashboard");
        } catch (error) {
            console.error(error);
            setError("Something went wrong!");
            setLoading(false);
        }
    };

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-sky-800">
                <h1 className="text-xl font-bold my-4">Krishna Academy Admin Panel</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Email"
                        disabled={loading}
                        className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-300/40 rounded-md"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        disabled={loading}
                        className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-300/40 rounded-md"
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                        className="bg-sky-800 text-white font-bold cursor-pointer px-6 py-2 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white border-solid"></span>
                                Logging in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </Button>

                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

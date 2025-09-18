"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // ✅ loading state
    const router = useRouter();

    // ✅ Redirect if already logged in
    useEffect(() => {
        const token = sessionStorage.getItem("admin_token");
        if (token) {
            router.replace("/school-admin/dashboard");
        }
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // start loading
        setError("");

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                sessionStorage.setItem("admin_token", data.token);
                router.replace("/school-admin/dashboard");
            } else {
                setError(data.error || "Login failed");
            }
        } catch (err) {
            setError("Something went wrong!");
        } finally {
            setLoading(false); // stop loading
        }
    };

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-sky-800">
                <h1 className="text-xl font-bold my-4">School Admin Panel</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-5">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Email"
                        className="w-[350px] p-2 bg-gray-200 text-black rounded-md"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="w-[350px] p-2 bg-gray-200 text-black rounded-md"
                    />

                    {/* ✅ Button with loading spinner */}
                    <button
                        disabled={loading}
                        className={`flex items-center justify-center gap-2 bg-sky-900 text-white font-bold cursor-pointer px-6 py-2 rounded-md ${
                            loading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                    >
                        {loading ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Logging in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>

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

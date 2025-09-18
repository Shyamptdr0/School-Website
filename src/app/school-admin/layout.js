import "../globals.css";
import { AuthProvider } from "./Providers";

export const metadata = {
    title: "Admin Panel",
    icons: {
        icon: "/logo.webp",   // 👈 WebP favicon
        shortcut: "/logo.webp",
        apple: "/logo.webp",
    },
};;
export const template = "empty";

export default function AdminLayout({ children }) {
    return (
        <html lang="en">
        <body style={{ fontFamily: "sans-serif" }}>
        <AuthProvider>
            {children}
        </AuthProvider>
        </body>
        </html>
    );
}

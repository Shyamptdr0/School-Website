/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"], // Cloudinary host
    },
    async rewrites() {
        return [
            {
                source: "/krishna-academy-admin/:path*",
                destination: "/krishna-academy-admin/:path*",
            },
        ];
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "10mb", // Increase body size limit for uploads
        },
    },
};

export default nextConfig;

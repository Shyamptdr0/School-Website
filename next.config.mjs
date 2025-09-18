/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"], // Cloudinary host
    },
    async rewrites() {
        return [
            {
                source: "/school-admin/:path*",
                destination: "/school-admin/:path*",
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

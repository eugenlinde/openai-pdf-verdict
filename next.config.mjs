/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        BATCH_SIZE: process.env.BATCH_SIZE,
    },
};

export default nextConfig;

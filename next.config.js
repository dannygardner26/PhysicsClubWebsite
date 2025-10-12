/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  webpack: (config, { isServer }) => {
    // Fix for Windows case-sensitivity issues causing duplicate module errors
    config.resolve.symlinks = false;

    // Suppress case-sensitivity warnings
    if (!isServer) {
      config.infrastructureLogging = {
        level: 'error',
      };
    }

    return config;
  },
}

module.exports = nextConfig
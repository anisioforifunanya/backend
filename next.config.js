/** @type {import('next').NextConfig} */
const nextConfig = {
      images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
          {
            protocol: "http",
            hostname: "res.cloudinary.com",
          },
          {
            protocol: "https",
            hostname: "res.cloudinary.com",
          },
          {
            protocol: "http",
            hostname: "picsum.com",
          },
          {
            protocol: "https",
            hostname: "placehold.co",
          }]
      },
    // experimental: {
    //   missingSuspenseWithCSRBailout: false,
    // },
}

module.exports = nextConfig

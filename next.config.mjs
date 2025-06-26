/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Set base path if deploying to a subdirectory (repository name)
  // basePath: '/secure-html-embed', // Uncomment if repo name is not your domain

  // Disable server-side features for static export
  distDir: "out",


};

export default nextConfig;

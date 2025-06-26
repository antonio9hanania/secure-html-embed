/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  // IMPORTANT: Set the correct basePath for your repo
  basePath: "/secure-html-embed",
  assetPrefix: "/secure-html-embed/",

  // Output directory
  distDir: "out",
};

export default nextConfig;

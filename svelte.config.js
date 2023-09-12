import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: false,
      precompress: false,
    }),
    paths: {
      base: process.env.NODE_ENV === "production" ? "" : "",
    },
  },
};

export default config;

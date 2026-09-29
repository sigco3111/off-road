import { defineConfig } from 'vite'
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

// GitHub Pages: serve under /<repo-name>/
// Override at build time with VITE_BASE=/yourpath/ to deploy elsewhere.
const base = process.env.VITE_BASE || '/off-road/';

export default defineConfig({
  base,
  plugins: [
    wasm(),
    topLevelAwait()
  ]
});
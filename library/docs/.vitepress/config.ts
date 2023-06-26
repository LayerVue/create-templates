import { defineConfig } from 'vitepress';
import markdownItCodeView from '../plugins/demoPreview';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'My Awesome Project',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/examples' },
    ],

    sidebar: [{ text: 'Examples', link: '/examples' }],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
  markdown: {
    config(md) {
      md.use(markdownItCodeView, {
        componentName: 'CodeView',
      });
    },
  },
});

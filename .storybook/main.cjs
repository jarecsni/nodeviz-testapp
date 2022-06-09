module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx|svelte)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    '@storybook/addon-svelte-csf',
  ],
  "framework": "@storybook/svelte",
  "svelteOptions": {
    "preprocess": import("../svelte.config.js").then(p => {return p.preprocess})
  }
}
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx|svelte)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    '@storybook/addon-svelte-csf'
  ],
  "framework": "@storybook/svelte",
  "svelteOptions": {
    "preprocess": import("../svelte.config.js").then(p => {return p.preprocess})
  },
  previewHead: (head) => (`
    ${head}
    <link rel="stylesheet" href="https://unpkg.com/svelte-material-ui/bare.css" />
		<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"/>
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono"/>
  `)
}
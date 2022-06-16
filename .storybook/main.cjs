const path = require('path');

module.exports = {
  webpackFinal: async (config) => {
    const svelteLoader = config.module.rules.find( (r) => r.loader && r.loader.includes('svelte-loader'))
    svelteLoader.options.preprocess = require('svelte-preprocess')()
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader', options: {}
        },
        {
          loader: 'css-loader',
          options: {
            localsConvention: 'dashes',
            importLoaders: 1,
            sourceMap: true,
            modules: true
          }
        },
        {
          loader: 'postcss-loader', options: {
            sourceMap: true
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'sass-resources-loader',
          options: {
            resources: './static/resources.scss'
          }
        }
      ]});
    return config;
  },
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
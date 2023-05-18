import type { StorybookConfig } from '@storybook/nextjs'
import type { RuleSetRule } from 'webpack/types'
import { resolve } from 'path'

const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      nextConfigPath: resolve(__dirname, '../next.config.mjs'),
    },
  },
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config) => {
    if (!config.module?.rules) return config

    const isFileLoaderRule = (rule: RuleSetRule | '...') => {
      if (rule !== '...' && rule.test instanceof RegExp)
        return rule.test.test('.svg')
      else return undefined
    }

    let fileLoaderRule = config.module.rules.find(isFileLoaderRule)

    if (fileLoaderRule && fileLoaderRule !== '...') {
      fileLoaderRule.exclude = /\.svg$/
    }

    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            namedExport: 'ReactComponent',
            exportType: 'named',
          },
        },
      ],
    })

    return config
  },
}

export default config

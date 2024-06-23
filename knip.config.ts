import { type KnipConfig } from 'knip'

const config: KnipConfig = {
  ignoreDependencies: ['prettier-plugin-*'],
  postcss: {
    config: 'postcss.config.mjs'
  }
}

export default config

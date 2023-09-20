/* eslint-disable global-require */
import { RuleSetRule } from 'webpack';

export function buildBabelLoader(isDev: boolean): RuleSetRule {
  return {
    test: /\.(js|jsx|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: [
          [
            'i18next-extract',
            {
              locales: ['ru', 'en'],
              keyAsDefaultValue: true,
            },
          ],
          isDev && require('react-refresh/babel'),
        ].filter(Boolean),
      },
    },
  };
}

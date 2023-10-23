import { RuleSetRule } from 'webpack';

export function buildFileLoader(): RuleSetRule {
  return {
    test: /\.(png|jpe?g|gif)$/i,
    exclude: /node_modules/,
    use: [{ loader: 'file-loader' }],
  };
}

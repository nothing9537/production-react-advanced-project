import { RuleSetRule } from 'webpack';

export function buildFileLoader(): RuleSetRule {
  return {
    test: /\.(png|jpe?g|gif)$/i,
    use: [{ loader: 'file-loader' }],
  };
}

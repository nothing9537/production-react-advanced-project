import { RuleSetRule } from 'webpack';

export function buildSVGLoader(): RuleSetRule {
  return {
    test: /\.svg$/,
    exclude: /node_modules/,
    use: ['@svgr/webpack'],
  };
}

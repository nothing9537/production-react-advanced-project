import { RuleSetRule } from 'webpack';

export function buildSVGLoader(): RuleSetRule {
  return {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  };
}

import { RuleSetRule } from 'webpack';

export function buildSVGLoder(): RuleSetRule {
  return {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  };
}

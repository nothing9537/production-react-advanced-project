import { RuleSetRule } from 'webpack';

export function buildTypescriptLoader(): RuleSetRule {
  return {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };
}

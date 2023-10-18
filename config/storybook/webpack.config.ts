/* eslint-disable @typescript-eslint/no-non-null-assertion */
import path from 'path';
import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import { buildCSSLoader } from '../build/loaders/buildCSSLoader';
import { buildSVGLoader } from '../build/loaders/buildSVGLoader';
import { BuildPaths } from '../build/types/config';

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
    buildLocales: '',
    locales: '',
  };
  config!.resolve!.modules!.push(paths.src);
  config!.resolve!.extensions!.push('.ts', '.tsx');

  // eslint-disable-next-line no-param-reassign, @typescript-eslint/ban-ts-comment
  // @ts-ignore
  config!.module!.rules = config.module!.rules!.map((rule: RuleSetRule) => {
    if (/svg/.test(rule.test as string)) {
      return { ...rule, exclude: /\.svg$/i };
    }

    return rule;
  });

  config.module?.rules?.push(buildSVGLoader());
  config.module?.rules?.push(buildCSSLoader(true));
  config!.plugins!.push(new DefinePlugin({
    __IS_DEV__: JSON.stringify(true),
    __API__: JSON.stringify('http://localhost:6006'),
    __PROJECT__: JSON.stringify('storybook'),
  }));

  return config;
};

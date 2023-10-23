import { RuleSetRule } from 'webpack';
import { buildBabelLoader } from './loaders/buildBabelLoader';
import { buildCSSLoader } from './loaders/buildCSSLoader';
import { buildFileLoader } from './loaders/buildFileLoader';
import { buildSVGLoader } from './loaders/buildSVGLoader';
import { BuildOptions } from './types/config';

export function buildLoaders(options: BuildOptions): RuleSetRule[] {
  const { isDev } = options;

  const svgLoader = buildSVGLoader();
  const fileLoader = buildFileLoader();
  const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
  const tsxBabelLoader = buildBabelLoader({ ...options, isTsx: true });
  const cssLoader = buildCSSLoader(isDev);

  return [
    fileLoader,
    svgLoader,
    codeBabelLoader,
    tsxBabelLoader,
    cssLoader,
  ];
}

import { RuleSetRule } from 'webpack';
import { buildBabelLoader } from './loaders/buildBabelLoader';
import { buildCSSLoader } from './loaders/buildCSSLoader';
import { buildFileLoader } from './loaders/buildFileLoader';
import { buildSVGLoader } from './loaders/buildSVGLoader';
import { buildTypescriptLoader } from './loaders/buildTypescriptLoader';
import { BuildOptions } from './types/config';

export function buildLoaders({ isDev }: BuildOptions): RuleSetRule[] {
  const svgLoader = buildSVGLoader();
  const fileLoader = buildFileLoader();
  const babelLoader = buildBabelLoader(isDev);
  const cssLoader = buildCSSLoader(isDev);
  const typescriptLoader = buildTypescriptLoader();

  return [
    fileLoader,
    svgLoader,
    babelLoader,
    typescriptLoader,
    cssLoader,
  ];
}

import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { RuleSetRule } from 'webpack'
// import { buildCSSLoader } from './loaders/buildCSSLoader'
// import { buildSVGLoder } from './loaders/buildSVGLoader'
import { BuildOptions } from './types/config'

export function buildLoaders({ isDev }: BuildOptions): RuleSetRule[] {

	const svgLoader: RuleSetRule = {
		test: /\.svg$/,
		use: ['@svgr/webpack']
	}

	const fileLoader: RuleSetRule = {
		test: /\.(png|jpe?g|gif)$/i,
		use: [{ loader: 'file-loader' }]
	}

	const babelLoader: RuleSetRule = {
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
							keyAsDefaultValue: true
						}
					]
				]
			}
		}
	}

	const cssLoader: RuleSetRule = {
		test: /\.s[ac]ss$/i,
		use: [
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader',
				options: {
					modules: {
						auto: (resPath: string) => Boolean(resPath.includes('.module.')),
						localIdentName: isDev
							? '[path][name]__[local]'
							: '[hash:base64:8]',
					},
				}
			},
			'sass-loader',
		]
	}

	const typescriptLoader: RuleSetRule = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/,
	}

	return [
		fileLoader,
		svgLoader,
		babelLoader,
		typescriptLoader,
		cssLoader
	]
}
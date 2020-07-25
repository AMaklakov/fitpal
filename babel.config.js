module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				root: ['./src'],
				extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
				alias: {
					'*': './src',
					'@screen': './src/screen',
					'@i18n': './src/i18n',
					'@css': './src/css',
					'@redux': './src/redux',
					'@model': './src/model',
					'@util': './src/util',
					'@const': './src/const',
					'@components': './src/components',
					'@icons': './src/components/icons',
					'@inputs': './src/components/inputs',
					'@navigation': './src/navigation',
				},
			},
		],
	],
};

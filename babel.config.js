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
					'@css': './src/css',
					'@redux': './src/redux',
					'@model': './src/model',
					'@util': './src/util',
					'@components': './src/components',
					'@icons': './src/components/icons',
					'@inputs': './src/components/inputs',
				},
			},
		],
	],
};

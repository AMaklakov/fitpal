module.exports = {
	root: true,
	extends: ['@react-native-community', 'prettier', 'prettier/react'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
		'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
	},
};

module.exports = {
	root: true,
	extends: ['@react-native-community', 'prettier', 'prettier/react'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'react-hooks', 'prettier'],
	rules: {
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
		'no-console': 'error',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'error',
	},
};

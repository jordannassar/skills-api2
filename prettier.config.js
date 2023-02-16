module.exports = {
	printWidth: 80,
	tabWidth: 4,
	useTabs: true,
	semi: true,
	singleQuote: true,
	trailingComma: 'all',
	bracketSpacing: true,
	bracketSameLine: false,
	arrowParens: 'always',
	proseWrap: 'always',
	overrides: [
		{
			files: '*.yaml',
			options: {
				tabWidth: 2,
			},
		},
		{
			files: '*.md',
			options: {
				proseWrap: 'preserve',
			},
		},
		{
			files: '*.json',
			options: {
				useTabs: false,
				tabWidth: 2,
			},
		},
	],
};

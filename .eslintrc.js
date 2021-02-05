module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/vue3-essential',
		'@vue/airbnb',
		'@vue/typescript/recommended',
		'prettier',
		'prettier/vue',
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		'no-tabs': 'off',
		indent: ['error', 'tab', {
			SwitchCase: 1,
			VariableDeclarator: 1,
		}],
		'import/extensions': 'off',
		'import/prefer-default-export': 'off'
	},
	overrides: [
		{
			files: [
				'**/__tests__/*.{j,t}s?(x)',
				'**/tests/unit/**/*.spec.{j,t}s?(x)',
			],
			env: {
				jest: true,
			},
		},
	],
};

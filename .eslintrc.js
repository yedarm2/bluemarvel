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
		'import/prefer-default-export': 'off',
		'import/no-unresolved': 'off',
		'max-classes-per-file': 'off',
		'no-useless-constructor': 'off',
		'@typescript-eslint/no-useless-constructor': 'error',
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

// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import jsdoc from 'eslint-plugin-jsdoc';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.strictTypeChecked,
	...tseslint.configs.stylisticTypeChecked,

	{
		languageOptions: {
			parserOptions: {
				project: true,
			},
		},
		plugins: {
			jsdoc,
		},
		rules: {
			'jsdoc/check-indentation': ['error', { excludeTags: ['example'] }],
			'@typescript-eslint/consistent-type-definitions': 'off',
			'jsdoc/require-jsdoc': [
				'warn',
				{
					contexts: ['TSTypeAliasDeclaration', 'TSTypeLiteral>TSPropertySignature'],
				},
			],
			'jsdoc/empty-tags': 'error',
			// 'max-len': ['error', { code: 120, tabWidth: 4, ignoreUrls: true }],
		},
	},
	{
		files: ['src/index.ts'],
		rules: {
			'jsdoc/require-jsdoc': [
				'warn',
				{
					contexts: ['TSTypeAliasDeclaration'],
				},
			],
		},
	},
);

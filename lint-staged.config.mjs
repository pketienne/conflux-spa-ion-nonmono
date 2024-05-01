export default {
	'*.{js,jsx,ts,tsx}': ['eslint --quiet --fix'],
	'*.{json,js,ts,jsx,tsx,html}': ['prettier --write --ignore-unknown'],
	'**/*.ts?{x}': [() => 'tsc p tsconfig.json --noEmit'],
	'**/*.{css,scss}': ["stylelint --fix '**/*.{css,scss}'"],
};

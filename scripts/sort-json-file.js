const fs = require('fs');

const filePaths = process.argv.slice(2);
filePaths.forEach(path => {
	const file = getFormattedMessages(path);
	fs.writeFileSync(path, file);
});

/**
 * Extracts messages and converts them to formatted with tabs jsons
 */
function getFormattedMessages(path) {
	const messages = require(path);

	return JSON.stringify(sortAlphabetically(messages), null, '\t');
}

/**
 * Recursively sorts properties in passed objects
 */
function sortAlphabetically(messages) {
	if (!messages || typeof messages !== 'object') {
		return messages;
	}

	const keys = Object.keys(messages).sort();
	return keys.reduce(
		(result, key) => ({
			...result,

			[key]: sortAlphabetically(messages[key]),
		}),
		{}
	);
}

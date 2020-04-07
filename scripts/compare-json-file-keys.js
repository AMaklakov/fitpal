const fs = require('fs');

// paths
const filePath = process.argv[2].split('/');
const dirPath = filePath.slice(0, filePath.length - 1).join('/');

const listToCompare = fs.readdirSync(dirPath);
const source = listToCompare.pop();
const sourceFile = getFile(dirPath + '/' + source);

listToCompare.forEach(path => {
	const file = getFile(dirPath + '/' + path);

	if (!isIdenticalByKeys(file, sourceFile)) {
		throw new Error(`The file '${dirPath}/${path}' and '${dirPath}/${source}' have different keys`);
	}
});

/**
 * Checks if two objects have the same set of keys
 *
 * For instance:
 * a = {
 *   'a': 1,
 *   'b': 2,
 * }
 *
 * b = {
 *   'a': 3,
 *   'b': 4,
 * }
 *
 * here `a` a `b` have the same keys.
 *
 * ---
 *
 * But here:
 *
 * a = {
 *   'a': 1,
 *   'b': 2,
 * }
 *
 * b = {
 *   'a': 1,
 *   'd': 2,
 * }
 *
 * `b` had key `d` which is not included in object `a`.
 */
function isIdenticalByKeys(a, b) {
	if (!a || !b) {
		return false;
	}

	return hasFirstAllKeysOfSecond(a, b) && hasFirstAllKeysOfSecond(b, a);
}

function hasFirstAllKeysOfSecond(first, second) {
	return Object.keys(second).every(key => {
		if (first[key] === undefined) {
			return false;
		}

		if (typeof second[key] === 'object' && second[key] !== null) {
			return hasFirstAllKeysOfSecond(first[key], second[key]);
		}

		return true;
	});
}

function getFile(path) {
	return require(path);
}

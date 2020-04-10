// Regex function for search functionality
const escapeRegex = string => {
	if (!string) return undefined;
	return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};
// Exporting Function
module.exports = escapeRegex;

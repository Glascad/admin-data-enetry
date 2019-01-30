
/**
 * searchParser converts the search string from the url into an object for easy use
 * 
 * it will take a string such as:
 * `http://localhost:3000/system-data/info/database/system-info?systemNID=WyJzeXN0ZW1zIiwxXQ==`
 * 
 * and return an object:
 * 
 * { systemNID: "WyJzeXN0ZW1zIiwxXQ==" }
 */

const searchParser = (url = window.location.search) => url
    .replace(/^.*?\?/, "")
    .split(/[?&]/)
    .reduce((search, pair) => ({
        ...search,
        [pair.replace(/=.*/, "")]: pair.replace(/^.*?=/, ""),
    }), {});

export default searchParser;

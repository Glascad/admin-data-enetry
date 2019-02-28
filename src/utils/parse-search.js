
/**
 * parseSearch converts the search string from the url into an object for easy use
 * 
 * it will take a string such as:
 * `http://localhost:3000/system-data/info/database/system-info?systemNID=WyJzeXN0ZW1zIiwxXQ==`
 * 
 * and return an object:
 * 
 * { systemNID: "WyJzeXN0ZW1zIiwxXQ==" }
 */

const parseSearch = search => search.replace(/^.*?\?/, "")
    .split(/[?&]/)
    .reduce((parsedSearch, pair) => ({
        ...parsedSearch,
        [pair.replace(/=.*/, "")]: pair.replace(/^.*?=/, ""),
    }), {});

const joinSearch = searchObject => Object
    .entries(searchObject)
    .filter(([_, value]) => value !== undefined)
    .reduce((search, [key, value], i) => `${
        search
        }${
        i === 0 ?
            '?'
            :
            '&'
        }${
        key
        }=${
        value
        }`, '');

class Search {
    constructor(search) {

        if (typeof search === 'string') {
            this.search = search;
            this.parsedSearch = parseSearch(search);
        } else {
            this.parsedSearch = search;
            this.search = joinSearch(search);
        }

        Object.assign(this, this.parsedSearch);
    }

    update = searchObject => new Search({
        ...this.parsedSearch,
        ...searchObject,
    });

    remove = key => new Search({
        ...this.parsedSearch,
        [key]: undefined,
    });

    toString = () => this.search;
}

export default (search = window.location.search) => new Search(search);

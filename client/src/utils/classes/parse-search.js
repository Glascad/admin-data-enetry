import _ from 'lodash';
import pipe from '../functions/pipe';

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
    .filter(pair => (
        pair.replace(/^.*?=/, "")
        &&
        pair.replace(/=.*/, "")
    ))
    .reduce((parsedSearch, pair) => ({
        ...parsedSearch,
        [pair.replace(/=.*/, "")]: pipe(
            pair.replace(/^.*?=/, ""),
            val => `${+val}` === `${val}` ?
                +val
                :
                val,
        ),
    }), {});

const joinSearch = searchObject => Object
    .entries(searchObject)
    .filter(([key, value]) => key && value !== undefined)
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
    constructor(searchString) {

        if (typeof searchString !== 'string') return new Search(joinSearch(searchString));

        this.__parsedSearch = parseSearch(searchString);
        this.__search = joinSearch(this.__parsedSearch);

        Object.assign(this, this.__parsedSearch);

        console.log(this);
    }

    update = searchObject => new Search({
        ...this.__parsedSearch,
        ...searchObject,
    });

    remove = (...keys) => keys.reduce((search, key) => new Search({
        ...search,
        [key]: undefined,
    }), this.__parsedSearch);

    toString = () => this.__search;
}

export default _.memoize(search => new Search(search));

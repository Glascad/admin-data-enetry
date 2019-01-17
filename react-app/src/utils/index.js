import _parseSearch from './search-parser';

export const parseSearch = _parseSearch;

export const validatePath = path => path.replace(/\/+/g, '/');

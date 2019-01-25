
export default function parseSearch(url = window.location.search) {
    const result = url
        .replace(/^.*?\?/, "")
        .split(/[?&]/)
        .reduce((search, pair) => ({
            ...search,
            [pair.replace(/=.*/, "")]: pair.replace(/^.*?=/, "")
        }), {});
    return result;
}

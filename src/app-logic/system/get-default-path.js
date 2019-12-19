import getChildren from "./get-children";
import getLastItemFromPath from "./get-last-item-from-path";
import getTypenameFromPath from "./get-typename-from-path";

const getDefaultPath = window.getDefaultPath = (one, two, three) => {

    // argument/parameter mappings
    if (one === undefined) return '';
    // when passed systemmap as first item instead of item (item = systemMap, systemMap = optionGroupValues)
    if (two === undefined || Array.isArray(two)) return getDefaultPath(one, one, two);

    const systemMap = two;

    const providedPath = typeof one === 'string' ? one : one.path;

    const item = systemMap[providedPath];

    if (!item) return providedPath;

    const optionGroupValues = three || [];
    // end mappings

    const { path } = item;

    const { __typename = getTypenameFromPath(path) } = item;

    const children = getChildren(item, systemMap);

    const defaultKey = Object.keys(item).find(key => key.match(/^default.*OptionValue/i));

    const defaultOptionValue = item[defaultKey];

    const {
        0: firstChild,
        0: {
            __typename: childTypename = '',
        } = {},
        length: childCount,
    } = children;

    const isOption = __typename.match(/Option$/);

    const optionName = getLastItemFromPath(path);

    const optionGroup = optionGroupValues.find(ovg => ovg.optionName === optionName);

    const defaultValue = (optionGroup || {}).name || defaultOptionValue;

    const defaultChild = isOption ?
        children.find(({ path }) => path.endsWith(defaultValue))
        :
        childTypename.match(/option/i) ?
            firstChild
            :
            undefined;

    return defaultChild ?
        getDefaultPath(defaultChild, systemMap, optionGroupValues)
        :
        path;
};

export default getDefaultPath;

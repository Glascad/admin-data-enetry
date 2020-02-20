import getParentPath from "./get-parent-path";

export default class SystemMap {
    constructor(system) {
        const {
            id,
            name,
            _systemOptions = [],
            _detailOptions = [],
            _configurationOptions = [],
            _systemOptionValues = [],
            _detailOptionValues = [],
            _configurationOptionValues = [],
            _systemDetails = [],
            _detailConfigurations = [],
            _configurationParts = [],
        } = system || {};
        Object.assign(this, system, {
            path: `${id || ''}`,
            [name]: this,
            [id]: this,
            parents: {},
        }, [
            ..._systemOptions,
            ..._detailOptions,
            ..._configurationOptions,
            ..._systemOptionValues,
            ..._detailOptionValues,
            ..._configurationOptionValues,
            ..._systemDetails,
            ..._detailConfigurations,
            ..._configurationParts,
        ].reduce((map, item, i, allItems) => {
            // configuration parts are the only items that dont have path and that do have id
            const { path, id } = item;
            const parentPath = getParentPath(item);
            // console.log({parentPath, item})
            const {
                [path]: previousItem,
                parts,
                parts: {
                    [id]: previousPart
                } = {},
                parents,
                parents: {
                    [parentPath]: siblings = [],
                } = {},
            } = map;
            if (previousItem || previousPart) throw new Error(`Duplicate item in SystemMap: ${path || id}`);
            return {
                ...map,
                ...(path ?
                    {
                        [path]: item,
                    } : {
                        parts: {
                            ...parts,
                            [id]: item,
                        },
                    }),
                parents: {
                    ...parents,
                    [parentPath]: siblings
                        .concat(item)
                        .sort(({ __typename, path: sib1Path }, { path: sib2Path }) => __typename.match(/value$/i) ?
                            sib1Path < sib2Path ? -1 : 1
                            :
                            0),
                },
                allItems,
                undefined: undefined,
            };
        }, {}));
    }
}

import getLastItemFromPath from "./get-last-item-from-path";
import { getAllInstancesOfItem } from "../system";
import getChildren from "./get-children";

export default window.canItemBeGrouped = ({ path, __typename }, systemMap) => {
    const itemName = getLastItemFromPath(path);
    const allInstances = getAllInstancesOfItem({ path, __typename }, systemMap);
    const values = getChildren({ path }, systemMap).map(value => getLastItemFromPath(value.path));
    const [defaultValueKey, defaultValue] = Object.entries(systemMap[path]).find(([key]) => key.match(/default/i)) || [];

    return allInstances.every(optionPath => {
        const childrenValues = getChildren({ path: optionPath }, systemMap);
        const [optionDefaultKey, optionDefaultValue] = Object.entries(systemMap[optionPath]).find(([key]) => key.match(/default/i)) || [];
        return defaultValue === optionDefaultValue
            &&
            childrenValues.length === values.length
            &&
            childrenValues.every(value => values.includes(getLastItemFromPath(value.path)));
    });
}

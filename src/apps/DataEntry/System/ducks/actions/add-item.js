import { getParentPathFromObject } from "../../../../../app-logic/system";

const getFakeId = (() => {
    var fakeId = -1;
    return () => fakeId--;
})();

export default function ADD_ITEM(systemInput, payload) {
    const { __typename } = payload;

    const newItemsKey = `new${__typename}s`
    const { [newItemsKey]: newItemsArray = [] } = systemInput;

    // console.log({
    //     payload,
    //     newItemsKey,
    // })

    return {
        ...systemInput,
        [newItemsKey]: newItemsArray.concat(
            {
                ...payload,
                fakeId: getFakeId(),
            }),
    };
}

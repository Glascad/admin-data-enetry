import { getChildren, getDefaultPath } from "../../../../../../../app-logic/system-utils";

export default function SELECT_SYSTEM_SET_OPTION_VALUE(queryResult, systemSetUpdate, { systemOptionValuePath, systemMap }) {

    const detailOptionValues = getChildren({ path: systemOptionValuePath }, systemMap)
        .map(dov => ({
            newPath: getDefaultPath(dov, systemMap),
        }));

    const configurationOptionValues = detailOptionValues
        .reduce((covs, dov) => covs.concat(getChildren(dov, systemMap)
            .map(cov => ({
                newPath: getDefaultPath(cov, systemMap),
            }))), []);

    const result = {
        ...systemSetUpdate,
        systemOptionValuePath,
        detailOptionValues,
        configurationOptionValues,
    };
    console.log({ systemOptionValuePath, systemMap });
    console.log(result);
    return result;
}

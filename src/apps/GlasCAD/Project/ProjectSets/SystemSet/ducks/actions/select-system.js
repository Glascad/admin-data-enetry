
export default function SELECT_SYSTEM({ allSystems }, systemSetUpdate, { systemName }) {

    const { id: systemId } = allSystems.find(({ name }) => name === systemName) || {};

    if (!systemId) throw new Error(`Cannot find system with name: ${systemName}`);

    const result = {
        ...systemSetUpdate,
        systemId,
        systemOptionValuePath: undefined,
        detailOptionValues: undefined,
        configurationOptionValues: undefined,
    };
    console.log(result);
    return result;
}

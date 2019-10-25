
export default function SELECT_SYSTEM({ allSystems }, systemSetUpdate, { systemName }) {

    const { id: systemId } = allSystems.find(({ name }) => name === systemName) || {};

    if (!systemId) throw new Error(`Cannot find system with name: ${systemName}`);

    return {
        ...systemSetUpdate,
        systemId,
        optionGroupValues: undefined,
        systemOptionValuePath: undefined,
        detailOptionValues: undefined,
        configurationOptionValues: undefined,
    };
}

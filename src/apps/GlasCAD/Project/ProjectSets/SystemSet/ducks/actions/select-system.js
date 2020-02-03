
export default function SELECT_SYSTEM({ allSystems }, systemSetUpdate, systemName) {
    console.log(arguments);

    const { id: systemId } = allSystems.find(({ name }) => name === systemName) || {};

    if (!systemId) throw new Error(`Cannot find system with name: ${systemName}`);

    return {
        ...systemSetUpdate,
        name: systemName,
        systemId,
        optionGroupValues: undefined,
        systemOptionValuePath: undefined,
        details: undefined,
        configurations: undefined,
    };
}

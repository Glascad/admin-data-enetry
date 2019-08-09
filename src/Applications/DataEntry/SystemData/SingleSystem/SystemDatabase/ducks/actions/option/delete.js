export default ({
    system,
    system: {
        systemOptions,
        systemOptionsToDelete,
    }
}, {
    name,
}) => {
    // console.log(arguments);
    const createdOption = systemOptions
        .find(o => o.name === name);
    // remove option from state
    if (createdOption) {
        // check if option previously existed
        if (typeof createdOption.id === 'string') {
            // only remove from options if option did not previously exist
            return {
                system: {
                    ...system,
                    systemOptions: systemOptions
                        .filter(option => option !== createdOption),
                },
            };
        } else {
            // remove update from options and add to delete array if did previously exist
            return {
                system: {
                    ...system,
                    systemOptions: systemOptions
                        .filter(option => option !== createdOption),
                    systemOptionsToDelete: systemOptionsToDelete.concat(name)
                },
            };
        }
    } else {
        // add option to list of deletions
        return {
            system: {
                ...system,
                systemOptionsToDelete: systemOptionsToDelete.concat(name)
            },
        };
    }
}

export default window.getOptionGroupValuesByOptionName = (optionName, systemMap) => Object.keys(systemMap)
    .reduce((values, key) => values.concat((
        key.match(new RegExp(`^.*\\.${optionName}\\.(\\w+)\\..*$`)) || []
    )[1] || []), []);

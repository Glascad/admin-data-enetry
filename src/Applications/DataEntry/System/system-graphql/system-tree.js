
import sampleSystem from './sample-system.json';

function systemOptionValueTree(systemOptionValue, system) {
    
}

function systemOptionTree(systemOption, system) {
    const { _systemOptionValues = [] } = systemOption;
    const branches = _systemOptionValues.map(sov => systemOptionValueTree(sov, system));
    return {
        item: systemOption,
        branches,
    };
}

export default function systemTree(system) {
    const {
        _systemOptions = [],
        _detailOptions = [],
        _configurationOptions = [],
    } = system;

    const firstItem = _systemOptions.find(({ parentSystemOptionValueId }) => !parentSystemOptionValueId) || {};

    return systemOptionTree(firstItem, system);
}

console.log(systemTree(sampleSystem));

import { getChildren, getConfigurationTypeFromPath, getDefaultPath } from ".";
import { match, Matrix } from "../../utils";
import { getPartExtremities, joinExtremities } from "../../utils/functions/svg-utils";

const getDetailOrConfigurationOrPartExtremities = (item = {}, selectedConfigurationPaths, systemMap) => match(item.__typename)
    .equals(undefined)
    .equals('ConfigurationPart', () => getPartExtremities(item._part, item.transform))
    .regex(/Configuration/, () => {

        const { path, transform } = item;

        const configurationType = getConfigurationTypeFromPath(path);
        const selectedConfigurationPath = (selectedConfigurationPaths || {})[configurationType] || '';
        const configurationPath = selectedConfigurationPath.startsWith(path) ?
            selectedConfigurationPath
            :
            getDefaultPath(path, systemMap);

        const configuration = systemMap[configurationPath];

        const parts = getChildren(configuration, systemMap);

        const configurationTransform = new Matrix(transform);

        const partExtremities = parts.map(({ _part, transform: partTransform }) => {
            console.log({
                partTransform,
                item,
                configurationPath,
                configurationType,
                selectedConfigurationPaths,
                configuration,
                parts,
                configurationTransform,
            });
            const newTransform = transform ?
                configurationTransform.applyTransformation(partTransform)
                :
                partTransform;

            return getPartExtremities(_part, newTransform);
        });

        return joinExtremities(partExtremities);

    })
    .regex(/Detail/, () => {

        const { path } = item;

        const detailPath = getDefaultPath(path, systemMap);
        const detail = systemMap[detailPath];
        const configurations = getChildren(detail, systemMap);
        const configurationTypes = Object.keys(selectedConfigurationPaths);

        const configurationExtremities = configurations
            .filter(({ path }) => configurationTypes.includes(getConfigurationTypeFromPath(path)))
            .map(configuration => getDetailOrConfigurationOrPartExtremities(configuration, selectedConfigurationPaths, systemMap));

        return joinExtremities(configurationExtremities);
    })
    .otherwise(__typename => {
        throw new Error(`Can only join SystemDetail, DetailConfiguration, or ConfigurationPart. Received: ${__typename}`);
    });

export default getDetailOrConfigurationOrPartExtremities;

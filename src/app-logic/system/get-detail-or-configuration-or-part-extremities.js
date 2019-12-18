import { getChildren, getConfigurationTypeFromPath } from ".";
import { Matrix, match } from "../../utils";
import { getCoordinateExtremities, getPartExtremities, getTransformedPartCoordinates, joinExtremities } from "../../utils/functions/svg-utils";

const getDetailOrConfigurationOrPartExtremities = (item = {}, selectedConfigurationPaths, systemMap) => match(item.__typename, item)
    .against({
        ConfigurationPart: (_, { _part, transform }) => getPartExtremities(_part, transform),
        DetailConfiguration: (_, { path, transform }) => {

            const configurationType = getConfigurationTypeFromPath(path);
            const configurationPath = selectedConfigurationPaths[configurationType];
            const configuration = systemMap[configurationPath];

            const parts = getChildren(configuration, systemMap);

            const configurationTransform = new Matrix(transform);

            const partExtremities = parts.map(({ _part, transform: partTransform }) => {
                const newTransform = transform ?
                    configurationTransform.applyTransformation(partTransform)
                    :
                    partTransform;

                return getPartExtremities(_part, newTransform);
            });

            return joinExtremities(partExtremities);

        },
        SystemDetail: (_, detail) => {

            const configurations = getChildren(detail, systemMap);
            const configurationTypes = Object.keys(selectedConfigurationPaths);

            const configurationExtremities = configurations
                .filter(({ path }) => configurationTypes.includes(getConfigurationTypeFromPath(path)))
                .map(configuration => getDetailOrConfigurationOrPartExtremities(configuration, selectedConfigurationPaths, systemMap));

            // console.log({
            //     detail,
            //     configurations,
            //     configurationTypes,
            //     configurationExtremities
            // });

            return joinExtremities(configurationExtremities);
        },
        undefined: () => { },
    })
    .otherwise(__typename => {
        throw new Error(`Can only join SystemDetail, DetailConfiguration, or ConfigurationPart. Received: ${__typename}`);
    });

export default getDetailOrConfigurationOrPartExtremities;

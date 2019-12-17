import { getChildren, getConfigurationTypeFromPath } from ".";
import { Matrix } from "../../utils";
import { getCoordinateExtremities, getPartExtremities, getTransformedPartCoordinates } from "../../utils/functions/svg-utils";

export default (item, selectedConfigurationPaths, systemMap) => {
    const {
        __typename,
        transform,
        _part,
        path,
    } = item;

    console.log({
        __typename,
        transform,
        _part,
        path,
    });

    if (__typename === 'ConfigurationPart') return getPartExtremities(_part, transform);
    else {
        const configurationType = getConfigurationTypeFromPath(path);
        const configurationPath = selectedConfigurationPaths[configurationType];
        const configuration = systemMap[configurationPath];

        const parts = getChildren(configuration, systemMap);

        console.log({ parts });

        const coordinates = parts.reduce((allCoordinates, {
            _part,
            transform: partTransform,
        }) => allCoordinates.concat(
            getTransformedPartCoordinates(
                _part,
                transform ?
                    new Matrix(transform).applyTransformation(partTransform)
                    :
                    partTransform,
            ),
        ), []);

        console.log({ coordinates });

        return getCoordinateExtremities(coordinates);
    }
}

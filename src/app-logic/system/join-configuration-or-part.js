import { getChildren, getConfigurationTypeFromPath } from ".";
import { Matrix } from "../../utils";
import { getCoordinateExtremities, getPartExtremities, getTransformedPartCoordinates } from "../../utils/functions/svg-utils";
import { exists } from "fs";

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

        const configurationTransform = new Matrix(transform);

        console.log({ configurationTransform });

        const coordinates = parts.reduce((allCoordinates, {
            _part,
            transform: partTransform,
        }) => {

            console.log({ partTransform });

            const newTransform = transform ?
                configurationTransform.applyTransformation(partTransform)
                :
                partTransform;
            
            console.log({ newTransform });

            return allCoordinates.concat(
                getTransformedPartCoordinates(
                    _part,
                    newTransform,
                ),
            )
        }, []);

        console.log({ coordinates });

        const extremities = getCoordinateExtremities(coordinates);

        console.log({ extremities });

        return extremities;
    }
}

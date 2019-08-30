import React, {useRef, useState} from 'react';
import { Tree, TransformBox } from '../../../../../components';
import { makeRenderable } from '../ducks/utils';
import { match } from '../../../../../utils';
import TransformViewPort from '../../../../../components/contexts/transform/TransformViewport';

export default function SystemTree({
    system,
}) {
    const transformationRef = useRef();

    TransformViewPort({ transformationRef });

    const trunk = makeRenderable(system);

    return (
        <TransformBox
            id="SystemTree"
        >
            <Tree
                trunk={trunk}
                renderItem={({ name, detailType, configurationType, __typename } = {}, { depth }) => match(__typename)
                    .against({
                        SystemOption: () => <span>{name || detailType || configurationType}</span>,
                        DetailOption: () => <span>{name || detailType || configurationType}</span>,
                        ConfigurationOption: () => <span>{name || detailType || configurationType}</span>,
                        SystemOptionValue: () => <span>{name || detailType || configurationType}</span>,
                        DetailOptionValue: () => <span>{name || detailType || configurationType}</span>,
                        ConfigurationOptionValue: () => <span>{name || detailType || configurationType}</span>,
                        SystemDetailType: () => <span>{name || detailType || configurationType}</span>,
                        SystemConfigurationType: () => <span>{name || detailType || configurationType}</span>,
                        undefined: () => null,
                    })
                    .otherwise(() => { throw new Error(`Unknown typename: ${__typename}`) })}
            />
        </TransformBox>
    );
}

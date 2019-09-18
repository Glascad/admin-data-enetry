import React, { } from 'react';
import { TitleBar, useQuery, Select, Input, CollapsibleTitle, GroupingBox } from '../../../../../components';
import gql from 'graphql-tag';
import F from '../../../../../schemas';
import { parseSearch } from '../../../../../utils';
import { getParentTrail, getParent, getChildren } from '../../../../../application-logic/system-utils';

const query = gql`query SystemSet($systemSetId: Int!) {
    systemSetById(id: $systemSetId) {
        ...EntireSystemSet
    }
} ${F.PRJ.ENTIRE_SYSTEM_SET}`;

export default function SystemSets({
    location: {
        search,
    },
}) {
    const { systemSetId } = parseSearch(search);

    console.log(arguments[0]);

    const [fetchQuery, queryResult] = useQuery({ query, variables: { systemSetId: +systemSetId } });

    console.log({ queryResult, fetchQuery });

    const {
        _systemSet: {
            name,
            systemOptionValueId,
            _system = {},
            _system: {
                name: systemName,
                _systemOptionValues = [],
            } = {},
            allSystems = [],
        } = {},
    } = queryResult;

    const systemOptionValue = _systemOptionValues.find(({ id }) => id === systemOptionValueId);

    console.log({ systemOptionValue });

    const parentTrail = getParentTrail(systemOptionValue, _system);

    console.log({ parentTrail });

    const details = getChildren(systemOptionValue, _system);

    return (
        <>
            <TitleBar
                title="System Set"
                selections={[name]}
            />
            <div className="card">
                <CollapsibleTitle
                    title="System Set Info"
                >
                    <Select
                        data-cy="system-name"
                        label="System Name"
                        value={systemName}
                        options={allSystems.map(({ name }) => name)}
                        onChange={() => { }}
                    />
                    <Input
                        data-cy="system-set-name"
                        label="System Set Name"
                        value={name}
                        onChange={() => { }}
                    />
                </CollapsibleTitle>
                <CollapsibleTitle
                    title="Options"
                >
                    {parentTrail.map((sov, i) => {
                        const parent = getParent(sov, _system);
                        const siblings = getChildren(parent, _system);
                        return (
                            <Select
                                key={sov.name}
                                data-cy={`system-option-${i + 1}`}
                                label={parent.name}
                                value={sov.name}
                                options={siblings.map(({ name }) => name)}
                            />
                        );
                    })}
                </CollapsibleTitle>
                <CollapsibleTitle
                    title="Details"
                >
                    <div
                        className="input-group"
                    >
                        {details.map(({ detailType }) => (
                            <GroupingBox
                                title={detailType}
                            >

                            </GroupingBox>
                        ))}
                    </div>
                </CollapsibleTitle>
            </div>
        </>
    );
}

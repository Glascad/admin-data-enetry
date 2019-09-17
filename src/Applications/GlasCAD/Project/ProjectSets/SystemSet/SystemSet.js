import React, { } from 'react';
import { TitleBar, useQuery, Select } from '../../../../../components';
import gql from 'graphql-tag';
import F from '../../../../../schemas';
import { parseSearch } from '../../../../../utils';
import { getParentTrail } from '../../../../../application-logic/system-utils';

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
            systemOptionValueId,
            _system,
            _system: {
                _systemOptionValues = [],
            } = {},
        } = {},
    } = queryResult;

    const systemOptionValue = _systemOptionValues.find(({ id }) => id === systemOptionValueId);

    console.log({ systemOptionValue });

    const parentTrail = getParentTrail(systemOptionValueId, _system);

    console.log({ parentTrail });

    return (
        <div className="card">
            <TitleBar
                title="System Set"
            />
            
        </div>
    );
}

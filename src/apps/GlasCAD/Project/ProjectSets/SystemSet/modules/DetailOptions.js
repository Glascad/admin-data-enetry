import React from 'react';
import { getChildren, getLastItemFromPath } from '../../../../../../app-logic/system';
import { Select } from '../../../../../../components';
import { SELECT_DETAIL_OPTION_VALUE } from '../ducks/actions';

export default function DetailOptions({
    optionList,
    _optionGroups,
    detailType,
    detailOptionValuePath,
    systemMap,
    dispatch,
}) {
    return optionList.map(({ name, value }) => !_optionGroups.some(og => og.name === name) ? (
        <Select
            data-cy={`${detailType}.${name}`}
            key={name}
            label={name}
            value={value}
            options={getChildren({
                path: detailOptionValuePath.replace(new RegExp(`${name}\\.${value}.*$`), name)
            }, systemMap).map(({ path }) => getLastItemFromPath(path))}
            onChange={newValue => dispatch(SELECT_DETAIL_OPTION_VALUE, [
                `${detailOptionValuePath.replace(value, newValue)}`.replace(new RegExp(`(^.*${newValue}).*$`), '$1'),
                systemMap,
            ])}
        />
    )
        :
        null
    );
}

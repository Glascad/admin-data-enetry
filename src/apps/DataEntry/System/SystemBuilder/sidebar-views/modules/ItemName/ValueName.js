import React, { memo } from 'react';
import { Select, confirmWithModal } from '../../../../../../../components';
import { UPDATE_ITEM } from '../../../../ducks/actions';
import { getAllInstancesOfItem, getSiblings, getParent, getLastItemFromPath } from '../../../../../../../app-logic/system-utils';

export default memo(function ValueName({
    item,
    item: {
        path,
        __typename = '',
    },
    itemName,
    optionIsGrouped,
    children,
    dispatch,
    systemMap,
    queryResult: {
        validOptions = [],
    },
}) {

    const valueParentOption = getParent(item, systemMap);
    const {
        path: oPath,
        __typename: oTypename,
    } = valueParentOption;

    const oName = getLastItemFromPath(oPath);

    const valueSiblings = getSiblings(item, systemMap);
    const validValues = validOptions
        .reduce((valueSiblings, { name, _validOptionValues }) => (
            oName.toLowerCase() === name.toLowerCase() ?
                _validOptionValues
                :
                valueSiblings
        ), []);

    const selectOptions = validValues
        .filter(({ name }) => !valueSiblings.some(v => getLastItemFromPath(v.path) === name))
        .map(({ name }) => name);

    return (
        <Select
            label="Option Value"
            value={itemName}
            data-cy="edit-value-name"
            options={selectOptions}
            onChange={name => {
                if (name !== itemName) {
                    const updateOptionValue = () => dispatch(UPDATE_ITEM, {
                        path,
                        __typename,
                        update: {
                            name,
                        },
                    });
                    const updateValueFromEachOption = () => {
                        getAllInstancesOfItem({ path, __typename }, systemMap)
                            .forEach(instance => {
                                const item = systemMap[instance];
                                dispatch(UPDATE_ITEM, {
                                    path: item.path,
                                    __typename: item.__typename,
                                    update: {
                                        name,
                                    },
                                }, {
                                    replaceState: true
                                });
                            });
                    };
                    optionIsGrouped ?
                        confirmWithModal(updateValueFromEachOption, {
                            titleBar: { title: `Delete Grouped Option Value` },
                            children: 'Are you Sure?',
                            finishButtonText: 'Change',
                        })
                        :
                        children.length > 0 ?
                            confirmWithModal(updateOptionValue, {
                                titleBar: { title: `Change ${itemName}?` },
                                children: 'Are you Sure?',
                                finishButtonText: 'Change',
                            })
                            :
                            updateOptionValue();
                }
            }}
        />
    );
});

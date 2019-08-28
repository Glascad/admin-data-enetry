import React from 'react';

import {
    Input,
    ListWrapper,
    TitleBar,
} from '../../../../../../components';

import { normalCase } from '../../../../../../utils';

import {
    CREATE_OPTION,
    DELETE_OPTION,
    CREATE_VALUE,
    DELETE_VALUE,
} from '../ducks/actions';

export default function SystemOptions({
    system: {
        _systemOptions = [],
    },
    queryStatus: {
        validSystemOptions = [],
        // allConfigurationTypes = [],
    },
    queryStatus,
    // presentationLevels,
    updateSystem,
}) {
    console.log(arguments[0]);
    return (
        <ListWrapper
            titleBar={{
                title: "System Options"
            }}
            items={_systemOptions.map(o => ({
                ...o,
                title: o.name,
            }))}
            identifier='title'
            multiSelect={{
                allItems: validSystemOptions.map(o => ({
                    ...o,
                    title: o.name,
                    // type: 'tile',
                    // align: 'left',
                    // children: (o._validOptionValues || []).map(({ name }) => (
                    //     <div>{normalCase(name)}</div>
                    // )),
                })),
            }}
            onCreate={({ name }) => updateSystem(CREATE_OPTION, { name })}
            onDelete={({ name }) => updateSystem(DELETE_OPTION, { name })}
        >
            {({
                name: optionName,
                _optionValues = [],
            }) => (
                    // <>
                    //     {/* <TitleBar
                    //         title="Option"
                    //         selections={[name]}
                    //     /> */}
                    //     {/* <div className="input-group">
                    //         <Input
                    //             label="Presentation Level"
                    //             value={presentationLevel}
                    //             select={{
                    //                 value: {
                    //                     label: presentationLevel,
                    //                     value: presentationLevel,
                    //                 },
                    //                 options: presentationLevels.map(({ name }) => ({
                    //                     value: name,
                    //                     label: name,
                    //                 })),
                    //                 onChange: ({ value }) => updateSystem(UPDATE_OPTION_LIST, {
                    //                     optionId,
                    //                     presentationLevel: value,
                    //                 }),
                    //             }}
                    //         />
                    //         <Input
                    //             label="Override Level"
                    //             value={overrideLevel}
                    //             select={{
                    //                 value: {
                    //                     label: overrideLevel,
                    //                     value: overrideLevel,
                    //                 },
                    //                 options: presentationLevels.map(({ name }) => ({
                    //                     value: name,
                    //                     label: name,
                    //                 })),
                    //                 onChange: ({ value }) => updateSystem(UPDATE_OPTION_LIST, {
                    //                     optionId,
                    //                     overrideLevel: value,
                    //                 }),
                    //             }}
                    //         />
                    //     </div> */}
                    //     {/* <ListWrapper
                    //         title="Affected Configuration Types"
                    //         items={_systemOptionConfigurationTypes
                    //             .map(({ nodeId, _configurationType }) => ({
                    //                 systomOptionConfigurationTypeNID: nodeId,
                    //                 ..._configurationType,
                    //             }))}
                    //         mapPillProps={({ type }) => ({
                    //             title: type
                    //         })}
                    //         onFinish={({ addedItems, deletedItems }) => updateSystem(UPDATE_OPTION_LIST, {
                    //             optionId,
                    //             configurationTypeIds: {
                    //                 addedItems: addedItems.map(({ id }) => id),
                    //                 deletedItems: deletedItems.map(({ id }) => id),
                    //             },
                    //         })}
                    //         multiSelect={{
                    //             title: "",
                    //             allItems: allConfigurationTypes,
                    //         }}
                    //     /> */}
                    <ListWrapper
                        titleBar={{
                            title: "Values"
                        }}
                        identifier='title'
                        items={(_optionValues.map(v => ({
                            ...v,
                            title: v.name,
                        })))}
                        // onCreate={args => console.log(args)}
                        onCreate={({ name }) => updateSystem(CREATE_VALUE, { optionName, name })}
                        onDelete={({title: name}) => updateSystem(DELETE_VALUE, { optionName, name })}
                        multiSelect={{
                            allItems: (validSystemOptions
                                .reduce(((items, { name, _validOptionValues = [] }) => items.length || (name !== optionName) ?
                                    items
                                    :
                                    _validOptionValues
                                ), []))
                                .map(v => ({
                                    ...v,
                                    title: v.name,
                                }))
                        }}
                    />
                )}
        </ListWrapper>
    );
}

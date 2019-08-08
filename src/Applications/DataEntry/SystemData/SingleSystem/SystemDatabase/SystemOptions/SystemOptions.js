import React from 'react';

import {
    Input,
    ListWrapper,
    TitleBar,
} from '../../../../../../components';

import { normalCase } from '../../../../../../utils';

import {
    CREATE_OPTION,
    // UPDATE_OPTION,
    DELETE_OPTION,
    CREATE_VALUE,
    // UPDATE_VALUE,
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
            title="System Options"
            // identifier="id"
            items={_systemOptions.map(o => ({
                ...o,
                title: o.name,
            }))}
            multiSelect={{
                allItems: validSystemOptions.map(o => ({
                    ...o,
                    title: o.name,
                    // type: 'tile',
                    // align: 'left',
                    // children: (o._validOptionValues || []).map(({ valueName }) => (
                    //     <div>{normalCase(valueName)}</div>
                    // )),
                })),
            }}
            onCreate={({ name }) => updateSystem(CREATE_OPTION, { name })}
            // onUpdate={({ arguments: { id } }, { input }) => updateSystem(UPDATE_OPTION, {
            //     optionId: id,
            //     name: input,
            // })}
            onDelete={({ name }) => updateSystem(DELETE_OPTION, { name })}
        >
            {({
                id: optionId,
                name: optionName,
                // presentationLevel,
                // overrideLevel,
                // _systemOptionConfigurationTypes = [],
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
                    //                 onChange: ({ value }) => updateSystem(UPDATE_OPTION, {
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
                    //                 onChange: ({ value }) => updateSystem(UPDATE_OPTION, {
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
                        title="Values"
                        // identifier="id"
                        // items={_optionValues.map(v => ({
                        //     ...v,
                        //     title: v.name,
                        // }))}
                        items={(validSystemOptions
                            .reduce(((items, { name, _validOptionValues = [] }) => items.length || (name !== optionName) ?
                                items
                                :
                                _validOptionValues
                            ), []))
                            .map(v => ({
                                ...v,
                                title: v.valueName,
                            }))}
                        defaultPillProps={{
                            onSelect: ({ valueName }) => updateSystem(CREATE_VALUE, {
                                optionId,
                                name: valueName,
                            }),
                        }}
                        // mapPillProps={({ name, id }) => ({
                        //     title: name,
                        // })}
                        // multiSelect={{
                        //     allItems: (validSystemOptions
                        //         .reduce(((items, { name, _validOptionValues = [] }) => items || (
                        //             (name === optionName)
                        //             &&
                        //             _validOptionValues
                        //         )), null)
                        //         || [])
                        //         .map(v => ({
                        //             ...v,
                        //             title: v.valueName,
                        //         })),
                        // }}
                        // onUpdate={({ arguments: { id } }, { input }) => updateSystem(UPDATE_VALUE, {
                        //     optionId,
                        //     valueId: id,
                        //     name: input,
                        // })}
                        onDelete={({ arguments: { id } }) => updateSystem(DELETE_VALUE, {
                            optionId,
                            valueId: id,
                        })}
                    />
                    // </>
                )}
        </ListWrapper>
    );
}

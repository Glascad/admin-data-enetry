import React from 'react';
import { Input, ListWrapper, Toggle, TitleBar } from '../../../../../../components';
import { SELECT_OPTION_VALUE } from '../ducks/actions';

SystemSetOptions.navigationOptions = {
    path: "/options",
    name: "System Options",
};

export default function SystemSetOptions({
    // change to get `systemSet` directly from props
    queryResult: {
        _systemSet: {
            // selectedOptionValues = [],
            _systemSetOptionValues = [],
            _system: {
                _systemOptions = [],
            } = {},
        } = {},
    },
    dispatch,
}) {
    // console.log(arguments[0]);
    return (
        <>
            {_systemOptions.map(({ name, _optionValues }) => (
                <>
                    <Input
                        label={name}
                        select={{
                            value: (() => {
                                const selectedValue = _systemSetOptionValues.find(({ optionName }) => optionName === name)
                                    ||
                                    _optionValues[0]
                                    ||
                                    {};
                                return {
                                    label: selectedValue.name,
                                    value: selectedValue.name,
                                };
                            })(),
                            options: _optionValues.map(({ name }) => ({
                                value: name,
                                label: name,
                            })),
                        }}
                    />
                    {/* <Toggle
                        label={name}
                        buttons={_optionValues.map(v => ({
                            text: v.name,
                            selected: false,
                        }))}
                    // buttons={[
                    //     {
                    //         text: name,
                    //         selected: false,
                    //         // className,
                    //     },
                    // ]}
                    /> */}
                </>
                // <ListWrapper
                //     key={name}
                //     titleBar={{
                //         title: name,
                //     }}
                //     items={_optionValues.map(v => ({
                //         ...v,
                //         title: v.name,
                //     }))}
                // />
            ))}
            {/* {selectedOptionValues.map(({
                systemOption: {
                    id,
                    name,
                },
                selectedValueId,
                optionValues = [],
                optionValues: {
                    length,
                } = [],
            }) => (
                    <Input
                        key={id}
                        label={name}
                        select={{
                            value: {
                                value: selectedValueId,
                                label: (optionValues.find(({ id }) => id === selectedValueId) || {}).name,
                            },
                            options: optionValues.map(({ id, name }) => ({
                                value: id,
                                label: name,
                            })),
                            onChange: ({ value }) => dispatch(SELECT_OPTION_VALUE, {
                                optionId: id,
                                valueId: value,
                            }),
                        }}
                    />
                ))} */}
        </>
    );
}

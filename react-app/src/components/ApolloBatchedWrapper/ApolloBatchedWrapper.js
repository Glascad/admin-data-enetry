import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ApolloWrapper from '../ApolloWrapper/ApolloWrapper';
import HeadedContainer from '../HeadedContainer/HeadedContainer';
import Input from '../Input/Input';
import MultiSelect from '../MultiSelect/MultiSelect';
import SelectionWrapper from '../SelectionWrapper/SelectionWrapper';
import ListContainer from '../ListContainer/ListContainer';
import Pill from '../Pill/Pill';


const shallowEquals = (obj1, obj2) => typeof obj1 === 'object' && typeof obj2 === 'object' ?
    Object.keys(obj1).reduce((equal, key) => equal && obj1[key] === obj2[key], true)
    :
    obj1 === obj2;


class BatchedWrapper extends Component {

    static propTypes = {
        // getInitialState: PropTypes.func,
        inputs: PropTypes.array,
    };

    // state = this.props.getInitialState ?
    //     this.props.getInitialState(this.props.queryStatus.data)
    //     :
    //     {};

    getInitialState = () => this.props.inputs.reduce((
        state,
        {
            label,
            multiSelect,
            extractValue
        }) => ({
            ...state,
            [label]: multiSelect ? [] : extractValue({}),
        }),
        {});

    state = this.getInitialState();

    componentDidUpdate = ({
        apollo: {
            queryStatus: {
                data
            }
        }
    }) => {
        this.props.inputs.forEach(({
            multiSelect,
            label,
            extractValue,
        }) => {
            if (!multiSelect) {
                const oldValue = extractValue(data);
                const newValue = extractValue(this.props.apollo.queryStatus.data);
                if (!shallowEquals(oldValue, newValue)) {
                    this.setState({
                        [label]: newValue,
                        n: console.log({
                            [label]: newValue,
                            [`old-${label}`]: oldValue,
                        })
                    });
                }
            } else {

            }
        });
    }

    handleChange = label => ({ target: { value } }) => this.setState({
        [label]: value
    });

    handleCheckChange = label => ({ target: { checked } }) => this.setState({
        [label]: checked
    });

    handleSelectChange = label => value => this.setState({
        [label]: value
    });

    handleBlur = () => {

    }

    // handleReset = () => this.setState(this.componentDidUpdate({
    //     apollo: {
    //         queryStatus: {
    //             data: {}
    //         }
    //     }
    // }));

    render = () => {
        const {
            state,
            props: {
                apollo,
                apollo: {
                    queryStatus: {
                        data: queryData,
                    },
                },
                inputs = [],
            },
            handleChange,
            handleCheckChange,
            handleSelectChange,
        } = this;

        console.log(this);
        console.log(apollo);

        return (
            <HeadedContainer
                title="System Info"
            >
                {inputs.map(({
                    label,
                    type,
                    extractValue,
                    extractOptions,
                    multiSelect,
                    ...input
                }) => (multiSelect ?
                    <SelectionWrapper
                        key={label}
                    >
                        {selection => (
                            <div>
                                <ListContainer
                                    items={[]}
                                    renderItem={({ }) => (
                                        <Pill

                                        />
                                    )}
                                    addButton={{

                                    }}
                                />
                                {/* <MultiSelect
                                    {...multiSelect}
                                /> */}
                            </div>
                        )}
                    </SelectionWrapper>
                    :
                    <Input
                        key={label}
                        label={label}
                        type={type}
                        value={state[label]}
                        onChange={type === "checkbox" ?
                            handleCheckChange(label)
                            :
                            handleChange(label)}
                        select={type === "select" ? {
                            value: state[label],
                            options: extractOptions(queryData),
                            onChange: handleSelectChange(label),
                        } : undefined}
                        {...input}
                    />
                    ))}
            </HeadedContainer>
        );
    }
}

export default function ApolloBatchedWrapper({
    apolloProps,
    ...props
}) {
    return (
        <ApolloWrapper
            {...apolloProps}
        >
            {apollo => (
                <BatchedWrapper
                    {...props}
                    apollo={apollo}
                />
            )}
        </ApolloWrapper>
    );
}

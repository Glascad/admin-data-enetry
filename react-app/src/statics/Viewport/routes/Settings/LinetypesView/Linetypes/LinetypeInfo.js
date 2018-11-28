import React, { Component } from 'react';
import Select from 'react-select';

import {
    HeadedContainer,
    ListContainer,
} from '../../../../../../components';

export default class LinetypeInfo extends Component {

    state = {
        lineWeight: 0,
        pattern: [],
    };

    componentDidUpdate = ({ linetype: { nodeId } }) => {
        if (nodeId !== this.props.linetype.nodeId) {
            this.setState({
                lineWeight: this.props.linetype.lineWeight,
                pattern: this.props.linetype.pattern.split(" "),
            });
        }
    }

    render = () => {
        const {
            state: {
                lineWeight,
                pattern,
            },
            props: {
                linetype: {
                    name,
                },
                lineWeights,
            }
        } = this;

        console.log(this);

        const selectOptions = lineWeights
            .map(({
                name,
                weight,
            }) => ({
                value: weight,
                label: name
            }));

        const selectValue = selectOptions.find(({ value }) => value === lineWeight);

        return (
            <HeadedContainer
                title={`Linetype - ${name || ''}`}
                nestLevel={1}
            >
                <h6>Line Weight</h6>
                <Select
                    options={selectOptions}
                    value={selectValue}
                    onChange={({ value }) => this.setState({
                        lineWeight: value
                    })}
                />
                <ListContainer
                    className="pattern"
                    items={pattern}
                    renderItem={((weight, i) => (
                        <div
                            key={i}
                        >
                            <h6>{i % 2 === 0 ? "Dash" : "Gap"}</h6>
                            <input
                                value={weight}
                                onChange={console.log}
                            />
                        </div>
                    ))}
                    addButton={{
                        onAdd: console.log
                    }}
                />
            </HeadedContainer>
        );
    }
}

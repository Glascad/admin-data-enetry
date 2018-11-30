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
                pattern: this.props.linetype.pattern
                    .split(" ")
                    .map(l => l || 0),
            });
        }
    }

    handleSelectChange = ({ value }) => this.setState({
        lineWeight: value
    });

    handleSelectBlur = () => {
        console.log(this.state);
        this.props.updateLinetype({
            variables: {
                nodeId: this.props.linetype.nodeId,
                lineWeight: this.state.lineWeight,
                pattern: this.state.pattern.join(" "),
            }
        });
    }

    handlePatternInput = i => ({ target: { value } }) => {
        this.setState({
            // Array.prototype.replace is in `public/index.html`
            pattern: this.state.pattern.replace(i, value)
        });
    }

    handleAddPatternSet = () => {
        const { pattern } = this.state;
        this.setState({
            pattern: pattern.length === 1 ?
                pattern.concat(0, 0, 0)
                :
                pattern.concat(0, 0)
        });
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
            },
            handleSelectChange,
            handleSelectBlur,
            handlePatternInput,
            handleAddPatternSet,
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

        const selectValue = selectOptions
            .find(({ value }) => value === lineWeight);

        return (
            <HeadedContainer
                title={`Linetype - ${name || ''}`}
                nestLevel={1}
            >
                <h6>Line Weight</h6>
                <Select
                    options={selectOptions}
                    value={selectValue}
                    onChange={handleSelectChange}
                    onBlur={handleSelectBlur}
                />
                <ListContainer
                    className="pattern"
                    items={pattern.length > 1 ?
                        pattern
                        :
                        pattern.length > 0 ?
                            pattern.concat(0)
                            :
                            pattern.concat(0, 0)}
                    renderItem={((length, i) => (
                        <li
                            key={i}
                        >
                            <h6>{i % 2 === 0 ? "Dash" : "Gap"}</h6>
                            <input
                                type="number"
                                value={length}
                                onChange={handlePatternInput(i)}
                            />
                        </li>
                    ))}
                    addButton={{
                        onAdd: handleAddPatternSet
                    }}
                />
            </HeadedContainer>
        );
    }
}

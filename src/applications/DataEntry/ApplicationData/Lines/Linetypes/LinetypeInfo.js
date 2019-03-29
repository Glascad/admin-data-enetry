import React, { Component } from 'react';

import {
    ListContainer,
    Input,
} from '../../../../../components';
import TitleBar from '../../../../../components/ui/TitleBar/TitleBar';

export default class LinetypeInfo extends Component {

    state = {
        lineWeight: 0,
        pattern: [],
    };

    componentDidUpdate = ({
        linetype: {
            nodeId,
            pattern,
            lineWeight
        }
    }, {
        pattern: prevStatePattern,
        lineWeight: prevStateLineWeight,
    }) => {
        if (
            nodeId !== this.props.linetype.nodeId
            ||
            pattern !== this.props.linetype.pattern
            ||
            (
                prevStatePattern === this.state.pattern
                &&
                pattern.trim() !== this.state.pattern.join(" ").trim()
            )
            ||
            lineWeight !== this.props.linetype.lineWeight
            ||
            (
                prevStateLineWeight === this.state.lineWeight
                &&
                lineWeight !== this.state.lineWeight
            )
        ) {
            this.setState({
                lineWeight: this.props.linetype.lineWeight,
                pattern: this.props.linetype.pattern
                    .split(" ")
                    .map(length => length || 0),
            });
        }
    }

    handleSelectChange = ({ value }) => this.setState({
        lineWeight: value
    });

    handleBlur = () => {
        this.props.updateItem({
            variables: {
                nodeId: this.props.linetype.nodeId,
                lineWeight: this.state.lineWeight,
                pattern: this.state.pattern
                    .join(" ")
                    .replace(/( +0*)*$/, ""),
            },
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

    blurOnEnter = ({ key, target }) => {
        if (key === "Enter") target.blur();
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
            handleBlur,
            blurOnEnter,
            handlePatternInput,
            handleAddPatternSet,
        } = this;

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
            <>
                <TitleBar
                    title="Linetype"
                    selections={[name]}
                />
                <Input
                    label="Line Weight"
                    select={{
                        options: selectOptions,
                        value: selectValue,
                        onChange: handleSelectChange,
                        onBlur: handleBlur,
                    }}
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
                        <Input
                            key={i}
                            tagname="li"
                            label={i % 2 === 0 ? "Dash" : "Gap"}
                            type="number"
                            value={length}
                            onChange={handlePatternInput(i)}
                            onBlur={handleBlur}
                            onKeyDown={blurOnEnter}
                        />
                    ))}
                    circleButton={{
                        onClick: handleAddPatternSet,
                    }}
                />
                <svg
                    height={lineWeight}
                    width="480"
                >
                    <line
                        x1="0"
                        y1="0"
                        x2="480"
                        y2="0"
                        stroke="black"
                        strokeWidth={lineWeight}
                        strokeDasharray={pattern.join(" ")}
                    />
                </svg>
            </>
        );
    }
}

import React, {
    Component,
    createRef,
} from 'react';

import Select from 'react-select';

// import FlipSwitch from '../FlipSwitch/FlipSwitch';

import './Input.scss';

export default class Input extends Component {

    ref = createRef();

    componentDidUpdate = ({ initialValue }) => {
        const {
            props: {
                initialValue: newValue
            }
        } = this;
        if (initialValue !== newValue) {
            this.ref.current.value = newValue
        }
    }

    componentDidMount = () => this.componentDidUpdate({}, {});

    blurOnEnter = ({ key, target }) => key === 'Enter' && target.blur();

    render = () => {
        const {
            props: allProps,
            props: {
                tagname = "div",
                label,
                type = "text",
                select,
                value,
                initialValue,
                checked = false,
                onChange,
                ...props
            },
            ref,
            blurOnEnter,
        } = this;

        if (
            value !== undefined
            &&
            initialValue !== undefined
        ) {
            throw new Error("Cannot must provide either `initialValue` or `value` but not both");
        }

        const tag = {
            name: type === "checkbox" ? "label" : tagname
        };

        const LABEL = label ? (
            <div
                className="label"
            >
                {label}
            </div>
        ) : null;

        const booleanTypes = [
            "switch",
            "checkbox",
        ];

        return (
            <tag.name
                className={`Input type-${type}`}
            >
                {!booleanTypes.includes(type) ? (
                    LABEL
                ) : null}
                {select ? (
                    <Select
                        {...select}
                        ref={ref}
                        className={`Select ${select.isMulti ? "multi" : ""}`}
                    />
                ) : (
                        <input
                            ref={ref}
                            type={type}
                            value={onChange ?
                                value || (
                                    type === 'text' ?
                                        ""
                                        :
                                        type === "number" ?
                                            0
                                            :
                                            undefined
                                ) : undefined}
                            checked={booleanTypes.includes(type) ?
                                checked
                                :
                                undefined}
                            onKeyDown={blurOnEnter}
                            onChange={onChange}
                            {...props}
                        />
                    )
                }
                {booleanTypes.includes(type) ? (
                    <>
                        <span
                            className={type === "checkbox" ?
                                "check"
                                :
                                "switch"}
                        />
                        {LABEL}
                    </>
                ) : null}
            </tag.name>
        );
    }
}

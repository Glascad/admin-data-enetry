import React, {
    Component,
    createRef,
} from 'react';

import Select from 'react-select';

// import FlipSwitch from '../FlipSwitch/FlipSwitch';

import './Input.scss';

export default class Input extends Component {

    static defaultProps = {
        tagname: "div",
        type: "text",
        checked: false,
    };

    keys = {};

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

    handleKeyDown = e => {
        const { key, altKey } = e;

        this.keys[key] = true;
        this.keys.Alt = altKey;

        this.blurOnEnter(e);

        if (this.props.onKeyDown) this.props.onKeyDown(e);
    }

    handleKeyUp = e => {
        const { key, altKey } = e;

        this.keys[key] = false;
        this.keys.Alt = altKey;

        if (this.props.onKeyUp) this.props.onKeyUp(e);
    }

    handleNumberChange = e => {
        const {
            target,
            target: {
                value: oldValue,
            },
        } = e;

        const {
            keys: {
                ArrowDown,
                ArrowUp,
                Control,
                Meta,
                Shift,
                Alt,
            },
        } = this;

        if (ArrowUp || ArrowDown) {
            const delta = Meta || Control ?
                100 - 1
                :
                Shift ?
                    10 - 1
                    :
                    // Alt ?
                    //     0.1 - 1
                    //     :
                    1 - 1;

            const value = ArrowUp ?
                +oldValue + delta
                :
                +oldValue - delta;

            if (this.props.onChange) {
                e.preventDefault();
                target.value = value;
                this.props.onChange({ ...e, target });
            } else {
                target.value = value;
            }
        }
    }

    render = () => {
        const {
            props: {
                tagname,
                label,
                type,
                select,
                value,
                initialValue,
                checked,
                onChange,
                handleChange,
                ...props
            },
            ref,
            handleKeyDown,
            handleKeyUp,
            handleNumberChange,
        } = this;

        console.log(this.keys);

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
                                    type === "text" ?
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
                            onKeyDown={handleKeyDown}
                            onKeyUp={handleKeyUp}
                            onInput={e => console.log([e, { ...e }, e.key, e.metaKey])}
                            onChange={type === "number" ?
                                handleNumberChange
                                :
                                onChange}
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

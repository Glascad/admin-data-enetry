import React, { PureComponent, createRef } from 'react';

import Select from 'react-select';

// import FlipSwitch from '../FlipSwitch/FlipSwitch';

import './Input.scss';
import { ImperialValue } from '../../../utils';

const booleanTypes = [
    "switch",
    "checkbox",
    "icon",
];

// const selectStyles = {
//     inchInput: (provided, state) => ({
//         ...provided,
//         n: console.log({ provided, state }),
//         height: '2rem',
//     }),
// };

export default class Input extends PureComponent {

    static defaultProps = {
        tagname: "label",
        type: "text",
        checked: false,
        direction: '',
        disabled: false,
    };

    state = {
        inchInput: '',
        value: new ImperialValue(this.props.initialValue || this.props.value || 0),
    };

    keys = {};

    ref = createRef();

    componentDidUpdate = ({ initialValue }) => {
        const {
            props: {
                initialValue: newValue,
            },
        } = this;
        if (initialValue !== newValue) {
            if (this.props.type === 'inches') {
                this.setState({ value: new ImperialValue(newValue) });
            } else {
                this.ref.current.value = newValue;
            }
        }
    }

    componentDidMount = () => {
        this.componentDidUpdate({});
        // window.addEventListener('keydown', this.handleKeyDown);
        // window.addEventListener('keyup', this.handleKeyUp);
    }

    handleInchChange = ({ target: { value: inchInput } }) => {
        const {
            props: {
                onChange,
            },
        } = this;

        const value = new ImperialValue(inchInput);

        console.log({ inchInput, value });

        this.setState({ inchInput, value });

        if (onChange) onChange(value);
    }

    handleInchblur = ({ target: { value: inchInput } }) => {
        const {
            props: {
                onBlur,
            },
        } = this;

        const value = new ImperialValue(inchInput);

        this.setState({ inchInput: `${value}`, value });

        if (onBlur) onBlur(value);
    }

    // componentWillUnmount = () => {
    //     window.removeEventListener('keydown', this.handleKeyDown);
    //     window.removeEventListener('keyup', this.handleKeyUp);
    // }

    // handleKeyDown = e => {
    //     const { key, altKey, target } = e;

    //     this.keys[key] = true;
    //     this.keys.Alt = altKey;

    //     if (key === 'Enter') target.blur();
    // }

    // handleKeyUp = e => {
    //     const { key, altKey } = e;

    //     this.keys[key] = false;
    //     this.keys.Alt = altKey;
    // }

    // handleNumberChange = e => {
    //     const {
    //         target,
    //         target: {
    //             value: oldValue,
    //         },
    //     } = e;

    //     const {
    //         keys: {
    //             ArrowDown,
    //             ArrowUp,
    //             Control,
    //             Meta,
    //             Shift,
    //             Alt,
    //         },
    //     } = this;

    //     if (ArrowUp || ArrowDown) {
    //         const delta = Meta || Control ?
    //             100 - 1
    //             :
    //             Shift ?
    //                 10 - 1
    //                 :
    //                 // Alt ?
    //                 //     0.1 - 1
    //                 //     :
    //                 1 - 1;

    //         const value = ArrowUp ?
    //             +oldValue + delta
    //             :
    //             +oldValue - delta;

    //         if (this.props.onChange) {
    //             e.preventDefault();
    //             target.value = value;
    //             this.props.onChange({ ...e, target });
    //         } else {
    //             target.value = value;
    //         }
    //     }
    // }

    render = () => {
        const {
            state: {
                inchInput,
            },
            props: {
                tagname,
                label,
                direction,
                light,
                type,
                select,
                value,
                initialValue,
                checked,
                onChange,
                handleChange,
                Icon,
                disabled,
                onBlur,
                ...props
            },
            ref,
            handleInchChange,
            handleInchblur,
            // handleNumberChange,
        } = this;

        if (
            value !== undefined
            &&
            initialValue !== undefined
        ) {
            throw new Error("Cannot must provide either `initialValue` or `value` but not both");
        }

        const tag = {
            name: tagname,
        };

        const LABEL = label ? (
            <div
                className="label"
            >
                {label}
            </div>
        ) : null;

        const isBoolean = booleanTypes.includes(type) || Icon;

        const isInches = type === "inches";

        return (
            <tag.name
                className={`Input type-${
                    Icon ? 'icon'
                        :
                        select ? 'select'
                            :
                            type
                    } ${
                    disabled ? 'disabled' : ''
                    } ${
                    checked ? 'checked' : ''
                    } direction-${
                    direction
                    } ${
                    light ? 'light' : ''
                    }`}
            >
                {!isBoolean ? (
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
                            type={isBoolean ?
                                'checkbox'
                                :
                                isInches ?
                                    "text"
                                    :
                                    type}
                            value={onChange || isInches ?
                                value === undefined && type === "text" ?
                                    ""
                                    :
                                    isInches ?
                                        inchInput
                                        :
                                        value
                                :
                                undefined}
                            checked={isBoolean ?
                                checked
                                :
                                undefined}
                            onChange={isInches ?
                                handleInchChange
                                :
                                onChange}
                            onBlur={isInches ?
                                handleInchblur
                                :
                                onBlur}
                            {...props}
                        />
                    )
                }
                {isBoolean ? (
                    <>
                        {type === 'checkbox' ? (
                            <span className="checkbox" />
                        ) : type === 'switch' ? (
                            <div className="track">
                                <div className="switch" />
                            </div>
                        ) : Icon ? (
                            <Icon />
                        ) : null}
                        {LABEL}
                    </>
                ) : null}
            </tag.name>
        );
    }
}

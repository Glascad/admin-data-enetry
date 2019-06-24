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
        value: this.props.initialValue instanceof ImperialValue ?
            this.props.initialValue
            :
            new ImperialValue(this.props.initialValue || this.props.value || 0),
    };

    keys = {};

    ref = createRef();

    componentDidUpdate = ({ initialValue }) => {
        const {
            props: {
                label,
                type,
                initialValue: newValue,
            },
        } = this;

        if (
            newValue
            &&
            !initialValue
            &&
            (type === 'inches')
        ) {
            if (newValue instanceof ImperialValue) {
                this.setState({
                    inchInput: `${newValue}`,
                    value: newValue,
                });
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

        this.setState({ inchInput, value });

        if (onChange) onChange(value);
    }

    handleInchblur = ({ target, target: { value: inchInput } }) => {
        const {
            props: {
                onBlur,
            },
        } = this;

        const value = new ImperialValue(inchInput);

        const stringValue = `${value}`;

        this.setState({ inchInput: stringValue, value });

        this.ref.current.value = stringValue;

        if (onBlur) onBlur(value);
    }

    handleKeyDown = e => {
        const {
            state: {
                value,
            },
            props: {
                type,
                onEnter,
                onKeyDown,
            },
        } = this;

        const { key } = e;

        const arg = type === 'inches' ?
            value
            :
            e;

        if (onEnter && (key === 'Enter')) onEnter(arg);
        if (onKeyDown) onKeyDown(arg);
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
                onEnter,
                onKeyDown,
                ...props
            },
            ref,
            handleInchChange,
            handleInchblur,
            handleKeyDown,
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

        const inputTag = {
            name: type === "textarea" ?
                "textarea"
                :
                "input",
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
                        <inputTag.name
                            ref={ref}
                            type={isBoolean ?
                                'checkbox'
                                :
                                isInches ?
                                    "text"
                                    :
                                    type}
                            value={onChange || isInches ?
                                (
                                    (value === undefined || isNaN(value))
                                    &&
                                    (type === "text" || type === "number")
                                ) ?
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
                            onKeyDown={onEnter ?
                                handleKeyDown
                                :
                                onKeyDown}
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

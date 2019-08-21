import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';

import { ImperialValue, normalCase } from '../../../utils';

// import FlipSwitch from '../FlipSwitch/FlipSwitch';

import './Input.scss';
import customPropTypes from '../../custom-prop-types';

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

    static propTypes = {
        className: PropTypes.string,
        tagname: PropTypes.string,
        title: PropTypes.string,
        label: PropTypes.string,
        direction: PropTypes.oneOf([
            'row',
            'column',
        ]),
        light: PropTypes.bool,
        type: PropTypes.oneOf([
            'text',
            'number',
            'inches',
            ...booleanTypes,
        ]),
        select: PropTypes.shape(Select.propTypes || {
            value: PropTypes.shape({
                value: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number,
                ]),
                label: customPropTypes.renderable,
            }),
            options: PropTypes.arrayOf(PropTypes.shape({
                value: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number,
                ]),
                label: customPropTypes.renderable,
            })),
        }),
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool,
            PropTypes.instanceOf(ImperialValue),
        ]),
        initialValue: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool,
            PropTypes.instanceOf(ImperialValue),
        ]),
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
        handleChange: PropTypes.func,
        Icon: PropTypes.func,
        onBlur: PropTypes.func,
        onEnter: PropTypes.func,
        onKeyDown: PropTypes.func,
        onClick: PropTypes.func,
        onMouseDown: PropTypes.func,
        onMouseUp: PropTypes.func,
    };

    static defaultProps = {
        className: '',
        tagname: "label",
        type: "text",
        checked: false,
        direction: 'column',
        disabled: false,
    };

    constructor(props) {
        super(props);

        const {
            initialValue,
            value,
        } = props;

        const convertedValue = initialValue instanceof ImperialValue ?
            initialValue
            :
            new ImperialValue(initialValue || value || 0);

        this.state = {
            inchInput: `${convertedValue}`,
            value: convertedValue,
        };
    }

    keys = {};

    ref = createRef();

    componentDidUpdate = ({ initialValue: oldValue }) => {
        const {
            props: {
                label,
                type,
                initialValue,
            },
        } = this;

        if (
            (initialValue !== oldValue)
            &&
            (type === 'inches')
        ) {
            const convertedValue = initialValue instanceof ImperialValue ?
                initialValue
                :
                new ImperialValue(initialValue);

            const oldConvertedValue = oldValue instanceof ImperialValue ?
                oldValue
                :
                new ImperialValue(oldValue);

            if (convertedValue.value !== oldConvertedValue.value) {
                console.log("RECEIVED NEW INITIAL VALUE");
                this.setState({
                    inchInput: `${convertedValue}`,
                    value: convertedValue,
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
                initialValue,
            },
        } = this;

        const value = new ImperialValue(inchInput);

        this.setState({ inchInput, value });

        if (onChange) {
            if (initialValue instanceof ImperialValue) onChange(value);
            else onChange(value.value);
        }
    }

    handleInchblur = ({ target, target: { value: inchInput } }) => {
        const {
            props: {
                onBlur,
                initialValue,
            },
        } = this;

        const value = new ImperialValue(inchInput);

        const stringValue = `${value}`;

        this.setState({ inchInput: stringValue, value });

        this.ref.current.value = stringValue;

        if (onBlur) {
            if (initialValue instanceof ImperialValue) onBlur(value);
            else onBlur(value.value);
        }
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
                className,
                tagname,
                title,
                label,
                direction,
                light,
                type,
                select,
                select: {
                    value: selectValue,
                    value: {
                        label: selectValueLabel,
                    } = {},
                } = {},
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
                onClick,
                onMouseDown,
                onMouseUp,
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
            throw new Error("Must provide either `initialValue` or `value` but not both");
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
                <span className="title">{normalCase(title)}</span>
                <span>{normalCase(title ? ` (${label})` : label)}</span>
            </div>
        ) : null;

        const isBoolean = booleanTypes.includes(type) || Icon;

        const isInches = type === "inches";

        return (
            <tag.name
                className={`Input ${
                    className
                    } type-${
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
                onClick={onClick}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
            >
                {!isBoolean ? (
                    LABEL
                ) : null}
                {select ? (
                    <Select
                        {...select}
                        ref={ref}
                        className={`Select ${select.isMulti ? "multi" : ""}`}
                        value={selectValue ? {
                            ...selectValue,
                            label: normalCase(selectValueLabel),
                        } : undefined}
                        options={select.options.map(o => ({
                            ...o,
                            label: normalCase(o.label),
                        }))}
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
                            value={onChange ? (
                                (value === undefined || Number.isNaN(value))
                                &&
                                ["text", "number", "password"].includes(type)
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
                        // VVV is this spread necessary?
                        // {...props}
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

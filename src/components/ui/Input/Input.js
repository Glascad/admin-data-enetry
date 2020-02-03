import React, { createRef, useEffect, useState } from 'react';
import { ImperialValue, normalCase } from '../../../utils';
import './Input.scss';

// static propTypes = {
//     className: PropTypes.string,
//     tagname: PropTypes.string,
//     title: PropTypes.string,
//     label: PropTypes.string,
//     direction: PropTypes.oneOf([
//         'row',
//         'column',
//     ]),
//     light: PropTypes.bool,
//     type: PropTypes.oneOf([
//         'text',
//         'number',
//         'inches',
//         ...booleanTypes,
//     ]),
//     select: customPropTypes.deprecated(PropTypes.shape(
//         // Select.propTypes || 
//         {
//             value: PropTypes.shape({
//                 value: PropTypes.oneOfType([
//                     PropTypes.string,
//                     PropTypes.number,
//                 ]),
//                 label: customPropTypes.renderable,
//             }),
//             options: PropTypes.arrayOf(PropTypes.shape({
//                 value: PropTypes.oneOfType([
//                     PropTypes.string,
//                     PropTypes.number,
//                 ]),
//                 label: customPropTypes.renderable,
//             })),
//         })),
//     value: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.number,
//         PropTypes.bool,
//         PropTypes.instanceOf(ImperialValue),
//     ]),
//     initialValue: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.number,
//         PropTypes.bool,
//         PropTypes.instanceOf(ImperialValue),
//     ]),
//     checked: PropTypes.bool,
//     disabled: PropTypes.bool,
//     onChange: PropTypes.func,
//     handleChange: PropTypes.func,
//     Icon: PropTypes.object,
//     onBlur: PropTypes.func,
//     onEnter: PropTypes.func,
//     onKeyDown: PropTypes.func,
//     onClick: PropTypes.func,
//     onMouseDown: PropTypes.func,
//     onMouseUp: PropTypes.func,
// };

// static defaultProps = {
//     className: '',
//     tagname: "label",
//     type: "text",
//     checked: false,
//     direction: 'column',
//     disabled: false,
// };

const booleanTypes = [
    "switch",
    "checkbox",
    "icon",
];

export default function Input({
    className = '',
    tagname = 'label',
    title,
    label,
    direction = 'column',
    light,
    type = 'text',
    value,
    initialValue,
    checked = false,
    onChange,
    handleChange,
    Icon,
    disabled = false,
    readOnly,
    onBlur,
    onEnter,
    onKeyDown,
    onClick,
    onMouseDown,
    onMouseUp,
    onDrop,
    "data-cy": dataCy,
    autoFocus,
    tabIndex,
}) {

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

    const convertedValue = initialValue instanceof ImperialValue ?
        initialValue
        :
        new ImperialValue(initialValue || value || 0);

    const [{ inchInput, inchValue }, setState] = useState({ inchInput: `${convertedValue}`, inchValue: convertedValue });

    const keys = {};

    const ref = createRef();


    const handleInchChange = ({ target: { value: inchInput } }) => {

        const inchValue = new ImperialValue(inchInput);

        setState({ inchInput, inchValue });

        if (onChange) {
            if (initialValue instanceof ImperialValue) onChange(inchValue);
            else onChange(inchValue.value);
        }
    }

    const handleInchblur = ({ target, target: { value: inchInput } }) => {

        const inchValue = new ImperialValue(inchInput);

        const stringValue = `${inchValue}`;

        setState({ inchInput: stringValue, inchValue });

        ref.current.inchValue = stringValue;

        if (onBlur) {
            if (initialValue instanceof ImperialValue) onBlur(inchValue);
            else onBlur(inchValue.value);
        }
    }

    const handleKeyDown = e => {

        const { key } = e;

        const arg = type === 'inches' ?
            value
            :
            e;

        if (onEnter && (key === 'Enter')) onEnter(arg);
        if (onKeyDown) onKeyDown(arg);
    }

    useEffect(() => {
        if (
            (initialValue !== value)
            &&
            (type === 'inches')
        ) {
            const convertedValue = initialValue instanceof ImperialValue ?
                initialValue
                :
                new ImperialValue(initialValue);

            const oldConvertedValue = value instanceof ImperialValue ?
                value
                :
                new ImperialValue(value);

            if (convertedValue.value !== oldConvertedValue.value) {
                setState({
                    inchInput: `${convertedValue}`,
                    value: convertedValue,
                });
            }
        }
    }, [initialValue]);

    return (
        <tag.name
            className={`Input ${
                className
                } type-${
                Icon ? 'icon'
                    :
                    type
                } ${
                readOnly ? 'read-only' : ''
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
            onDrop={onDrop}
            {...isBoolean ? { "data-cy": dataCy } : null}
        >
            {isBoolean ? null : LABEL}
            <inputTag.name
                ref={ref}
                type={isBoolean ?
                    'checkbox'
                    :
                    isInches ?
                        "text"
                        :
                        type}
                value={onChange || readOnly ? (
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
                readOnly={readOnly}
                disabled={disabled || readOnly}
                autoFocus={autoFocus}
                tabIndex={tabIndex}
                checked={isBoolean ? checked : undefined}
                onChange={isInches ? handleInchChange : onChange}
                onBlur={isInches ? handleInchblur : onBlur}
                onKeyDown={onEnter ? handleKeyDown : onKeyDown}
                data-cy={isBoolean ? undefined : dataCy}
            />
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

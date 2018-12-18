import React from 'react';
import Select from 'react-select';
import './Input.scss';

export default function Input({
    tagname = "div",
    label,
    type = "text",
    select,
    value,
    ...props
}) {
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

    return (
        <tag.name className={`Input type-${type}`} >
            {type !== "checkbox" ? (
                LABEL
            ) : null}
            {type !== "select" ? (
                <input
                    type={type}
                    value={value || (
                        type === 'text' ?
                            ""
                            :
                            type === "number" ?
                                0
                                :
                                type === "checkbox" ?
                                    false
                                    :
                                    ""
                    )}
                    {...props}
                />
            ) : (
                    <Select
                        {...select}
                        className="Select"
                    />
                )}
            {type === "checkbox" ? (
                <>
                    <span className="check" />
                    {LABEL}
                </>
            ) : null}
        </tag.name>
    );
}

import React from 'react';
import Select from 'react-select';

export default function Input({
    tagname = "div",
    label,
    type = "text",
    select,
    ...props
}) {
    const tag = {
        name: tagname
    };

    const LABEL = label ? (
        <span
            className="label"
        >
            {label}
        </span>
    ) : null;

    return (
        <tag.name>
            {type !== "checkbox" ?
                LABEL
                :
                null}
            {type !== "select" ? (
                <input
                    type={type}
                    {...props}
                />
            ) : (
                    <Select
                        {...select}
                    />
                )}
            {type === "checkbox" ?
                LABEL
                :
                null}
        </tag.name>
    );
}

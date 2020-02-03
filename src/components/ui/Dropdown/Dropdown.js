import React from 'react';

import CollapsibleTitle from '../CollapsibleTitle/CollapsibleTitle';

import './Dropdown.scss';

export default function Dropdown({
    label,
    children,
    className,
    triangle = true,
    open = false,
    removeDropdown = false,
    ...props
}) {
    return (
        <div className={`Dropdown ${className}`}>
            <CollapsibleTitle
                label={(
                    <>
                        {removeDropdown ? (
                            <div
                                className="remove-dropdown"
                                onClick={() => removeDropdown(arguments[0])}
                            >
                                <div className="block-one" />
                                <div className="block-two" />
                            </div>
                        ) : null}
                        {triangle ? (
                            <div className="triangle-wrapper">
                                <div className="triangle" />
                            </div>
                        ) : null}
                        <span>
                            {label}
                        </span>
                    </>
                )}
                open={open}
                {...props}
            >
                {/* {open ? ( */}
                <div className="content">
                    {children}
                </div>
                {/* ) : null} */}
            </CollapsibleTitle>
        </div>
    );
}

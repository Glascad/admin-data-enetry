import React from 'react';

import CollapsibleTitle from '../CollapsibleTitle/CollapsibleTitle';

import './Dropdown.scss';

export default function Dropdown({
    label,
    children,
    className,
    triangle = true,
    open = false,
    ...props
}) {
    return (
        <div className={`Dropdown ${className}`}>
            <CollapsibleTitle
                label={(
                    <>
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

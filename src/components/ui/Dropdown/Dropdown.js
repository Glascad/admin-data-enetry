import React from 'react';

import CollapsibleTitle from '../CollapsibleTitle/CollapsibleTitle';

import './Dropdown.scss';

export default function Dropdown({
    title,
    children,
    className,
    triangle = true,
    open = false,
    ...props
}) {
    return (
        <div className={`Dropdown ${className}`}>
            <CollapsibleTitle
                title={(
                    <>
                        {triangle ? (
                            <div className="triangle-wrapper">
                                <div className="triangle" />
                            </div>
                        ) : null}
                        <span>
                            {title}
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

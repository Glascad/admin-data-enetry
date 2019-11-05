import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { normalCase } from '../../../utils';
import customPropTypes from '../../utils/custom-prop-types';

import './TitleBar.scss';
import SnailTrail from '../SnailTrail/SnailTrail';

TitleBar.propTypes = {
    className: PropTypes.string,
    title: customPropTypes.renderable.isRequired,
    left: customPropTypes.renderable,
    right: customPropTypes.renderable,
    snailTrail: PropTypes.arrayOf(customPropTypes.renderable),
    onClick: PropTypes.func,
};

TitleBar.defaultProps = {
    className: "",
    title: "",
    snailTrail: [],
};

export default function TitleBar({
    className,
    title,
    left,
    right,
    snailTrail,
    onClick,
    onEdit,
}) {
    const [editing, setEditing] = useState(false);
    return (
        <header
            className={`TitleBar ${className}`}
        >
            <div
                className="title-bar-left"
                onClick={e => {
                    if (onClick) onClick(e);
                    if (onEdit) setEditing(true);
                }}
            >
                {editing ? (
                    <input
                        value={title}
                        onChange={onEdit}
                        onBlur={() => setEditing(false)}
                        onKeyDown={({ key, target }) => ["Escape", "Enter"].includes(key) && target.blur()}
                        autoFocus={true}
                    />
                ) : (
                        <span className="title">
                            {normalCase(title)}
                        </span>
                    )}
                {snailTrail.length ? (
                    <>
                        <span>&nbsp;-&nbsp;</span>
                        <SnailTrail
                            trail={snailTrail}
                        />
                    </>
                ) : null}
                <span className="left">
                    {left}
                </span>
            </div>
            <div className="title-bar-right">
                {right}
            </div>
        </header >
    );
}

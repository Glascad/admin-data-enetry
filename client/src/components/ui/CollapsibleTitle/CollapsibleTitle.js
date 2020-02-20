import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TitleBar from '../TitleBar/TitleBar';

import './CollapsibleTitle.scss';
import customPropTypes from '../../utils/custom-prop-types';
import { useInitialState } from '../..';

CollapsibleTitle.propTypes = {
    className: PropTypes.string,
    open: PropTypes.bool,
    children: customPropTypes.renderable,
    titleBar: PropTypes.shape(TitleBar.propTypes),
    title: customPropTypes.renderable,
};

CollapsibleTitle.defaultProps = {
    className: "",
    open: true,
};

export default function CollapsibleTitle({
    open: propsOpen,
    className,
    children,
    title,
    titleBar,
    label,
}) {

    const [open, setOpen] = useInitialState(propsOpen);

    const toggleOpen = () => setOpen(open => !open);

    return (
        <>
            <div
                className={`CollapsibleTitle ${
                    className
                    }${
                    !children || !children.length ? 'empty' : ''
                    } ${
                    open ? 'open' : 'closed'
                    }`}
            >
                {(title || titleBar) ? (
                    <TitleBar
                        onClick={toggleOpen}
                        title={title}
                        {...titleBar}
                    />
                ) : (
                        <div
                            className="title"
                            onClick={toggleOpen}
                        >
                            {label}
                        </div>
                    )}
            </div>
            {open ? children : null}
        </>
    );
}

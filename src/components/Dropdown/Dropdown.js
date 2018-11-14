import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import './Dropdown.scss';

export default class Dropdown extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        closeOnBlur: PropTypes.bool,
        content: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
        onToggle: PropTypes.func,
        onClick: PropTypes.func,
        onBlur: PropTypes.onBlur,
        reference: PropTypes.any,
    };

    ref = createRef();

    close = () => this.ref.current.open = false;

    onBlur = e => {
        if (this.props.closeOnBlur) this.close();
        if (this.props.onBlur) this.props.onBlur(e);
    }

    render = () => {
        const {
            props: {
                title,
                children,
                className,
                onClick,
                onSummaryClick,
                reference,
            },
            onToggle,
            onBlur,
        } = this;

        return (
            <details
                className={`Dropdown ${className} ${!children || !children.length ? 'empty' : ''}`}
                onToggle={onToggle}
                onBlur={onBlur}
                onClick={onClick}
                ref={reference}
            >
                <summary
                    onClick={onSummaryClick}
                >
                    {title}
                </summary>
                {children ? (
                    <div className="content">
                        {children}
                    </div>
                ) : null}
            </details>
        );
    }
}

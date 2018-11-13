import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import './Dropdown.scss';

export default class Dropdown extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        closeOnBlur: PropTypes.bool,
        content: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
        renderChild: PropTypes.func,
        onToggle: PropTypes.func,
        onClick: PropTypes.func,
        onBlur: PropTypes.onBlur,
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
                content,
                renderChild,
                className
            },
            onToggle,
            onClick,
            onBlur,
            ref,
        } = this;

        return (
            <details
                className={`Dropdown ${className}`}
                onToggle={onToggle}
                onBlur={onBlur}
                onClick={onClick}
                ref={ref}
            >
                <summary>{title}</summary>
                {content && content.length ? (
                    <div className="content">
                        {renderChild ?
                            !Array.isArray(content) ?
                                renderChild(content)
                                :
                                content.map(renderChild)
                            : content}
                    </div>
                ) : null}
            </details>
        );
    }
}

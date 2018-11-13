import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import './Dropdown.scss';

export default class Dropdown extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        content: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
        renderChild: PropTypes.func,
        onToggle: PropTypes.func,
        onClick: PropTypes.func,
    };

    ref = createRef();

    close = () => this.ref.current.open = false;

    onClick = e => {
        e.stopPropagation();
        if (e.target.open) {
            console.log('open');
        } else console.log('closed');
    }

    onToggle = e => {
        e.stopPropagation();
        if (e.target.open) {
            console.log('adding event listener');
            window.addEventListener('click', this.close);
        } else {
            window.removeEventListener('click', this.close);
        }
    }

    render = () => {
        const {
            props: {
                title,
                content,
                renderChild,
            },
            onToggle,
            onClick,
            ref,
        } = this;

        return (
            <details
                className="Dropdown"
                onToggle={onToggle}
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

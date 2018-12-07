import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import './Dropdown.scss';

export default class Dropdown extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        closeOnBlur: PropTypes.bool,
        content: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
        onClick: PropTypes.func,
    };

    state = {
        open: false
    };

    open = () => this.setState({
        open: true
    });

    close = () => this.setState({
        open: false
    });

    componentDidUpdate = ({ open }) => {
        if (!open && this.props.open) this.open();
        if (open && !this.props.open) this.close();
    }

    handleClick = e => {
        if (this.state.open) this.close();
        else this.open();
    }

    render = () => {
        const {
            state: {
                open,
            },
            props: {
                title,
                children,
                className,
                onClick,
            },
            handleClick,
        } = this;

        return (
            <div
                className={`Dropdown ${
                    className
                    } ${
                    !children || !children.length ? 'empty' : ''
                    } ${
                    open ? 'open' : 'closed'
                    }`}
                onClick={onClick}
            >
                <div
                    className="title"
                    onClick={handleClick}
                >
                    <div className="triangle" />
                    {title}
                </div>
                <div className="content">
                    {children}
                </div>
            </div>
        );
    }
}

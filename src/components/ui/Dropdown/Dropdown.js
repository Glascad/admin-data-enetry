import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import './Dropdown.scss';

export default class Dropdown extends Component {

    // static propTypes = {
    //     title: PropTypes.string.isRequired,
    //     closeOnBlur: PropTypes.bool,
    //     content: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
    //     onClick: PropTypes.func,
    // };

    static defaultProps = {
        className: "",
        triangle: true,
    };

    state = {
        open: this.props.open || false
    };

    open = () => this.setState({
        open: true
    });

    close = () => this.setState({
        open: false
    });

    componentDidUpdate = (_, { open }) => {
        if (!open && this.props.open === true) this.open();
        if (open && this.props.open === false) this.close();
    }

    handleClick = () => {
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
                triangle,
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
                    {triangle ? (
                        <div className="triangle-wrapper">
                            <div className="triangle" />
                        </div>
                    ) : null}
                    <span>
                        {title}
                    </span>
                </div>
                {/* {open ? ( */}
                    <div className="content">
                        {children}
                    </div>
                {/* ) : null} */}
            </div>
        );
    }
}

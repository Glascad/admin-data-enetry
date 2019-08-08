import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TitleBar from '../TitleBar/TitleBar';

import './CollapsibleTitle.scss';
import customPropTypes from '../../custom-prop-types';

export default class CollapsibleTitle extends PureComponent {

    static propTypes = {
        className: PropTypes.string,
        open: PropTypes.bool,
        children: customPropTypes.renderable,
        titleBar: PropTypes.shape(TitleBar.propTypes),
        title: PropTypes.renderable,
    };

    static defaultProps = {
        className: "",
        open: true,
    };

    state = {
        open: this.props.open,
    };

    open = () => this.setState({ open: true });

    close = () => this.setState({ open: false });

    componentDidUpdate = (_, { open }) => {
        if (!open && this.props.open === true) this.open();
        if (open && this.props.open === false) this.close();
    }

    handleClick = () => this.state.open ?
        this.close()
        :
        this.open();

    render = () => {
        const {
            state: {
                open,
            },
            props: {
                className,
                children,
                title,
                titleBar,
            },
            handleClick,
        } = this;

        const tag = {
            name: titleBar ?
                TitleBar
                :
                'div',
        };

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
                    <tag.name
                        className="title"
                        onClick={handleClick}
                        {...titleBar}
                    >
                        {title}
                    </tag.name>
                </div>
                {open ? children : null}
            </>
        );
    }
}

import React, { Component } from 'react';

import './Sidebar.scss';

import {
    Link,
    NavLink,
    withRouter,
} from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import {
    Dropdown,
    // DoubleArrow,
    NavMenu,
} from '../../components';

import {
    parseSearch,
} from '../../utils';

import routes from '../../routes/routes';

import SystemLink from './SystemLink';

class Sidebar extends Component {

    state = {
        open: true,
    };

    toggle = () => this.setState({
        open: !this.state.open,
    });

    render = () => {
        const {
            state: {
                open,
            },
            props: {
                location: {
                    pathname,
                    search,
                },
                match: {
                    url
                }
            },
            toggle,
        } = this;

        const { systemNID } = parseSearch(search);

        return (
            <div id="Sidebar" className={open ? "" : "closed"}>
                <div id="sidebar-header">
                    <Logo className="logo" />
                    <span>GLASCAD</span>
                </div>
                <NavMenu
                    routes={routes}
                />
                {/* <div className="item sidebar-toggle">
                    <DoubleArrow
                        onClick={toggle}
                    />
                </div> */}
                {systemNID ? (
                    <SystemLink
                        systemNID={systemNID}
                    />
                ) : null}
            </div>
        );
    }
}

export default withRouter(Sidebar);

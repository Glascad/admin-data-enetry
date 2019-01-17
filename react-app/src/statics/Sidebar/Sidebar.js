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
                {routes.map(({
                    name,
                    path,
                    subroutes = []
                }, i) => subroutes.length ? (
                    <Dropdown
                        key={i}
                        title={name}
                        open={pathname.match(new RegExp(`^${path}/`)) || undefined}
                        className={
                            pathname.match(new RegExp(`^${path}/`)) ?
                                'selected'
                                :
                                ''
                        }
                    >
                        {subroutes.map(({ name: childName, path: childPath }, j) => (
                            <NavLink
                                key={j}
                                isActive={(_, { pathname }) => pathname.includes(`${path}${childPath}`)}
                                to={`${
                                    path
                                    }${
                                    childPath
                                    }${
                                    search
                                    }`}
                                activeClassName="selected"
                            >
                                {childName}
                            </NavLink>
                        ))}
                    </Dropdown>
                ) : (
                            <Link
                                key={i}
                                className="item"
                                to={`${
                                    path
                                    }${
                                    search}`}
                            >
                                {name}
                            </Link>
                        ))}
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

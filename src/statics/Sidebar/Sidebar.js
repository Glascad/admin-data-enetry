import React, { Component } from 'react';

import './Sidebar.scss';

import {
    Link,
    withRouter,
} from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import {
    DoubleArrow,
    NavMenu,
} from '../../components';

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
            props,
            props: {
                match: {
                    path,
                },
                routes,
            },
            toggle,
        } = this;

        return (
            <div id="Sidebar" className={open ? "" : "closed"}>
                <Link
                    id="sidebar-header"
                    to={path}
                >
                    <Logo className="logo" />
                    <span>GLASCAD</span>
                </Link>
                <NavMenu
                    routeProps={props}
                    routes={routes}
                    closed={!open}
                />
                <DoubleArrow
                    onClick={toggle}
                />
                <div className="application-links">
                    <Link to="/data-entry">
                        <button>
                            DATA ENTRY
                        </button>
                    </Link>
                    <Link to="/glascad">
                        <button>
                            GLASCAD
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default withRouter(Sidebar);

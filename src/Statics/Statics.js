import React, { Component, createContext } from 'react';

import './Statics.scss';

import {
    Link,
    withRouter,
} from 'react-router-dom';

import { ReactComponent as Logo } from '../assets/logo.svg';

import {
    DoubleArrow,
    NavMenu,
    Navigator,
} from '../components';

export const StaticContext = createContext();

class Statics extends Component {

    state = {
        open: true,
    };

    toggle = open => typeof open === 'boolean' ?
        this.setState({ open })
        :
        this.setState({ open: !this.state.open });

    getPathTo = component => {
        // find component in route tree
        // add baseURL to component path
        // return path
    }

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
                baseURL,
                routes,
            },
            toggle,
            getPathTo,
        } = this;

        console.log(this);

        return (
            <StaticContext.Provider
                value={{
                    sidebar: {
                        open,
                        toggle,
                    },
                    baseURL,
                    routes,
                    getPathTo,
                }}
            >
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
                <div id="Viewport">
                    <Navigator
                        routes={routes}
                    />
                </div>
            </StaticContext.Provider>
        );
    }
}

export default withRouter(Statics);

import React, {
    PureComponent,
    createContext,
    createRef,
} from 'react';

import './Statics.scss';

import {
    Link,
    withRouter,
} from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import {
    DoubleArrow,
    NavMenu,
    Navigator,
} from '../../components';

export const StaticContext = createContext();

class Statics extends PureComponent {

    state = {
        open: true,
    };

    Viewport = createRef();

    toggle = open => typeof open === 'boolean' ?
        this.setState({ open })
        :
        this.setState({ open: !this.state.open });

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
            getPathTo,
        } = this;

        return (
            <StaticContext.Provider
                value={{
                    sidebar: {
                        open,
                        toggle,
                    },
                    routes,
                    getPathTo,
                    Viewport: this.Viewport,
                }}
            >
                <div id="Sidebar" className={open ? "" : "closed"}>
                    <Link
                        id="sidebar-header"
                        to={path}
                    >
                        <Logo className="logo" />
                        <span>glascad</span>
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
                            <button className="light">
                                DATA ENTRY
                            </button>
                        </Link>
                        <Link to="/glascad">
                            <button className="light">
                                GLASCAD
                            </button>
                        </Link>
                    </div>
                </div>
                <div
                    id="Viewport"
                    ref={this.Viewport}
                >
                    <Navigator
                        routes={routes}
                    />
                </div>
            </StaticContext.Provider>
        );
    }
}

export default withRouter(Statics);
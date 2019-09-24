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
    ApolloWrapper,
    withContext,
} from '../../components';

import { AuthContext } from '../../auth-context';

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
                AUTH: {
                    currentUser: {
                        username,
                    } = {},
                    logout,
                },
                match: {
                    path,
                },
                initialRoute,
                routes,
            },
            toggle,
            getPathTo,
            Viewport,
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
                    Viewport,
                }}
            >
                <div
                    id="Sidebar"
                    className={open ? "" : "closed"}
                    onKeyDown={e => e.stopPropagation()}
                    onMouseDown={e => e.stopPropagation()}
                    onWheel={e => e.stopPropagation()}
                >
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
                    {/* <div id="application-links">
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
                    </div> */}
                    {username ? (
                        <div id="current-user">
                            <div>
                                {username}
                            </div>
                            <button
                                className="empty light"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </div>
                    ) : null}
                </div>
                <div
                    id="viewport"
                    ref={Viewport}
                >
                    <Navigator
                        initialRoute={initialRoute}
                        routes={routes}
                    />
                </div>
            </StaticContext.Provider>
        );
    }
}

export default withContext(AuthContext, ({ context }) => ({ AUTH: context }))(withRouter(Statics));

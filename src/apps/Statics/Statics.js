import React, {
    PureComponent,
    createContext,
    createRef,
    useEffect,
    useContext,
} from 'react';

import './Statics.scss';

import {
    NavLink,
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

import { AuthContext } from '../../AuthContext';
import { extractNavigationOptions, normalCase } from '../../utils';

export const StaticContext = createContext();

export const useCollapseSidebar = () => {
    const { sidebar: { toggle } } = useContext(StaticContext);
    useEffect(() => {
        toggle(false);
        return () => toggle(true);
    }, []);
}

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
                allowedApplications,
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
                    <div className="bottom-buttons">
                        {Object.entries(allowedApplications)
                            .map(([name, route]) => extractNavigationOptions(name, route))
                            .map(({ name, path }) => (
                                <NavLink
                                    to={path}
                                    activeClassName="disabled"
                                >
                                    <button className="light">
                                        {name}
                                    </button>
                                </NavLink>
                            ))}
                        <div id="current-user">
                            <div>
                                {username}
                            </div>
                            {username ? (
                                <button
                                    className="empty light"
                                    onClick={logout}
                                >
                                    Logout
                            </button>
                            ) : null}
                        </div>
                    </div>
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
